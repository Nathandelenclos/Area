import React from 'react';
import AppContext from '@contexts/app.context';
import { Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

/**
 * Props for the filterList variable in MyApplets.tsx.
 * @interface FilterProps
 */
export type FilterProps = {
  /**
   * Name of the service.
   */
  name: string;
  /**
   * Active state of the service.
   */
  active: boolean;
};

/**
 * Props for the AppletFilter component.
 * @interface AppletFilterProps
 */
type AppletFilterProps = {
  /**
   * activeFilter of the service.
   */
  activeFilter: boolean;
  /**
   * filterName of the service.
   */
  filterName: string;
  /**
   * toggleFilter of the service.
   */
  toggleFilter: (filterName: string) => void;
};

/**
 * AppletFilter is a reusable component for every AppletFilter in the app.
 * It takes a activeFilter, filterName and toggleFilter function as props.
 *
 * @component
 * @example
 * // Example usage of AppletFilter component
 * <AppletFilter
 *   activeFilter={true}
 *   filterName={'filterName'}
 *   toggleFilter={() => {}}
 * />
 *
 * @param {AppletFilterProps} props - The props for the AppletFilter component.
 * @returns {JSX.Element} - Returns the rendered AppletFilter component.
 */
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
      testID={'filter-button'}
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
