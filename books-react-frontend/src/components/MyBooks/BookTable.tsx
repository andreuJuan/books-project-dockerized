import { type SyntheticEvent } from 'react';

import Table from 'react-bootstrap/Table';

import BookTableActions from './BookTableActions';
import { type Book } from '../../utils/types';

interface BookTableProps {
  loadedBooks: Book[];
  handleModalShow: (event: SyntheticEvent) => void;
  handleBookDelete: (event: SyntheticEvent) => void;
}

/**
 * The table that displays all the loaded books and allows to do some actions on each of them
 */
function BookTable({ loadedBooks, handleModalShow, handleBookDelete }: BookTableProps) {
  return (
    <Table responsive striped borderless hover className='my-2'>
      <thead className='bg-lightblue-pastel'>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Summary</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {loadedBooks.map((book, index) => {
          return (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.summary}</td>
              <td>
                <BookTableActions
                  index={index}
                  handleModalShow={handleModalShow}
                  handleBookDelete={handleBookDelete}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default BookTable;
