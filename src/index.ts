import express from "express";
import { DatabaseMiddleware } from "./modules/database";
import router from "./routes";
import cookieMiddleware from "cookie-parser";

const app = express();

app.set('trust proxy', true)

app.use(express.json());

app.use(cookieMiddleware(process.env.COOKIE_SECRET || "cookie_secret"));

app.use(DatabaseMiddleware);

app.use("/", router);

app.listen(8000, () => {
    console.log("Listening on", 8000);
})