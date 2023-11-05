import React from 'react';
import { it, describe, expect, jest } from '@jest/globals';
import { render } from '@testing-library/react-native';
import AuthViewContainer from '@components/Auth/AuthViewContainer';
import { Text } from 'react-native';

// Mock du contexte AppContext
jest.mock('@contexts/app.context', () => ({
    __esModule: true,
    default: () => ({
      color: {
        background: 'white',
        mainColor: 'blue',
      },
    }),
  }));
  
  describe('AuthViewContainer component', () => {
    it('renders correctly with children and default background', () => {
      const { getByText } = render(
        <AuthViewContainer>
          <Text>Example 1</Text>
          <Text>Example 2</Text>
        </AuthViewContainer>
      );
  
      // Vérifie que le composant AuthViewContainer a correctement rendu les enfants.
      expect(getByText('Example 1')).toBeTruthy();
      expect(getByText('Example 2')).toBeTruthy();
    });

    it('renders correctly with children and custom background', () => {
      const { getByText } = render(
        <AuthViewContainer bgColor="red">
          <Text>Example 1</Text>
          <Text>Example 2</Text>
        </AuthViewContainer>
      );
  
      // Vérifie que le composant AuthViewContainer a correctement rendu les enfants.
      expect(getByText('Example 1')).toBeTruthy();
      expect(getByText('Example 2')).toBeTruthy();
    });
  });