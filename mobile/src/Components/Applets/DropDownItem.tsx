import Animated, {
  AnimatedRef,
  measure,
  runOnUI,
  SharedValue,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { ColorValue, TouchableOpacity, View, ViewStyle } from 'react-native';
import React from 'react';
import AppContext from '@contexts/app.context';
import { Title } from '@components/Title';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import AppletsCheckBox from '@components/Applets/AppletsCheckBox';

type DropDownAnimationsValues = {
  listRef: AnimatedRef<any>;
  setHeight: () => void;
  firstHeightAnimationStyle: ViewStyle;
  heightAnimationStyle: ViewStyle;
  angleAnimationStyle: ViewStyle;
};

export type DropDownItemProps = {
  id: number;
  title: string;
  description?: string;
  backgroundColor: ColorValue;
  titleColor: ColorValue;
  active: boolean;
  selected: boolean;
  toggleSelected?: (id: number) => void;
  children?: React.ReactNode;
  editing: boolean;
  onPressElipsis: () => void;
  onPressItem: () => void;
};

function useDropDownAnimations(): DropDownAnimationsValues {
  const listRef: AnimatedRef<any> = useAnimatedRef();
  const heightValue: SharedValue<number> = useSharedValue(0);
  const firstHeightValue: SharedValue<number> = useSharedValue(0);
  const open: SharedValue<boolean> = useSharedValue(false);

  const firstHeightAnimationStyle: ViewStyle = useAnimatedStyle(
    (): ViewStyle => ({
      height: firstHeightValue.value,
    }),
  );

  const heightAnimationStyle: ViewStyle = useAnimatedStyle(
    (): ViewStyle => ({
      height: heightValue.value,
      overflow: 'hidden',
    }),
  );

  const angleAnimationStyle: ViewStyle = useAnimatedStyle(
    (): ViewStyle => ({
      transform: [{ rotate: withTiming(`${open.value ? -180 : 0}deg`) }],
    }),
  );

  function setHeight() {
    if (heightValue.value === 0) {
      runOnUI((): void => {
        'worklet';
        firstHeightValue.value = withTiming(
          20,
          { duration: 50 },
          (isFinished: boolean | undefined) => {
            if (isFinished) {
              heightValue.value = withTiming(measure(listRef)!.height);
            }
          },
        );
      })();
    } else {
      heightValue.value = withTiming(
        0,
        {},
        (isFinished: boolean | undefined): void => {
          if (isFinished) {
            firstHeightValue.value = withTiming(0, { duration: 50 });
          }
        },
      );
    }
    open.value = !open.value;
  }

  return {
    listRef,
    setHeight,
    firstHeightAnimationStyle,
    heightAnimationStyle,
    angleAnimationStyle,
  };
}

export default function DropDownItem({
  id,
  title,
  description = '',
  backgroundColor,
  titleColor,
  selected,
  toggleSelected,
  editing,
  onPressElipsis,
  children,
  onPressItem,
}: DropDownItemProps): React.JSX.Element {
  const { color, translate } = AppContext();
  const {
    listRef,
    setHeight,
    firstHeightAnimationStyle,
    heightAnimationStyle,
    angleAnimationStyle,
  }: DropDownAnimationsValues = useDropDownAnimations();
  const checkBoxColor = titleColor as string | undefined;

  return (
    <View style={{ marginBottom: 20 }}>
      <TouchableOpacity
        style={{
          backgroundColor,
          borderRadius: 20,
          padding: 15,
          paddingVertical: 25,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 1,
        }}
        onPress={onPressItem}
      >
        <Title
          title={title}
          style={{ alignSelf: 'flex-start', color: titleColor, width: '80%' }}
        />
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={{
              marginRight: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => setHeight()}
          >
            <Animated.View style={angleAnimationStyle}>
              <FontAwesomeIcon
                icon={'angle-down'}
                size={25}
                style={{
                  color: checkBoxColor,
                }}
              />
            </Animated.View>
          </TouchableOpacity>
          {editing ? (
            <AppletsCheckBox
              value={selected}
              color={titleColor}
              bgColor={backgroundColor}
              onPress={() => (toggleSelected ? toggleSelected(id) : null)}
            />
          ) : (
            <TouchableOpacity onPress={onPressElipsis}>
              <FontAwesomeIcon
                icon={'ellipsis-vertical'}
                size={25}
                style={{ color: checkBoxColor }}
              />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
      <View>
        <Animated.View
          style={[
            firstHeightAnimationStyle,
            {
              position: 'absolute',
              width: '100%',
              top: -20,
              backgroundColor: color.dropDownColor,
            },
          ]}
        />
        <Animated.View style={[heightAnimationStyle]}>
          <Animated.View
            ref={listRef}
            style={{
              position: 'absolute',
              width: '100%',
              top: 0,
            }}
          >
            <View
              style={{
                backgroundColor: color.dropDownColor,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                padding: 10,
              }}
            >
              {children}
            </View>
          </Animated.View>
        </Animated.View>
      </View>
    </View>
  );
}
