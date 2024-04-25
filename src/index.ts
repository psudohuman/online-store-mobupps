import dotenv from "dotenv";
import 'dotenv/config'
dotenv.config({ path: `${__dirname}/../.env` })

import {AppDataSource} from "./data-source";
import {server} from "./server";

const requiredEnvs = ["DB_USERNAME", "DB_NAME", "DB_PASSWORD", "JWT_SECRET_KEY", "DB_HOST"];

for(const envKey of requiredEnvs){
    if(!process.env[envKey]){
        throw new Error(`Missing environment variable ${envKey}`);
    }
}

AppDataSource.initialize().then(async () => {
    console.log("Database Initialized");
    server();
}).catch(error => console.log(error))