import { render, fireEvent, waitFor, screen,  } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import List from '../components/List'

describe('List component', () => {
  it('should render list items', async () => {
    const { rerender, unmount } = render(<List initialItems={['Fabiano', 'Vilela']} />)

    expect(screen.getByText('Fabiano')).toBeInTheDocument();

    unmount();
    rerender(<List initialItems={['Fabiano', 'Silva']}/>);

    expect(screen.queryByText('Vilela')).not.toBeInTheDocument();
    expect(screen.queryByText('Silva')).toBeInTheDocument();
  })

  it('should be able to add new item to the list', async () => {
    render(<List initialItems={[]} />);
    const addButton = screen.getByText('Add');

    const input = screen.getByTestId('item-id');
    userEvent.type(input, 'Silva');

    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('Silva')).toBeInTheDocument();
    })
  })

  it('should be able to remove item from the list', async () => {
    render(<List initialItems={['Fabiano', 'Vilela']} />);

    const removeButtons = screen.getAllByText('Remove');

    fireEvent.click(removeButtons[0]);

    await waitFor(() => {
      expect(screen.queryByText('Fabiano')).not.toBeInTheDocument();
    })
  })

  it('should be able to clear the list', async () => {
    render(<List initialItems={['Fabiano', 'Vilela']} />);

    const clearButton = screen.getByText('Clear');

    fireEvent.click(clearButton);

    await waitFor(() => {
      expect(screen.queryByText('Fabiano')).not.toBeInTheDocument();
      expect(screen.queryByText('Vilela')).not.toBeInTheDocument();
    })
  })
})