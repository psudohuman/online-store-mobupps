import cors from "cors";
import express, { Express } from "express";
import * as api from "./routes";

export const server = () => {
    const express0: Express = express();
    express0.use(cors())
    express0.use(express.urlencoded({ extended: false }));
    express0.use(express.json({ limit: "1MB" }));
    api.attachRoutes(express0);
    express0.listen(3000, ()=> {
        console.log(`Server running on port ${3000}`)
    })
}
