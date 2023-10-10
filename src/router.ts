import { Router } from "express";

const router = Router();

import { router as newsRouter } from "./router/news";
import { router as authRouter } from "./router/auth";
import swaggerUi from "swagger-ui-express";
import passport from "passport";
import swaggerDoc from "./docs/swagger.json";

router.use(
    "/api/newsposts",
    passport.authenticate("jwt", { session: false }),
    newsRouter
);
router.use("/api/auth", authRouter);

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDoc, {customCssUrl: "/css/style.css"}));

export { router };
