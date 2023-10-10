import "reflect-metadata";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";

@Entity()
export class News {
    @PrimaryGeneratedColumn("increment")
    id!: number;

    @Column()
    title!: string;

    @Column()
    text!: string;

    @ManyToOne(() => User, (user) => user.news)
    user!: User;

    @Column()
    userId!: number;
}
