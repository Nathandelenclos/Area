import React, { JSX } from 'react';
import { Image, View } from 'react-native';
import MyButton from '@components/MyButton';
import { Title } from '@components/Title';
import AuthViewContainer from '@components/AuthComponent/AuthViewContainer';
import AuthFooter from '@components/AuthComponent/AuthList';
import AppContext from '@contexts/app.context';

export default function LoginScreen({
  navigation,
}: {
  navigation: any;
}): JSX.Element {
  const { color, translate, appName } = AppContext();
  const IMAGE = require('../../Assets/Logo.png');

  return (
    <AuthViewContainer>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          source={IMAGE}
          style={{
            height: '40%',
            aspectRatio: 1,
            borderRadius: 20,
          }}
        />
        <Title title={appName} style={{ color: color.textOverMainColor }} />
      </View>
      <View
        style={{
          flex: 2,
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: '90%',
            backgroundColor: color.mode,
            padding: 10,
            borderRadius: 20,
          }}
        >
          <Title
            title={translate('welcome_to') + appName}
            style={{ paddingTop: 20 }}
          />
          <View style={{ marginTop: 30 }} />
          <MyButton
            title={translate('sign_in')}
            onPress={() => navigation.navigate('SignIn')}
          />
          <MyButton
            inverse={true}
            title={translate('sign_up')}
            onPress={() => navigation.navigate('SignUp')}
          />
          <AuthFooter width={'100%'} />
        </View>
      </View>
    </AuthViewContainer>
  );
}
