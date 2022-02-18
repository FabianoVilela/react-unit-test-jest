import { render, fireEvent, findByTestId } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App'

describe('App component', () => {
  it('should render list names', () => {
    const { getByText } = render(<App />)

    expect(getByText('Fabiano')).toBeInTheDocument()
  })

  it('should be able to add new name', () => {
    const { getByText, getByTestId } = render(<App />);
    const addButton = getByText('Add');

    const input = getByTestId('name');
    userEvent.type(input, 'Silva');

    fireEvent.click(addButton)


    expect(getByText('Silva')).toBeInTheDocument()
  })
})