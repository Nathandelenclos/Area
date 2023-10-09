import { ColorValue, TouchableOpacity } from 'react-native';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default function AppletsCheckBox({
  value,
  color,
  bgColor,
  onPress,
}: {
  value: boolean;
  color: ColorValue;
  bgColor: ColorValue;
  onPress?: () => void;
}): React.JSX.Element {
  const checkBoxColor = bgColor as string | undefined;
  if (value) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          width: 20,
          height: 20,
          borderWidth: 2,
          borderColor: color,
          borderRadius: 5,
          marginRight: 10,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: color,
        }}
      >
        <FontAwesomeIcon
          icon={'check'}
          style={{ color: checkBoxColor }}
          size={15}
        />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: color,
        borderRadius: 5,
        marginRight: 10,
      }}
    />
  );
}
