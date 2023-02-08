import axios from 'axios';

import authHeader from './authentication_header';

// We don't need the localhost because nginx takes care of redirecting the requests
const API_URL = '/api/v1/';

/**
 * The service that manages book related features
 */
class BookService {
  getBooks() {
    return axios.get(API_URL + 'book', { headers: authHeader() });
  }

  createBook(title: string, author: string, summary: string | null | undefined) {
    return axios.post(API_URL + 'book', { title, author, summary }, { headers: authHeader() });
  }

  updateBook(id: number, title: string, author: string, summary: string | null | undefined) {
    return axios.patch(API_URL + 'book', { id, title, author, summary }, { headers: authHeader() });
  }

  deleteBook(id: number) {
    return axios.delete(API_URL + 'book/' + id.toString(), { headers: authHeader() });
  }
}

export default new BookService();
