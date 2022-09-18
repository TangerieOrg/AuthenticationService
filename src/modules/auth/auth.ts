import { pbkdf2Sync, randomBytes } from "crypto";
import { Request } from "express";
import { Permission, Session, User } from "./types";

export async function getUser(req : Request, cookie : string) {
    if(!await req.redis.exists(`sso:${cookie}`)) return undefined;
    const session : Session = await req.redis.json.get(`sso:${cookie}`) as any as Session;

    return getUserByName(req, session.username);
}

export async function getUserByName(req : Request, username : string) {
    if(!await req.redis.exists(`user:${username}`)) return undefined;
    return await req.redis.json.get(`user:${username}`) as any as User;
}

export async function createLoginSession(req : Request, username : string, password : string) {
    const user = await getUserByName(req, username);
    if(!user) return undefined;

    if(!validateUser(user, password)) return undefined;
    
    const session : Session = {
        username,
        cookie: randomBytes(20).toString("hex")
    }

    await req.redis.json.set(`sso:${session.cookie}`, ".", session as any);

    return session;
}

const hashPassword = (password : string, salt : string) => pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");

export async function createUser(req : Request, username : string, password : string, permissions : Permission[]) {
    const salt = randomBytes(16).toString("hex");
    const hash = hashPassword(password, salt);

    const user : User = {
        password: hash,
        permissions,
        username,
        salt
    };
    
    await req.redis.json.set(`user:${user.username}`, ".", user as any);
}

export function validateUser(user : User, password : string) {
    const hash = hashPassword(password, user.salt);
    return hash === user.password;
}