import {CartController, CheckoutController, OrderController, ProductController, UserController} from "../controllers";
import {Router} from "express";
import {authMiddleware} from "../middlewares/auth";

export const attachRoutes = (router: Router): void => {
    const userController = new UserController();
    const cartController = new CartController();
    const orderController = new OrderController();
    const productController = new ProductController();
    const checkoutController = new CheckoutController();

    router.post("/users/register", (request, response) => userController.register(request, response));
    router.post("/users/login", (request, response) => userController.login(request, response));

    router.get("/orders/:id", authMiddleware, (request, response) => orderController.get(request, response));
    router.get("/orders", authMiddleware,(request, response) => orderController.list(request, response));
    router.patch("/orders/:id", authMiddleware,(request, response) => orderController.cancel(request, response));

    router.get("/products", authMiddleware,(request, response) => productController.list(request, response));
    router.get("/products/:id",authMiddleware, (request, response) => productController.get(request, response));
    router.delete("/products/:id", authMiddleware,(request, response) => productController.delete(request, response));
    router.post("/products", authMiddleware,(request, response) => productController.create(request, response));
    router.patch("/products/:id",authMiddleware, (request, response) => productController.modify(request, response));

    router.get("/cart", authMiddleware, (request, response) => cartController.get(request, response));
    router.post("/cart/items", authMiddleware,(request, response) => cartController.addLineItemQuantity(request, response));
    router.delete("/cart/items",authMiddleware, (request, response) => cartController.deleteLineItemQuantity(request, response));

    router.post("/checkout", authMiddleware, (request, response) => checkoutController.placeOrder(request, response));
}