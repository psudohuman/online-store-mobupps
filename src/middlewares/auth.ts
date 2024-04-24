import { Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { IAuthenticatedRequest } from "../types";
import {AppDataSource} from "../data-source";
import {User} from "../entities/User";

export const authMiddleware = async (request: IAuthenticatedRequest, response: Response, next: NextFunction) => {
    const authorizationHeader: string = String(request.headers["authorization"] || "");
    const token = authorizationHeader.startsWith("Bearer ")
        ? authorizationHeader.substring(7, authorizationHeader.length)
        : null;
    if (!token) {
        response.status(401).json({
            status: "Unauthorized",
        });
        return;
    }

    try {
        const payload: any = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({
            id: payload.id
        })

        if (!user) {
            response.status(401).json({
                status: "Unauthorized",
            });
            return;
        }

        request.user = user;
    } catch (error) {
        console.log(error);
        response.status(401).json({
            status: "Unauthorized",
        });
        return;
    }

    return next();
};