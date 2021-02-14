import { Router } from 'express';
import { getRepository } from 'typeorm';
import Lesson from '../models/Lesson';

const lessonRoute = Router();

lessonRoute.post('/', async (request, response) => {
    try {
        const { description, classe } = request.body;

        const lessonRepository = getRepository(Lesson);

        const lesson = lessonRepository.create({ description, classe });

        await lessonRepository.save(lesson);

        response.json(lesson);
    } catch (err) {
        response.status(400).json({ error: err.message });
    }
});

lessonRoute.get('/', async (request, response) => {
    try {
        const lessonRepository = getRepository(Lesson);

        const lesson = await lessonRepository.find();

        response.json(lesson);
    } catch (err) {
        response.status(400).json({ error: err.message });
    }
});

lessonRoute.put('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const { description, classe } = request.body;

        const lessonRepository = getRepository(Lesson);

        const lesson = await lessonRepository.findOne({ where: { id } });

        if (!lesson) {
            return response.status(400).json('Content not found');
        }

        lesson.description = description;
        lesson.classe = classe;

        await lessonRepository.save(lesson);

        return response.json(lesson);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

lessonRoute.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const lessonRepository = getRepository(Lesson);

        const lesson = await lessonRepository.findOne({ where: { id } });

        if (!lesson) {
            return response.status(400).json('Content not found');
        }

        await lessonRepository.delete(id);

        response.json(lesson);
    } catch (err) {
        response.status(400).json({ error: err.message });
    }
});

export default lessonRoute;