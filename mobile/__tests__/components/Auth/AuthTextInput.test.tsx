import React from 'react';
import { it, describe, expect, jest } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react-native';
import AuthTextInput from '@components/Auth/AuthTextInput';

// Mock du contexte AppContext
jest.mock('@contexts/app.context', () => ({
  __esModule: true,
  default: () => ({
    color: {
      textInput: 'white',
      title: 'black',
    },
  }),
}));

describe('AuthTextInput component', () => {
  it('renders correctly with placeholder and without secure text', () => {
    const { getByPlaceholderText } = render(
      <AuthTextInput placeholder="Email" />
    );

    // Vérifie que le composant AuthTextInput a correctement rendu le placeholder.
    expect(getByPlaceholderText('Email')).toBeTruthy();
  });

  it('renders correctly with secure text', () => {
    const { getByPlaceholderText } = render(
      <AuthTextInput placeholder="Password" secure={true} />
    );

    // Vérifie que le composant AuthTextInput a correctement rendu le placeholder.
    expect(getByPlaceholderText('Password')).toBeTruthy();
  });

  it('triggers text input change', () => {
    const mockSetText = jest.fn();
    const { getByPlaceholderText } = render(
      <AuthTextInput placeholder="Username" text="" setText={mockSetText} />
    );
    const input = getByPlaceholderText('Username');

    // Simuler un changement de texte dans l'entrée.
    fireEvent.changeText(input, 'testuser');

    // Vérifie que la fonction mockSetText a été appelée avec la nouvelle valeur.
    expect(mockSetText).toHaveBeenCalledWith('testuser');
  });
});
