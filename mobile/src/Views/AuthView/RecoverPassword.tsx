import React, { JSX } from 'react';
import { View } from 'react-native';
import MyButton from '@components/MyButton';
import { Title } from '@components/Title';
import AuthViewContainer from '@components/AuthComponent/AuthViewContainer';
import BackButton from '@components/BackButton';
import AuthTextInput from '@components/AuthComponent/AuthTextInput';
import authService from '@services/auth.service';
import AppContext from '@contexts/app.context';

export default function RecoverPassword({
  navigation,
}: {
  navigation: any;
}): JSX.Element {
  const { color, translate } = AppContext();
  const [email, setEmail] = React.useState<string>('');

  async function tryRecoverPassword() {
    const resp = await authService.forgotPassword(email);
    console.log('Recover Password');
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
          title={translate('recover_password')}
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
          <AuthTextInput
            placeholder={translate('email')}
            text={email}
            setText={setEmail}
          />
          <View style={{ paddingVertical: 5 }} />
          <MyButton
            title={translate('send_email')}
            onPress={tryRecoverPassword}
          />
        </View>
      </View>
    </AuthViewContainer>
  );
}
