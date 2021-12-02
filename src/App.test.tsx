import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders help by default', () => {
  render(<App />);
  const linkElement = screen.getByText(/Handball IframeTool/i);
  expect(linkElement).toBeInTheDocument();
});
