import { Animated, Platform, StyleProp, ViewStyle } from 'react-native';

export const getTabBarStyle = (
  visible: boolean
): Animated.WithAnimatedValue<StyleProp<ViewStyle>> => ({
  borderTopWidth: 0,
  elevation: 0,
  display: visible ? 'flex' : 'none',
  height: Platform.OS === 'ios' ? 105 : 80,
});
