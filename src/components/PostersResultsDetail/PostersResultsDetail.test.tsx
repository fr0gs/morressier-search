import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PostersResultsDetail from './PostersResultsDetail';

describe('<PostersResultsDetail />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<PostersResultsDetail />);
    const postersResultsDetail = getByTestId('PostersResultsDetail');

    expect(postersResultsDetail).toBeInTheDocument();
  });
});