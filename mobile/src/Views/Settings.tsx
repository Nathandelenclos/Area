import React, { useState } from 'react';
import Header from '@components/Header';
import ViewContainer from '@components/ViewContainer';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import AppContext from '@contexts/app.context';
import DropDownPicker, { ItemType } from 'react-native-dropdown-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import urlServiceTs from '@services/url.service.ts';
import UserCtx from '@contexts/user.context';
import { AVAILABLE_LANGUAGE } from '@contexts/language.keys';
import Dropdown from '@components/DropDown';

type SettingsModdifierProps = {
  title: string;
  element: React.JSX.Element;
};

function SettingsModdifier({
  title,
  element,
}: SettingsModdifierProps): React.JSX.Element {
  const { color } = AppContext();

  return (
    <View
      style={{
        backgroundColor: color.mode,
        padding: 24,
        borderRadius: 20,
        alignItems: 'center',
      }}
    >
      <View>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: color.text,
            marginBottom: 20,
          }}
        >
          {title}
        </Text>
      </View>
      <View style={{ width: '100%' }}>{element}</View>
    </View>
  );
}

export default function Settings({
  navigation,
}: {
  navigation: any;
}): React.JSX.Element {
  const { color, translate, language, setLanguage } = AppContext();
  const { setUser } = UserCtx();
  const [text, onChangeText] = React.useState<string>(
    urlServiceTs.getBaseUrl(),
  );
  const [currentValue, setCurrentValue] = useState<string>(language); //mettre la langue de la bdd

  const handleBackNavigation = () => {
    navigation.pop();
  };

  const saveSettings = () => {
    const currentUrl = urlServiceTs.getBaseUrl();
    const noChange = currentUrl === text && currentValue === language;
    if (noChange) {
      navigation.pop();
      return;
    }
    if (currentValue !== language) {
      setLanguage(currentValue);
    }
    if (currentUrl === text) {
      navigation.pop();
      return;
    }
    const res = urlServiceTs.tryEditUrl(
      text,
      translate(translate('invalid_url')),
    );
    if (res) {
      setUser(null);
      return;
    }
  };

  return (
    <ViewContainer background={color.mode}>
      <Header
        title={translate('settings')}
        leftIcon={'chevron-left'}
        onPressLeft={() => handleBackNavigation()}
        bar={false}
      />
      <View
        style={{
          padding: 20,
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            justifyContent: 'space-evenly',
            flex: 1,
          }}
        >
          <SettingsModdifier
            title={translate('modify_app_url')}
            element={
              <TextInput
                onChangeText={onChangeText}
                value={text}
                style={{
                  color: color.text,
                  backgroundColor: color.background,
                  borderRadius: 5,
                  fontWeight: 'bold',
                  padding: 12,
                  width: '100%',
                }}
                autoCapitalize="none"
              />
            }
          />
          <SettingsModdifier
            title={translate('modify_app_language')}
            element={
              <Dropdown
                elements={AVAILABLE_LANGUAGE}
                currentValue={currentValue}
                setCurrentValue={setCurrentValue}
              />
            }
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: color.mainColor,
            alignItems: 'center',
            borderRadius: 20,
          }}
          onPress={saveSettings}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 24,
              fontWeight: 'bold',
              padding: 12,
            }}
          >
            {translate('save_settings')}
          </Text>
        </TouchableOpacity>
      </View>
    </ViewContainer>
  );
}
