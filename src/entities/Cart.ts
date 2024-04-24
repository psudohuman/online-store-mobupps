import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, } from 'typeorm';

@Entity()
export class Cart{

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    status: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}