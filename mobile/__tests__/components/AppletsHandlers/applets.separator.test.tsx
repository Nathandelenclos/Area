import React from 'react';
import { it, describe, expect, jest } from '@jest/globals';
import { render } from '@testing-library/react-native';
import DrawSeparator from '@components/AppletsHandlers/applets.separator';

describe('DrawSeparator component', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<DrawSeparator />);
    expect(getByTestId('draw-separator')).toBeTruthy();
  });

  it('renders correctly with given style', () => {
    const { getByTestId } = render(<DrawSeparator extendHeigth={2} />);
    expect(getByTestId('draw-separator')).toBeTruthy();
  });
});
