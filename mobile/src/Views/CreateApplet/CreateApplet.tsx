import React, { Dispatch, JSX, SetStateAction, useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import AppContext from '@contexts/app.context';
import { DEFAULT_ACTION, IAction } from '@interfaces/action.interface';
import appletService from '@services/applet.service';
import UserCtx from '@contexts/user.context';
import ViewContainer from '@components/ViewContainer';
import { DEFAULT_REACTION, IReaction } from '@interfaces/reaction.interface';
import AppletBox from '@components/AppletsHandlers/draw.appplets.card';
import NewActionOrReaction from '@components/AppletsHandlers/applet.plus';
import LoadingScreen from '@components/loading.screen';
import AppletHandlerHeader from '@components/AppletsHandlers/applets.header';
import ColorModale from '@components/ColorModalPicker';

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
  const [currentColor, setCurrentColor] = React.useState<string>(
    color.mainColor,
  );
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);

  console.log('modalVisible', modalVisible);

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
    if (edition === 'information') {
      setIsLoaded(false);
      loadInformations();
    } else if (edition === 'creation') {
      setIsLoaded(true);
    }
  }, [edition]);

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

  const createSaveObject = () => {
    const finalReactions = reactions.map((reaction) => ({
      id: reaction.reactionId ?? reaction.reaction.id,
      config: Object.fromEntries(
        reaction.configs.map((config) => [config.key, config.value]),
      ),
    }));
    const finalActions = actions.map((action) => ({
      id: action.actionId ?? action.action.id,
      config: Object.fromEntries(
        action.configs.map((config) => [config.key, config.value]),
      ),
    }));
    return {
      name: appletName.trim(),
      description: "My applet's description",
      is_active: true,
      actions: finalActions,
      reactions: finalReactions,
    };
  };

  const handleSave = async () => {
    if (edition === 'creation') {
      const obj = createSaveObject();
      const resp = await appletService.createApplet(user.token, obj);
      if (!resp.data) return;
    } else if (edition === 'edition') {
      const obj = createSaveObject();
      const resp = await appletService.updateApplet(
        user.token,
        obj,
        route.params.id,
      );
      if (!resp.data) return;
      setEdition('information');
      return;
    } else {
      return;
    }
    navigation.pop();
  };

  const handleTrashPress = () => {
    appletService.deleteApplet(user.token, route.params.id);
    navigation.pop();
  };

  if (!isLoaded) {
    return (
      <ViewContainer background={currentColor}>
        <AppletHandlerHeader
          backgroundColor={currentColor}
          title={translate('create_applet_title')}
          navigation={navigation}
          hideInput={true}
          string={''}
        />
        <LoadingScreen />
      </ViewContainer>
    );
  }

  return (
    <ViewContainer background={currentColor}>
      <ColorModale
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        currentColor={currentColor}
        setCurrentColor={setCurrentColor}
      />
      <AppletHandlerHeader
        backgroundColor={currentColor}
        hideInput={edition === 'information'}
        title={translate('create_applet_title')}
        navigation={navigation}
        string={appletName}
        setString={setAppletName}
        pipetPress={
          edition !== 'information' ? () => setModalVisible(true) : null
        }
        onBackPress={
          edition === 'edition' ? () => setEdition('information') : null
        }
        onTrashPress={edition === 'edition' ? () => handleTrashPress() : null}
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
