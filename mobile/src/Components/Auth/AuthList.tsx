import React, { JSX } from 'react';
import { DimensionValue, Text, TouchableOpacity, View } from 'react-native';
import AppContext from '@contexts/app.context';
import OauthService from '@services/oauth.service';
import { IApiInvokeResponse } from '@services/API/api.invoke';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconPrefix, IconName } from '@fortawesome/fontawesome-common-types';
import UserCtx from '@contexts/user.context';
import { Storage } from '@src/Storage/user.storage';
import { AUTH_LIST } from '@interfaces/handle.auth';

function TextBetweenBar(): JSX.Element {
  const { color, translate } = AppContext();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
      }}
    >
      <View
        style={{
          flex: 1,
          height: 1,
          backgroundColor: color.subtitle,
        }}
      />
      <Text
        style={{
          marginHorizontal: 10,
          fontSize: 12,
          color: color.subtitle,
        }}
      >
        {translate('or_connect_with')}
      </Text>
      <View
        style={{
          flex: 1,
          height: 1,
          backgroundColor: color.subtitle,
        }}
      />
    </View>
  );
}

function AuthList(): JSX.Element {
  const { setUser } = UserCtx();
  async function handleOAuth(onPress: Promise<IApiInvokeResponse>) {
    const resp = await onPress;
    await Storage.saveToken(resp.data?.token);
    if (resp.data) {
      setUser(resp.data);
    }
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        marginVertical: 10,
        justifyContent: 'space-around',
      }}
    >
      {AUTH_LIST.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={{
            backgroundColor: item.color,
            padding: 10,
            borderRadius: 5,
          }}
          onPress={() => handleOAuth(item.OAuth(false, ''))}
        >
          <FontAwesomeIcon icon={item.icon} size={20} color={'white'} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default function AuthFooter({
  width,
}: {
  width: DimensionValue;
}): JSX.Element {
  const { color } = AppContext();

  return (
    <View style={{ width: width }}>
      <TextBetweenBar />
      <View
        style={{
          backgroundColor: color.mode,
          borderRadius: 20,
          padding: 10,
        }}
      >
        <AuthList />
      </View>
    </View>
  );
}
