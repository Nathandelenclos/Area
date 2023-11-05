import React, { JSX } from 'react';
import AppContext from '@contexts/app.context';
import { TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import DrawSeparator from '@components/AppletsHandlers/applets.separator';

export default function NewActionOrReaction({
  edition,
  newActionOrReaction,
  extendBottom,
}): JSX.Element {
  if (!(edition === 'edition' || edition === 'creation')) {
    return <></>;
  }
  const { color } = AppContext();
  const extendHeigth = 10;

  return (
    <View style={{ position: 'relative' }}>
      <DrawSeparator extendHeigth={extendHeigth} />
      <TouchableOpacity
        onPress={newActionOrReaction}
        hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 3,
          position: 'absolute',
          left: 0,
          right: 0,
          top: extendBottom ? 0 : extendHeigth * 4,
          bottom: 0,
        }}
        activeOpacity={1}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: color.inverseMode,
            borderRadius: 100,
          }}
        >
          <FontAwesomeIcon
            icon={'plus-circle'}
            size={40}
            color={color.mode}
            style={{ color: 'orange' }}
          />
        </View>
      </TouchableOpacity>
      {extendBottom && <DrawSeparator extendHeigth={extendHeigth} />}
    </View>
  );
}
