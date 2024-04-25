import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, } from 'typeorm';

@Entity()
export class Order{

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    userId: string

    @Column()
    amount: number

    @Column()
    status: number
    
    @CreateDateColumn()
    createdAt: Date
}