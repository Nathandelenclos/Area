import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppContext from '@contexts/app.context';
import {
  HorizontalFilterList,
  FilterProps,
  DropDownItem,
  DropDownItemProps,
} from '@components/Applets';
import appletService from '@services/applet.service';
import UserCtx from '@contexts/user.context';
import { Title } from '@components/Title';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import LoadingScreen from '@components/loading.screen';
import Header from '@components/Header';
import ModalAppletAction from '@components/AppletsHandlers/modalAppletActions';

export default function MyAppletsView({
  navigation,
}: {
  navigation: any;
}): React.JSX.Element {
  const { color, translate, appName } = AppContext();
  const { user } = UserCtx();
  if (!user) return <></>;
  const [filterList, setFilterList] = React.useState<FilterProps[]>([
    { name: translate('active_filter'), active: false },
    { name: translate('inactive_filter'), active: false },
  ]);
  const [itemList, setItemList] = React.useState<DropDownItemProps[]>([]);
  const [editing, setEditing] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [modalVisible, setModalVisible] = React.useState<{
    isVisible: boolean;
    appletToEdit: number;
  }>({ isVisible: false, appletToEdit: -1 });
  const [forceRefresh, setForceRefresh] = React.useState<boolean>(false);

  function toggleSelected(id: number) {
    const newItemList = itemList.map((item: DropDownItemProps) => {
      if (item.id === id) {
        item.selected = !item.selected;
      }
      return item;
    });
    setItemList(newItemList);
  }

  const handleTrashPress = (item: DropDownItemProps) => {
    appletService.deleteApplet(user.token, item.id);
    const newList = itemList.filter((i) => i.id !== item.id);
    setItemList(newList);
  };

  function removeSelected() {
    const newItemList = itemList.filter((item: DropDownItemProps) => {
      if (item.selected) {
        handleTrashPress(item);
      }
      return !item.selected;
    });
    setItemList(newItemList);
  }

  function unSelectAll() {
    const newItemList = itemList.map((item: DropDownItemProps) => {
      item.selected = false;
      return item;
    });
    setItemList(newItemList);
  }

  const getMyApplets = async () => {
    const data = await appletService.getMyApplets(user.token);
    console.log(data.data);
    if (!data.data) {
      setItemList([]);
      setIsLoading(false);
      return;
    }
    const list: DropDownItemProps[] = data.data.map(
      (e: {
        id: string;
        name: string;
        description: string;
        active: boolean;
        color: string;
      }) => ({
        id: e.id,
        title: e.name,
        backgroundColor: e.color ?? '#7a73e7',
        description: e.description,
        titleColor: 'white',
        active: e.is_active,
        selected: false,
      }),
    );
    setItemList(list);
    setIsLoading(false);
  };

  const handleEmptyAppletPressed = () => {
    navigation.navigate('CreateApplet', { type: 'creation' });
  };

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      await getMyApplets();
    });
  }, [navigation]);

  useEffect(() => {
    if (forceRefresh) {
      getMyApplets();
      setForceRefresh(false);
    }
  }, [forceRefresh]);

  function functionIconRight(): void {
    if (editing) {
      removeSelected();
      setEditing(false);
    } else {
      setEditing(true);
    }
  }

  function getIconRight(): IconProp {
    if (editing) {
      return 'trash';
    } else {
      return 'edit';
    }
  }
  function functionIconLeft(): void {
    if (editing) {
      setEditing(false);
      unSelectAll();
    } else {
      navigation.navigate('CreateApplet', { type: 'creation' });
    }
  }

  function getIconLeft(): IconProp {
    if (editing) {
      return 'xmark';
    } else {
      return 'plus';
    }
  }

  const listToShow = itemList
    .filter((item) => item.active || !filterList[0].active)
    .filter((item) => !item.active || !filterList[1].active);

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: color.mode }}>
        <Header
          title={translate('mes_applet')}
          leftIcon={getIconLeft()}
          onPressLeft={functionIconLeft}
          rightIcon={getIconRight()}
          onPressRight={functionIconRight}
        />
        <LoadingScreen style={{ backgroundColor: color.mode }} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.mode }}>
      <ModalAppletAction
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        appletList={listToShow}
        navigation={navigation}
        forceRefresh={setForceRefresh}
      />
      <Header
        title={translate('mes_applet')}
        leftIcon={getIconLeft()}
        onPressLeft={functionIconLeft}
        rightIcon={getIconRight()}
        onPressRight={functionIconRight}
      />
      <HorizontalFilterList
        filterList={filterList}
        setFilterList={setFilterList}
      />
      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: 20,
        }}
      >
        {listToShow.length === 0 && (
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderStyle: 'dashed',
              borderColor: color.mainColor,
              borderRadius: 20,
              padding: 20,
              paddingHorizontal: 50,
            }}
            onPress={handleEmptyAppletPressed}
          >
            <Text
              style={{
                color: color.mainColor,
                textAlign: 'center',
                fontWeight: 'bold',
              }}
            >
              {translate('no_applet')}
            </Text>
          </TouchableOpacity>
        )}
        {listToShow.map((item, i) => (
          <DropDownItem
            key={i}
            {...item}
            toggleSelected={toggleSelected}
            editing={editing}
            onPressElipsis={() => {
              setModalVisible({ isVisible: true, appletToEdit: item.id });
            }}
            onPressItem={() => {
              if (editing) {
                toggleSelected(item.id);
                return;
              }
              navigation.navigate('CreateApplet', {
                type: 'information',
                id: item.id,
                tmpColor: item.backgroundColor,
              });
            }}
          >
            <Title
              title={translate('description')}
              style={{
                alignSelf: 'flex-start',
                fontSize: 17,
                color: 'black',
              }}
            />
            <Text style={{ fontSize: 15, paddingTop: 10, color: 'gray' }}>
              {item.description}
            </Text>
            <View
              style={{
                justifyContent: 'space-around',
                flexDirection: 'row',
              }}
            ></View>
          </DropDownItem>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
