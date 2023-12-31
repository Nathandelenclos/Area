import React, { JSX } from 'react';
import { Text, View } from 'react-native';
import MyButton from '@components/MyButton';
import { Title } from '@components/Title';
import { AuthViewContainer, AuthFooter, AuthTextInput } from '@components/Auth';
import BackButton from '@components/BackButton';
import authService from '@services/auth.service';
import AppContext from '@contexts/app.context';
import UserCtx from '@contexts/user.context';
import { Storage } from '@src/Storage/user.storage';
import SettingsButton from '@components/SettingsButton';

export default function SignIn({
  navigation,
}: {
  navigation: any;
}): JSX.Element {
  const { color, translate } = AppContext();
  const { setUser } = UserCtx();
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  async function tryLogin() {
    const resp = await authService.login({ email: email.trim(), password });
    if (!resp.data) return;
    const user = await authService.getProfile(resp.data.token);
    if (!user.data) return;
    await Storage.saveToken(resp.data?.token);
    setUser({ ...user.data, token: resp.data?.token });
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
        <SettingsButton onPress={() => navigation.navigate('ChangeURL')} />
        <BackButton navigation={navigation} />
        <Title
          title={translate('sign_in')}
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
          <AuthTextInput
            placeholder={translate('password')}
            secure={true}
            setText={setPassword}
            text={password}
          />
          <View style={{ paddingVertical: 5 }} />
          <MyButton title={translate('sign_in')} onPress={tryLogin} />
        </View>
        <AuthFooter width={'90%'} />
      </View>
    </AuthViewContainer>
  );
}
