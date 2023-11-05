import React from 'react';
import { it, describe, expect, jest } from '@jest/globals';
import { render } from '@testing-library/react-native';
import { SubTitle } from '@components/Subtitle';

jest.mock('@contexts/app.context', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    color: {
      title: '#000',
    },
  })),
}));

describe('SubTitle component', () => {
  it('renders correctly with given Subtitle', () => {
    const { getByText } = render(<SubTitle title="Test SubTitle" />);
    expect(getByText('Test SubTitle')).toBeTruthy();
  });

  it('renders correctly with given style', () => {
    const { getByText } = render(
      <SubTitle title="Test SubTitle" style={{ fontSize: 20 }} />,
    );
    expect(getByText('Test SubTitle')).toBeTruthy();
  });
});
