import React, { JSX } from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import AppContext from '@contexts/app.context';

/**
 * BackButton is a reusable component for every BackButton in the app.
 * It takes navigation and could take a buttonColor as props.
 *
 * @component
 * @example
 * // Example usage of BackButton component
 * <BackButton navigation={navigation} buttonColor="blue" />
 *
 * @param {any} props.navigation - Navigation to be used in the BackButton component.
 * @param {string} props.buttonColor - Color of the BackButton component.
 * @returns {JSX.Element} - Returns the rendered BackButton component.
 */
export default function BackButton({
  navigation,
  buttonColor,
}: {
  navigation: any;
  buttonColor?: string;
}): JSX.Element {
  const { color } = AppContext();

  return (
    <TouchableOpacity
      style={{ position: 'absolute', top: 5, left: 20 }}
      onPress={() => navigation.pop()}
      testID="back-button"
    >
      <FontAwesomeIcon
        icon={'arrow-left'}
        size={25}
        style={{ color: buttonColor ?? color.textOverMainColor }}
      />
    </TouchableOpacity>
  );
}
