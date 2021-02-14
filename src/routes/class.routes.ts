import { Router } from 'express';
import { getRepository } from 'typeorm';
import Class from '../models/Class';

const classRoute = Router();

classRoute.post('/', async (request, response) => {
    try {
        const { name, duration } = request.body;

        const classRepository = getRepository(Class);

        const newClass = classRepository.create({ name, duration });

        await classRepository.save(newClass);

        response.json(newClass);
    } catch (err) {
        response.status(400).json({ error: err.message });
    }
});

classRoute.get('/', async (request, response) => {
    try {
        const classRepository = getRepository(Class);

        const classes = await classRepository.find();

        response.json(classes);
    } catch (err) {
        response.status(400).json({ error: err.message });
    }
});

classRoute.put('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const { name, duration } = request.body;

        const classRepository = getRepository(Class);

        const oneClass = await classRepository.findOne({ where: { id } });

        if (!oneClass) {
            return response.status(400).json('Class not found');
        }

        oneClass.name = name;
        oneClass.duration = duration;

        await classRepository.save(oneClass);

        return response.json(oneClass);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

classRoute.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const classRepository = getRepository(Class);

        const oneClass = await classRepository.findOne({ where: { id } });

        if (!oneClass) {
            return response.status(400).json('Class not found');
        }

        await classRepository.delete(id);

        response.json(oneClass);
    } catch (err) {
        response.status(400).json({ error: err.message });
    }
});

export default classRoute;