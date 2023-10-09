import React from 'react';
import AppContext from '@contexts/app.context';
import { Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export type FilterProps = {
  name: string;
  active: boolean;
};

type AppletFilterProps = {
  activeFilter: boolean;
  filterName: string;
  toggleFilter: (filterName: string) => void;
};

export default function AppletFilter({
  activeFilter,
  filterName,
  toggleFilter,
}: AppletFilterProps): React.JSX.Element {
  const { color, translate, appName } = AppContext();
  return (
    <TouchableOpacity
      onPress={() => toggleFilter(filterName)}
      style={{
        flexDirection: 'row',
        backgroundColor: activeFilter ? color.mainColor : color.inactive,
        marginLeft: 20,
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
      }}
    >
      <Text style={{ color: color.textOverMainColor, fontWeight: 'bold' }}>
        {filterName}
      </Text>
      {activeFilter && (
        <FontAwesomeIcon
          icon={'check'}
          style={{ color: color.textOverMainColor, marginLeft: 10 }}
        />
      )}
    </TouchableOpacity>
  );
}
