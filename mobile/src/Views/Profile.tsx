import React, { Dispatch, JSX, SetStateAction, useState } from 'react';
import { Modal, Pressable, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AppContext from '@contexts/app.context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Title } from '@components/Title';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

type InputFieldProps = {
  title: string;
  placeholder: string;
  hide?: boolean;
  mode: string;
};

function InputField({
  title,
  placeholder,
  hide = false,
  mode,
}: InputFieldProps): React.JSX.Element {
  const [text, onChangeText] = React.useState<string>(placeholder);
  const [isPasswordVisible, setPasswordVisibility] = React.useState<boolean>(false);

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
      <View style={{
        justifyContent: 'center',
      }}
      >
        <TextInput
          secureTextEntry={hide ? !isPasswordVisible : false}
          autoCapitalize="none"
          style={{
            height: 40,
            borderColor: '#EEEEEE',
            borderWidth: 3,
            color: 'black',
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 10,
            fontWeight: 'bold',
          }}
          onChangeText={onChangeText}
          value={text}
        />
        {hide && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            style={{
              position: 'absolute',
              right: 10,
            }}
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

type servicesProps = {
  color: string;
  name: string;
};

function RenderRows(data: servicesProps[], itemsPerRow: number, pressInfoService: any) {
  const rows = [];
  const totalRows = Math.ceil(data.length / itemsPerRow);

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
          <TouchableOpacity key={index} onPress={() => pressInfoService(item.name)}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: item.color,
                borderRadius: 20,
                height: 60,
                width: 60,
                marginRight: index < itemsPerRow - 1 ? 30 : 0,
              }}
            >
              <Text style={{ color: 'white', fontSize: 18, fontWeight: '700' }}>
                {item.name[0]}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );

    rows.push(row);
  }

  return rows;
}

type LogoutModalProps = {
  modalLogoutVisible: boolean;
  setModalLogoutVisible: Dispatch<SetStateAction<boolean>>;
}

function LogoutModal({modalLogoutVisible, setModalLogoutVisible} : LogoutModalProps): React.JSX.Element {
  const { color, translate } = AppContext();

  const logoutUser = () => {
    console.log('logout user');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalLogoutVisible}
      onRequestClose={() => {
        setModalLogoutVisible(!modalLogoutVisible);
      }}
    >
      <Pressable
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          backgroundColor: color.mode === 'white' ? '#00000075' : '#FFFFFF75',
        }}
        onPress={() => setModalLogoutVisible(!modalLogoutVisible)}
      />
      <View 
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
        }}
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
          <TouchableOpacity style={{ position: 'absolute', top: 0, right: 0, marginRight: 12, marginTop: 12,}} onPress={() => setModalLogoutVisible(!modalLogoutVisible)}>
            <FontAwesomeIcon
              icon={'times'}
              size={25}
              style={{color: color.text}}
            />
          </TouchableOpacity>
          <Text style={{ color: color.text, fontSize: 12, fontWeight: '500', marginRight: 39, marginBottom: 20,}}>
            {translate('decolog_message')}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: '5%',
              justifyContent: 'flex-end',
            }}
          >
            <TouchableOpacity style={{ backgroundColor: 'white', borderRadius: 10, borderColor: 'black', borderWidth: 1, paddingHorizontal: 12, paddingVertical: 8, marginRight: 12, }} onPress={() => setModalLogoutVisible(!modalLogoutVisible)}>
              <Text style={{ color: 'black', fontSize: 12, fontWeight: '700'}}>
                {translate('cancel')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: color.mainColor, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8, }} onPress={logoutUser}>
              <Text style={{ color: 'white', fontSize: 12, fontWeight: '700'}}>
                {translate('decolog')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

type PasswordModalProps = {
  modalPasswordVisible: boolean;
  setModalPasswordVisible: Dispatch<SetStateAction<boolean>>;
}

function PasswordModal({modalPasswordVisible, setModalPasswordVisible} : PasswordModalProps): React.JSX.Element {
  const { color, translate } = AppContext();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalPasswordVisible}
      onRequestClose={() => {
        setModalPasswordVisible(!modalPasswordVisible);
      }}
    >
      <Pressable
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          backgroundColor: color.mode === 'white' ? '#00000075' : '#FFFFFF75',
        }}
        onPress={() => setModalPasswordVisible(!modalPasswordVisible)}
      />
      <View 
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
        }}
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
          <TouchableOpacity style={{ position: 'absolute', top: 0, right: 0, marginRight: 12, marginTop: 12,}} onPress={() => setModalPasswordVisible(!modalPasswordVisible)}>
            <FontAwesomeIcon
              icon={'times'}
              size={25}
              style={{color: color.text}}
            />
          </TouchableOpacity>
          <InputField
            placeholder='Ancien mot de passe'
            title={translate('modify_password')}
            hide={true}
            mode={color.mode}
          />
        </View>
      </View>
    </Modal>
  );
} 

export default function Profile(): JSX.Element {
  const { color, translate } = AppContext();
  const [modalPasswordVisible, setModalPasswordVisible] = useState(false);
  const [modalLogoutVisible, setModalLogoutVisible] = useState(false);

  const changePassword = () => {
    console.log('change password pressed');
    setModalPasswordVisible(true);
  };

  const changePic = () => {
    console.log('change pic pressed');
  };

  const pressInfoService = ( name : string ) => {
    console.log('press info ' + name + ' pressed');
  }

  const logoutUserPressed = () => {
    console.log('logout pressed');
    setModalLogoutVisible(true);
  };

  const coServicesList: servicesProps[] = [
    {
      color: '#73E77B',
      name: 'Spotify',
    }, {
      color: '#FF0021',
      name: 'Google',
    }, {
      color: '#2115E3',
      name: 'Facebook',
    },
  ];

  const servicesList: servicesProps[] = [
    {
      color: '#6F6F6F',
      name: 'Spotify',
    }, {
      color: '#6F6F6F',
      name: 'Google',
    }, {
      color: '#6F6F6F',
      name: 'Facebook',
    }, {
      color: '#6F6F6F',
      name: 'Twitter',
    }, {
      color: '#6F6F6F',
      name: 'Outlook',
    }, {
      color: '#6F6F6F',
      name: 'WhatsApp',
    },
  ];

  return (
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
          <Title
            title={translate('pofile_title')}
            style={{ color: color.textOverMainColor }}
          />
          <TouchableOpacity
            style={{position: 'absolute', right: 0, marginRight: 24}}
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
            style={{ color: color.textOverMainColor, marginBottom: '3%'}}
          />
        </TouchableOpacity>

        <Text style={{ color: color.textOverMainColor, fontSize: 20, fontWeight: 'bold', marginBottom: '2%'}}>
          Simon Riembault
          {/* {user.surname + ' ' + user.name} */}
        </Text>

        <Text style={{ color: color.textOverMainColor, textDecorationLine: 'underline', fontSize: 12, fontWeight: '500', marginBottom: '8%'}}>
          simon.riembault@gmail.com
          {/* {user.email} */}
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
          <Text style={{ color: 'black', fontSize: 12, fontWeight: '700'}}>
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
          <Text style={{ color: color.text, fontSize: 18, fontWeight: '700', marginBottom: 30}}>
            {translate('connected_services')}
          </Text>
          <View>
            {RenderRows(coServicesList, 3, pressInfoService)}
          </View>
          <Text style={{ color: color.text, fontSize: 18, fontWeight: '700', marginBottom: 30}}>
            {translate('to_connect_services')}
          </Text>
          <View>
            {RenderRows(servicesList, 3, pressInfoService)}
          </View>
        </View>
      </ScrollView>

      <PasswordModal modalPasswordVisible={modalPasswordVisible} setModalPasswordVisible={setModalPasswordVisible}/>

      <LogoutModal modalLogoutVisible={modalLogoutVisible} setModalLogoutVisible={setModalLogoutVisible}/>

    </SafeAreaView>
  );
}
