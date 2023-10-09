import React from 'react';
import { ScrollView, Text, View } from 'react-native';
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

export default function MyAppletsView(): React.JSX.Element {
  const { color, translate, appName } = AppContext();
  const [filterList, setFilterList] = React.useState<FilterProps[]>([
    { name: 'Active Filter', active: false },
    { name: 'Inactive Filter', active: false },
  ]);
  const [itemList, setItemList] = React.useState<DropDownItemProps[]>([
    {
      title: 'Applet #1',
      description: 'Youtube -> Gmail\nPost d’une vidéo -> envoi d’un mail',
      backgroundColor: color.mainColor,
      titleColor: 'white',
      active: false,
    },
    {
      title: 'Applet #2',
      description: 'Spotify -> Drive\nLike une musique -> post sur drive',
      backgroundColor: '#73E77B',
      titleColor: 'black',
      active: false,
    },
    {
      title: 'Applet #3',
      description:
        "Outlook -> Text Compare\nMail de marvin -> envoi l'image de text compare par message",
      backgroundColor: '#E77B73',
      titleColor: 'white',
      active: false,
    },
  ]);

  function toggleActive(title: string) {
    const newItemList = itemList.map((item: DropDownItemProps) => {
      if (item.title === title) {
        item.active = !item.active;
      }
      return item;
    });
    setItemList(newItemList);
  }

  return (
    <ViewContainer>
      <Header title={'My Applets'} />
      <HorizontalFilterList
        filterList={filterList}
        setFilterList={setFilterList}
      />
      <ScrollView style={{ flex: 1, paddingHorizontal: 10 }}>
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
        {itemList.map((item: DropDownItemProps) => (
          <DropDownItem
            key={item.title}
            title={item.title}
            description={item.description}
            backgroundColor={item.backgroundColor}
            titleColor={item.titleColor}
            active={item.active}
            toggleActive={toggleActive}
          />
        ))}
      </ScrollView>
    </ViewContainer>
  );
}
