import DatePicker from 'react-native-date-picker';
import React from 'react';

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

  return <DatePicker date={val} onDateChange={onChange} mode={'datetime'} />;
}
