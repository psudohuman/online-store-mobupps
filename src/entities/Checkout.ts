import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, } from 'typeorm';

@Entity()
export class Checkout{

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    orderId: string

    @Column()
    cartId: string

    @CreateDateColumn()
    createdAt: Date
}