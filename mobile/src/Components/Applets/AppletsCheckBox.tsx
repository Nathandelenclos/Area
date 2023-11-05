import { ColorValue, TouchableOpacity } from 'react-native';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

/**
 * AppletsCheckBox is a reusable component for every AppletsCheckBox in the app.
 * It takes a value, color, bgColor an could take an onPress function as props.
 *
 * @component
 * @example
 * // Example usage of AppletsCheckBox component
 * <AppletsCheckBox
 *   value={true}
 *   color={'red'}
 *   bgColor={'blue'}
 *   onPress={() => {}}
 * />
 *
 * @param {{value: boolean, color: ColorValue, bgColor: ColorValue, onPress?: () => void}} props - The props for the AppletsCheckBox component.
 * @returns {JSX.Element} - Returns the rendered AppletsCheckBox component.
 */
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
        testID='applets-checkbox'
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
      testID='applets-checkbox'
    />
  );
}
