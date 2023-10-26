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
import { IAction } from '@interfaces/action.interface';
import { IReaction } from '@interfaces/reaction.interface';
import { MyAppletHeader } from '@views/MyApplets';
import StyledButton from '@components/MyButton';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconName } from '@fortawesome/fontawesome-common-types';

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

  if (!user) {
    return <></>;
  }

  const getActions = async () => {
    let data;
    if (route.params.type === 'action') {
      const tmp = await servicesService.getActions(
        user.access_token,
        route.params.serviceId,
      );
      data = tmp.data;
    } else {
      const tmp = await servicesService.getReactions(
        user.access_token,
        route.params.serviceId,
      );
      data = tmp.data;
    }
    data = data || [];
    setActions(data);
  };

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

  function selectAction(action) {
    if (action.config?.length > 0) {
      navigation.navigate('ConfigAction', {
        ...route.params,
        action,
      });
      return;
    }
    if (route.params.type === 'reaction') {
      saveReaction(action);
    } else {
      saveAction(action);
    }
    navigation.navigate('CreateApplet');
  }

  useEffect(() => {
    getActions();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: color.mode,
      }}
    >
      <MyAppletHeader
        title={translate(
          route.params.type === 'action' ? 'select_action' : 'select_reaction',
        )}
        leftIcon={'angle-left'}
        onPressLeft={() => navigation.pop()}
      />
      <ScrollView contentContainerStyle={{ paddingTop: 20 }}>
        {actions.map((action, i) => (
          <AppletButtonSelector
            key={i}
            title={action.name}
            onPress={() => selectAction(action)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
