import {
  Appearance,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import AppContext from '@contexts/app.context';
import { DropDownItemProps } from '@components/Applets';
import AppletService from '@services/applet.service';
import UserCtx from '@contexts/user.context';

type ModalAppletActionProps = {
  isVisible: boolean;
  appletToEdit: number;
};

export default function ModalAppletAction({
  modalVisible,
  setModalVisible,
  appletList,
  navigation,
  forceRefresh,
}: {
  modalVisible: ModalAppletActionProps;
  setModalVisible: React.Dispatch<React.SetStateAction<ModalAppletActionProps>>;
  appletList: DropDownItemProps[];
  navigation: any;
  forceRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { color } = AppContext();
  const { user } = UserCtx();
  const isdarkmode = Appearance.getColorScheme() === 'dark';
  const resetedModalVisible = { isVisible: false, appletToEdit: -1 };
  let appletToEdit = null;

  if (modalVisible.appletToEdit !== -1) {
    appletToEdit = appletList.find(
      (applet) => applet.id === modalVisible.appletToEdit,
    );
  }

  const appletIsEnabled = appletToEdit ? appletToEdit.active : false;

  function EditApplet() {
    navigation.navigate('CreateApplet', {
      type: 'edition',
      id: modalVisible.appletToEdit,
    });
  }

  const createSaveObject = (newApplet) => {
    const finalReactions = newApplet.reactions.map((reaction) => ({
      id: reaction.reactionId ?? reaction.reaction.id,
      config: Object.fromEntries(
        reaction.configs.map((config) => [config.key, config.value]),
      ),
    }));
    const finalActions = newApplet.actions.map((action) => ({
      id: action.actionId ?? action.action.id,
      config: Object.fromEntries(
        action.configs.map((config) => [config.key, config.value]),
      ),
    }));
    return {
      name: newApplet.name.trim(),
      description: "My applet's description",
      is_active: true,
      actions: finalActions,
      reactions: finalReactions,
    };
  };

  async function DuplicateApplet() {
    const resp = await AppletService.getApplet(
      user?.token,
      modalVisible.appletToEdit,
    );
    if (!resp.data) return;
    const applet = resp.data;
    const newApplet = {
      ...applet,
      name: `${applet.name} (copy)`,
    };
    delete newApplet.user;
    delete newApplet.id;
    const obj = createSaveObject(newApplet);
    const resp2 = await AppletService.createApplet(user?.token, obj);
    if (!resp2.data) return;
    forceRefresh(true);
  }

  async function ToggleApplet(active: boolean) {
    const resp = await AppletService.updateApplet(
      user?.token,
      {
        is_active: active,
      },
      modalVisible.appletToEdit,
    );
    if (!resp.data) return;
    forceRefresh(true);
  }

  async function DeleteApplet() {
    const resp = await AppletService.deleteApplet(
      user?.token,
      modalVisible.appletToEdit,
    );
    if (!resp.data) return;
    forceRefresh(true);
  }

  const SettingsList = [
    { title: 'Edit', icon: 'edit', color: '#6F6F6F', function: EditApplet },
    {
      title: 'Duplicate',
      icon: 'clone',
      color: '#6F6F6F',
      function: DuplicateApplet,
    },
    {
      title: appletIsEnabled ? 'Enable' : 'Disable',
      icon: appletIsEnabled ? 'toggle-on' : 'toggle-off',
      color: appletIsEnabled ? 'green' : '#6F6F6F',
      function: appletIsEnabled
        ? () => ToggleApplet(false)
        : () => ToggleApplet(true),
    },
    {
      title: 'Delete',
      icon: 'trash',
      color: '#6F6F6F',
      textColor: '#FF000075',
      last: true,
      function: DeleteApplet,
    },
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible.isVisible}
      onRequestClose={() => {
        setModalVisible(resetedModalVisible);
      }}
    >
      <Pressable
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: !isdarkmode ? '#00000075' : '#FFFFFF75',
        }}
        onPress={() => setModalVisible(resetedModalVisible)}
      >
        <View
          style={{
            zIndex: 1,
            position: 'absolute',
            width: '100%',
            height: '30%',
            bottom: 0,
            backgroundColor: color.mode,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {SettingsList.map((e, index) => (
            <TouchableOpacity
              onPress={() => {
                e.function();
                setModalVisible(resetedModalVisible);
              }}
              key={index}
              style={{
                flexDirection: 'row',
                borderBottomColor: !e.last ? '#6F6F6F' : '',
                borderBottomWidth: !e.last ? 1 : 0,
                width: '88%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  marginLeft: '6%',
                  marginRight: '6%',
                  marginTop: '4%',
                  marginBottom: '4%',
                }}
              >
                <Text
                  style={{
                    color: e.textColor ?? '#6F6F6F',
                    fontSize: 24,
                    fontWeight: 'bold',
                  }}
                >
                  {e.title}
                </Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '0%',
                }}
              >
                <FontAwesomeIcon
                  icon={e.icon}
                  size={35}
                  style={{
                    color: e.color,
                  }}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Pressable>
    </Modal>
  );
}
