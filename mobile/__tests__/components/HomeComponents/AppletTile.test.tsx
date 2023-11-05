import React from 'react';
import { it, describe, expect, jest } from '@jest/globals';
import { render, fireEvent } from '@testing-library/react-native';
import AppletTile from '@components/HomeComponents/AppletTile';

jest.mock("@fortawesome/react-native-fontawesome", () => ({
  FontAwesomeIcon: () => <div>Icon</div>,
}));

describe('AppletTile component', () => {
    it('renders correctly with given props and big size', () => {
      const mockHandleOnPress = jest.fn();
      const { getByText, getByTestId } = render(
        <AppletTile
          appletTitle="Test Applet"
          id={1}
          description="Description of the applet"
          color="red"
          size="big"
          handleOnPress={mockHandleOnPress}
        />
      );
  
      // Vérifie que le titre, l'ID et la description sont rendus correctement.
      expect(getByText('Test Applet #1')).toBeTruthy();
      expect(getByText('Description of the applet')).toBeTruthy();
  
      // Vérifie que le bouton de l'applet est présent.
      const appletButton = getByTestId('applet-button');
      expect(appletButton).toBeTruthy();
  
      // Simuler un appui sur le bouton de l'applet.
      fireEvent.press(appletButton);
      expect(mockHandleOnPress).toHaveBeenCalledTimes(1);
    });

    it('renders correctly with given props and small size', () => {
        const mockHandleOnPress = jest.fn();
        const { getByText, getByTestId } = render(
          <AppletTile
            appletTitle="Test Applet"
            id={1}
            description="Description of the applet"
            color="red"
            size="small"
            handleOnPress={mockHandleOnPress}
          />
        );
    
        // Vérifie que le titre, l'ID et la description sont rendus correctement.
        expect(getByText('Test Applet #1')).toBeTruthy();
        expect(getByText('Description of the applet')).toBeTruthy();
    
        // Vérifie que le bouton de l'applet est présent.
        const appletButton = getByTestId('applet-button');
        expect(appletButton).toBeTruthy();
    
        // Simuler un appui sur le bouton de l'applet.
        fireEvent.press(appletButton);
        expect(mockHandleOnPress).toHaveBeenCalledTimes(1);
      });

      it('renders correctly with given props and small size', () => {
        const mockHandleOnPress = jest.fn();
        const { getByText, getByTestId } = render(
          <AppletTile
            appletTitle="Test Applet"
            id={1}
            description="Description of the applet"
            color="red"
            size=""
            handleOnPress={mockHandleOnPress}
          />
        );
    
        // Vérifie que le titre, l'ID et la description sont rendus correctement.
        expect(getByText('Test Applet #1')).toBeTruthy();
        expect(getByText('Description of the applet')).toBeTruthy();
    
        // Vérifie que le bouton de l'applet est présent.
        const appletButton = getByTestId('applet-button');
        expect(appletButton).toBeTruthy();
    
        // Simuler un appui sur le bouton de l'applet.
        fireEvent.press(appletButton);
        expect(mockHandleOnPress).toHaveBeenCalledTimes(1);
      });
  });

// describe('AppletTile component', () => {
//     it('renders correctly with given props', () => {
//       const onPressMock = jest.fn();
//       const { getByText } = render(
//         <AppletTile
//           appletTitle="title"
//           id={1}
//           description={"description of the applet"}
//           color={"red"}
//           size={"big"}
//           handleOnPress={onPressMock}
//         />
//       );
//       const button = getByText('title');
//       expect(getByText('title')).toBeTruthy();

//       // Simuler un appui sur le bouton et vérifier si la fonction onPress est appelée.
//       fireEvent.press(button);
//       expect(onPressMock).toHaveBeenCalled();
//     });
//   });