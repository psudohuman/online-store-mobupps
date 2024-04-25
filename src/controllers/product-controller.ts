import {IAuthenticatedRequest} from "../types";
import {Response} from "express";
import {AppDataSource} from "../data-source";
import {Product} from "../entities/Product";
import {randomUUID} from "crypto";


export class ProductController {

    private productRepository = AppDataSource.getRepository(Product);


    public async list(request: IAuthenticatedRequest, response: Response){
        response.json(await this.productRepository.findBy({
            userId: request.user.id
        }));
    }

    public async get(request: IAuthenticatedRequest, response: Response){
        const productId = request.params.id;
        const product = await this.productRepository.findOneBy({
            id: productId
        });
        if(!product){
            response.status(404).json({
                message: "Not found"
            })
            return;
        }
        response.json(product);
    }

    public async create(request: IAuthenticatedRequest, response: Response){
        const {name, description, price, sku} = request.body;
        const productId = randomUUID();

        if(!name || !sku || !price){
            response.json({
                message: "Missing product details"
            });
            return;
        }

        await this.productRepository.insert({
            userId: request.user.id,
            id: productId,
            name,
            description,
            price,
            sku
        })
        response.json({
            userId: request.user.id,
            id: productId,
            name,
            description,
            price,
            sku
        })
    }

    public async modify(request: IAuthenticatedRequest, response: Response){
        const {name, description, price, sku} = request.body;
        const productId = request.params.id;

        const product = await this.productRepository.findOneBy({
            id: productId,
            userId: request.user.id
        })

        if(!product){
            response.status(404).json({
                message: "Not found"
            })
            return;
        }

        if(name){
            product.name = name;
        }

        if(description){
            product.description = description;
        }

        if(price){
            product.price = price;
        }

        if(sku){
            product.sku = sku
        }

        await this.productRepository.update(productId, product);

        response.json(product)
    }

    public async delete(request: IAuthenticatedRequest, response: Response){
        const productId = request.params.id;
        const product = await this.productRepository.findOneBy({
            id: productId,
            userId: request.user.id
        });
        if(!product){
            response.status(404).json({
                message: "Not found"
            })
            return;
        }
        await this.productRepository.remove(product);
        response.json({
            message: "Product deleted"
        })
    }

}