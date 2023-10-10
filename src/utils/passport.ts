import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy } from "passport-jwt";
import { findUser } from "../services/user.service";

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        function (email, password, cb) {
            return findUser({ email, password })
                .then((user) => {
                    if (!user) {
                        return cb(null, false, {
                            message: "Incorrect email or password.",
                        });
                    }
                    return cb(null, user, {
                        message: "Logged In Successfully",
                    });
                })
                .catch((err) => cb(err));
        }
    )
);

passport.use(
    new JWTStrategy(
        {
            secretOrKey: process.env.JWT_SECRET!,
            jwtFromRequest: (req) => {
                return req && req.cookies ? req.cookies.jwt : null;
            },
        },
        (payload, cb) => {
            cb(null, payload)
        }
    )
);
