import React, { JSX } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppContext from '@contexts/app.context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IAction } from '@interfaces/action.interface';

export type BoxType = 'action' | 'reaction';

export type BoxCreateAppletProps = {
  colorMode: string;
  id: number;
  handleOnPress: () => void;
  handleOnPressMinus: (idToDelete: number) => void;
  text: string;
  type: BoxType;
};

const BoxCreateApplet = ({
  colorMode,
  id,
  handleOnPress,
  handleOnPressMinus,
  text,
  type,
}: BoxCreateAppletProps) => {
  let color = '';
  let colorText = '';
  let isDarkMode = false;
  let isId1 = false;

  if (type === 'action') {
    isId1 = true;
    if (colorMode === 'black') {
      isDarkMode = true;
      color = 'white';
      colorText = 'black';
    } else {
      color = 'black';
      colorText = 'white';
    }
  } else {
    if (colorMode === 'white') {
      color = '#6F6F6F';
    } else {
      isDarkMode = true;
      color = '#6F6F6F';
    }
    colorText = 'white';
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}
    >
      <TouchableOpacity
        onPress={handleOnPress}
        style={{
          backgroundColor: color,
          borderRadius: 10,
          width: '88%',
          height: 89,
          marginLeft: '6%',
          display: 'flex',
        }}
      >
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Text
            style={{
              color: colorText,
              fontSize: 24,
              fontWeight: 'bold',
            }}
          >
            {text}
          </Text>
          {!isId1 ? (
            <TouchableOpacity
              onPress={() => handleOnPressMinus(id)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={{
                backgroundColor: isDarkMode ? 'black' : 'white',
                width: 20,
                height: 20,
                borderRadius: 10,
                position: 'absolute',
                left: '8%',
                right: '86%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <FontAwesomeIcon
                icon={'minus'}
                size={15}
                style={{
                  color: isDarkMode ? 'white' : 'black',
                }}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: '#D9D9D9',
          width: '2%',
          height: 24,
          marginLeft: '49%',
        }}
      />
    </View>
  );
};

export default function CreateApplet({
  navigation,
}: {
  navigation: any;
}): JSX.Element {
  const { color, translate } = AppContext();
  const [action, setAction] = React.useState<IAction>({
    id: 0,
    name: '',
    description: '',
    is_available: false,
    serviceId: 0,
  });
  const [reactions, setReactions] = React.useState<IAction[]>([]);

  const handleAppletPress = () => {
    navigation.navigate('ListServices', {
      setAction: setAction,
      type: 'action',
    });
  };

  const handleAppletPressMinus = (idToDelete: number) => {
    setReactions(reactions.splice(idToDelete, 1));
  };

  const handleAppletPressPlus = () => {
    navigation.navigate('ListServices', {
      reactions: reactions,
      setReactions: setReactions,
      type: 'reaction',
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: color.mode,
      }}
    >
      <View
        style={{
          borderBottomColor: color.text,
          borderBottomWidth: 2,
          marginLeft: '6%',
          marginRight: '6%',
          marginTop: '8%',
          marginBottom: '8%',
        }}
      >
        <Text
          style={{
            color: color.text,
            fontSize: 32,
            fontWeight: 'bold',
            marginBottom: '6%',
            textAlign: 'center',
          }}
        >
          {translate('create_applet_title')}
        </Text>
      </View>
      <ScrollView>
        <BoxCreateApplet
          colorMode={color.mode}
          id={action.id}
          handleOnPress={handleAppletPress}
          handleOnPressMinus={() => 0}
          text={action.name}
          type={'action'}
        />
        {reactions.map((reaction, i) => (
          <BoxCreateApplet
            colorMode={color.mode}
            key={i}
            id={reaction.id}
            handleOnPress={() => handleAppletPress}
            type={'reaction'}
            text={reaction.name}
            handleOnPressMinus={handleAppletPressMinus}
          />
        ))}
        <TouchableOpacity
          onPress={handleAppletPressPlus}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: '#D9D9D9',
              width: 30,
              height: 30,
              borderRadius: 15,
              top: -3,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FontAwesomeIcon
              icon={'plus'}
              size={20}
              style={{
                color: 'black',
              }}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
