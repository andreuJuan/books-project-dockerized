import { Request, Response } from 'express';
import { validate } from 'class-validator';

import { Book } from '../entity/Book';
import { AppDataSource } from '../data-source';

/**
 * Controller that manages data retrieval and changes on the books
 */
class BookController {
  // List all existing books
  static listBooks = async (req: Request, res: Response) => {
    const bookRepository = AppDataSource.getRepository(Book);
    const books = await bookRepository.find({
      select: ['id', 'title', 'author', 'summary'], //We dont want to send the passwords on response
    });

    res.send(books);
  };

  // Create a book and return its ID
  static createBook = async (req: Request, res: Response) => {
    let { title, author, summary } = req.body;
    let book = new Book();
    book.title = title;
    book.author = author;
    book.summary = summary;

    // Validate if the parameters are ok
    const errors = await validate(book);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    const bookRepository = AppDataSource.getRepository(Book);
    let createdBook: Book;
    try {
      createdBook = await bookRepository.save(book);
    } catch (e) {
      res.status(409).send('Book title already exists');
      return;
    }

    res.status(200).send(createdBook.id.toString());
  };

  // Update an existing book
  static updateBook = async (req: Request, res: Response) => {
    let { id, title, author, summary } = req.body;
    if (!(title && author)) {
      res.status(400).send();
    }

    const bookRepository = AppDataSource.getRepository(Book);
    let book: Book;
    try {
      book = await bookRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      res.status(401).send();
    }
    if (title != book.title) {
      book.title = title;
    }
    book.author = author;
    book.summary = summary;

    try {
      await bookRepository.save(book);
    } catch (e) {
      res.status(500).send('Book title already exists');
      return;
    }
    res.status(200).send('Book updated');
  };

  // Delete a book
  static deleteBook = async (req: Request, res: Response) => {
    let id = req.params.id;
    const bookRepository = AppDataSource.getRepository(Book);
    let book: Book;
    try {
      await bookRepository.delete(id);
    } catch (error) {
      res.status(401).send();
    }

    res.status(200).send('Book deleted');
  };
}

export default BookController;
