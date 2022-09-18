import { Router } from "express";
import { createLoginSession, createUser } from "../modules/auth/auth";
import { Permission } from "../modules/auth/types";

const router = Router();

router.get("/login", async (req, res) => {
    if(!req.body.username || !req.body.password) return res.status(400).json({
        error: "No username or password provided"
    });

    res.json(await createLoginSession(req, req.body.username, req.body.password));
});

router.get("/register", async (req, res) => {
    const canRegister = (await req.redis.keys("user:*")).length == 0;
    if(!canRegister) return res.status(401).json({
        error: "Cannot register new user"
    });

    if(!req.body.username || !req.body.password) return res.status(400).json({
        error: "No username or password provided"
    });

    await createUser(req, req.body.username, req.body.password, [Permission.Admin, Permission.Developer, Permission.User]);
    res.json({});
});

export default router;