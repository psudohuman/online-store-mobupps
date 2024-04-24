import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, } from 'typeorm';

@Entity()
export class OrderLineItem{

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    quantity: number

    @Column()
    unitPrice: number

    @CreateDateColumn()
    createdAt: Date
}