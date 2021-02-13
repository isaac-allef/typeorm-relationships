import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Content from "./Content";

@Entity('lesson')
class Lesson {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    description: string;

    @OneToOne(type => Content, lesson => Lesson)
    content: Content;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Lesson;