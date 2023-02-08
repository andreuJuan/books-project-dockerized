import { Router } from 'express';
import UserController from '../controllers/UserController';
import { authUserJwt } from '../middlewares/authUserJwt';

const router = Router();

//Create a new user
router.post('/', UserController.createUser);

export default router;
