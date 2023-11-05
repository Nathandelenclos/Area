import React, { JSX, useEffect, useState } from 'react';
import AppContext from '@contexts/app.context';
import { Modal, Pressable, View } from 'react-native';
import { Title } from '@components/Title';
import ColorPicker from '../Vendor/ColorPicker';
import MyButton from '@components/MyButton';
import ModalContainer from '@components/ModaleContainer';

export default function ColorModale({
  currentColor,
  setCurrentColor,
  modalVisible,
  setModalVisible,
}: {
  currentColor: string;
  setCurrentColor: React.Dispatch<React.SetStateAction<string>>;
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const { color } = AppContext();

  return (
    <ModalContainer
      setModalVisible={setModalVisible}
      modalVisible={modalVisible}
    >
      <View
        style={{
          backgroundColor: color.mode,
          width: '70%',
          height: '40%',
          padding: 12,
          justifyContent: 'center',
          borderRadius: 20,
        }}
      >
        <Title title="Choose your color" />
        <ColorPicker
          color={currentColor}
          onColorChange={setCurrentColor}
          onColorChangeComplete={setCurrentColor}
          thumbSize={20}
          noSnap={true}
          sliderHidden={true}
          swatches={false}
        />
        <MyButton title={'Save'} onPress={() => setModalVisible(false)} />
      </View>
    </ModalContainer>
  );
}
