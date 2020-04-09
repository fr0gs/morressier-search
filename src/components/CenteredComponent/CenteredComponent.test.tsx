import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CenteredComponent from './CenteredComponent';

describe('<CenteredComponent />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<CenteredComponent />);
    const centeredComponent = getByTestId('CenteredComponent');

    expect(centeredComponent).toBeInTheDocument();
  });
});