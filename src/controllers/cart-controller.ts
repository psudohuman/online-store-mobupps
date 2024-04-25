import {AppDataSource} from "../data-source";
import {Cart} from "../entities/Cart";
import {CartStatus, IAuthenticatedRequest} from "../types";
import {Response} from "express";
import {randomUUID} from "crypto";
import {CartService} from "../services";

export class CartController {
    private cartRepository = AppDataSource.getRepository(Cart);
    private cartService = new CartService();

    public async get(request: IAuthenticatedRequest, response: Response){
        const cart = await this.cartRepository.findOneBy({
            userId: request.user.id,
            status: CartStatus.ACTIVE
        });

        if(cart){
            response.json(await this.cartService.inflateCartWithItems(cart));
            return;
        }

        const cart0 = {
            id: randomUUID(),
            userId: request.user.id,
            status: CartStatus.ACTIVE,
        }

        await this.cartRepository.insert(cart0);
        response.json({...cart0, lineItems: []});
    }

    public async addLineItemQuantity(request: IAuthenticatedRequest, response: Response){
        const {productId} = request.body;
        const cart = await this.cartRepository.findOneBy({
            userId: request.user.id,
            status: CartStatus.ACTIVE
        });
        if(!cart){
            response.status(404).json({
                message: "Cart not found"
            })
        }

        await this.cartService.increaseItemQuantity(cart, productId);
        response.json(await this.cartService.inflateCartWithItems(cart));
    }

    public async deleteLineItemQuantity(request: IAuthenticatedRequest, response: Response){
        const {productId} = request.body;
        const cart = await this.cartRepository.findOneBy({
            userId: request.user.id,
            status: CartStatus.ACTIVE
        });
        if(!cart){
            response.status(404).json({
                message: "Cart not found"
            })
        }

        await this.cartService.decreaseItemQuantity(cart, productId);
        response.json(await this.cartService.inflateCartWithItems(cart));
    }





}