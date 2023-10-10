import React, { JSX, useEffect, useState } from 'react';
import {
  Pressable,
  DimensionValue,
  SafeAreaView,
  ScrollView,
  Text,
  Modal,
  TouchableOpacity,
  View,
} from 'react-native';
import AppContext from '@contexts/app.context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faClone,
  faEdit,
  faHeart,
  faToggleOff,
  faToggleOn,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';

export type AppletBubbleProps = {
  appletTitle: string;
  description: Array<string>;
  color: string;
  size: string;
};

export type SettingsProps = {
  settingTitle: string[];
  iconName: IconDefinition[];
  handleOnPress: () => void;
  end?: boolean;
  fav?: boolean;
  isActive: boolean;
};

function AppletBubble({
  appletTitle,
  description,
  color,
  size,
}: AppletBubbleProps): React.JSX.Element {
  let appletSize: DimensionValue = '0%';
  let marginL: DimensionValue = '0%';
  let isAction = false;
  let isInformation = false;

  if (size === 'informations') {
    marginL = '4%';
    appletSize = '92%';
    isInformation = true;
  } else if (size === 'action') {
    marginL = '8%';
    appletSize = '84%';
    isAction = true;
  } else if (size === 'reaction') {
    marginL = '5%';
    appletSize = '90%';
  } else {
    return <></>;
  }

  return (
    <View
      style={{
        backgroundColor: color,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: isAction ? 0 : 10,
        borderBottomRightRadius: isAction ? 0 : 10,
        marginBottom: isAction ? 0 : 21,
        width: appletSize,
        minHeight: 60,
        marginLeft: marginL,
        marginRight: marginL,
        paddingBottom: 5,
      }}
    >
      <Text
        style={{
          color: 'white',
          fontSize: 16,
          fontWeight: 'bold',
          marginTop: 5,
          marginBottom: 5,
          marginLeft: '4%',
          marginRight: marginL,
        }}
      >
        {appletTitle}
      </Text>
      {description.map((desc, index) => (
        <Text
          key={index}
          style={{
            color: 'white',
            fontSize: isInformation ? 10 : 12,
            marginLeft: '4%',
            marginRight: '28%',
          }}
        >
          {desc}
        </Text>
      ))}
    </View>
  );
}

export default function InfoApplet({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}): JSX.Element {
  const { color, translate } = AppContext();
  const appletDescription = 'Send an email when a Elon Musk posts a new tweet';
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState(0);
  let isdarkmode = false;

  if (color.mode === 'black') {
    isdarkmode = true;
  }

  useEffect(() => {
    console.log(route.params.id);
    setId(route.params.id);
  }, []);

  const handleDuplicatePress = () => {
    console.log('Duplicate button pressed');
  };

  const handleFavoritePress = () => {
    console.log('Favorite button pressed');
  };

  const handleActivationPress = () => {
    console.log('Activation button pressed');
  };

  const handleModifyPress = () => {
    console.log('Modify button pressed');
  };

  const handleDeletePress = () => {
    console.log('Delete button pressed');
  };

  const [appletList, setappletList] = React.useState<AppletBubbleProps[]>([
    {
      appletTitle: 'Reaction #1',
      description: ['Send an email to “simon.riembault@epitech.eu”'],
      color: color.mainColor,
      size: 'reaction',
    },
    {
      appletTitle: 'Reaction #2',
      description: ['Open Twitter on my phone'],
      color: color.mainColor,
      size: 'reaction',
    },
    {
      appletTitle: 'Reaction #3',
      description: ["J'aime le gros crane de Simon"],
      color: color.mainColor,
      size: 'reaction',
    },
    {
      appletTitle: 'Reaction #4',
      description: ["J'aime le crane de Frankeinstein #Noa"],
      color: color.mainColor,
      size: 'reaction',
    },
  ]);

  const [settingsList, setSettingsList] = React.useState<SettingsProps[]>([
    {
      settingTitle: ['Duplicate'],
      iconName: [faClone],
      handleOnPress: handleDuplicatePress,
      isActive: false,
    },
    {
      settingTitle: ['Favorite'],
      iconName: [faHeart],
      handleOnPress: handleFavoritePress,
      isActive: false,
      fav: true,
    },
    {
      settingTitle: ['Enable', 'Disable'],
      iconName: [faToggleOn, faToggleOff],
      handleOnPress: handleActivationPress,
      isActive: false,
    },
    {
      settingTitle: ['Modify'],
      iconName: [faEdit],
      handleOnPress: handleModifyPress,
      isActive: false,
    },
    {
      settingTitle: ['Delete'],
      iconName: [faTrashAlt],
      handleOnPress: handleDeletePress,
      isActive: false,
      end: true,
    },
  ]);

  if (!id) {
    //is loading
    return <></>;
  }

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
          marginBottom: '5%',
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
          {`${translate('info_applet_title')} #${id}`}
        </Text>
      </View>
      <View
        style={{
          marginLeft: '6%',
          marginRight: '6%',
          justifyContent: 'center',
          alignItems: 'center',
          height: '15%',
          borderColor: color.mainColor,
          backgroundColor: color.mainColor,
          borderWidth: 1,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
      >
        <Text
          style={{
            marginLeft: '2%',
            marginRight: '25%',
            color: 'white',
            fontSize: 18,
          }}
        >
          {appletDescription}
        </Text>
        <View
          style={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            right: 0,
          }}
        >
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Pressable
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: !isdarkmode ? '#00000075' : '#FFFFFF75',
              }}
              onPress={() => setModalVisible(!modalVisible)}
            ></Pressable>
            <View
              style={{
                width: '100%',
                height: '40.5%',
                top: '-40.5%',
                backgroundColor: color.mode,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {settingsList.map((applet, i) => (
                <View
                  key={i}
                  style={{
                    flexDirection: 'row',
                    borderBottomColor: !applet.end ? '#6F6F6F' : '',
                    borderBottomWidth: !applet.end ? 1 : 0,
                    width: '88%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <TouchableOpacity
                    key={i}
                    onPress={() => {
                      applet.handleOnPress;
                      applet.isActive = !applet.isActive;
                      setSettingsList(settingsList);
                    }}
                    style={{
                      marginLeft: '6%',
                      marginRight: '6%',
                      marginTop: '4%',
                      marginBottom: '4%',
                    }}
                  >
                    <Text
                      key={i}
                      style={{
                        color: !applet.end ? '#6F6F6F' : '#FF000075',
                        fontSize: 24,
                        fontWeight: 'bold',
                      }}
                    >
                      {applet.isActive && applet.settingTitle[1]
                        ? applet.settingTitle[1]
                        : applet.settingTitle[0]}
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      position: 'absolute',
                      left: '0%',
                    }}
                  >
                    <FontAwesomeIcon
                      key={i}
                      icon={
                        applet.isActive && applet.iconName[1]
                          ? applet.iconName[1]
                          : applet.iconName[0]
                      }
                      size={35}
                      style={{
                        color: applet.end
                          ? '#FF000075'
                          : applet.fav && applet.isActive
                          ? '#FF0000'
                          : '#6F6F6F',
                      }}
                    />
                  </View>
                </View>
              ))}
            </View>
          </Modal>
          <Pressable onPress={() => setModalVisible(true)}>
            <FontAwesomeIcon
              icon={'ellipsis-v'}
              size={50}
              style={{
                color: 'white',
              }}
            />
          </Pressable>
        </View>
      </View>
      <View
        style={{
          marginLeft: '6%',
          marginRight: '6%',
          height: '61%',
          borderColor: color.mainColor,
          backgroundColor: color.mode,
          borderWidth: 1,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          paddingTop: 21,
        }}
      >
        <AppletBubble
          appletTitle="Applet informations:"
          description={[
            'Created the 02/20/2023 at 18:46',
            'Last active the 02/20/2023 at 18:46',
            'Executed 10 times',
          ]}
          color={color.mainColor}
          size="informations"
        />
        <AppletBubble
          appletTitle="Applet informations:"
          description={['New tweet by: Elon Musk']}
          color={color.mainColor}
          size="action"
        />
        <ScrollView
          style={{
            marginLeft: '8%',
            marginRight: '8%',
            marginBottom: '8%',
            borderColor: color.mainColor,
            backgroundColor: color.mode,
            borderWidth: 1,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            flex: 1,
          }}
          contentContainerStyle={{
            marginLeft: '8%',
            marginRight: '8%',
            paddingTop: 21,
          }}
        >
          {appletList.map((applet, i) => (
            <AppletBubble
              key={i}
              appletTitle={applet.appletTitle}
              description={applet.description}
              color={applet.color}
              size={applet.size}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
