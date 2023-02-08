import { Router, Request, Response } from 'express';
import auth from './auth_routes';
import user from './user_routes';
import book from './book_routes';

const routes = Router();

// Nginx adds automatically the /api prefix before our prefix
const prefix = '/v1';

routes.use(prefix + '/auth', auth);
routes.use(prefix + '/user', user);
routes.use(prefix + '/book', book);

export default routes;
