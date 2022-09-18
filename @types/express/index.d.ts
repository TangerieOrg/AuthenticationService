declare namespace Express {
    export interface Request {
        redis : ReturnType<typeof import("redis").createClient>
    }
}