import React, { useEffect } from 'react';
import {
  FlatList,
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

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
export default function MyAppletsView({
  navigation,
}: {
  navigation: any;
}): React.JSX.Element {
  const { color, translate, appName } = AppContext();
  const { user } = UserCtx();
  const [filterList, setFilterList] = React.useState<FilterProps[]>([
    { name: 'Active Filter', active: false },
    { name: 'Inactive Filter', active: false },
  ]);
  const [itemList, setItemList] = React.useState<DropDownItemProps[]>([]);

  const colors = ['#7a73e7', '#73E77B', '#E77B73', '#73e7d6', '#7e1eb0'];
  if (!user) {
    return <></>;
  }
  function toggleActive(id: number) {
    const newItemList = itemList.map((item: DropDownItemProps) => {
      if (item.id === id) {
        item.active = !item.active;
      }
      return item;
    });
    setItemList(newItemList);
  }

  const getMyApplets = async () => {
    const data = await appletService.getMyApplets(user.access_token);
    const list: DropDownItemProps[] = [];
    for (const applet of data.data) {
      list.push({
        id: applet.id,
        title: applet.name,
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        description: applet.description,
        titleColor: 'white',
        active: false,
      });
    }
    setItemList(list);
  };

  const handleTrashPress = async (item: DropDownItemProps) => {
    appletService.deleteApplet(user.access_token, item.id);
    const newList = itemList.filter((i) => i.id !== item.id);
    setItemList(newList);
  };

  const handleEyePress = async (item: DropDownItemProps) => {
    navigation.navigate('InfoApplet', { id: item.id });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getMyApplets();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <ViewContainer>
      <Header title={'My Applets'} />
      <HorizontalFilterList
        filterList={filterList}
        setFilterList={setFilterList}
      />
      <ScrollView style={{ flex: 1, paddingHorizontal: 10, paddingBottom: 50 }}>
        {itemList.length === 0 && (
          <View
            style={{
              borderWidth: 1,
              borderStyle: 'dashed',
              borderColor: color.mainColor,
              borderRadius: 20,
              padding: 20,
              paddingHorizontal: 50,
            }}
          >
            <Text
              style={{
                color: color.mainColor,
                textAlign: 'center',
                fontWeight: 'bold',
              }}
            >
              {translate('no_applet')}
              <FontAwesomeIcon
                icon={'plus'}
                size={15}
                color={color.textOverMainColor}
                style={{
                  alignContent: 'center',
                  backgroundColor: 'orange',
                }}
              />
            </Text>
          </View>
        )}
        {itemList
          .filter((item) => item.active || !filterList[0].active)
          .filter((item) => !item.active || !filterList[1].active)
          .map((item, i) => (
            <DropDownItem key={i} {...item} toggleActive={toggleActive}>
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
              >
                <TouchableOpacity
                  style={{ justifyContent: 'center', alignItems: 'center' }}
                  onPress={() => handleTrashPress(item)}
                >
                  <FontAwesomeIcon icon={'trash'} size={20} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ justifyContent: 'center', alignItems: 'center' }}
                  onPress={() => handleEyePress(item)}
                >
                  <FontAwesomeIcon icon={'eye'} size={20} />
                </TouchableOpacity>
              </View>
            </DropDownItem>
          ))}
      </ScrollView>
    </ViewContainer>
  );
}
