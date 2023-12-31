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
import authService from '@services/auth.service';

/**
 * Type for the authList variable.
 * @interface AuthItem
 */
type AuthItem = {
  /**
   * color of the service.
   */
  color: string;
  /**
   * icon of the service.
   */
  icon: [IconPrefix, IconName];
  /**
   * OAuth function of the service.
   */
  OAuth: () => Promise<IApiInvokeResponse>;
};

/**
 * TextBetweenBar is a part of the component AuthFooter.
 * It takes no props.
 *
 * @component
 * @example
 * // Example usage of TextBetweenBar component
 * <TextBetweenBar />
 *
 * @returns {JSX.Element} - Returns the rendered TextBetweenBar component.
 */
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

/**
 * AuthList is a part of the component AuthFooter.
 * It takes no props.
 *
 * @component
 * @example
 * // Example usage of AuthList component
 * <AuthList />
 *
 * @returns {JSX.Element} - Returns the rendered AuthList component.
 */
function AuthList(): JSX.Element {
  const { setUser } = UserCtx();
  async function handleOAuth(onPress: Promise<IApiInvokeResponse>) {
    const resp = await onPress;
    if (!resp.data) return;
    const user = await authService.getProfile(resp.data.token);
    if (!user.data) return;
    await Storage.saveToken(resp.data?.token);
    setUser({ ...user.data, token: resp.data?.token });
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
          testID={'oauth-button'}
        >
          <FontAwesomeIcon icon={item.icon} size={20} color={'white'} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

/**
 * AuthFooter is a reusable component for every AuthFooter in the app.
 * It takes a width as props.
 *
 * @component
 * @example
 * // Example usage of AuthFooter component
 * <AuthFooter
 *   width={'100%'}
 * />
 *
 * @param {DimensionValue} props.width - Width of the AuthFooter component.
 * @returns {JSX.Element} - Returns the rendered AuthFooter component.
 */
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
