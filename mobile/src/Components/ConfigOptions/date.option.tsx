import DatePicker from 'react-native-date-picker';
import React from 'react';

/**
 * DateInput is a reusable component for every DateInput in the app.
 * It takes a value and a setValue function as props.
 *
 * @component
 * @example
 * // Example usage of DateInput component
 * <DateInput
 *   value={new Date()}
 *   setValue={(value: Date) => setValue(key, value)}
 * />
 *
 * @param {Date} props.value - The value of the DateInput.
 * @param {() => void} props.setValue - The setValue function of the DateInput.
 * @returns {JSX.Element} - Returns the rendered DateInput component.
 */
export default function DateInput({
  value,
  setValue,
}: {
  value: Date;
  setValue: (value: Date) => void;
}) {
  let val = value ?? new Date();
  if (typeof val === 'string') {
    val = new Date(val);
  }

  function onChange(value: Date) {
    if (value < new Date()) {
      setValue(new Date());
      return;
    }
    setValue(value);
  }

  return <DatePicker date={val} onDateChange={onChange} mode={'datetime'} testID="date-picker" />;
}
