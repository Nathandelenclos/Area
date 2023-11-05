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
import LoadingScreen from '@components/loading.screen';
import StyledButton from '@components/MyButton';
import ListWrapper from '@components/AppletsHandlers/list.wrapper';

export default function ListServices({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}): JSX.Element {
  const { color, translate } = AppContext();
  const { user } = UserCtx();
  const [services, setServices] = React.useState<IService[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  if (!user) {
    return <></>;
  }

  const getServices = async () => {
    const data = await servicesService.getServices(user.token);
    if (!data.data) {
      setServices([]);
    } else {
      const type: 'actions' | 'reactions' = (route.params.types + 's') as
        | 'actions'
        | 'reactions';
      const filteredServices = data.data.filter((service: any) => {
        return service[type]?.length > 0;
      });
      setServices(filteredServices);
    }
    setIsLoading(false);
  };

  function retry() {
    setIsLoading(true);
    getServices();
  }

  useEffect(() => {
    getServices();
  }, []);

  if (isLoading) {
    return (
      <ListWrapper navigation={navigation} title_key={'select_service'}>
        <LoadingScreen style={{ backgroundColor: color.mode }} />
      </ListWrapper>
    );
  }

  if (services.length === 0) {
    return (
      <ListWrapper navigation={navigation} title_key={'select_service'}>
        <Text
          style={{
            alignSelf: 'center',
            marginTop: 10,
            fontSize: 20,
            fontWeight: 'bold',
          }}
        >
          An error occured
        </Text>
        <StyledButton title={'Retry'} onPress={retry} />
      </ListWrapper>
    );
  }

  return (
    <ListWrapper navigation={navigation} title_key={'select_service'}>
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
    </ListWrapper>
  );
}
