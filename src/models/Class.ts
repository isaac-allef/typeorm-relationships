import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Lesson from "./Lesson";
import Student from "./Student";

@Entity('class')
class Class {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    duration: number;

    @OneToMany(type => Lesson, classe => Class)
    lessons: Lesson[];

    @ManyToMany(type => Student, classes => Class)
    students: Student[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Class;