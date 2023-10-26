import React, { useEffect } from 'react';
import {
  Button,
  LogBox,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppContext from '@contexts/app.context';
import Header from '@components/Header';
import ViewContainer from '@components/ViewContainer';
import {
  HorizontalFilterList,
  FilterProps,
  DropDownItem,
  DropDownItemProps,
} from '@components/Applets';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import appletService from '@services/applet.service';
import UserCtx from '@contexts/user.context';
import { Title } from '@components/Title';
import UrlServiceTs from '@services/url.service.ts';
import AuthService from '@services/auth.service';
import { Icon, IconProp } from '@fortawesome/fontawesome-svg-core';

function MyAppletHeader({
  leftIcon,
  onPressLeft,
  rightIcon,
  onPressRight,
  title,
}: {
  leftIcon?: IconProp;
  onPressLeft?: () => void;
  rightIcon?: IconProp;
  onPressRight?: () => void;
  title: string;
}) {
  return (
    <View
      style={{
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: '90%',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {onPressLeft && leftIcon ? (
          <TouchableOpacity onPress={onPressLeft}>
            <FontAwesomeIcon icon={leftIcon} size={25} />
          </TouchableOpacity>
        ) : (
          <View />
        )}
        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{title}</Text>
        {onPressRight && rightIcon ? (
          <TouchableOpacity onPress={onPressRight}>
            <FontAwesomeIcon icon={rightIcon} size={25} />
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: 'black',
          width: '90%',
          marginVertical: 20,
        }}
      />
    </View>
  );
}

export default function MyAppletsView({
  navigation,
}: {
  navigation: any;
}): React.JSX.Element {
  const { color, translate, appName } = AppContext();
  const { user } = UserCtx();
  if (!user) return <></>;
  const [filterList, setFilterList] = React.useState<FilterProps[]>([
    { name: 'Active Filter', active: false },
    { name: 'Inactive Filter', active: false },
  ]);
  const [itemList, setItemList] = React.useState<DropDownItemProps[]>([]);
  const [editing, setEditing] = React.useState<boolean>(false);

  const colors = ['#7a73e7', '#73E77B', '#E77B73', '#73e7d6', '#7e1eb0'];

  function toggleSelected(id: number) {
    const newItemList = itemList.map((item: DropDownItemProps) => {
      if (item.id === id) {
        item.selected = !item.selected;
      }
      return item;
    });
    setItemList(newItemList);
  }

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
    const data = await appletService.getMyApplets(user.access_token);
    const list: DropDownItemProps[] = data.data.map(
      (e: {
        id: string;
        name: string;
        description: string;
        active: boolean;
      }) => ({
        id: e.id,
        title: e.name,
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        description: e.description,
        titleColor: 'white',
        active: e.active,
        selected: false,
      }),
    );
    setItemList([
      {
        id: '1',
        title: 'TEST',
        backgroundColor: colors[0],
        description: 'desccc',
        titleColor: 'white',
        active: false,
        selected: false,
      },
    ]);
  };

  const handleTrashPress = async (item: DropDownItemProps) => {
    appletService.deleteApplet(user.access_token, item.id);
    const newList = itemList.filter((i) => i.id !== item.id);
    setItemList(newList);
  };

  const handleEyePress = async (item: DropDownItemProps) => {
    navigation.navigate('InfoApplet', { id: item.id });
  };

  const handleEmptyAppletPressed = () => {
    navigation.navigate('CreateApplet');
  };

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      await getMyApplets();
    });
  }, [navigation]);

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
      navigation.navigate('CreateApplet');
    }
  }

  function getIconLeft(): IconProp {
    if (editing) {
      return 'xmark';
    } else {
      return 'plus';
    }
  }

  return (
    <ViewContainer background={color.background}>
      <MyAppletHeader
        title={'My Applets'}
        leftIcon={getIconLeft()}
        onPressLeft={functionIconLeft}
        rightIcon={getIconRight()}
        onPressRight={functionIconRight}
      />
      <HorizontalFilterList
        filterList={filterList}
        setFilterList={setFilterList}
      />
      <ScrollView style={{ flex: 1, paddingHorizontal: 10, paddingBottom: 50 }}>
        {itemList.length === 0 && (
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
        {itemList
          .filter((item) => item.active || !filterList[0].active)
          .filter((item) => !item.active || !filterList[1].active)
          .map((item, i) => (
            <DropDownItem
              key={i}
              {...item}
              toggleSelected={toggleSelected}
              editing={editing}
              onPressElipsis={() => console.log('test')}
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
    </ViewContainer>
  );
}
