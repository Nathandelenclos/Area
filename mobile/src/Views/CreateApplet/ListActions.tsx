import AppContext from '@contexts/app.context';
import UserCtx from '@contexts/user.context';
import React, { useEffect } from 'react';
import servicesService from '@services/services.service';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { DEFAULT_ACTION, IAction } from '@interfaces/action.interface';
import { DEFAULT_REACTION, IReaction } from '@interfaces/reaction.interface';
import { MyAppletHeader } from '@views/MyApplets';
import StyledButton from '@components/MyButton';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconName } from '@fortawesome/fontawesome-common-types';
import LoadingScreen from '@components/loading.screen';
import ListWrapper from '@components/AppletsHandlers/list.wrapper';

export function AppletButtonSelector({
  icon,
  title,
  onPress,
}: {
  icon?: IconName;
  title: string;
  onPress: () => void;
}) {
  const { color } = AppContext();

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        backgroundColor: color.mainColor,
        padding: 20,
        borderRadius: 20,
      }}
      onPress={onPress}
    >
      {icon && (
        <FontAwesomeIcon
          icon={['fab', icon]}
          size={25}
          color={color.textOverMainColor}
          style={{ marginRight: 10 }}
        />
      )}
      <Text
        style={{
          color: color.textOverMainColor,
          fontWeight: 'bold',
          fontSize: 20,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default function ListActions({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}): React.JSX.Element {
  const { color, translate } = AppContext();
  const { user } = UserCtx();
  const [actions, setActions] = React.useState<IAction[] | IReaction[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const viewType = route.params.types;

  if (!user) {
    return <></>;
  }

  const getActions = async () => {
    let data;
    if (route.params.types === 'action') {
      const tmp = await servicesService.getActions(
        user.token,
        route.params.serviceId,
      );
      data = tmp.data;
    } else {
      const tmp = await servicesService.getReactions(
        user.token,
        route.params.serviceId,
      );
      data = tmp.data;
    }
    data = data || [];
    setActions(data);
    setIsLoading(false);
  };

  function retry() {
    setIsLoading(true);
    getActions();
  }

  function selectAction(action) {
    const obj: IAction | IReaction =
      viewType === 'action' ? { ...DEFAULT_ACTION } : { ...DEFAULT_REACTION };
    obj[viewType] = action;
    if (action.config?.length > 0) {
      navigation.navigate('ConfigAction', {
        ...route.params,
        [viewType]: { [viewType]: action },
      });
      return;
    }
    const type = route.params.type;
    navigation.navigate({
      name: 'CreateApplet',
      params: { type, result: obj },
      merge: true,
    });
  }

  useEffect(() => {
    getActions();
  }, []);

  const title_key = viewType === 'action' ? 'select_action' : 'select_reaction';

  if (isLoading) {
    return (
      <ListWrapper navigation={navigation} title_key={title_key}>
        <LoadingScreen style={{ backgroundColor: color.mode }} />
      </ListWrapper>
    );
  }

  if (actions.length === 0) {
    return (
      <ListWrapper navigation={navigation} title_key={title_key}>
        <LoadingScreen style={{ backgroundColor: color.mode }} />
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
    <ListWrapper navigation={navigation} title_key={title_key}>
      <ScrollView contentContainerStyle={{ paddingTop: 20 }}>
        {actions.map((action, i) => (
          <AppletButtonSelector
            key={i}
            title={action.name}
            onPress={() => selectAction(action)}
          />
        ))}
      </ScrollView>
    </ListWrapper>
  );
}
