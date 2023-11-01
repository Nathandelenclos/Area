import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppContext from '@contexts/app.context';
import UserCtx from '@contexts/user.context';
import servicesService from '@services/services.service';
import { IService } from '@interfaces/service.interface';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { MyAppletHeader } from '@views/MyApplets';
import { AppletButtonSelector } from '@views/CreateApplet/ListActions';

export default function ListServices({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}): JSX.Element {
  const { color, translate } = AppContext();
  const { user } = UserCtx();
  const [services, setServices] = React.useState<IService[] | null>(null);

  if (!user) {
    return <></>;
  }

  const getServices = async () => {
    const data = await servicesService.getServices(user.token);
    if (!data.data) {
      setServices([]);
      return;
    }
    setServices(data.data);
  };

  useEffect(() => {
    getServices();
  }, []);

  if (!services) {
    return <></>;
  }

  if (services.length === 0) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: color.mode,
        }}
      >
        <Text>Empty Service List</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: color.mode,
      }}
    >
      <MyAppletHeader
        title={translate('select_service')}
        leftIcon={'angle-left'}
        onPressLeft={() => navigation.pop()}
      />
      <ScrollView contentContainerStyle={{ paddingTop: 20 }}>
        {services.map((service, i) => (
          <AppletButtonSelector
            key={i}
            title={service.name}
            onPress={() => {
              navigation.navigate('ListActions', {
                serviceId: service.id,
                ...route.params,
              });
            }}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
