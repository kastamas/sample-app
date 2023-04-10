import {
  NavigationState,
  SceneRendererProps,
} from 'react-native-tab-view/lib/typescript/src/types';
import { flow, get } from 'lodash/fp';
import React, { useEffect, useState } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { buildInvertedRgbColor, buildRgbColor } from './tab-bar.utils';
import * as ReactNative from 'react-native';

const StyledTabBar = styled.View`
  margin-top: 24px;
  margin-right: 24px;
  margin-left: 24px;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-color: rgba(0, 0, 0, 0.1);
  border-width: 1px;
  border-style: solid;
`;

const StyledTabItem = styled.TouchableOpacity`
  padding: 12px 0;
  text-align: center;
  border-radius: 12px;
  overflow: hidden;
  width: 50%;
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

const BoxSlider = styled(Animated.View)`
  position: absolute;
  width: 50%;
  background-color: #212121;
  height: 100%;
  border-radius: 12px;
  transform: translateX(0px);
`;

const StyledTabItemText = styled.Text`
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
`;

type TComponentProps = SceneRendererProps & {
  navigationState: NavigationState<any>;
  tabMaxOffset: number;
  style?: ReactNative.StyleProp<ReactNative.ViewStyle>;
};

export const CustomTabBar: React.FC<TComponentProps> = (props) => {
  const { navigationState, position, jumpTo, tabMaxOffset, style } = props;
  const { routes } = navigationState;

  const [offset, setStateOffset] = useState(0);

  useEffect(() => {
    position.addListener(flow(get('value'), setStateOffset));

    return () => {
      position.removeAllListeners();
    };
  }, [position]);

  const inputRange = routes.map((x, index) => index);

  const offsetX = position.interpolate({
    inputRange,
    outputRange: [0, tabMaxOffset],
  });

  return (
    <StyledTabBar style={style}>
      <BoxSlider style={{ transform: [{ translateX: offsetX }] }} />
      {navigationState.routes.map((route, index) => {
        return (
          <StyledTabItem onPress={() => jumpTo(route.key)} key={index}>
            <StyledTabItemText
              style={{
                color:
                  index === 0
                    ? buildInvertedRgbColor(offset)
                    : buildRgbColor(offset),
              }}
            >
              {route.title}
            </StyledTabItemText>
          </StyledTabItem>
        );
      })}
    </StyledTabBar>
  );
};
