import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entities/User";
import { Product } from "./entities/Product";
import { Order } from "./entities/Order";
import { OrderLineItem } from "./entities/OrderLineItem";
import { Cart } from "./entities/Cart";
import { CartLineItem } from "./entities/CartLineItem";
import { Checkout } from "./entities/Checkout";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: 'rajdev',
    password: 'rajdev',
    database: 'ONLINE_STORE',
    synchronize: true,
    logging: false,
    entities: [User, Product, Order, OrderLineItem, Cart, CartLineItem, Checkout],
    migrations: [],
    debug: false,
    subscribers: [],
})