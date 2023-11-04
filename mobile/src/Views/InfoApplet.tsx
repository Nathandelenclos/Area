import React, { JSX, useEffect, useState } from 'react';
import {
  DimensionValue,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
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
import appletService from '@services/applet.service';
import UserCtx from '@contexts/user.context';
import { IApplet } from '@interfaces/applet.interface';
import { IReaction } from '@interfaces/reaction.interface';
import { IAction } from '@interfaces/action.interface';

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
  const { user } = UserCtx();
  if (!user) {
    return <></>;
  }
  const appletDescription = 'Send an email when a Elon Musk posts a new tweet';
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState(0);
  const [applet, setApplet] = useState<IApplet>({
    reaction: {
      name: 'Reaction name',
      description: 'Reaction description',
      id: 1,
      is_available: false,
      serviceId: 1,
    },
    config: '',
    is_active: false,
    name: 'Applet name',
    description: 'Applet description',
    action: {
      name: 'Action name',
      description: 'Action description',
      id: 1,
      is_available: false,
      serviceId: 1,
    },
  });
  let isdarkmode = false;

  if (color.mode === 'black') {
    isdarkmode = true;
  }

  const getInfoApplet = async (id: number) => {
    const data = await appletService.getApplet(user.access_token, id);
    setApplet({
      name: data.data.name,
      description: data.data.description,
      is_active: data.data.is_active,
      reaction: data.data.reaction,
      action: data.data.action,
      config: data.data.config,
    });
    setId(data.data.id);
  };

  useEffect(() => {
    return navigation.addListener('focus', () => {
      if (route.params?.id || route.params?.id !== 0) {
        getInfoApplet(route.params.id);
      }
    });
  }, [navigation]);

  const handleDuplicatePress = async () => {
    const data = await appletService.createApplet(user.access_token, {
      name: applet.name,
      action: applet.action,
      reaction: applet.reaction,
      description: applet.description,
      config: applet.config,
      is_active: applet.is_active,
    });
    navigation.navigate('Mes Applets', {
      screen: 'MyApplets',
      id: data.data.id,
    });
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
    if (id === 0) {
      return;
    }
    appletService.deleteApplet(user.access_token, id);
    navigation.navigate('Mes Applets', { screen: 'MyApplets' });
  };

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
          {applet.description || 'No description'}
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
          appletTitle={applet.action.name || 'No Name'}
          description={[applet.action.description || 'No description']}
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
          {[applet.reaction].map((applet, i) => (
            <AppletBubble
              key={i}
              appletTitle={applet.name}
              description={[applet.description]}
              color={color.mainColor}
              size={'reaction'}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
