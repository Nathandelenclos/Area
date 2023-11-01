import React from 'react';
import AppContext from '@contexts/app.context';
import { Text, TouchableOpacity, View } from 'react-native';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export function Header({
  leftIcon,
  onPressLeft,
  rightIcon,
  onPressRight,
  title,
  bar = true,
}: {
  leftIcon?: IconProp;
  onPressLeft?: () => void;
  rightIcon?: IconProp;
  onPressRight?: () => void;
  title: string;
  bar?: boolean;
}) {
  const { color } = AppContext();
  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: color.mode,
      }}
    >
      <View
        style={{
          width: '90%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 20,
        }}
      >
        {onPressLeft && leftIcon && (
          <TouchableOpacity
            onPress={onPressLeft}
            style={{ position: 'absolute', left: 0 }}
          >
            <FontAwesomeIcon icon={leftIcon} size={25} color={color.text} />
          </TouchableOpacity>
        )}
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            color: color.text,
          }}
        >
          {title}
        </Text>
        {onPressRight && rightIcon && (
          <TouchableOpacity
            onPress={onPressRight}
            style={{ position: 'absolute', right: 0 }}
          >
            <FontAwesomeIcon icon={rightIcon} size={25} color={color.text} />
          </TouchableOpacity>
        )}
      </View>
      {bar && (
        <View
          style={{
            height: 1,
            backgroundColor: color.text,
            width: '90%',
          }}
        />
      )}
    </View>
  );
}
