import { Dropdown as DropDownPicker } from 'react-native-element-dropdown';
import React, { useState } from 'react';
import AppContext from '@contexts/app.context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { ViewStyle } from 'react-native';

import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export type DropdownProps = {
  elements: { label: string; value: string }[];
  currentValue: string;
  setCurrentValue: React.Dispatch<React.SetStateAction<string>>;
};

export default function Dropdown({
  elements,
  currentValue,
  setCurrentValue,
}: DropdownProps): React.JSX.Element {
  const { color } = AppContext();
  const open: SharedValue<boolean> = useSharedValue(false);

  const angleAnimationStyle: ViewStyle = useAnimatedStyle(
    (): ViewStyle => ({
      transform: [{ rotate: withTiming(`${open.value ? 180 : 0}deg`) }],
      marginRight: 10,
    }),
  );

  return (
    <DropDownPicker
      data={elements}
      value={currentValue}
      onFocus={() => {
        open.value = true;
      }}
      onBlur={() => {
        open.value = false;
      }}
      style={{
        backgroundColor: color.background,
        borderRadius: 5,
        height: 40,
        marginVertical: 10,
        borderWidth: 1,
      }}
      itemContainerStyle={{
        backgroundColor: color.background,
        borderBottomWidth: 1,
      }}
      itemTextStyle={{
        color: color.text,
      }}
      labelField="label"
      valueField="value"
      onChange={(value) => {
        setCurrentValue(value.value);
      }}
      containerStyle={{
        width: '100%',
        borderWidth: 1,
        borderRadius: 5,
        overflow: 'hidden',
        borderColor: color.text,
        backgroundColor: color.background,
      }}
      activeColor={color.mode}
      selectedTextStyle={{
        fontWeight: 'bold',
        color: color.text,
        paddingLeft: 10,
      }}
      renderRightIcon={() => (
        <Animated.View style={angleAnimationStyle}>
          <FontAwesomeIcon icon={'chevron-down'} size={20} color={color.text} />
        </Animated.View>
      )}
    />
  );
}

/*
ArrowUpIconComponent={({ style }) => (
        <FontAwesomeIcon icon={'chevron-up'} size={25} color={color.text} />
      )}
      ArrowDownIconComponent={({ style }) => (
        <FontAwesomeIcon icon={'chevron-down'} size={25} color={color.text} />
      )}
      TickIconComponent={({ style }) => (
        <FontAwesomeIcon icon={'check'} size={25} color={color.text} />
      )}
 */
