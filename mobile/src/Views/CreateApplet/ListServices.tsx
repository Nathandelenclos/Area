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
    const data = await servicesService.getServices(user.access_token);
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
      <View
        style={{
          borderBottomColor: color.text,
          borderBottomWidth: 2,
          marginLeft: '6%',
          marginRight: '6%',
          marginTop: '8%',
          marginBottom: '8%',
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
          {translate('select_service')}
        </Text>
      </View>
      <ScrollView>
        {services.map((service, i) => (
          <TouchableOpacity
            key={i}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: '6%',
              marginRight: '6%',
              marginBottom: '6%',
              backgroundColor: color.mainColor,
              padding: 20,
              borderRadius: 20,
            }}
            onPress={() => {
              navigation.navigate('ListActions', {
                serviceId: service.id,
                ...route.params,
              });
            }}
          >
            <Text>{service.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
