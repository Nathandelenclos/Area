import React from 'react';
import { it, describe, expect, jest } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react-native';
import AppletFilter from '@components/Applets/AppletFilter';

jest.mock("@fortawesome/react-native-fontawesome", () => ({
    FontAwesomeIcon: () => (
      <div>
        Icon
      </div>
    ),
  }));

// Mock du contexte AppContext
jest.mock('@contexts/app.context', () => ({
  __esModule: true,
  default: () => ({
    color: {
      mainColor: 'blue',
      inactive: 'gray',
      textOverMainColor: 'white',
    },
    translate: (key) => key, // Un mock basique de la fonction de traduction
  }),
}));

describe('AppletFilter component', () => {
  it('renders correctly with given props', () => {
    const mockToggleFilter = jest.fn();
    const { getByText, getByTestId } = render(
      <AppletFilter
        activeFilter={true}
        filterName="Test Filter"
        toggleFilter={mockToggleFilter}
      />
    );

    // Vérifie que le nom du filtre est présent
    expect(getByText('Test Filter')).toBeTruthy();

    const filterButton = getByTestId('filter-button');
    expect(filterButton).toBeTruthy();
    fireEvent.press(filterButton);
    expect(mockToggleFilter).toHaveBeenCalledWith('Test Filter');
  });

  it('renders correctly with given props (inactive filter)', () => {
    const mockToggleFilter = jest.fn();
    const { getByText, getByTestId } = render(
      <AppletFilter
        activeFilter={false}
        filterName="Test Filter"
        toggleFilter={mockToggleFilter}
      />
    );

    // Vérifie que le nom du filtre est présent
    expect(getByText('Test Filter')).toBeTruthy();

    const filterButton = getByTestId('filter-button');
    expect(filterButton).toBeTruthy();
    fireEvent.press(filterButton);
    expect(mockToggleFilter).toHaveBeenCalledWith('Test Filter');
  });
});
