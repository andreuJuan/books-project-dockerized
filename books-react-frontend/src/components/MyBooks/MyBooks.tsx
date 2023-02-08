import './MyBooks.css';

import { type SyntheticEvent, useState, useEffect } from 'react';

import { type AxiosError } from 'axios';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

import BookModal from './BookModal';
import BookTable from './BookTable';
import AuthService from '../../services/authentication_service';
import BookService from '../../services/book_service';
import { type ModalData, type Book } from '../../utils/types';

/**
 * The page that displays the books and manages or the logic around them
 */
function MyBooks() {
  const navigate = useNavigate();
  //
  // ---- Callback on rendering the page ----
  //

  // On rendering the page, check the user is authenticated and load books from the backend
  useEffect(() => {
    if (!AuthService.getCurrentUserJWT()) {
      navigate('/');
      return;
    }

    BookService.getBooks()
      .then((response) => {
        const books = response.data;
        setLoadedBooks(books);
      })
      .catch((error: AxiosError | Error) => {
        console.error('Error getting books');
        console.error(error);
      });
  }, []);

  //
  // ---- Logic related to the user session
  //

  const handleLogout = () => {
    AuthService.logout();
    window.location.reload();
  };

  //
  // ---- Logic related to the books ----
  //

  const [loadedBooks, setLoadedBooks] = useState<Book[]>([]);

  const handleBookChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const field = event.target.name;
    const value = event.target.value;
    if (field && value) {
      setModalData({ ...modalData, [field]: value });
    }
  };

  function bookAlreadyExists(title: string) {
    return loadedBooks.some((book) => book.title === title);
  }

  const handleBookSave = () => {
    if (modalData.title && modalData.author) {
      if (isCreatingNewBook) {
        if (bookAlreadyExists(modalData.title)) {
          setModalErrorMessage('This book already exists');
          return;
        }
        BookService.createBook(modalData.title, modalData.author, modalData.summary)
          .then((response) => {
            const createdBookId = response.data;
            // Checked again to avoid nullability issues
            if (modalData.title && modalData.author) {
              setLoadedBooks([
                ...loadedBooks,
                {
                  id: createdBookId,
                  title: modalData.title,
                  author: modalData.author,
                  summary: modalData.summary,
                },
              ]);
            }
            closeModal();
          })
          .catch((error: AxiosError | Error) => {
            setModalErrorMessage(
              'Something went wrong adding the new book. Please try again later',
            );

            console.error('Error creating book');
            console.error(error);
          });

        return;
      }
      if (modalDataIndex) {
        BookService.updateBook(
          loadedBooks[modalDataIndex - 1].id,
          modalData.title,
          modalData.author,
          modalData.summary,
        )
          .then((_) => {
            // Checked again to avoid nullability issues
            if (modalData.title && modalData.author) {
              const updatedBooks = [...loadedBooks];
              updatedBooks[modalDataIndex - 1] = {
                id: loadedBooks[modalDataIndex - 1].id,
                title: modalData.title,
                author: modalData.author,
                summary: modalData.summary,
              };
              setLoadedBooks(updatedBooks);
            }
            closeModal();
          })
          .catch((error: AxiosError | Error) => {
            setModalErrorMessage('Something went wrong updating the book. Please try again later');
            console.error('Error updating book');
            console.error(error);
          });
      }
      return;
    }
    setModalErrorMessage('Please, fill the title and the author fields');
  };

  const handleBookDelete = (event: SyntheticEvent) => {
    const index = Number(event?.currentTarget?.getAttribute('data-index'));
    BookService.deleteBook(loadedBooks[index].id)
      .then(() => {
        setLoadedBooks(loadedBooks.filter((_, i) => i !== index));
      })
      .catch((error: AxiosError | Error) => {
        console.error('Error deleting book');
        console.error(error);
      });
  };

  //
  // ---- Logic related to the modal ----
  //

  const [showModal, setShowModal] = useState(false);
  const [isCreatingNewBook, setIsCreatingNewBook] = useState(false);
  const [modalData, setModalData] = useState<ModalData>({ title: '', author: '', summary: '' });
  const [modalDataIndex, setModalDataIndex] = useState<number | null>();
  const [modalErrorMessage, setModalErrorMessage] = useState('');

  function closeModal() {
    setShowModal(false);
    setModalErrorMessage('');
  }

  const handleModalClose = closeModal;

  const handleModalShow = (event: SyntheticEvent) => {
    const index = Number(event?.currentTarget?.getAttribute('data-index'));
    if (index) {
      setModalData(loadedBooks[index - 1]);
      setIsCreatingNewBook(false);
      setModalDataIndex(index);
      setShowModal(true);
      return;
    }
    setModalData({ title: '', author: '', summary: '' });
    setIsCreatingNewBook(true);
    setModalDataIndex(null);
    setShowModal(true);
  };

  //
  // ---- MyBooks Component ----
  //
  return (
    <>
      <Navbar className='bg-darkblue-pastel'>
        <Navbar.Brand className='ms-4'>
          <img
            alt=''
            src={process.env.REACT_APP_LOGO_PATH}
            width='30'
            height='30'
            className='d-inline-block align-top'
          />{' '}
          My Books
        </Navbar.Brand>
        <Button className='ms-auto me-4 border-0 bg-violet-pastel' onClick={handleLogout}>
          Logout
        </Button>
      </Navbar>
      <div className='mx-4 my-2'>
        <Button className=' my-2 border-0 bg-violet-pastel' onClick={handleModalShow}>
          Add new book
        </Button>
        <BookTable
          loadedBooks={loadedBooks}
          handleModalShow={handleModalShow}
          handleBookDelete={handleBookDelete}
        />
      </div>
      <BookModal
        showModal={showModal}
        isCreatingNewBook={isCreatingNewBook}
        modalErrorMessage={modalErrorMessage}
        handleModalClose={handleModalClose}
        handleBookChange={handleBookChange}
        handleBookSave={handleBookSave}
        modalData={modalData}
      />
    </>
  );
}

export default MyBooks;
