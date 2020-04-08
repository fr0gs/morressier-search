import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import WelcomePage from './WelcomePage';

describe('<WelcomePage />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<WelcomePage />);
    const welcomePage = getByTestId('WelcomePage');

    expect(welcomePage).toBeInTheDocument();
  });
});