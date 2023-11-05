import React from 'react';
import { it, describe, expect, jest } from '@jest/globals';
import { render, fireEvent } from '@testing-library/react-native';
import StringInput from '@components/ConfigOptions/string.option';

describe('StringInput component', () => {
    it('renders correctly with given value and setValue', () => {
      const mockSetValue = jest.fn();
      const { getByPlaceholderText } = render(
        <StringInput name="Test Input" value="Initial Value" setValue={mockSetValue} />
      );
  
      // Trouver l'élément d'entrée de texte par le texte de l'espace réservé.
      const textInput = getByPlaceholderText('Test Input');
      expect(textInput).toBeTruthy();
  
      // Simuler un changement de texte dans l'entrée de texte.
      fireEvent.changeText(textInput, 'New Value');
  
      // Vérifier que la fonction mockSetValue a été appelée avec la nouvelle valeur.
      expect(mockSetValue).toHaveBeenCalledWith('New Value');
    });
  });
