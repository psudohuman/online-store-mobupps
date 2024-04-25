import {AppDataSource} from "../data-source";
import {Order} from "../entities/Order";
import {Response} from "express";
import {CartStatus, IAuthenticatedRequest} from "../types";
import {Product} from "../entities/Product";
import {CartLineItem} from "../entities/CartLineItem";
import {Cart} from "../entities/Cart";
import {Checkout} from "../entities/Checkout";
import {OrderLineItem} from "../entities/OrderLineItem";
import {OrderService} from "../services";
import {randomUUID} from "crypto";


export class CheckoutController {

    private cartRepository = AppDataSource.getRepository(Cart);
    private cartLineItemsRepository= AppDataSource.getRepository(CartLineItem);
    private checkoutRepository = AppDataSource.getRepository(Checkout);
    private orderService = new OrderService();

    public async placeOrder(request: IAuthenticatedRequest, response:Response){
        const cart = await this.cartRepository.findOneBy({
            userId: request.user.id,
            status: CartStatus.ACTIVE,
        })

        if(!cart){
            response.status(400).json({
                message: "Bad request, cart does not exists"
            });
            return;
        }

        const cartItems = await this.cartLineItemsRepository.findBy({
            cartId: cart.id
        });

        if(cartItems.length < 1){
            response.status(400).json({
                message: "Cart is empty"
            });
            return;
        }

        const orderId = await this.orderService.createOrder(cartItems, request.user.id);
        cart.status = CartStatus.ORDER_CONVERTED;
        await this.cartRepository.save(cart);

        const checkoutId = randomUUID();

        await this.checkoutRepository.insert({
            id: checkoutId,
            orderId,
            cartId: cart.id,
        })

        response.json({
            id: checkoutId,
            orderId,
            cartId: cart.id
        })
    }
}