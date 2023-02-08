import { type SyntheticEvent } from 'react';

import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';

export interface BookTableActionsProps {
  index: number;
  handleModalShow: (event: SyntheticEvent) => void;
  handleBookDelete: (event: SyntheticEvent) => void;
}

/**
 * The actions that can be triggered for each book in the BookTable
 */
function BookTableActions({ index, handleModalShow, handleBookDelete }: BookTableActionsProps) {
  return (
    <>
      <Button
        variant='outline-secondary'
        className='mx-1'
        data-index={index + 1}
        data-testid='edit-button'
        onClick={handleModalShow}
      >
        <FontAwesomeIcon icon={faPencil} />
      </Button>
      <Button
        variant='outline-secondary'
        className='mx-1'
        data-index={index}
        data-testid='delete-button'
        onClick={handleBookDelete}
      >
        <FontAwesomeIcon icon={faTrash} />
      </Button>
    </>
  );
}

export default BookTableActions;
