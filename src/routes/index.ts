import { Router } from 'express';
import classRoute from './class.routes';
import lessonRoute from './lesson.routes';
import contentRoute from './content.routes';
import studentRoute from './student.routes';

const routes = Router();

routes.use('/class', classRoute);
routes.use('/lesson', lessonRoute);
routes.use('/content', contentRoute);
routes.use('/student', studentRoute);

export default routes;