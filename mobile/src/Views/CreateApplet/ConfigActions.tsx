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
    <View>
      <Text>String Input</Text>
    </View>
  );
}

function DateInput({
  value,
  setValue,
}: {
  value: Date;
  setValue: (value: Date) => void;
}) {
  function onChange(value: Date) {
    if (value < new Date()) {
      setValue(new Date());
      return;
    }
    setValue(value);
  }

  return <DatePicker date={value} onDateChange={onChange} mode={'datetime'} />;
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
  const [config, setConfig] = React.useState<any>(route.params.action.config);
  const [resConfig, setResConfig] = React.useState<any>({});
  const [canPressValidate, setCanValidate] = React.useState<boolean>(false);

  if (!user) {
    return <></>;
  }

  function saveReaction(action) {
    if (route.params.id !== undefined) {
      route.params.setReactions((prev: IReaction[]) => {
        const newReactions = prev.filter(
          (reaction: IReaction) => reaction.id !== route.params.id,
        );
        action.reactionId = action.id;
        action.id = route.params.id == 0 ? 1 : route.params.id;
        return [action, ...newReactions];
      });
    } else {
      route.params.setReactions((prev: IReaction[]) => {
        if (prev[0].id) {
          return [
            ...route.params.reactions,
            {
              ...action,
              id: prev.length + 1,
              reactionId: action.id,
            },
          ];
        } else {
          return [{ ...action, id: 1, reactionId: action.id }];
        }
      });
    }
  }

  function saveAction(action) {
    route.params.setAction({
      ...action,
      serviceId: route.params.serviceId,
    });
  }

  function save() {
    route.params.action.config = resConfig;
    if (route.params.type === 'reaction') {
      saveReaction(route.params.action);
    } else {
      saveAction(route.params.action);
    }
    navigation.navigate('CreateApplet');
  }

  function setValue(index: number, key: string, value: any) {
    setResConfig((prev: any) => ({ ...prev, [key]: value }));
  }

  function initConfig() {
    const test = config.filter((e) => e.type === 'date');
    if (test.length > 0) {
      const newConf = { ...resConfig };
      test.forEach((e) => {
        newConf[e.key] = new Date();
      });
      setResConfig(newConf);
    }
  }

  function canValidate() {
    const tmp = config.map((e) => e.key);
    const tmp2 = Object.keys(resConfig);

    if (tmp.length === tmp2.length) {
      if (!canPressValidate) setCanValidate(true);
    } else {
      if (canPressValidate) setCanValidate(false);
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
          {config.map((e, index) => (
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
                  value={resConfig[e.key] ?? ''}
                  setValue={(value: string) => setValue(index, e.key, value)}
                />
              )}
              {e.type === 'date' && (
                <DateInput
                  value={resConfig[e.key] ?? new Date()}
                  setValue={(value: Date) => setValue(index, e.key, value)}
                />
              )}
              {e.type === 'number' && (
                <NumberInput
                  name={e.name}
                  value={resConfig[e.key] ?? ''}
                  setValue={(value: number) => setValue(index, e.key, value)}
                />
              )}
            </View>
          ))}
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
            onPress={() => save(resConfig)}
          >
            {translate('validate')}
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}
