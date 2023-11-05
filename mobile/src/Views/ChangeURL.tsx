import React, { JSX } from 'react';
import { Keyboard, View } from 'react-native';
import MyButton from '@components/MyButton';
import { Title } from '@components/Title';
import { AuthViewContainer, AuthTextInput } from '@components/Auth';
import BackButton from '@components/BackButton';
import authService from '@services/auth.service';
import AppContext from '@contexts/app.context';
import UrlServiceTs from '@services/url.service.ts';
import UserCtx from '@contexts/user.context';
import Toast from 'react-native-toast-message';

export default function ChangeURL({
  navigation,
}: {
  navigation: any;
}): JSX.Element {
  const { color, translate } = AppContext();
  const { setUser } = UserCtx();
  const [url, setUrl] = React.useState<string>(UrlServiceTs.getBaseUrl());

  function showErrorUrl() {
    Toast.show({
      type: 'error',
      text1: translate('invalid_url'),
      visibilityTime: 3000,
      autoHide: true,
      position: 'bottom',
    });
  }

  async function tryEditUrl() {
    if (!url) {
      showErrorUrl();
      return;
    }
    const regex = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i',
    );
    if (!regex.test(url)) {
      showErrorUrl();
      return;
    }
    let newUrl = url;
    if (newUrl[newUrl.length - 1] === '/') {
      newUrl = newUrl.slice(0, newUrl.length - 1);
    }
    await UrlServiceTs.editUrl(newUrl);
    Keyboard.dismiss();
    setUser(null);
    navigation.popToTop();
  }

  return (
    <AuthViewContainer>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <BackButton navigation={navigation} />
        <Title
          title={translate('modify_app_url')}
          style={{ color: color.textOverMainColor }}
        />
      </View>
      <View
        style={{
          flex: 2.5,
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: '90%',
            backgroundColor: color.mode,
            padding: 20,
            borderRadius: 20,
          }}
        >
          <AuthTextInput placeholder={'URL'} text={url} setText={setUrl} />
          <View style={{ paddingVertical: 5 }} />
          <MyButton title={translate('modify')} onPress={tryEditUrl} />
        </View>
      </View>
    </AuthViewContainer>
  );
}
