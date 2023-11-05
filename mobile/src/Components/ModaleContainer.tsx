import { Modal, TouchableOpacity, View } from 'react-native';
import React from 'react';
import AppContext from '@contexts/app.context';

export default function ModalContainer({
  children,
  modalVisible,
  setModalVisible,
}: {
  children: React.ReactNode | React.ReactNode[];
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}): React.JSX.Element {
  const { color } = AppContext();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <TouchableOpacity
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          opacity: 1,
          backgroundColor: color.mode === 'white' ? '#00000075' : '#FFFFFF75',
        }}
        onPress={() => setModalVisible(false)}
      />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
        }}
      >
        {children}
      </View>
    </Modal>
  );
}
