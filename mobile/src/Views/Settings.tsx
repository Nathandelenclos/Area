import React, { useState } from 'react';
import { Header } from '@components/Header';
import ViewContainer from '@components/ViewContainer';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import AppContext from '@contexts/app.context';
import DropDownPicker, { ItemType } from 'react-native-dropdown-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

type LanguageDropdownProps = {
  elements: ItemType<string>[];
};

function LanguageDropdown({
  elements,
}: LanguageDropdownProps): React.JSX.Element {
  const { color } = AppContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<string>('Français'); //mettre la langue de la bdd

  return (
    <DropDownPicker
      items={elements}
      open={isOpen}
      setOpen={() => setIsOpen(!isOpen)}
      value={currentValue}
      setValue={(val) => setCurrentValue(val)}
      textStyle={{
        color:color.text,
        fontWeight: 'bold',
        fontSize: 18,
      }}
      style={{
        backgroundColor:color.background,
        borderRadius: 5,
      }}
      dropDownContainerStyle={{
        backgroundColor: color.background,
      }}
      ArrowUpIconComponent={({style}) => <FontAwesomeIcon icon={'chevron-up'} size={25} color={color.text} />}
      ArrowDownIconComponent={({style}) => <FontAwesomeIcon icon={'chevron-down'} size={25} color={color.text} />}
      TickIconComponent={({style}) => <FontAwesomeIcon icon={'check'} size={25} color={color.text} />}
    />
  );
};

type SettingsModdifierProps = {
  title: string;
  element: React.JSX.Element;
};

function SettingsModdifier({
  title,
  element,
}: SettingsModdifierProps): React.JSX.Element {
  const { color } = AppContext();

  return (
    <View
      style={{
        backgroundColor: color.mode,
        padding: 24,
        borderRadius: 20,
        alignItems: 'center',
      }}
    >
      <View>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: color.text,
            marginBottom: 20,
          }}
        >
          {title}
        </Text>
      </View>
      <View style={{ width: '100%' }}>
        {element}
      </View>
    </View>
  );
};

export default function Settings(): React.JSX.Element {
  const { color, translate } = AppContext();
  const [text, onChangeText] = React.useState<string>('URL.ACTUELLE/');

  const handleBackNavigation = () => {
    console.log('handleBackNavigation');
  };

  const saveSettings = () => {
    console.log('saveSettings');
  }

  const languages: ItemType<string>[] = [
    {
      label: 'EN - English',
      value: 'English',
    }, {
      label: 'FR - Français',
      value: 'Français',
    }, {
      label: 'DE - Deutsch',
      value: 'Deutsch',
    }
  ];

  return (
    <ViewContainer>
      <Header
        title={'Settings'}
        leftIcon={'chevron-left'}
        onPressLeft= {() => handleBackNavigation()}
        bar={false}
      />
      <View
        style={{
          padding: 20,
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            justifyContent: 'space-evenly',
            flex: 1,
          }}
        >
          <SettingsModdifier
            title={translate('moddify_app_url')}
            element={
              <TextInput
                onChangeText={onChangeText}
                value={text}
                style={{
                  color: color.text,
                  backgroundColor: color.background,
                  borderRadius: 5,
                  fontWeight: 'bold',
                  padding: 12,
                  width: '100%',
                }}
                autoCapitalize='none'
              />
            }
          />
          <SettingsModdifier
            title={translate('moddify_app_url')}
            element={
              <LanguageDropdown elements={languages}/>
            }
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: color.mainColor,
            alignItems: 'center',
            borderRadius: 20,
          }}
          onPress={saveSettings}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 24,
              fontWeight: 'bold',
              padding: 12,
            }}
          >
            {translate('save_settings')}
          </Text>
        </TouchableOpacity>
      </View>
    </ViewContainer>
  );
}
