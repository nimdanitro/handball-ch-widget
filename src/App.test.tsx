import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders by default', () => {

  render(<App />);
  const linkElement = screen.getByText(/Handball Resultate und Spiele/i);
  expect(linkElement).toBeInTheDocument();
});
