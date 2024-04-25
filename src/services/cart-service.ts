import {Cart} from "../entities/Cart";
import {AppDataSource} from "../data-source";
import {CartLineItem} from "../entities/CartLineItem";

export class CartService {

    private cartLineItemsRepository= AppDataSource.getRepository(CartLineItem);

    public async inflateCartWithItems(cart: Cart){
        const lineItems = await this.cartLineItemsRepository.findBy({
            cartId: cart.id
        });
        return {...cart, lineItems}
    }

    public async increaseItemQuantity(cart: Cart, productId: string){
        const item = await this.cartLineItemsRepository.findOneBy({
            productId,
            cartId: cart.id
        })
        if(!item){
            await this.cartLineItemsRepository.insert({
                productId,
                cartId: cart.id,
                quantity: 1
            })
        } else {
            item.quantity++;
            await this.cartLineItemsRepository.save(item);
        }
    }

    public async decreaseItemQuantity(cart: Cart, productId: string){
        const item = await this.cartLineItemsRepository.findOneBy({
            productId,
            cartId: cart.id
        })
        if(item){
            item.quantity--;
            if(item.quantity <= 0){
                await this.cartLineItemsRepository.remove(item)
            } else {
                await this.cartLineItemsRepository.save(item);
            }
        }
    }
}