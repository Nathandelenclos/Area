import React from 'react';
import { it, describe, expect, jest } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react-native';
import AppletsCheckBox from '@components/Applets/AppletsCheckBox';

jest.mock("@fortawesome/react-native-fontawesome", () => ({
    FontAwesomeIcon: () => <div>Icon</div>,
  }));

  describe('AppletsCheckBox component', () => {
    it('renders correctly when checked', () => {
      const onPressMock = jest.fn();
      const { getByTestId, getByText } = render(
        <AppletsCheckBox value={true} color="red" bgColor="blue" onPress={onPressMock} />
      );
  
      // Vérifie que le composant a été rendu correctement
      const checkBox = getByTestId('applets-checkbox');
      expect(checkBox).toBeTruthy();
  
      // Vérifie que la fonction onPress est appelée lorsque le bouton est cliqué
      fireEvent.press(checkBox);
      expect(onPressMock).toHaveBeenCalled();
    });
  
    it('renders correctly when not checked', () => {
      const onPressMock = jest.fn();
      const { getByTestId } = render(
        <AppletsCheckBox value={false} color="red" bgColor="blue" onPress={onPressMock} />
      );
  
      // Vérifie que le composant a été rendu correctement
      const checkBox = getByTestId('applets-checkbox');
      expect(checkBox).toBeTruthy();
    });
  });
  