import React, { Dispatch, JSX, SetStateAction, useEffect } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppContext from '@contexts/app.context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { DEFAULT_ACTION, IAction } from '@interfaces/action.interface';
import appletService from '@services/applet.service';
import UserCtx from '@contexts/user.context';
import ViewContainer from '@components/ViewContainer';
import Header from '@components/Header';
import { DEFAULT_REACTION, IReaction } from '@interfaces/reaction.interface';
import { useFocusEffect } from '@react-navigation/native';
function DrawSeparator({
  extendHeigth = 0,
}: {
  extendHeigth?: number;
}): JSX.Element {
  return (
    <View
      style={{
        backgroundColor: '#bbbbbb',
        width: 20,
        height: 40 + extendHeigth,
        alignSelf: 'center',
      }}
    />
  );
}

function NewActionOrReaction({
  edition,
  newActionOrReaction,
  extendBottom,
}): JSX.Element {
  if (!(edition === 'edition' || edition === 'creation')) {
    return <></>;
  }
  const { color } = AppContext();
  const extendHeigth = 10;

  return (
    <View style={{ position: 'relative' }}>
      <DrawSeparator extendHeigth={extendHeigth} />
      <TouchableOpacity
        onPress={newActionOrReaction}
        hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 3,
          position: 'absolute',
          left: 0,
          right: 0,
          top: extendBottom ? 0 : extendHeigth * 4,
          bottom: 0,
        }}
        activeOpacity={1}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: color.inverseMode,
            borderRadius: 100,
          }}
        >
          <FontAwesomeIcon
            icon={'plus-circle'}
            size={40}
            color={color.mode}
            style={{ color: 'orange' }}
          />
        </View>
      </TouchableOpacity>
      {extendBottom && <DrawSeparator extendHeigth={extendHeigth} />}
    </View>
  );
}

function AppletBox({
  isAction,
  id,
  title,
  addAction,
  removeAction,
  extendBottom,
}: {
  extendBottom: boolean;
  isAction: boolean;
  id: number;
  title: string;
  addAction: (() => void) | null;
  removeAction: (() => void) | null;
}): JSX.Element {
  if (!addAction || !removeAction) {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: isAction ? 'black' : '#6F6F6F',
            marginHorizontal: 20,
            borderRadius: 20,
            paddingVertical: 25,
            paddingHorizontal: 30,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexShrink: 1,
            }}
          >
            <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>
              {isAction ? 'IF' : 'THEN'}
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
                flexWrap: 'wrap',
                flexShrink: 1,
                paddingHorizontal: title === '...' ? 0 : 20,
              }}
            >
              {' ' + title}
            </Text>
          </View>
        </View>
        {extendBottom && <DrawSeparator />}
      </>
    );
  }

  return (
    <>
      <TouchableOpacity
        onPress={addAction}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: isAction ? 'black' : '#6F6F6F',
          marginHorizontal: 20,
          borderRadius: 20,
          paddingVertical: 25,
          paddingHorizontal: 30,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flexShrink: 1,
          }}
        >
          <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>
            {isAction ? 'IF' : 'THEN'}
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: 'bold',
              flexWrap: 'wrap',
              flexShrink: 1,
              paddingHorizontal: title === '...' ? 0 : 20,
            }}
          >
            {' ' + title}
          </Text>
        </View>
        {id ? (
          <TouchableOpacity
            onPress={removeAction}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          >
            <FontAwesomeIcon
              icon={'minus-circle'}
              size={25}
              color={'white'}
              style={{ color: 'red' }}
            />
          </TouchableOpacity>
        ) : (
          <FontAwesomeIcon icon={'plus-circle'} size={25} color={'white'} />
        )}
      </TouchableOpacity>
      {extendBottom && <DrawSeparator />}
    </>
  );
}

export default function CreateApplet({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}): JSX.Element {
  const { color, translate } = AppContext();
  const { user } = UserCtx();
  const [actions, setActions] = React.useState<IAction[]>([DEFAULT_ACTION]);
  const [reactions, setReactions] = React.useState<IReaction[]>([
    DEFAULT_REACTION,
  ]);
  const [appletName, setAppletName] = React.useState<string>('');
  const [edition, setEdition] = React.useState<
    'creation' | 'information' | 'edition'
  >(route.params.type);
  const [canSave, setCanSave] = React.useState<boolean>(false);
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

  useEffect(() => {
    if (
      (edition === 'creation' || edition === 'edition') &&
      actions[0]?.id &&
      reactions[0]?.id &&
      appletName
    ) {
      if (!canSave) setCanSave(true);
    } else {
      if (canSave) setCanSave(false);
    }
  }, [edition, actions, reactions, appletName]);

  async function loadInformations() {
    const resp = await appletService.getApplet(user.token, route.params.id);
    if (!resp.data) return;
    setActions(resp.data.actions);
    setReactions(resp.data.reactions);
    setAppletName(resp.data.name);
    setIsLoaded(true);
  }

  function saveArea(area: IAction | IReaction, id: any) {
    const viewType = area?.action ? 'action' : 'reaction';
    const func = viewType === 'action' ? setActions : setReactions;
    if (id !== undefined) {
      func((prev: IAction[] | IReaction[]) => {
        const newArea = prev.findIndex(
          (tmpArea: IAction | IReaction) => tmpArea.id === id,
        );
        area[viewType + 'Id'] = area[viewType].id;
        area.id = id == 0 ? 1 : id;
        if (newArea === -1) return [area];
        prev[newArea] = area;
        return [...prev];
      });
      return;
    }
    const list = area?.action ? actions : reactions;
    if (!area) {
      console.error('area is null');
      return;
    }
    func((prev: IAction[] | IReaction[]) => {
      if (prev[0]?.id) {
        return [
          ...list,
          {
            ...area,
            id: prev.length + 1,
            [viewType + 'Id']: area[viewType].id,
          },
        ];
      } else {
        return [{ ...area, id: 1, [viewType + 'Id']: area[viewType].id }];
      }
    });
  }

  useEffect(() => {
    if (route.params?.result) {
      const obj = JSON.parse(route.params.result);
      const id = route.params.resId;
      saveArea(obj, id);
      navigation.setParams({ type: edition });
    }
  }, [route.params?.result]);

  useEffect(() => {
    if (route.params.type === 'information') {
      loadInformations();
    } else if (route.params.type === 'creation') {
      setIsLoaded(true);
    }
  }, []);

  const handleAppletPress = (
    area: IAction | IReaction | null,
    type: 'action' | 'reaction',
  ) => {
    if (area && area[type]?.config.length > 0) {
      navigation.navigate('ConfigAction', {
        [type]: area,
        id: area.id,
        [`${type}s`]: type === 'action' ? actions : reactions,
        type: edition,
        types: type,
      });
      return;
    }
    navigation.navigate('ListServices', {
      id: area?.id ?? undefined,
      [`${type}s`]: type === 'action' ? actions : reactions,
      type: edition,
      types: type,
    });
  };

  const handleAppletRemove = (
    idToDelete: number,
    type: 'action' | 'reaction',
  ) => {
    const func:
      | Dispatch<SetStateAction<IAction[]>>
      | Dispatch<SetStateAction<IReaction[]>> =
      type === 'action' ? setActions : setReactions;
    const default_value: IAction[] | IReaction[] =
      type === 'action' ? [DEFAULT_ACTION] : [DEFAULT_REACTION];
    if (actions.length === 1) {
      func(default_value);
      return;
    }
    func((prev: IAction[] | IReaction[]) =>
      prev.filter((e: IAction | IReaction) => e.id !== idToDelete),
    );
  };

  const handleSave = async () => {
    if (edition === 'creation') {
      const finalReactions = reactions.map((reaction) => ({
        id: reaction.reactionId,
        config: Object.fromEntries(
          reaction.configs.map((config) => [config.key, config.value]),
        ),
      }));
      const finalActions = actions.map((action) => ({
        id: action.actionId,
        config: Object.fromEntries(
          action.configs.map((config) => [config.key, config.value]),
        ),
      }));
      const obj = {
        name: appletName.trim(),
        description: "My applet's description",
        is_active: true,
        actions: finalActions,
        reactions: finalReactions,
      };
      const resp = await appletService.createApplet(user.token, obj);
      if (!resp.data) return;
    } else if (edition === 'edition') {
      await appletService.updateApplet(user.token, {
        id: route.params.applet.id,
        name: appletName,
        action: actions as IAction,
        reaction: reactions[0],
        config: '',
        is_active: true,
      });
    } else {
      return;
    }
    console.log('here');
    navigation.pop();
  };

  if (!isLoaded) {
    return (
      <ViewContainer>
        <Header
          title={translate('create_applet_title')}
          navigation={navigation}
          hideInput={true}
          string={''}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size={'large'} color={color.mainColor} />
        </View>
      </ViewContainer>
    );
  }

  return (
    <ViewContainer>
      <Header
        hideInput={edition === 'information'}
        title={translate('create_applet_title')}
        navigation={navigation}
        string={appletName}
        setString={setAppletName}
        onBackPress={
          edition === 'edition' ? () => setEdition('information') : null
        }
        onTrashPress={edition === 'edition' ? () => console.log('trash') : null}
        onEditPress={
          edition === 'information' ? () => setEdition('edition') : null
        }
        openPopUp={
          edition === 'information' ? () => console.log('popup') : null
        }
      />
      <ScrollView contentContainerStyle={{ paddingTop: 40 }}>
        {actions?.map((action, index) => (
          <AppletBox
            key={index}
            isAction={true}
            id={action.id || 0}
            title={action?.action?.name || '...'}
            addAction={
              edition === 'information'
                ? null
                : () => handleAppletPress(action, 'action')
            }
            removeAction={
              edition === 'information'
                ? null
                : () => handleAppletRemove(action.id, 'action')
            }
            extendBottom={
              edition === 'information'
                ? index === actions.length - 1
                : index !== actions.length - 1
            }
          />
        ))}
        <NewActionOrReaction
          newActionOrReaction={() => handleAppletPress(null, 'action')}
          edition={edition}
          extendBottom={true}
        />
        {reactions.map((reaction, index) => (
          <AppletBox
            key={index}
            isAction={false}
            id={reaction.id}
            title={reaction.reaction.name}
            addAction={
              edition === 'information'
                ? null
                : () => handleAppletPress(reaction, 'reaction')
            }
            removeAction={
              edition === 'information'
                ? null
                : () => handleAppletRemove(reaction.id, 'reaction')
            }
            extendBottom={index !== reactions.length - 1}
          />
        ))}
        <NewActionOrReaction
          newActionOrReaction={() => handleAppletPress(null, 'reaction')}
          edition={edition}
          extendBottom={false}
        />
      </ScrollView>
      <View>
        {canSave && (
          <TouchableOpacity
            onPress={handleSave}
            style={{
              backgroundColor: color.mainColor,
              borderRadius: 20,
              marginHorizontal: 30,
              marginBottom: 30,
              paddingVertical: 20,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>
              {edition === 'edition'
                ? translate('save_applet')
                : translate('create_applet')}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ViewContainer>
  );
}
