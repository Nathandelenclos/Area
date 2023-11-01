import AppContext from '@contexts/app.context';
import UserCtx from '@contexts/user.context';
import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { IReaction } from '@interfaces/reaction.interface';
import DatePicker from 'react-native-date-picker';
import { IAction } from '@interfaces/action.interface';

function StringInput({
  name,
  value,
  setValue,
}: {
  name: string;
  value: string;
  setValue: (value: string) => void;
}) {
  return (
    <TextInput
      value={value.toString()}
      onChangeText={setValue}
      keyboardType={'default'}
      placeholder={name}
      placeholderTextColor={'#CBCBCB'}
      style={{
        backgroundColor: '#F0F0F0',
        marginVertical: 20,
        padding: 20,
        borderRadius: 5,
        fontWeight: 'bold',
      }}
    />
  );
}

function DateInput({
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

function NumberInput({
  name,
  value,
  setValue,
}: {
  name: string;
  value: number;
  setValue: (value: number) => void;
}) {
  function checkValue(tmp: string) {
    if (tmp.length > 21) {
      return;
    }
    const val = Number(tmp);
    if (isNaN(val)) {
      return;
    }
    if (val < 0) {
      return;
    }
    setValue(val);
  }

  return (
    <TextInput
      value={value.toString()}
      onChangeText={checkValue}
      keyboardType={'numeric'}
      placeholder={name}
      placeholderTextColor={'#CBCBCB'}
      style={{
        backgroundColor: '#F0F0F0',
        marginVertical: 20,
        padding: 20,
        borderRadius: 5,
        fontWeight: 'bold',
      }}
    />
  );
}

export default function ConfigActions({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}): React.JSX.Element {
  const { color, translate } = AppContext();
  const { user } = UserCtx();
  const viewType = route.params.types;
  const [config, setConfig] = React.useState<any>(
    route.params[viewType][viewType].config ?? [],
  );
  const [resConfig, setResConfig] = React.useState<any>(
    route.params[viewType].configs ?? [],
  );
  const [canPressValidate, setCanValidate] = React.useState<boolean>(false);

  if (!user) {
    return <></>;
  }

  function save() {
    route.params[viewType].configs = resConfig;
    const type = route.params.type;
    navigation.navigate({
      name: 'CreateApplet',
      params: {
        type,
        result: JSON.stringify(route.params[viewType]),
        resId: route.params.id,
      },
      merge: true,
    });
  }

  function setValue(key: string, value: any) {
    const index = resConfig.findIndex((e) => e.key === key);
    if (index !== -1) {
      const newConf = [...resConfig];
      newConf[index] = { ...newConf[index], value: value };
      setResConfig(newConf);
    } else {
      const newConf = { key: key, type: typeof value, value: value };
      setResConfig((prev) => [...prev, newConf]);
    }
  }

  function initConfig() {
    const test = config.filter((e) => e.type === 'date');
    if (test.length > 0) {
      const newConf = [...resConfig];
      test.forEach((e) => {
        const elem = newConf.find((el) => el.key === e.key);
        if (!elem) {
          newConf.push({ key: e.key, type: 'date', value: new Date() });
          return;
        }
      });
      setResConfig(newConf);
    }
  }

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

  function canValidate() {
    const tmp = config.map((e) => e.key);
    const tmp2: any[] = [];

    resConfig.forEach((e) => {
      if (e.value) tmp2.push(e.key);
    });

    if (JSON.stringify(tmp) === JSON.stringify(tmp2)) {
      setCanValidate(true);
    } else {
      setCanValidate(false);
    }
  }

  useEffect(() => {
    canValidate();
  }, [resConfig]);

  useEffect(() => {
    initConfig();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: color.background,
      }}
    >
      <View
        style={{
          borderBottomColor: color.text,
          borderBottomWidth: 2,
          marginLeft: '6%',
          marginRight: '6%',
          marginTop: '8%',
        }}
      >
        <Text
          style={{
            color: color.text,
            fontSize: 32,
            fontWeight: 'bold',
            marginBottom: '6%',
            textAlign: 'center',
          }}
        >
          {translate(
            route.params.type === 'action'
              ? 'config_select_action'
              : 'config_select_reaction',
          )}
        </Text>
      </View>
      <ScrollView>
        <View
          style={{
            backgroundColor: color.mode,
            borderRadius: 20,
            margin: 20,
            padding: 20,
          }}
        >
          {config.map((e, index) => {
            const conf = getValueById(e);
            return (
              <View key={index}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    textAlign: 'center',
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
          })}
        </View>
      </ScrollView>
      {canPressValidate && (
        <TouchableOpacity
          style={{
            backgroundColor: color.mainColor,
            borderRadius: 10,
            margin: 20,
            padding: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={save}
        >
          <Text
            style={{
              color: color.background,
              fontSize: 18,
              fontWeight: 'bold',
            }}
          >
            {translate('validate')}
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}
