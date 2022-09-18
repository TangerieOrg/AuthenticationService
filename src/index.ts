import express from "express";
import { DatabaseMiddleware } from "./modules/database";

const app = express();

app.set('trust proxy', true)

app.use(express.json());

app.use(DatabaseMiddleware);

app.get("/", async (req, res) => {
    res.json(await req.redis.keys("*"));
});

app.listen(8080, () => {
    console.log("Listening on", 8080);
})