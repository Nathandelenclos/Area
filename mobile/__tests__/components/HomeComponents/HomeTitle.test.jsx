import React from 'react';
import { it, describe, expect, jest } from '@jest/globals';
import { render } from '@testing-library/react-native';
import { HomeTitle } from '@components/HomeComponents/HomeTitle';

describe('HomeTitle component', () => {
  it('renders correctly with given text and textColor', () => {
    const { getByText } = render(<HomeTitle text="Test HomeTitle" textColor={'red'} />);
    expect(getByText('Test HomeTitle')).toBeTruthy();
  });
});