import React, { JSX } from 'react';
import { Linking, Text, View } from 'react-native';
import MyButton from '@components/MyButton';
import { Title } from '@components/Title';
import { AuthViewContainer, AuthFooter, AuthTextInput } from '@components/Auth';
import BackButton from '@components/BackButton';
import authService from '@services/auth.service';
import AppContext from '@contexts/app.context';
import UserCtx from '@contexts/user.context';
import SettingsButton from '@components/SettingsButton';

function TermsAndConditions(): JSX.Element {
  const { color, translate } = AppContext();

  const TermsOfService = () => {
    return Linking.openURL('youtube://');
  };

  const PrivacyPolicy = () => {
    return Linking.openURL('instagram://');
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ color: color.text, fontSize: 12 }}>
        {translate('to_pp') + ' '}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        <Text
          style={{ color: color.mainColor, fontSize: 12 }}
          onPress={TermsOfService}
        >
          {translate('to') + ' '}
        </Text>
        <Text
          style={{
            color: color.text,
            fontSize: 12,
          }}
        >
          {translate('and') + ' '}
        </Text>
        <Text
          style={{
            color: color.mainColor,
            fontSize: 12,
          }}
          onPress={PrivacyPolicy}
        >
          {translate('pp')}
        </Text>
      </View>
    </View>
  );
}

export default function SignUp({
  navigation,
}: {
  navigation: any;
}): JSX.Element {
  const { color, translate } = AppContext();
  const { setUser } = UserCtx();
  const [name, setFullName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  async function trySignUp() {
    const resp = await authService.register({
      name: name.trim(),
      email: email.trim(),
      password,
    });
    if (resp.data) {
      setUser(resp.data);
    }
  }

  return (
    <AuthViewContainer>
      <View
        style={{
          flex: 0.2,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <SettingsButton onPress={() => navigation.navigate('ChangeURL')} />
        <BackButton navigation={navigation} />
        <Title
          title={translate('sign_up')}
          style={{ color: color.textOverMainColor }}
        />
      </View>
      <View
        style={{
          flex: 1,
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
            placeholder={translate('full_name')}
            text={name}
            setText={setFullName}
          />
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
          <MyButton title={translate('sign_up')} onPress={trySignUp} />
          <TermsAndConditions />
        </View>
        <AuthFooter width={'90%'} />
      </View>
    </AuthViewContainer>
  );
}
