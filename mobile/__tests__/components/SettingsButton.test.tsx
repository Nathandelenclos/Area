import React from 'react';
import { it, describe, expect, jest } from '@jest/globals';
import { render, fireEvent } from '@testing-library/react-native';
import SettingsButton from '@components/SettingsButton';

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: () => <i className="fa fa-circle"></i>,
}));

describe('SettingsButton component', () => {
    it('renders correctly with given buttonColor and onPress', () => {
      const onPressMock = jest.fn();
      const { getByText, getByTestId } = render(
        <SettingsButton buttonColor="Test Title" onPress={onPressMock} />
      );
      const button = getByTestId('settings-button');
      expect(button).toBeTruthy();
      expect(getByText('Test Title')).toBeTruthy();
    
      // Simuler un appui sur le bouton et vérifier si la fonction onPress est appelée.
      fireEvent.press(button);
      expect(onPressMock).toHaveBeenCalled();
    });
  });
