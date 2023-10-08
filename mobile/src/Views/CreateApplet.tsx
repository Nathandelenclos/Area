import React, { JSX } from 'react';
import { DimensionValue, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import AppContext from '@contexts/app.context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Title from '@components/HomeComponents/Title';
import AppletTile from '@components/HomeComponents/AppletTile';

export type BoxCreateAppletProps = {
    colormode: string,
    id: number,
    handleOnPress: () => void,
    handleOnPressMinus: (idToDelete: number) => void,
  }
  
  const BoxCreateApplet = ({ colormode, id, handleOnPress, handleOnPressMinus }: BoxCreateAppletProps) => {
    let color: string = '';
    let colortext: string = '';
    let text: string = '';
    let isdarkmode: boolean = false;
    let isid1: boolean = false;

    if (id === 1) {
      isid1 = true;
        if (colormode === 'black') {
          isdarkmode = true;
          color = 'white';
          colortext = 'black';
        } else {
          color = 'black';
          colortext = 'white';
        }
        text = 'If This';
    } else {
        if (colormode === 'white') {
          color = '#6F6F6F';
        } else {
          isdarkmode = true;
          color = '#6F6F6F';
        }
        colortext = 'white';
        text = 'Then That';
    }
  
    return (
      <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}>
        <TouchableOpacity onPress={handleOnPress}
          style={{
            backgroundColor: color,
            borderRadius: 10,
            width: '88%',
            height: 89,
            marginLeft: '6%',
            display: 'flex',
          }}
        >
          <View 
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%'
            }}
          >
            <Text
              style={{
                color: colortext,
                fontSize: 24,
                fontWeight: 'bold',
              }}
            >
              {text + ' #' + id}
            </Text>
            <TouchableOpacity 
              onPress={handleOnPress}
              style={{
                backgroundColor: isdarkmode ? 'black' : 'white',
                width: '15%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                position: 'absolute',
                left: '79%',
                right: '6%',
                paddingVertical: 2,
              }}
            >
              <Text
                style={{
                  color: isdarkmode ? 'white' : 'black',
                  fontSize: 12,
                  fontWeight: 'bold',
                }}
              >
                Add
              </Text>
            </TouchableOpacity>
            { !isid1 ? (
              <TouchableOpacity 
                onPress={() => handleOnPressMinus(id)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                style={{
                  backgroundColor: isdarkmode ? 'black' : 'white',
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  position: 'absolute',
                  left: '8%',
                  right: '86%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <FontAwesomeIcon
                  icon={'minus'}
                  size={15}
                  style={{ 
                    color: isdarkmode ? 'white' : 'black',
                  }}
                />
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>
        </TouchableOpacity>
        <View style={{
          backgroundColor: '#D9D9D9',
          width: '2%',
          height: 24,
          marginLeft: '49%',
        }} />
      </View>
    );
  };
  

export default function CreateApplet(): JSX.Element {
  const { color, translate } = AppContext();
  
  const handleAppletPress = () => {
    console.log('Applet pressed');
  };
  
  const handleAppletPressMinus = (idToDelete: number) => {
    setappletList(prevList => prevList.filter(applet => applet.id !== idToDelete));
    console.log('Minus pressed');
  };

  const handleAppletPressPlus = () => {
    const lastId = appletList[appletList.length - 1].id;
    setappletList([
      ...appletList,
      {
        colormode: color.mode,
        id: lastId + 1,
        handleOnPress: handleAppletPress,
        handleOnPressMinus: handleAppletPressMinus,
      }
    ]);
    console.log('Plus pressed');
  };
  
  const [appletList, setappletList] = React.useState<BoxCreateAppletProps[]>(
    [
      {
        colormode: color.mode,
        id: 1,
        handleOnPress: handleAppletPress,
        handleOnPressMinus: handleAppletPressMinus,
      }, {
        colormode: color.mode,
        id: 2,
        handleOnPress: handleAppletPress,
        handleOnPressMinus: handleAppletPressMinus,
      }, {
        colormode: color.mode,
        id: 3,
        handleOnPress: handleAppletPress,
        handleOnPressMinus: handleAppletPressMinus,
      },
    ]
  );

  console.log(appletList.map(e => e.id));

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: color.mode,
      }}
    >
      <View
        style={{
          borderBottomColor: color.text,
          borderBottomWidth: 2,
          marginLeft: '6%',
          marginRight: '6%',
          marginTop: '8%',
          marginBottom: '8%',
        }}
      >
        <Text
          style={{
            color: color.text,
            fontSize: 32,
            fontWeight: 'bold',
            marginBottom: '6%',
            textAlign: 'center',
          }}
        >
          {translate('create_applet_title')}
        </Text>
      </View>
      <ScrollView>
        {appletList.map((applet, i) => (
          <BoxCreateApplet
            key={applet.id}
            colormode= {applet.colormode}
            id= {applet.id}
            handleOnPress= {applet.handleOnPress}
            handleOnPressMinus= {() => applet.handleOnPressMinus(applet.id)}
          />
        ))}
        <TouchableOpacity
          onPress={handleAppletPressPlus}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{
            backgroundColor: '#D9D9D9',
            width: 30,
            height: 30,
            borderRadius: 15,
            top: -3,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <FontAwesomeIcon
              icon={'plus'}
              size={20}
              style={{ 
                color: "black",
              }}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
