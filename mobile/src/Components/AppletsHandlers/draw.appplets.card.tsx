import React, { JSX } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import DrawSeparator from '@components/AppletsHandlers/applets.separator';

export default function AppletBox({
  isAction,
  id,
  title,
  addAction,
  removeAction,
  extendBottom,
}: {
  extendBottom: boolean;
  isAction: boolean;
  id: number;
  title: string;
  addAction: (() => void) | null;
  removeAction: (() => void) | null;
}): JSX.Element {
  if (!addAction || !removeAction) {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: isAction ? 'black' : '#6F6F6F',
            marginHorizontal: 20,
            borderRadius: 20,
            paddingVertical: 25,
            paddingHorizontal: 30,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexShrink: 1,
            }}
          >
            <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>
              {isAction ? 'IF' : 'THEN'}
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
                flexWrap: 'wrap',
                flexShrink: 1,
                paddingHorizontal: title === '...' ? 0 : 20,
              }}
            >
              {' ' + title}
            </Text>
          </View>
        </View>
        {extendBottom && <DrawSeparator />}
      </>
    );
  }

  return (
    <>
      <TouchableOpacity
        onPress={addAction}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: isAction ? 'black' : '#6F6F6F',
          marginHorizontal: 20,
          borderRadius: 20,
          paddingVertical: 25,
          paddingHorizontal: 30,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flexShrink: 1,
          }}
        >
          <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>
            {isAction ? 'IF' : 'THEN'}
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: 'bold',
              flexWrap: 'wrap',
              flexShrink: 1,
              paddingHorizontal: title === '...' ? 0 : 20,
            }}
          >
            {' ' + title}
          </Text>
        </View>
        {id ? (
          <TouchableOpacity
            onPress={removeAction}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          >
            <FontAwesomeIcon
              icon={'minus-circle'}
              size={25}
              color={'white'}
              style={{ color: 'red' }}
            />
          </TouchableOpacity>
        ) : (
          <FontAwesomeIcon icon={'plus-circle'} size={25} color={'white'} />
        )}
      </TouchableOpacity>
      {extendBottom && <DrawSeparator />}
    </>
  );
}
