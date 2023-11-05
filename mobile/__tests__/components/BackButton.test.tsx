import React from 'react';
import { it, describe, expect, jest } from '@jest/globals';
import { render, fireEvent } from '@testing-library/react-native';
import BackButton from '@components/BackButton';

jest.mock("@fortawesome/react-native-fontawesome", () => ({
  FontAwesomeIcon: () => <div>Icon</div>,
}));

describe('BackButton component', () => {
    it('renders correctly with default button color', () => {
      const navigation = {
        pop: jest.fn(),
      };
  
      const { getByTestId } = render(<BackButton navigation={navigation} />);
  
      // Vérifie que le bouton a été correctement rendu
      expect(getByTestId('back-button')).toBeTruthy();
  
      // Simule un appui sur le bouton
      fireEvent.press(getByTestId('back-button'));
  
      // Vérifie que la fonction de navigation pop a été appelée
      expect(navigation.pop).toHaveBeenCalledTimes(1);
    });
  
    it('renders correctly with custom button color', () => {
      const navigation = {
        pop: jest.fn(),
      };
  
      const { getByTestId } = render(
        <BackButton navigation={navigation} buttonColor="blue" />
      );
  
      // Vérifie que le bouton a été correctement rendu
      expect(getByTestId('back-button')).toBeTruthy();
  
      // Simule un appui sur le bouton
      fireEvent.press(getByTestId('back-button'));
  
      // Vérifie que la fonction de navigation pop a été appelée
      expect(navigation.pop).toHaveBeenCalledTimes(1);
    });
  }); 
