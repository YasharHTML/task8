import { Request, Response, Router } from "express";
import passport from "passport";
import * as JWT from "jsonwebtoken";
import { RegisterUserDto } from "../dto/user.dto";
import { createUser } from "../services/user.service";

const router = Router();

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    passport.authenticate(
        "local",
        { session: false },
        (err: any, user: any) => {
            if (err || !user) {
                return res.status(400).json({
                    message: "Probably bad request in input",
                });
            }
            req.login(user, { session: false }, (err) => {
                if (err) {
                    return res.status(500).json(err);
                }
                const jwt = JWT.sign(
                    { id: user.id, email: user.email },
                    process.env.JWT_SECRET!
                );
                res.cookie("jwt", jwt, { httpOnly: true });
                res.json({ jwt });
            });
        }
    )(req, res);
});

router.post("/register", async (req, res) => {
    const { confirmPassword, email, password } = req.body;

    if (!confirmPassword || !email || !password)
        return res.status(400).json({ error: "input failed" });

    if (confirmPassword !== password)
        return res.status(400).json({ error: "Password confirmation failed" });

    try {
        const user = await createUser({ email, password });
        req.login(user, { session: false }, (err) => {
            if (err) {
                return res.status(500).json(err);
            }
            const jwt = JWT.sign(user, process.env.JWT_SECRET!);
            res.cookie("jwt", jwt, { httpOnly: true });
            res.json({ jwt });
        });
    } catch (error: any) {
        console.error(error.message);
        res.status(500).json(
            error.message.startsWith("duplicate key")
                ? { error: "This email has already been registered with" }
                : { error: error.message }
        );
    }
});

router.delete("/logout", (req, res) => {
    res.clearCookie("jwt").json({ message: "Signed Out successfully" });
});

export { router };
