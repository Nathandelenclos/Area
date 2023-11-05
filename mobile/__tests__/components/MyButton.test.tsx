import React from 'react';
import { it, describe, expect, jest } from '@jest/globals';
import { render, fireEvent } from '@testing-library/react-native';
import MyButton from '@components/MyButton';

describe('MyButton component', () => {
    it('renders correctly with given title', () => {
      const { getByText } = render(<MyButton title="Test Title" />);
      expect(getByText('Test Title')).toBeTruthy();
    });
  
    it('renders correctly with given inverse and onPress', () => {
      const onPressMock = jest.fn();
      const { getByText } = render(
        <MyButton inverse={true} title="Test Title" onPress={onPressMock} />,
      );
      expect(getByText('Test Title')).toBeTruthy();
  
      // Simuler un appui sur le bouton et vérifier si la fonction onPress est appelée.
      fireEvent.press(getByText('Test Title'));
      expect(onPressMock).toHaveBeenCalled();
    });
  });
