import React, { JSX } from 'react';
import { StyleSheet, TextInput, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import AppContext from '@contexts/app.context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Title } from '@components/Title';
import AppletTile, { AppletProps } from '@components/HomeComponents/AppletTile';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthViewContainer, AuthFooter, AuthTextInput } from '@components/Auth';
import BackButton from '@components/BackButton';

type servicesProps = {
  color: string;
  name: string;
};

function renderRows(data: servicesProps[], itemsPerRow: number, pressInfoService: any) {
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

export default function Profile(): JSX.Element {
  const { color, translate } = AppContext();

  const changePassword = () => {
    console.log('change password pressed');
  };

  const changePic = () => {
    console.log('change pic pressed');
  };

  const pressInfoService = ( name : string ) => {
    console.log('press info ' + name + ' pressed');
  }

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
      color: 'black',
      name: 'Spotify',
    }, {
      color: 'black',
      name: 'Google',
    }, {
      color: 'black',
      name: 'Facebook',
    }, {
      color: 'black',
      name: 'Twitter',
    }, {
      color: 'black',
      name: 'Outlook',
    }, {
      color: 'black',
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
        <BackButton navigation={{}} />
        <Title
          title={translate('pofile_title')}
          style={{ color: color.textOverMainColor, marginBottom: '9%' }}
        />
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
            backgroundColor: color.mode,
            borderRadius: 10,
            paddingVertical: 8,
            paddingHorizontal: 12,
          }}
          onPress={changePassword}
        >
          <Text style={{ color: color.text, fontSize: 12, fontWeight: '700'}}>
            {translate('modify_password') + ' >'}
          </Text>
        </TouchableOpacity>
      </View>
      <View>
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
            {renderRows(coServicesList, 3, pressInfoService)}
          </View>
          <Text style={{ color: color.text, fontSize: 18, fontWeight: '700', marginBottom: 30}}>
            {translate('to_connect_services')}
          </Text>
          <View>
            {renderRows(servicesList, 3, pressInfoService)}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
