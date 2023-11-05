import React, { Dispatch, JSX, SetStateAction, useState } from 'react';
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AppContext from '@contexts/app.context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Title } from '@components/Title';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import UserCtx from '@contexts/user.context';
import ModalContainer from '@components/ModaleContainer';
import { AUTH_LIST, AuthItem } from '@interfaces/handle.auth';
import { IApiInvokeResponse } from '@services/API/api.invoke';
import StyledButton from '@components/MyButton';
import AuthService from '@services/auth.service';
import OauthService from '@services/oauth.service';

type InputFieldProps = {
  title: string;
  placeholder: string;
  hide?: boolean;
  mode: string;
  text: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
};

function InputField({
  title,
  placeholder,
  hide = false,
  mode,
  text,
  onChangeText,
}: InputFieldProps): React.JSX.Element {
  const [isPasswordVisible, setPasswordVisibility] =
    React.useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  return (
    <View>
      <Text
        style={{
          color: mode === 'white' ? 'black' : 'white',
          fontSize: 16,
          fontWeight: 'bold',
          marginBottom: '2%',
        }}
      >
        {title}
      </Text>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          width: '100%',
          height: 40,
          borderColor: '#EEEEEE',
          borderWidth: 3,
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 10,
        }}
      >
        <TextInput
          secureTextEntry={hide ? !isPasswordVisible : false}
          placeholder={placeholder}
          placeholderTextColor={'gray'}
          autoCapitalize="none"
          style={{
            width: '90%',
            height: '100%',
            color: 'black',
            fontWeight: 'bold',
            padding: 0,
          }}
          onChangeText={onChangeText}
          value={text}
        />
        {hide && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            style={{ marginLeft: 10 }}
          >
            <FontAwesomeIcon
              icon={isPasswordVisible ? faEyeSlash : faEye}
              size={24}
              style={{
                color: 'gray',
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

function RenderConnectedServices({
  coServicesList,
}: {
  coServicesList: any[];
}): React.JSX.Element {
  const { translate } = AppContext();
  const { color } = AppContext();

  if (coServicesList.length === 0) {
    return (
      <Title
        style={{ marginBottom: 30, fontSize: 12 }}
        title={translate('empty_oauth')}
      />
    );
  }

  return (
    <View style={{ marginBottom: 30 }}>
      {coServicesList.map((item: any, index: number) => (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
          }}
        >
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: item.color,
              borderRadius: 10,
              height: 40,
              width: 40,
              marginRight: 10,
            }}
          >
            <FontAwesomeIcon icon={item.icon} size={20} color={'white'} />
          </View>
          <Text
            style={{
              color: color.text,
              fontSize: 15,
              fontWeight: '700',
            }}
          >
            {item.name}
          </Text>
          <TouchableOpacity
            onPress={() => item.function()}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              height: 30,
              width: 30,
              marginLeft: 10,
            }}
          >
            <FontAwesomeIcon icon={'xmark'} size={20} color={'red'} />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

function RenderNoConnectedServices({
  data,
  itemsPerRow,
  pressInfoService,
  forcedColor,
}: {
  data: AuthItem[];
  itemsPerRow: number;
  pressInfoService: any;
  forcedColor?: string;
}): React.JSX.Element {
  const rows = [];
  const { translate } = AppContext();
  const { user } = UserCtx();

  if (data.length === 0)
    return (
      <Title
        style={{ marginBottom: 30, fontSize: 12 }}
        title={translate('empty_oauth')}
      />
    );

  for (let i = 0; i < data.length; i += itemsPerRow) {
    const rowItems = data.slice(i, i + itemsPerRow);
    const isLastRow = i + itemsPerRow >= data.length;

    const row = (
      <View
        key={i}
        style={{
          flexDirection: 'row',
          marginBottom: isLastRow ? 30 : 12,
        }}
      >
        {rowItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => pressInfoService(item.OAuth(true, user?.token))}
          >
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: forcedColor ?? item.color,
                borderRadius: 20,
                height: 60,
                width: 60,
                marginHorizontal: index < itemsPerRow ? 15 : 0,
              }}
            >
              <FontAwesomeIcon icon={item.icon} size={30} color={'white'} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );

    rows.push(row);
  }

  return <>{rows}</>;
}

type LogoutModalProps = {
  modalLogoutVisible: boolean;
  setModalLogoutVisible: Dispatch<SetStateAction<boolean>>;
  logoutUserOrOauth: number;
};

function LogoutModal({
  modalLogoutVisible,
  setModalLogoutVisible,
  logoutUserOrOauth,
}: LogoutModalProps): React.JSX.Element {
  const { color, translate } = AppContext();
  const { setUser, user, reloadUser } = UserCtx();

  const logoutUser = async () => {
    if (logoutUserOrOauth !== -1) {
      const resp = await OauthService.logout(user?.token, logoutUserOrOauth);
      if (resp.data) await reloadUser();
      setModalLogoutVisible(false);
    } else {
      setUser(null);
    }
  };

  return (
    <ModalContainer
      modalVisible={modalLogoutVisible}
      setModalVisible={setModalLogoutVisible}
    >
      <View
        style={{
          backgroundColor: color.mode,
          width: '70%',
          padding: 12,
          justifyContent: 'center',
          borderRadius: 20,
        }}
      >
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            marginRight: 12,
            marginTop: 12,
          }}
          onPress={() => setModalLogoutVisible(!modalLogoutVisible)}
        >
          <FontAwesomeIcon
            icon={'times'}
            size={25}
            style={{ color: color.text }}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: color.text,
            fontSize: 12,
            fontWeight: '500',
            marginRight: 39,
            marginBottom: 20,
          }}
        >
          {translate('decolog_message')}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: '5%',
            justifyContent: 'flex-end',
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              borderColor: 'black',
              borderWidth: 1,
              paddingHorizontal: 12,
              paddingVertical: 8,
              marginRight: 12,
            }}
            onPress={() => setModalLogoutVisible(!modalLogoutVisible)}
          >
            <Text style={{ color: 'black', fontSize: 12, fontWeight: '700' }}>
              {translate('cancel')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: color.mainColor,
              borderRadius: 10,
              paddingHorizontal: 12,
              paddingVertical: 8,
            }}
            onPress={logoutUser}
          >
            <Text style={{ color: 'white', fontSize: 12, fontWeight: '700' }}>
              {translate('decolog')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ModalContainer>
  );
}

type PasswordModalProps = {
  modalPasswordVisible: boolean;
  setModalPasswordVisible: Dispatch<SetStateAction<boolean>>;
};

function PasswordModal({
  modalPasswordVisible,
  setModalPasswordVisible,
}: PasswordModalProps): React.JSX.Element {
  const { color, translate } = AppContext();
  const { user } = UserCtx();
  const [text, onChangeText] = React.useState<string>('');

  async function ChangePassword() {
    const resp = await AuthService.changePassword(user?.token, {
      password: text.trim(),
    });
    if (resp.data) {
      onChangeText('');
      setModalPasswordVisible(false);
    }
  }

  return (
    <ModalContainer
      modalVisible={modalPasswordVisible}
      setModalVisible={setModalPasswordVisible}
    >
      <View
        style={{
          backgroundColor: color.mode,
          height: '40%',
          width: '80%',
          padding: 12,
          justifyContent: 'center',
          borderRadius: 20,
        }}
      >
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            marginRight: 12,
            marginTop: 12,
          }}
          onPress={() => setModalPasswordVisible(!modalPasswordVisible)}
        >
          <FontAwesomeIcon
            icon={'times'}
            size={25}
            style={{ color: color.text }}
          />
        </TouchableOpacity>
        <InputField
          placeholder="New Password"
          title={translate('modify_password')}
          hide={true}
          mode={color.mode}
          text={text}
          onChangeText={onChangeText}
        />
        {text.trim().length > 0 && (
          <StyledButton title={'Valider'} onPress={ChangePassword} />
        )}
      </View>
    </ModalContainer>
  );
}

export default function Profile({
  navigation,
}: {
  navigation: any;
}): JSX.Element {
  const { color, translate } = AppContext();
  const { user, reloadUser } = UserCtx();
  const [modalPasswordVisible, setModalPasswordVisible] = useState(false);
  const [modalLogoutVisible, setModalLogoutVisible] = useState(false);
  const [oauthToDelete, setOauthToDelete] = useState(-1);

  const changePassword = () => {
    console.log('change password pressed');
    setModalPasswordVisible(true);
  };

  const changePic = () => {
    console.log('change pic pressed');
  };

  const pressInfoService = async (result: Promise<IApiInvokeResponse>) => {
    const resp = await result;
    if (resp.data) await reloadUser();
  };

  const logoutUserPressed = () => {
    setModalLogoutVisible(true);
  };

  const settingsPressed = () => {
    navigation.navigate('Setting');
  };

  const userOauthList =
    user?.oauth?.map((item) => {
      const service: AuthItem | undefined = AUTH_LIST.find(
        (auth) => auth.provider === item.provider,
      );
      if (!service) return null;
      return {
        name: item.email,
        icon: service.icon,
        color: service.color,
        function: () => {
          setOauthToDelete(item.id);
          setModalLogoutVisible(true);
        },
      };
    }) ?? [];

  const coServicesList = userOauthList.filter((item) => item !== null) ?? [];

  if (!user) return <></>;

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          flex: 0,
          backgroundColor: color.mainColor,
        }}
      />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: color.mode,
        }}
      >
        <View
          style={{
            backgroundColor: color.mainColor,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            alignItems: 'center',
            paddingVertical: 32,
          }}
        >
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 36,
              width: '100%',
            }}
          >
            <TouchableOpacity
              style={{ position: 'absolute', left: 0, marginLeft: 24 }}
              onPress={settingsPressed}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <FontAwesomeIcon
                icon={'cog'}
                size={25}
                style={{ color: color.textOverMainColor }}
              />
            </TouchableOpacity>
            <Title
              title={translate('pofile_title')}
              style={{ color: color.textOverMainColor }}
            />
            <TouchableOpacity
              style={{ position: 'absolute', right: 0, marginRight: 24 }}
              onPress={logoutUserPressed}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <FontAwesomeIcon
                icon={'sign-out-alt'}
                size={25}
                style={{ color: color.textOverMainColor }}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={changePic}>
            <FontAwesomeIcon
              icon={'circle-user'}
              size={70}
              style={{ color: color.textOverMainColor, marginBottom: '3%' }}
            />
          </TouchableOpacity>

          <Text
            style={{
              color: color.textOverMainColor,
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: '2%',
            }}
          >
            {user.name}
          </Text>

          <Text
            style={{
              color: color.textOverMainColor,
              textDecorationLine: 'underline',
              fontSize: 12,
              fontWeight: '500',
              marginBottom: '8%',
            }}
          >
            {user.email}
          </Text>

          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              paddingVertical: 8,
              paddingHorizontal: 12,
            }}
            onPress={changePassword}
          >
            <Text style={{ color: 'black', fontSize: 12, fontWeight: '700' }}>
              {translate('modify_password') + ' >'}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          <View
            style={{
              alignItems: 'center',
              paddingVertical: 20,
            }}
          >
            <Text
              style={{
                color: color.text,
                fontSize: 18,
                fontWeight: '700',
                marginBottom: 30,
              }}
            >
              {translate('connected_services')}
            </Text>
            <RenderConnectedServices coServicesList={coServicesList} />
            <Text
              style={{
                color: color.text,
                fontSize: 18,
                fontWeight: '700',
                marginBottom: 30,
              }}
            >
              {translate('to_connect_services')}
            </Text>
            <RenderNoConnectedServices
              itemsPerRow={4}
              data={AUTH_LIST}
              pressInfoService={pressInfoService}
              forcedColor={'#6F6F6F'}
            />
          </View>
        </ScrollView>

        <PasswordModal
          modalPasswordVisible={modalPasswordVisible}
          setModalPasswordVisible={setModalPasswordVisible}
        />

        <LogoutModal
          modalLogoutVisible={modalLogoutVisible}
          setModalLogoutVisible={setModalLogoutVisible}
          logoutUserOrOauth={oauthToDelete}
        />
      </SafeAreaView>
    </View>
  );
}
