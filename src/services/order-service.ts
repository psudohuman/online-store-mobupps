import {AppDataSource} from "../data-source";
import {Order} from "../entities/Order";
import {OrderLineItem} from "../entities/OrderLineItem";
import {CartLineItem} from "../entities/CartLineItem";
import {Product} from "../entities/Product";
import {In} from "typeorm";
import lodash from "lodash";
import {randomUUID} from "crypto";
import {OrderStatus} from "../types";

export class OrderService {
    private orderLineItemRepository= AppDataSource.getRepository(OrderLineItem);
    private orderRepository = AppDataSource.getRepository(Order);
    private productRepository = AppDataSource.getRepository(Product);

    public async inflateOrderWithItems(order: Order){
        const lineItems = await this.orderLineItemRepository.findBy({
            orderId: order.id
        });
        return {...order, lineItems}
    }

    public async createOrder(cartLineItems: CartLineItem[], userId: string): Promise<string>{
        const productIds = cartLineItems.map((item) => item.productId);
        const products = await this.productRepository.find({ where: { id: In(productIds)}});
        const productByProductId = lodash.keyBy(products, 'id');

        const orderLineItems: Partial<OrderLineItem>[] = [];

        const orderId = randomUUID();

        let paymentAmount = 0;

        for(const cartItem of cartLineItems){
            orderLineItems.push({
                id: randomUUID(),
                productId: cartItem.productId,
                quantity: cartItem.quantity,
                unitPrice: productByProductId[cartItem.productId].price,
                orderId
            })
            paymentAmount += (cartItem.quantity * productByProductId[cartItem.productId].price)
        }

        await this.orderLineItemRepository.insert(orderLineItems);
        await this.orderRepository.insert({
            id: orderId,
            amount: paymentAmount,
            status: OrderStatus.PLACED,
            userId:userId
        })
        return orderId;
    }

}