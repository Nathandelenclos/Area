import React from 'react';
import { it, describe, expect, jest } from '@jest/globals';
import { render, fireEvent } from '@testing-library/react-native';
import Header from '@components/Header';
import { faBars } from '@fortawesome/free-solid-svg-icons';

jest.mock("@fortawesome/react-native-fontawesome", () => ({
  FontAwesomeIcon: () => <div>Icon</div>,
}));

describe('Header component', () => {
    it('renders correctly with given title', () => {
      const { getByText } = render(
        <Header title={'Header Title'} />
      );
      expect(getByText('Header Title')).toBeTruthy();
    });

    it('renders correctly with given title, leftIcon, onPressLeft, rightIcon, onPressRight, bar', () => {
      const onPressMock = jest.fn();
      const { getByText } = render(
        <Header title={'Header Title'} leftIcon={faBars} onPressLeft={onPressMock} rightIcon={faBars} onPressRight={onPressMock} bar={false} />
      );
      expect(getByText('Header Title')).toBeTruthy();
    });
  });
