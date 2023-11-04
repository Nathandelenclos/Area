import React from 'react';
import { it, describe, expect, jest } from '@jest/globals';
import { render, fireEvent } from '@testing-library/react-native';
import SettingsButton from '@components/SettingsButton';
import { View } from 'react-native';

jest.mock("@fortawesome/react-native-fontawesome", () => ({
  FontAwesomeIcon: () => <div>Icon</div>,
}));

describe('SettingsButton component', () => {
    it('renders correctly with given onPress', () => {
      const onPressMock = jest.fn();
      const { getByTestId } = render(
        <SettingsButton onPress={onPressMock} />
      );
      const button = getByTestId('settings-button');
      expect(getByTestId('settings-button')).toBeTruthy();
    });

    it('renders correctly with given buttonColor and onPress', () => {
      const onPressMock = jest.fn();
      const { getByTestId } = render(
        <SettingsButton buttonColor="red" onPress={onPressMock} />
      );
      const button = getByTestId('settings-button');
      expect(getByTestId('settings-button')).toBeTruthy();
    
      // Simuler un appui sur le bouton et vérifier si la fonction onPress est appelée.
      fireEvent.press(button);
      expect(onPressMock).toHaveBeenCalled();
    });
  });
