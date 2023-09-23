import { render, screen } from '@testing-library/react';
import ListingsPage from '.';

test('renders page title', () => {
  render(<ListingsPage />);
  const linkElement = screen.getByText(/all products/i);
  expect(linkElement).toBeInTheDocument();
});
