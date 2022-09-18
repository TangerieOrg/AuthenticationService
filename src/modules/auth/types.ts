export enum Permission {
    User = "USER",
    Developer = "DEV",
    Admin = "ADMIN"
}

export interface User {
    username : string;
    password : string;
    salt : string;
    permissions : Permission[];
}

export interface PublicUser {
    username : string;
    permissions : Permission[];
}

export interface Session {
    username : string;
    cookie : string;
}