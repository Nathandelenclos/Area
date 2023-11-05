import React from 'react';
import { it, describe, expect, jest } from '@jest/globals';
import { render } from '@testing-library/react-native';
import HomeTitle from '@components/HomeComponents/HomeTitle';

describe('HomeTitle component', () => {
  it('renders correctly with given text without space and textColor', () => {
    const { getByText } = render(<HomeTitle text="HomeTitle" textColor={'red'} />);
    expect(getByText('HomeTitle')).toBeTruthy();
  });

  it('renders correctly with given text with space and textColor', () => {
    const { getByText } = render(<HomeTitle text="Home Title" textColor={'red'} />);
    
    // Le texte "HomeTitle" est divisé en deux parties dans le composant.
    // Nous devons chercher les deux parties pour le test.
    expect(getByText('Home')).toBeTruthy();
    expect(getByText('Title')).toBeTruthy();
  });
});