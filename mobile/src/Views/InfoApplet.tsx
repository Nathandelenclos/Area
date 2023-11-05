import React, { JSX, useEffect, useState } from 'react';
import {
  DimensionValue,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import AppContext from '@contexts/app.context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import appletService from '@services/applet.service';
import UserCtx from '@contexts/user.context';
import { IApplet } from '@interfaces/applet.interface';
import Header from '@components/Header';

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

  const getInfoApplet = async (id: number) => {
    const data = await appletService.getApplet(user.token, id);
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
    return navigation.addListener('focus', async () => {
      if (route.params?.id || route.params?.id !== 0) {
        await getInfoApplet(route.params.id);
      }
    });
  }, [navigation]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: color.mode,
      }}
    >
      <Header
        title={`${translate('info_applet_title')} #${id}`}
        navigation={navigation}
      />
      <View
        style={{
          marginLeft: '6%',
          marginRight: '6%',
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 20,
          maxHeight: '15%',
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
            color: 'white',
            alignSelf: 'flex-start',
            marginLeft: 10,
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
          <Pressable
            onPress={() => {
              console.log('Settings button pressed');
              setModalVisible(true);
            }}
          >
            <FontAwesomeIcon
              icon={'ellipsis-v'}
              size={30}
              style={{
                color: 'white',
                marginRight: 10,
              }}
            />
          </Pressable>
        </View>
      </View>
      <View
        style={{
          marginLeft: '6%',
          marginRight: '6%',
          borderColor: color.mainColor,
          backgroundColor: color.mode,
          borderWidth: 1,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          paddingTop: 21,
          flex: 1,
          marginBottom: 20,
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
