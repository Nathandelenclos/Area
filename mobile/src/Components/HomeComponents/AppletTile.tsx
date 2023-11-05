import React from 'react';
import { DimensionValue, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

/**
 * Props for the HomeTitle component.
 * @interface AppletProps
 */
export type AppletProps = {
  /**
   * Title of the applet.
   */
  appletTitle: string;
  /**
   * Id of the applet.
   */
  id: number;
  /**
   * description of the applet.
   */
  description: string;
  /**
   * color of the applet.
   */
  color: string;
  /**
   * size of the applet.
   */
  size: string;
  /**
   * function launched when the applet is pressed.
   */
  handleOnPress: () => void;
};

/**
 * AppletTile is a reusable component for every AppletTile in the app.
 * It takes an appletTitle, id, description, color, size, handleOnPress function as props.
 *
 * @component
 * @example
 * // Example usage of AppletTile component
 * <AppletTile
 *   appletTitle={"title"}
 *   id={1}
 *   description={"description of the applet"}
 *   color={"red"}
 *   size={"big"} //or "small"
 *   handleOnPress={() => {console.log('applet pressed')}}
 * />
 *
 * @param {AppletProps} props - The props for the AppletTile component.
 * @returns {JSX.Element} - Returns the rendered AppletTile component.
 */
export default ({
  appletTitle,
  id,
  description,
  color,
  size,
  handleOnPress,
}: AppletProps) => {
  let appletSize: DimensionValue = '0%';
  let marginL: DimensionValue = '0%';

  if (size === 'big') {
    marginL = '5%';
  } else if (size === 'small') {
    marginL = '10%';
  } else {
    marginL = '5%';
  }

  if (size === 'big') {
    appletSize = '88%';
  } else if (size === 'small') {
    appletSize = '41%';
  } else {
    appletSize = '88%';
  }

  return (
    <TouchableOpacity
      onPress={handleOnPress}
      style={{
        backgroundColor: color,
        borderRadius: 10,
        marginBottom: 14,
        width: appletSize,
        marginLeft: '6%',
      }}
      testID="applet-button"
    >
      <View>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold',
            marginTop: 18,
            marginLeft: marginL,
          }}
        >
          {appletTitle + ' #' + id}
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 12,
            marginTop: 23,
            marginLeft: marginL,
            marginBottom: 23,
            marginRight: '28%',
          }}
        >
          {description}
        </Text>
        <TouchableOpacity
          onPress={handleOnPress}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <FontAwesomeIcon
            icon={'arrow-right'}
            size={20}
            style={{
              color: 'white',
              position: 'absolute',
              right: 0,
              bottom: 0,
              marginBottom: 13,
              marginRight: 15,
            }}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
