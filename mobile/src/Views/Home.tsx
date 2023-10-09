import React, { JSX } from 'react';
import { DimensionValue, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import AppContext from '@contexts/app.context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Title from '@components/HomeComponents/Title';
import AppletTile, { AppletProps } from '@components/HomeComponents/AppletTile';

export default function Home(): JSX.Element {
  const { color, translate } = AppContext();

  const handleAppletPress = () => {
    console.log('Applet pressed');
  };

  const appletList: AppletProps[] = [
    {
      appletTitle: "Applet",
      id: 1,
      description: "je fais une belle description hidididbd",
      color: "red",
      size: "big",
      handleOnPress: handleAppletPress,
    }, {
      appletTitle: "Applet",
      id: 2,
      description: "je fais une belle description hidididbd",
      color: "blue",
      size: "small",
      handleOnPress: handleAppletPress,
    }, {
      appletTitle: "Applet",
      id: 3,
      description: "je fais une belle description hidididbd",
      color: "green",
      size: "small",
      handleOnPress: handleAppletPress,
    }, {
      appletTitle: "Applet",
      id: 4,
      description: "je fais une belle description hidididbd",
      color: "purple",
      size: "sall",
      handleOnPress: handleAppletPress,
    }, {
      appletTitle: "Applet",
      id: 5,
      description: "je fais une belle description hidididbd",
      color: "cyan",
      size: "sall",
      handleOnPress: handleAppletPress,
    }, {
      appletTitle: "Applet",
      id: 6,
      description: "je fais une belle description hidididbd",
      color: "yellow",
      size: "sall",
      handleOnPress: handleAppletPress,
    }, {
      appletTitle: "Applet",
      id: 7,
      description: "je fais une belle description hidididbd",
      color: "purple",
      size: "sall",
      handleOnPress: handleAppletPress,
    }
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
        <Title text={translate('home_title')} textColor={color.text}/>
      </View>
      <ScrollView contentContainerStyle={{
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}>
        {appletList.map((applet, i) => (
          <AppletTile
            key= {i}
            appletTitle= {applet.appletTitle}
            id= {applet.id}
            description= {applet.description}
            color= {applet.color}
            size= {applet.size}
            handleOnPress= {applet.handleOnPress}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
