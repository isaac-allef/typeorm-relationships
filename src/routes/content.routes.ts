import { Router } from 'express';
import { getRepository } from 'typeorm';
import Content from '../models/Content';

const contentRoute = Router();

contentRoute.post('/', async (request, response) => {
    try {
        const { description, linkContent, lesson } = request.body;

        const contentRepository = getRepository(Content);

        const content = contentRepository.create({ description, linkContent, lesson });

        await contentRepository.save(content);

        response.json(content);
    } catch (err) {
        response.status(400).json({ error: err.message });
    }
});

contentRoute.get('/', async (request, response) => {
    try {
        const contentRepository = getRepository(Content);

        const contents = await contentRepository.find();

        response.json(contents);
    } catch (err) {
        response.status(400).json({ error: err.message });
    }
});

contentRoute.put('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const { description, linkContent, lesson } = request.body;

        const contentRepository = getRepository(Content);

        const content = await contentRepository.findOne({ where: { id } });

        if (!content) {
            return response.status(400).json('Content not found');
        }

        content.description = description;
        content.linkContent = linkContent;
        content.lesson = lesson;

        await contentRepository.save(content);

        return response.json(content);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

contentRoute.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const contentRepository = getRepository(Content);

        const content = await contentRepository.findOne({ where: { id } });

        if (!content) {
            return response.status(400).json('Content not found');
        }

        await contentRepository.delete(id);

        response.json(content);
    } catch (err) {
        response.status(400).json({ error: err.message });
    }
});

export default contentRoute;