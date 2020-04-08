import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SearchBar from './SearchBar';

describe('<SearchBar />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<SearchBar />);
    const searchBar = getByTestId('SearchBar');

    expect(searchBar).toBeInTheDocument();
  });
});