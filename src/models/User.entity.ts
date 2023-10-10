import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { News } from "./News.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn("increment")
    id!: number;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @OneToMany(() => News, (news) => news.user)
    news!: News[];
}
