import {AppDataSource} from "../data-source";
import {Order} from "../entities/Order";
import {Response} from "express";
import {IAuthenticatedRequest, OrderStatus} from "../types";
import {OrderService} from "../services";


export class OrderController {

    private orderRepository = AppDataSource.getRepository(Order);
    private orderService = new OrderService();

    public async list(request: IAuthenticatedRequest, response:Response){
        response.json(await this.orderRepository.findBy({
            userId: request.user.id
        }))
    }

    public async get(request: IAuthenticatedRequest, response:Response){
        const orderId = request.params.id;

        const order = await this.orderRepository.findOneBy({
            id: orderId,
            userId: request.user.id
        })

        if(!order){
            response.status(404).json({
                message: "Order not found"
            });
            return;
        }

        response.json(await this.orderService.inflateOrderWithItems(order));
    }

    public async cancel(request: IAuthenticatedRequest, response:Response){
        const orderId = request.params.id;
        const order = await this.orderRepository.findOneBy({
            id: orderId,
            userId: request.user.id
        })

        if(!order){
            response.status(404).json({
                message: "Order not found"
            });
            return;
        }

        if(order.status === OrderStatus.CANCELLED){
            response.status(409).json({
                message: "Order is already cancelled"
            });
            return;
        }

        order.status = OrderStatus.CANCELLED;
        await this.orderRepository.save(order)
        response.json(await this.orderService.inflateOrderWithItems(order));
    }
}