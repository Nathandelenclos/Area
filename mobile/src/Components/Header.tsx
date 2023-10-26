import React from 'react';
import AppContext from '@contexts/app.context';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Title } from '@components/Title';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default function Header({
  hideInput,
  title,
  navigation,
  onBackPress,
  onTrashPress,
  onEditPress,
  openPopUp,
  string,
  setString,
}: {
  hideInput?: boolean;
  title: string;
  navigation?: any;
  onBackPress?: () => void;
  onTrashPress?: () => void;
  onEditPress?: () => void;
  openPopUp?: () => void;
  string?: string;
  setString?: React.Dispatch<React.SetStateAction<string>>;
}): React.JSX.Element {
  const { color, translate } = AppContext();

  function onChangeText(text: string) {
    if (!setString) return;
    const newlines = (text.match(/\n/g) || '').length + 1;
    if (newlines > 2) {
      setString(text.replace(/\n$/, '')); // Remove last trailing newline
      setString(text.replace(/\n+$/, '')); // Remove all trailing newlines
      return;
    }
    setString(text);
    return;
  }

  return (
    <View
      style={{
        backgroundColor: color.mainColor,
        paddingHorizontal: 20,
        paddingBottom: 40,
        borderBottomRightRadius: 70,
        borderBottomLeftRadius: 70,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {navigation ? (
          <TouchableOpacity
            onPress={() => {
              if (onBackPress) onBackPress();
              else navigation.pop();
            }}
          >
            <FontAwesomeIcon
              icon={'arrow-left'}
              size={30}
              color={color.textOverMainColor}
            />
          </TouchableOpacity>
        ) : (
          <View />
        )}
        <Title title={title} style={{ color: color.textOverMainColor }} />
        <View style={{ flexDirection: 'row' }}>
          {onEditPress && (
            <TouchableOpacity onPress={onEditPress}>
              <FontAwesomeIcon
                icon={'edit'}
                size={20}
                style={{ marginRight: 10 }}
                color={color.textOverMainColor}
              />
            </TouchableOpacity>
          )}
          {openPopUp && (
            <TouchableOpacity onPress={openPopUp}>
              <FontAwesomeIcon
                icon={'ellipsis-vertical'}
                size={20}
                color={color.textOverMainColor}
              />
            </TouchableOpacity>
          )}
        </View>
        {onTrashPress && (
          <TouchableOpacity onPress={onTrashPress}>
            <FontAwesomeIcon
              icon={'trash'}
              size={20}
              color={color.textOverMainColor}
            />
          </TouchableOpacity>
        )}
      </View>
      {setString && !hideInput && (
        <TextInput
          style={{
            borderWidth: 0.2,
            borderRadius: 5,
            margin: 10,
            marginTop: 30,
            padding: 10,
            fontSize: 20,
            color: color.textOverMainColor,
            fontWeight: 'bold',
            fontStyle: 'italic',
            height: 60,
          }}
          maxLength={70}
          value={string}
          onChangeText={onChangeText}
          multiline={true}
          numberOfLines={2}
          placeholder={'Applet Name'}
          placeholderTextColor={color.textInputPlaceholder}
        />
      )}
      {hideInput && (
        <View
          style={{
            borderRadius: 5,
            margin: 10,
            marginTop: 20,
            padding: 10,
            height: 70,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: color.textOverMainColor,
              fontWeight: 'bold',
              fontStyle: 'italic',
            }}
          >
            {string}
          </Text>
        </View>
      )}
    </View>
  );
}
