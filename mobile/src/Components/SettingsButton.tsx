import React, { JSX } from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import AppContext from '@contexts/app.context';


/**
 * SettingsButton is a reusable component for every SettingsButton in the app.
 * It could take a buttonColor and take an onPress function as props.
 *
 * @component
 * @example
 * // Example usage of SettingsButton component
 * <SettingsButton
 *   buttonColor={'red'}
 *   onPress={() => {console.log('SettingsButton pressed')}
 * />
 *
 * @param {any} props.buttonColor - Button color (optionnal). If not given, use default color.
 * @param {() => void} props.onPress - fonction to call when the button is pressed.
 * @returns {JSX.Element} - Returns the rendered SettingsButton component.
 */
export default function SettingsButton({
  buttonColor,
  onPress,
}: {
  buttonColor?: any;
  onPress: () => void;
}): JSX.Element {
  const { color } = AppContext();

  return (
    <TouchableOpacity
      style={{ position: 'absolute', top: 5, right: 20 }}
      onPress={onPress}
      testID="settings-button"
    >
      <FontAwesomeIcon
        icon={'gear'}
        size={25}
        style={{ color: buttonColor ?? color.textOverMainColor }}
      />
    </TouchableOpacity>
  );
}
