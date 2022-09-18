import express from "express";

const app = express();

app.set('trust proxy', true)

app.use(express.json());

app.get("/", (req, res) => {
    res.json({})
});

app.listen(8080, () => {
    console.log("Listening on", 8080);
})