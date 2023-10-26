import React from 'react';
import { ScrollView, View } from 'react-native';
import AppletFilter, { FilterProps } from '@components/Applets/AppletFilter';

type HorizontalFilterListProps = {
  filterList: FilterProps[];
  setFilterList: (filterList: FilterProps[]) => void;
};

export default function HorizontalFilterList({
  filterList,
  setFilterList,
}: HorizontalFilterListProps): React.JSX.Element {
  const toggleFilter = (filterName: string) => {
    const newFilterList = filterList.map((filter: FilterProps) => {
      if (filter.name === filterName) {
        filter.active = !filter.active;
      }
      return filter;
    });
    setFilterList(newFilterList);
  };
  return (
    <View>
      <ScrollView
        style={{
          flexDirection: 'row',
          marginVertical: 20,
        }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {filterList.map((filter: FilterProps) => (
          <AppletFilter
            key={filter.name}
            filterName={filter.name}
            activeFilter={filter.active}
            toggleFilter={toggleFilter}
          />
        ))}
      </ScrollView>
    </View>
  );
}
