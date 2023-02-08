import { Router } from 'express';
import BookController from '../controllers/BookController';
import { authUserJwt } from '../middlewares/authUserJwt';

const router = Router();

// authUserJwt is used as middleware to verify the requests contain a valid JWToken

// Get books
router.get('/', [authUserJwt], BookController.listBooks);
// Create book
router.post('/', [authUserJwt], BookController.createBook);
// Update book
router.patch('/', [authUserJwt], BookController.updateBook);
// Delete book
router.delete('/:id', [authUserJwt], BookController.deleteBook);

export default router;
