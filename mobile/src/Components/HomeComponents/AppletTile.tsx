import React, { JSX } from 'react';
import {
  DimensionValue,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppContext from '@contexts/app.context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Title from '@components/HomeComponents/Title';

export type AppletProps = {
  appletTitle: string;
  id: number;
  description: string;
  color: string;
  size: string;
  handleOnPress: () => void;
};

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
