import React, { JSX } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import AppContext from '@contexts/app.context';

/**
 * Props for the StyledButton component.
 * @interface MyButtonProps
 */
type MyButtonProps = {
  /**
   * inverse backgroundColor of the Button.
   */
  inverse?: boolean;
  /**
   * Title of the Button.
   */
  title: string;
  /**
   * Function done when Button pressed.
   */
  onPress?: () => void;
};

/**
 * StyledButton is a reusable component for every StyledButton in the app.
 * It takes a title and could have an inverse background color and could have an onPress function as props.
 *
 * @component
 * @example
 * // Example usage of StyledButton component
 * <StyledButton
 *   title={'title'}
 *   inverse={true}
 *   onPress={() => {console.log('StyledButton pressed')}}
 * />
 *
 * @param {MyButtonProps} props - The props for the StyledButton component.
 * @returns {JSX.Element} - Returns the rendered StyledButton component.
 */
export default function StyledButton({
  inverse = false,
  title,
  onPress,
}: MyButtonProps): JSX.Element {
  const { color } = AppContext();

  return (
    <TouchableOpacity
      style={{
        backgroundColor: inverse ? color.mode : color.mainColor,
        borderColor: color.mainColor,
        borderWidth: 2,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginVertical: 10,
        marginHorizontal: 20,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          fontSize: 15,
          textAlign: 'center',
          color: inverse ? color.mainColor : color.textOverMainColor,
          fontWeight: 'bold',
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
