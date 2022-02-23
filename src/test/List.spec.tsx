import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import List from '../components/List'

describe('List component', () => {
  it('should render list items', async () => {
    const { getByText, queryByText, rerender, unmount } = render(<List initialItems={['Fabiano', 'Vilela']} />)

    expect(getByText('Fabiano')).toBeInTheDocument();

    unmount();
    rerender(<List initialItems={['Fabiano', 'Silva']}/>);

    expect(queryByText('Vilela')).not.toBeInTheDocument();
    expect(queryByText('Silva')).toBeInTheDocument();
  })

  it('should be able to add new item to the list', async () => {
    const { getByText, getByTestId } = render(<List initialItems={[]}/>);
    const addButton = getByText('Add');

    const input = getByTestId('item-id');
    userEvent.type(input, 'Silva');

    fireEvent.click(addButton);

    await waitFor(() => {
      expect(getByText('Silva')).toBeInTheDocument();
    })
  })

  it('should be able to remove item from the list', async () => {
    const { getAllByText, queryByText } = render(<List initialItems={['Fabiano', 'Vilela']}/>);

    const removeButtons = getAllByText('Remove');

    fireEvent.click(removeButtons[0]);

    await waitFor(() => {
      expect(queryByText('Fabiano')).not.toBeInTheDocument();
    })
  })
})