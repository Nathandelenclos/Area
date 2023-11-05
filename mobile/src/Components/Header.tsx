import { Text, TouchableOpacity, View } from 'react-native';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import AppContext from '@contexts/app.context';

/**
 * Header is a reusable component for every Header in the app.
 * It takes a title and could take a leftIcon, onPressLeft function, rightIcon, onPressRight function and a bar as props.
 *
 * @component
 * @example
 * // Example usage of Header component
 * <Header
 *   leftIcon={check}
 *   onPressLeft={() => {console.log('LefttIcon pressed')}}
 *   rightIcon={plus}
 *   onPressRight={() => {console.log('RightIcon pressed')}}
 *   title={'title'}
 *   bar={false}
 * />
 *
 * @param {IconProp} props.leftIcon - Icon to display on the left of the Header component.
 * @param {() => void} props.onPressLeft - Function to execute when the leftIcon is pressed.
 * @param {IconProp} props.rightIcon - Icon to display on the right of the Header component.
 * @param {() => void} props.onPressRight - Function to execute when the rightIcon is pressed.
 * @param {string} props.title - Title to display in the Header component.
 * @param {boolean} props.bar - Boolean to display a bar under the Header component.
 * @returns {JSX.Element} - Returns the rendered Header component.
 */
export default function Header({
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
            testID='header-left-button'
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
