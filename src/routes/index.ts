import {CartController, CheckoutController, OrderController, ProductController, UserController} from "../controllers";
import {Router} from "express";

export const attachRoutes = (router: Router): void => {
    const userController = new UserController();
    const cartController = new CartController();
    const orderController = new OrderController();
    const productController = new ProductController();
    const checkoutController = new CheckoutController();

    router.get("/users/register", (request, response) => userController.register(request, response));

}