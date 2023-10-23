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

export default function ListActions({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}): JSX.Element {
  const { color, translate } = AppContext();
  const { user } = UserCtx();
  const [actions, setActions] = React.useState<IAction[] | IReaction[]>([]);

  if (!user) {
    return <></>;
  }

  const getActions = async () => {
    if (route.params.type === 'action') {
      const data = await servicesService.getActions(
        user.access_token,
        route.params.serviceId,
      );
      setActions(data.data);
      return;
    }
    const data = await servicesService.getReactions(
      user.access_token,
      route.params.serviceId,
    );
    setActions(data.data);
  };

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
          {translate(
            route.params.type === 'action'
              ? 'select_action'
              : 'select_reaction',
          )}
        </Text>
      </View>
      <ScrollView>
        {actions.map((action, i) => (
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
              if (route.params.type === 'reaction') {
                if (route.params.id !== undefined) {
                  route.params.setReactions((prev) => {
                    const newReactions = prev.filter(
                      (reaction) => reaction.id !== route.params.id,
                    );
                    action.id = route.params.id == 0 ? 1 : route.params.id;
                    return [action, ...newReactions];
                  });
                } else {
                  route.params.setReactions((prev) => {
                    if (prev[0].id) {
                      return [
                        ...route.params.reactions,
                        { ...action, id: prev.length + 1 },
                      ];
                    } else {
                      return [{ ...action, id: 1 }];
                    }
                  });
                }
              } else {
                route.params.setAction(action);
              }
              navigation.navigate('CreateApplet');
            }}
          >
            <Text>{action.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
