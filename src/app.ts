import dotenv from "dotenv";
dotenv.config({
    path: "../.env"
});
import {AppDataSource} from "./data-source";
import {server} from "./server";
AppDataSource.initialize().then(async () => {
    console.log(process.env);
    console.log("Database Initialized");
    server();
}).catch(error => console.log(error))