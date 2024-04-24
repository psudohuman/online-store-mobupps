import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, } from 'typeorm';

@Entity()
export class Checkout{

    @PrimaryGeneratedColumn("uuid")
    id: string

    @CreateDateColumn()
    createdAt: Date
}