import 'react-native';
import React from 'react';
import App from '../App';

// Note: import explicitly to use the types shiped with jest.
import { expect, it } from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react-native';
import { Title } from '@components/Title';

it('renders correctly', () => {
  const app = render(<App />);
  expect(app).toBeTruthy();
});
