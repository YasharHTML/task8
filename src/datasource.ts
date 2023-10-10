import * as dotenv from "dotenv";
dotenv.config();

import { DataSource } from "typeorm";
import { News } from "./models/News.entity";
import { User } from "./models/User.entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DB_URL,
    synchronize: true,
    entities: [User, News],
});
