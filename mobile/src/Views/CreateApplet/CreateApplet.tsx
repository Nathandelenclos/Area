import React, { JSX, useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import AppContext from '@contexts/app.context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IAction } from '@interfaces/action.interface';
import appletService from '@services/applet.service';
import UserCtx from '@contexts/user.context';
import ViewContainer from '@components/ViewContainer';
import Header from '@components/Header';
function DrawSeparator(): JSX.Element {
  return (
    <View
      style={{
        backgroundColor: '#bbbbbb',
        width: 20,
        height: 30,
        alignSelf: 'center',
      }}
    />
  );
}

function AppletBox({
  isAction,
  id,
  title,
  addAction,
  removeAction,
}: {
  isAction: boolean;
  id: number;
  title: string;
  addAction: () => void;
  removeAction: () => void;
}): JSX.Element {
  const actionBoxPressed = () => {
    addAction();
  };

  return (
    <>
      {!isAction && <DrawSeparator />}
      <TouchableOpacity
        onPress={actionBoxPressed}
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
  if (!user) {
    return <></>;
  }
  const [action, setAction] = React.useState<IAction | null>();
  const [reactions, setReactions] = React.useState<IAction[]>([
    { id: 0, name: '...', is_available: false, serviceId: 0 },
  ]);
  const [appletName, setAppletName] = React.useState<string>('Saluuut');
  const [edition, setEdition] = React.useState<string>('information');
  const [canSave, setCanSave] = React.useState<boolean>(false);

  useEffect(() => {
    if (
      (edition === 'creation' || edition === 'edition') &&
      action?.id &&
      reactions[0].id &&
      appletName
    ) {
      if (!canSave) setCanSave(true);
    } else {
      if (canSave) setCanSave(false);
    }
  }, [edition, action, reactions, appletName]);

  const handleAppletPressAction = () => {
    navigation.navigate('ListServices', {
      setAction: setAction,
      type: 'action',
    });
  };

  const handleAppletRemoveAction = () => {
    setAction(null);
  };

  const handleAppletRemoveReaction = (idToDelete: number) => {
    if (reactions.length === 1) {
      setReactions([{ id: 0, name: '...', is_available: false, serviceId: 0 }]);
      return;
    }
    setReactions((prev) => prev.filter((e) => e.id !== idToDelete));
  };

  const handleAppletPressReaction = (id?: number) => {
    navigation.navigate('ListServices', {
      id: id,
      reactions: reactions,
      setReactions: setReactions,
      type: 'reaction',
    });
  };

  const handleSave = async () => {
    if (edition === 'creation') {
      await appletService.createApplet(user.access_token, {
        name: appletName,
        action: action as IAction,
        reaction: reactions[0],
        config: '',
        is_active: true,
      });
    } else if (edition === 'edition') {
      await appletService.updateApplet(user.access_token, {
        id: route.params.applet.id,
        name: appletName,
        action: action as IAction,
        reaction: reactions[0],
        config: '',
        is_active: true,
      });
    } else {
      return;
    }
    navigation.navigate('Mes Applets', { screen: 'MyApplets' });
    setAppletName('');
    setReactions([]);
  };

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
        <AppletBox
          isAction={true}
          id={action?.id || 0}
          title={action?.name || '...'}
          addAction={handleAppletPressAction}
          removeAction={handleAppletRemoveAction}
        />
        {reactions.map((reaction, index) => (
          <AppletBox
            key={index}
            isAction={false}
            id={reaction.id}
            title={reaction.name}
            addAction={() => handleAppletPressReaction(reaction.id)}
            removeAction={() => handleAppletRemoveReaction(reaction.id)}
          />
        ))}
        {(edition === 'edition' || edition === 'creation') && (
          <>
            <DrawSeparator />
            <TouchableOpacity
              onPress={() => handleAppletPressReaction(undefined)}
              hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              activeOpacity={1}
            >
              <View
                style={{
                  top: -5,
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
          </>
        )}
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
