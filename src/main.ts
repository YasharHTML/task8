import "reflect-metadata";

import * as dotenv from "dotenv";
dotenv.config();

const HOST = process.env.HOST ?? "0.0.0.0";
const PORT = +(process.env.PORT ?? "3000");

import express from "express";
import { AppDataSource } from "./datasource";
import cookieParser from "cookie-parser";
import passport from "passport";
import "./utils/passport";

AppDataSource.initialize();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static(__dirname + "/../public"));
app.use(passport.initialize());
app.use((req, res, next) => {
    console.log(
        `${req.method} ${req.url} query:`,
        req.query,
        "body:",
        req.body
    );
    next();
});

import { router } from "./router";

app.use(router);

app.listen(PORT, HOST, () => {
    console.log("Listening: " + HOST + ":" + PORT);
});
