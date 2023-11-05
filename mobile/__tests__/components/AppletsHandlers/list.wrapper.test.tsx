import React from 'react';
import { it, describe, expect, jest } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react-native';
import ListWrapper from '@components/AppletsHandlers/list.wrapper';
import { Text } from 'react-native';

jest.mock("@fortawesome/react-native-fontawesome", () => ({
    FontAwesomeIcon: () => <div>Icon</div>,
  }));

// Mock du contexte AppContext
jest.mock('@contexts/app.context', () => ({
  __esModule: true,
  default: () => ({
    color: {
      mode: 'light',
    },
    translate: (key) => key, // Un mock basique de la fonction de traduction
  }),
}));

// Mock de la navigation
const mockNavigation = {
  pop: jest.fn(),
};

describe('ListWrapper component', () => {
  it('renders correctly with given props', () => {
    const { getByText, getByTestId } = render(
      <ListWrapper navigation={mockNavigation} title_key="Test Title">
        <Text>Test Content</Text>
      </ListWrapper>
    );

    // Vérifie que le titre et le contenu sont présents
    expect(getByText('Test Title')).toBeTruthy();
    expect(getByText('Test Content')).toBeTruthy();

    // Vérifie que le bouton de retour est présent
    const backButton = getByTestId('header-left-button');
    expect(backButton).toBeTruthy();

    // Simule un clic sur le bouton de retour
    fireEvent.press(backButton);

    // Vérifie que la fonction pop de la navigation a été appelée
    expect(mockNavigation.pop).toHaveBeenCalled();
  });
});
