import React from 'react';
import { render } from '@testing-library/react-native';
import { Title } from '@components/Title';
import AppContext from '@contexts/app.context';

jest.mock('@contexts/app.context', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    color: {
      title: '#000',
    },
  })),
}));

describe('Title component', () => {
  it('renders correctly with given title', () => {
    const { getByText } = render(<Title title="Test Title" />);
    expect(getByText('Test Title')).toBeTruthy();
  });

  it('renders correctly with given style', () => {
    const { getByText } = render(
      <Title title="Test Title" style={{ fontSize: 20 }} />,
    );
    expect(getByText('Test Title')).toBeTruthy();
  });
});
