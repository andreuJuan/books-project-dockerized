import { fireEvent, render } from '@testing-library/react';

import BookTableActions, { type BookTableActionsProps } from './BookTableActions';

function renderBookTableActions(props: Partial<BookTableActionsProps> = {}) {
  const defaultProps: BookTableActionsProps = {
    index: 0,
    handleModalShow() {},
    handleBookDelete() {},
  };

  return render(<BookTableActions {...defaultProps} {...props} />);
}

describe('BookTableActions ', () => {
  test('should trigger handleModalShow on clicking the edit button', async () => {
    const handleModalShow = jest.fn();
    const { getByTestId } = renderBookTableActions({
      handleModalShow,
    });

    const editButton = getByTestId('edit-button');
    fireEvent.click(editButton);

    expect(handleModalShow).toHaveBeenCalled();
  });

  test('should trigger handleBookDelete on clicking the delete button', async () => {
    const handleBookDelete = jest.fn();
    const { getByTestId } = renderBookTableActions({
      handleBookDelete,
    });

    const deleteButton = getByTestId('delete-button');
    fireEvent.click(deleteButton);

    expect(handleBookDelete).toHaveBeenCalled();
  });
});
