import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PostersResultsPage from './PostersResultsPage';

describe('<PostersResultsPage />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<PostersResultsPage />);
    const postersResultsPage = getByTestId('PostersResultsPage');

    expect(postersResultsPage).toBeInTheDocument();
  });
});