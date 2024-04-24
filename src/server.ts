import cors from "cors";
import express, { Express } from "express";
import * as api from "./routes";
import { AppDataSource } from "./data-source";
import {User} from "./entities/User";
import {Product} from "./entities/Product";
import {Order} from "./entities/Order";
import {OrderLineItem} from "./entities/OrderLineItem";
import {Cart} from "./entities/Cart";
import {CartLineItem} from "./entities/CartLineItem";

export const server = () => {
    const express0: Express = express();
    express0.use(cors())
    express0.use(express.urlencoded({ extended: false }));
    express0.use(express.json({ limit: "1MB" }));
    api.attachRoutes(express0);
    express0.listen(3001, ()=> {
        console.log(`Server running on port ${3001}`)
    })
}
