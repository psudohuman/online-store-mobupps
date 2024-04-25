import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, } from 'typeorm';

@Entity()
export class CartLineItem{

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    cartId: string

    @Column()
    quantity: number

    @Column()
    productId: string

    @CreateDateColumn()
    createdAt: Date
}