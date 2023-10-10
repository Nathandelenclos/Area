import React, { JSX } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import AppContext from '@contexts/app.context';
import Title from '@components/HomeComponents/Title';
import AppletTile, { AppletProps } from '@components/HomeComponents/AppletTile';

export default function Home({ navigation }: { navigation: any }): JSX.Element {
  const { color, translate } = AppContext();

  const handleAppletPress = () => {
    navigation.navigate('InfoApplet', { id: 1 });
    console.log('Applet pressed');
  };

  const appletList: AppletProps[] = [
    {
      appletTitle: 'Applet',
      id: 1,
      description: 'je fais une belle description hidididbd',
      color: '#7a73e7',
      size: 'big',
      handleOnPress: handleAppletPress,
    },
    {
      appletTitle: 'Applet',
      id: 2,
      description: 'je fais une belle description hidididbd',
      color: '#73E77B',
      size: 'small',
      handleOnPress: handleAppletPress,
    },
    {
      appletTitle: 'Applet',
      id: 3,
      description: 'je fais une belle description hidididbd',
      color: '#E77B73',
      size: 'small',
      handleOnPress: handleAppletPress,
    },
    {
      appletTitle: 'Applet',
      id: 4,
      description: 'je fais une belle description hidididbd',
      color: '#7a73e7',
      size: 'sall',
      handleOnPress: handleAppletPress,
    },
    {
      appletTitle: 'Applet',
      id: 5,
      description: 'je fais une belle description hidididbd',
      color: '#73E77B',
      size: 'sall',
      handleOnPress: handleAppletPress,
    },
    {
      appletTitle: 'Applet',
      id: 6,
      description: 'je fais une belle description hidididbd',
      color: '#E77B73',
      size: 'sall',
      handleOnPress: handleAppletPress,
    },
    {
      appletTitle: 'Applet',
      id: 7,
      description: 'je fais une belle description hidididbd',
      color: '#7a73e7',
      size: 'sall',
      handleOnPress: handleAppletPress,
    },
  ];

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
        <Title text={translate('home_title')} textColor={color.text} />
      </View>
      <ScrollView
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        {appletList.map((applet, i) => (
          <AppletTile
            key={i}
            appletTitle={applet.appletTitle}
            id={applet.id}
            description={applet.description}
            color={applet.color}
            size={applet.size}
            handleOnPress={applet.handleOnPress}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
