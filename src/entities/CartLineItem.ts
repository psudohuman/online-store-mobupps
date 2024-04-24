import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, } from 'typeorm';

@Entity()
export class CartLineItem{

    @PrimaryGeneratedColumn("uuid")
    id: string

    @CreateDateColumn()
    createdAt: Date
}