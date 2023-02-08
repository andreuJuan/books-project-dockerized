import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import BookModal, { type BookModalProps } from './BookModal';

function renderBookModal(props: Partial<BookModalProps> = {}) {
  const defaultProps: BookModalProps = {
    showModal: true,
    isCreatingNewBook: false,
    modalErrorMessage: '',
    handleBookChange() {},
    handleModalClose() {},
    handleBookSave() {},
    modalData: {},
  };

  return render(<BookModal {...defaultProps} {...props} />);
}

describe('BookModal ', () => {
  test('should display a blank form with title, author and summary fields', () => {
    const { getByTestId, queryByTestId } = renderBookModal({ isCreatingNewBook: true });

    const modalTitle = getByTestId('modal-title');
    const titleInput = getByTestId('title-input');
    const authorInput = getByTestId('author-input');
    const summaryInput = getByTestId('summary-input');
    const errorMessage = queryByTestId('error-message');

    expect(modalTitle).toHaveTextContent('Add a new book');
    expect(titleInput).toBeInTheDocument();
    expect(authorInput).toBeInTheDocument();
    expect(summaryInput).toBeInTheDocument();
    expect(errorMessage).not.toBeInTheDocument();
  });

  test('should prefill received values when not creating a new book', () => {
    const { getByTestId } = renderBookModal({
      modalData: { title: 'Title1', author: 'Author1', summary: 'Summary1' },
      modalErrorMessage: 'something happened',
    });

    const modalTitle = getByTestId('modal-title');
    const titleInput = getByTestId('title-input');
    const authorInput = getByTestId('author-input');
    const summaryInput = getByTestId('summary-input');
    const errorMessage = getByTestId('error-message');

    expect(modalTitle).toHaveTextContent('Edit book');
    expect(titleInput).toHaveAttribute('value', 'Title1');
    expect(authorInput).toHaveAttribute('value', 'Author1');
    expect(summaryInput).toHaveAttribute('value', 'Summary1');
    expect(errorMessage).toHaveTextContent('something happened');
  });

  test('should trigger handleBookChange on changing a username', async () => {
    const handleBookChange = jest.fn();
    const { getByTestId } = renderBookModal({
      handleBookChange,
    });

    const titleInput = getByTestId('title-input');
    fireEvent.change(titleInput, { target: { value: 'Title' } });

    expect(handleBookChange).toHaveBeenCalled();
  });

  test('should trigger handleBookChange on changing the password', async () => {
    const handleBookChange = jest.fn();
    const { getByTestId } = renderBookModal({
      handleBookChange,
    });

    const authorInput = getByTestId('author-input');
    fireEvent.change(authorInput, { target: { value: 'Author' } });

    expect(handleBookChange).toHaveBeenCalled();
  });

  test('should trigger handleBookChange on changing the second password', async () => {
    const handleBookChange = jest.fn();
    const { getByTestId } = renderBookModal({
      handleBookChange,
    });

    const summaryInput = getByTestId('summary-input');
    fireEvent.change(summaryInput, { target: { value: 'Summary' } });

    expect(handleBookChange).toHaveBeenCalled();
  });

  test('should call handleModalClose when close button is clicked', async () => {
    const handleModalClose = jest.fn();
    const { getByTestId } = renderBookModal({
      handleModalClose,
    });

    const closeButton = getByTestId('close-button');
    fireEvent.click(closeButton);

    expect(handleModalClose).toHaveBeenCalled();
  });

  test('should call handleBookSave when submit button is clicked', async () => {
    const handleBookSave = jest.fn();
    const { getByTestId } = renderBookModal({
      handleBookSave,
    });

    const saveButton = getByTestId('submit-button');
    fireEvent.click(saveButton);

    expect(handleBookSave).toHaveBeenCalled();
  });
});
