import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PostersResultsList from './PostersResultsList';

describe('<PostersResultsList />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<PostersResultsList />);
    const postersResultsList = getByTestId('PostersResultsList');

    expect(postersResultsList).toBeInTheDocument();
  });
});