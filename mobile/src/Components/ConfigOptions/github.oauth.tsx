import React, { useEffect, useState } from 'react';
import UserCtx from '@contexts/user.context';
import Dropdown from '@components/DropDown';
import { Text, TouchableOpacity, View } from 'react-native';
import StyledButton from '@components/MyButton';
import { AUTH_LIST } from '@interfaces/handle.auth';

export default function GithubOauth({
  value,
  setValue,
  provider,
}: {
  value: string;
  setValue: (value: string) => void;
  provider: string;
}): React.JSX.Element {
  const { user, reloadUser } = UserCtx();
  const [oauthList, setOauthList] = useState<any[]>([]);
  const [currentValue, setCurrentValue] = useState<string>('');

  async function linkAccount() {
    const service = AUTH_LIST.find((e) => e.provider === provider);
    if (!service) return;
    await service.OAuth(true, user?.token);
    await reloadUser();
  }

  if (!user) return <></>;

  useEffect(() => {
    let oauthList = user.oauth ?? [];
    oauthList = oauthList.filter((e) => e.provider === provider);
    const elements = oauthList.map((e) => ({
      label: e.email,
      value: e.id,
    }));
    setOauthList(elements);
    setCurrentValue(value ?? elements[0]?.value);
  }, [user]);

  if (!oauthList.length) {
    return (
      <View style={{ alignItems: 'center', marginBottom: 10 }}>
        <Text style={{ color: 'white', marginTop: 10 }}>
          Vous n'avez pas de compte {provider} lié
        </Text>
        <StyledButton
          title={`Lier un compte ${provider}`}
          onPress={linkAccount}
        />
      </View>
    );
  }

  return (
    <Dropdown
      currentValue={currentValue}
      setCurrentValue={(value) => {
        setValue(value);
        setCurrentValue(value);
      }}
      elements={oauthList}
    />
  );
}
