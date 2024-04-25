import { Request } from "express";

export interface IUser {
    firstName: string;
    lastName: string;
    id: string;
    email: string;
    password: string;
}

export interface IAuthenticatedRequest extends Request {
    user: IUser;
}