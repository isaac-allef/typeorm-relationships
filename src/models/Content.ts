import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Lesson from "./Lesson";

@Entity('content')
class Content {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    description: string;

    @Column()
    linkContent: string;

    @OneToOne(type => Lesson, content => Content, { eager: true })
    @JoinColumn()
    lesson: Lesson;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Content;