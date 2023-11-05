import React from 'react';
import { it, describe, expect, jest } from '@jest/globals';
import { render, fireEvent } from '@testing-library/react-native';
import NumberInput from '@components/ConfigOptions/number.option';

describe('NumberInput component', () => {
  it('renders correctly with given name, value, and setValue', () => {
    const mockSetValue = jest.fn();
    const { getByPlaceholderText } = render(
      <NumberInput name="Test Input" value={42} setValue={mockSetValue} />
    );

    // Vérifie que le composant NumberInput a correctement rendu l'élément TextInput.
    const inputElement = getByPlaceholderText('Test Input');
    expect(inputElement).toBeTruthy();

    // Vérifie que la valeur initiale est correcte.
    expect(inputElement.props.value).toBe('42');
  });

  it('updates value correctly on text input', () => {
    const mockSetValue = jest.fn();
    const { getByPlaceholderText } = render(
      <NumberInput name="Test Input" value={42} setValue={mockSetValue} />
    );

    const inputElement = getByPlaceholderText('Test Input');

    // Simule la saisie de texte.
    fireEvent.changeText(inputElement, '56');

    // Vérifie que la fonction mockSetValue a été appelée avec la nouvelle valeur.
    expect(mockSetValue).toHaveBeenCalledWith(56);
  });

  it('does not update value on invalid input', () => {
    const mockSetValue = jest.fn();
    const { getByPlaceholderText } = render(
      <NumberInput name="Test Input" value={42} setValue={mockSetValue} />
    );

    const inputElement = getByPlaceholderText('Test Input');

    // Simule une saisie de texte invalide.
    fireEvent.changeText(inputElement, 'abc');

    // Vérifie que la fonction mockSetValue n'a pas été appelée.
    expect(mockSetValue).not.toHaveBeenCalled();
  });

  it('does not update value on negative input', () => {
    const mockSetValue = jest.fn();
    const { getByPlaceholderText } = render(
      <NumberInput name="Test Input" value={42} setValue={mockSetValue} />
    );

    const inputElement = getByPlaceholderText('Test Input');

    // Simule une saisie de nombre négatif.
    fireEvent.changeText(inputElement, '-5');

    // Vérifie que la fonction mockSetValue n'a pas été appelée.
    expect(mockSetValue).not.toHaveBeenCalled();
  });

  it('does not update value if length is too long', () => {
    const mockSetValue = jest.fn();
    const { getByPlaceholderText } = render(
      <NumberInput name="Test Input" value={42} setValue={mockSetValue} />
    );

    const inputElement = getByPlaceholderText('Test Input');

    // Simule une saisie de nombre trop long.
    fireEvent.changeText(inputElement, '1234567890123456789012');

    // Vérifie que la fonction mockSetValue n'a pas été appelée.
    expect(mockSetValue).not.toHaveBeenCalled();
  });
});
