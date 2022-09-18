import { Router } from "express";
import { getUser } from "../modules/auth/auth";
import { PublicUser } from "../modules/auth/types";
import login from "./login";

const router = Router();

router.use("/", login)


router.get("/", async (req, res) => {
    if(!req.body.cookie || typeof req.body.cookie != "string") return res.json(undefined);
    const user = await getUser(req, req.body.cookie);
    if(!user) return res.json(undefined);

    const pub : PublicUser = {
        permissions: user.permissions,
        username: user.username
    };
    
    return res.json(pub);
})

export default router;