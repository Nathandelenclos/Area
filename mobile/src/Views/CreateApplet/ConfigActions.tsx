import AppContext from '@contexts/app.context';
import UserCtx from '@contexts/user.context';
import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MyAppletHeader } from '@views/MyApplets';
import ShowEditableConfig from '@components/ConfigOptions/show.editable.config';

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

  function canValidate() {
    const tmp = config.map((e) => e.key);
    const tmp2: any[] = [];

    resConfig.forEach((e) => {
      if (e.value) tmp2.push(e.key);
    });

    const res = tmp.every((e) => tmp2.includes(e));
    setCanValidate(res);
  }

  useEffect(() => {
    canValidate();
  }, [resConfig]);

  useEffect(() => {
    initConfig();
  }, []);

  const title_key =
    viewType === 'action' ? 'config_select_action' : 'config_select_reaction';

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: color.mode,
      }}
    >
      <View style={{ backgroundColor: color.mode }}>
        <MyAppletHeader
          title={translate(title_key)}
          leftIcon={'angle-left'}
          onPressLeft={() => navigation.pop()}
          hideBottomLine={true}
        />
      </View>
      <ScrollView
        contentContainerStyle={{ flex: 1, backgroundColor: color.background }}
      >
        <View
          style={{
            backgroundColor: color.mode,
            borderRadius: 20,
            margin: 20,
            padding: 20,
          }}
        >
          {config.map((e: any, index: number) => (
            <ShowEditableConfig
              key={index}
              resConfig={resConfig}
              e={e}
              setValue={setValue}
              color={color}
            />
          ))}
        </View>
      </ScrollView>
      <View style={{ backgroundColor: color.background }}>
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
      </View>
    </SafeAreaView>
  );
}
