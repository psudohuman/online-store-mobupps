import {Response, Request} from "express";
import {Repository} from "typeorm";
import {User} from "../entities/User";
import {AppDataSource} from "../data-source";
import {randomUUID} from "crypto";
import crypto from "crypto";
import * as jwt from "jsonwebtoken"
import {hasSubscribers} from "diagnostics_channel";

export class UserController {

    private userRepository = AppDataSource.getRepository(User);

    public async register(request: Request, response: Response){

        const user = await this.userRepository.findOneBy({email:request.body.email})

        if (user){
            response.status(409).json({
                error: "The entered email is already registered in the system!!"
            })
            return;
        }

        const id = randomUUID();
        const hashedPassword = crypto.createHash('md5').update(request.body.password).digest('hex');

        await this.userRepository.insert({
            id,
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            password: hashedPassword,
        })

        const token = jwt.sign({id}, process.env.JWT_SECRET_KEY)
        response.json({
            token,
            user: {
                id,
                firstName: request.body.firstName,
                lastName: request.body.lastName,
                email: request.body.email,
            }
        })
    }

    public async login(request: Request, response: Response){

        const hashedPassword = crypto.createHash('md5').update(request.body.password).digest('hex');
        const user = await this.userRepository.findOneBy({email: request.body.email})

        if(!user){
            response.status(404).json({
                error: "The email entered is not registered in the system!!!!"
            })
            return;
        }

        if( user.password !== hashedPassword){
            response.status(400).json({
                error: "Credentials don't match!"
            })
            return;
        }

        const token = jwt.sign({id:user.id}, process.env.JWT_SECRET_KEY)

        response.json({
            token,
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            }
        })


    }
}