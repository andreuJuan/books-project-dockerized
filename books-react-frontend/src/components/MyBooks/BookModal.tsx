import { type SyntheticEvent } from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { type ModalData } from '../../utils/types';

export interface BookModalProps {
  showModal: boolean;
  isCreatingNewBook: boolean;
  modalErrorMessage: string;
  handleBookChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleModalClose: () => void;
  handleBookSave: (event: SyntheticEvent) => void;
  modalData: ModalData;
}

/**
 * The modal that allows to create or edit books
 */
function BookModal({
  showModal,
  isCreatingNewBook,
  modalErrorMessage,
  handleModalClose,
  handleBookChange,
  handleBookSave,
  modalData,
}: BookModalProps) {
  return (
    <Modal show={showModal} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title data-testid='modal-title'>
          {isCreatingNewBook ? 'Add a new book' : 'Edit book'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type='text'
            value={modalData.title?.toString()}
            name='title'
            data-testid='title-input'
            onChange={handleBookChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Author</Form.Label>
          <Form.Control
            type='text'
            value={modalData?.author?.toString()}
            name='author'
            data-testid='author-input'
            onChange={handleBookChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Summary</Form.Label>
          <Form.Control
            type='text'
            value={modalData?.summary?.toString()}
            name='summary'
            data-testid='summary-input'
            onChange={handleBookChange}
          />
        </Form.Group>
        {modalErrorMessage && (
          <Alert key='danger' variant='danger' className='mt-3' data-testid='error-message'>
            {modalErrorMessage}
          </Alert>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' data-testid='close-button' onClick={handleModalClose}>
          Close
        </Button>
        <Button variant='primary' data-testid='submit-button' onClick={handleBookSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BookModal;
