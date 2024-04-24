import { Request } from "express";

export interface IUser {
    firstName: string;
    lastName: string;
    id: string;
    email: string;
    username: string;
    pictureUrl: string | null;
}

export interface IAuthenticatedRequest extends Request {
    user: IUser;
}