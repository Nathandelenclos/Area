import React from 'react';
import { it, describe, expect, jest } from '@jest/globals';
import { render } from '@testing-library/react-native';
import LoadingScreen from '@components/loading.screen';

jest.mock('@contexts/app.context', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    color: {
      title: '#000',
    },
  })),
}));

describe('LoadingScreen component', () => {
  it('renders correctly without parameters', () => {
    const { getByTestId } = render(<LoadingScreen />);
    expect(getByTestId('activity-indicator')).toBeTruthy();
  });

  it('renders correctly with given style', () => {
    const { getByTestId } = render(
      <LoadingScreen style={{ borderRadius: 20 }} />,
    );
    expect(getByTestId('activity-indicator')).toBeTruthy();
  });
});
