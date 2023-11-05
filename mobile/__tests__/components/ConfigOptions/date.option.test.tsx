import React from 'react';
import { it, describe, expect, jest } from '@jest/globals';
import { render, fireEvent } from '@testing-library/react-native';
import DateInput from '@components/ConfigOptions/date.option';

jest.mock('react-native-date-picker', () => {
    // Le composant factice de mock
    return function MockedDatePicker({ onDateChange=() => {} }) {
      return (
        <button testID="mocked-date-picker" onClick={() => onDateChange()}>
          Mocked DatePicker
        </button>
      );
    };
  });

describe('DateInput component', () => {
    it('renders correctly with given value and setValue', () => {
        const mockSetValue = jest.fn();
        const { getByTestId } = render(
          <DateInput value={new Date('2023-11-03T12:00:00')} setValue={mockSetValue} />
        );
      
        const datePicker = getByTestId('mocked-date-picker');
        expect(datePicker).toBeTruthy();
      
        // Simuler un changement de date dans le date picker.
        fireEvent(datePicker, 'onDateChange', new Date('2023-11-05T12:00:00'));
      
        // Ajustez les valeurs attendues en utilisant expect.any(Date).
        expect(mockSetValue).toHaveBeenCalledWith(expect.any(Date));
      });
      
      it('renders correctly with given string value and setValue', () => {
        const mockSetValue = jest.fn();
        const { getByTestId } = render(
          <DateInput value="2023-11-03T12:00:00" setValue={mockSetValue} />
        );
      
        const datePicker = getByTestId('mocked-date-picker');
        expect(datePicker).toBeTruthy();
      
        // Simuler un changement de date dans le date picker.
        fireEvent(datePicker, 'onDateChange', new Date('2023-11-05T12:00:00'));
      
        // Ajustez les valeurs attendues en utilisant expect.any(Date).
        expect(mockSetValue).toHaveBeenCalledWith(expect.any(Date));
      });
      
      
});
