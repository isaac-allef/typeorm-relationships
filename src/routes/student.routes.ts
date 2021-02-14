import { Router } from 'express';
import { getRepository } from 'typeorm';
import Student from '../models/Student';

const studentRoute = Router();

studentRoute.post('/', async (request, response) => {
    try {
        const { name, key, classes } = request.body;

        const studentRepository = getRepository(Student);

        const student = studentRepository.create({ name, key, classes });

        await studentRepository.save(student);

        response.json(student);
    } catch (err) {
        response.status(400).json({ error: err.message });
    }
});

studentRoute.get('/', async (request, response) => {
    try {
        const studentRepository = getRepository(Student);

        const student = await studentRepository.find();

        response.json(student);
    } catch (err) {
        response.status(400).json({ error: err.message });
    }
});

studentRoute.put('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const { name, key, classes } = request.body;

        const studentRepository = getRepository(Student);

        const student = await studentRepository.findOne({ where: { id } });

        if (!student) {
            return response.status(400).json('Student not found');
        }

        student.name = name;
        student.key = key;
        student.classes = classes;

        await studentRepository.save(student);

        return response.json(student);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

studentRoute.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const studentRepository = getRepository(Student);

        const student = await studentRepository.findOne({ where: { id } });

        if (!student) {
            return response.status(400).json('Student not found');
        }

        await studentRepository.delete(id);

        response.json(student);
    } catch (err) {
        response.status(400).json({ error: err.message });
    }
});

export default studentRoute;