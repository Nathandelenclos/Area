import { Text, View } from 'react-native';
import { DateInput, NumberInput, StringInput } from '@components/ConfigOptions';
import React from 'react';

export default function ShowEditableConfig({
  resConfig,
  e,
  setValue,
  color,
}: {
  resConfig: any;
  e: any;
  setValue: any;
  color: any;
}) {
  function getValueById(val) {
    const resp = resConfig.find((e) => e.key === val.key);
    if (!resp) return null;
    const isNumber = Number(resp.type);
    const isDate = new Date(resp.type);
    if (!isNaN(isNumber)) {
      return resp.value;
    }
    if (!isNaN(isDate.getTime())) {
      return resp.value;
    }
    return resp.value;
  }

  const conf = getValueById(e);

  return (
    <View>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 18,
          textAlign: 'center',
          color: color.text,
        }}
      >
        {e.description}
      </Text>
      {e.type === 'string' && (
        <StringInput
          name={e.name}
          value={conf ?? ''}
          setValue={(value: string) => setValue(e.key, value)}
        />
      )}
      {e.type === 'date' && (
        <DateInput
          value={conf ?? new Date()}
          setValue={(value: Date) => setValue(e.key, value)}
        />
      )}
      {e.type === 'number' && (
        <NumberInput
          name={e.name}
          value={conf ?? ''}
          setValue={(value: number) => setValue(e.key, value)}
        />
      )}
    </View>
  );
}
