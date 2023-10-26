import React, { JSX } from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import AppContext from '@contexts/app.context';

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
    >
      <FontAwesomeIcon
        icon={'gear'}
        size={25}
        style={{ color: buttonColor ?? color.textOverMainColor }}
      />
    </TouchableOpacity>
  );
}
