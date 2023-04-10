import React, { FC } from 'react';
import {
  View,
  TouchableHighlight,
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native';
import styled from 'styled-components/native';

interface ComponentProps {
  disabled?: boolean;
  onPress: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

const Content = styled.View<{ disabled: boolean }>`
  padding: 14.5px;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  background-color: ${({ disabled }) => (disabled ? 'transparent' : '#FFFFFF')};
  border-radius: 12px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ disabled }) =>
    disabled ? '#00000014' : 'rgba(0, 0, 0, 0.1)'};
`;

const Text = styled.Text`
  color: ${({ disabled }) => (disabled ? '#0000004D' : 'rgba(0, 0, 0, 0.9)')};
  font-size: 16px;
  font-weight: 400;
  font-family: 'Rubik';
`;

export const PrimaryButtonAlter: FC<ComponentProps> = ({
  disabled,
  onPress,
  children,
  style,
}) => (
  <View
    style={{
      borderRadius: 12,
      overflow: 'hidden',
      // @ts-ignore
      ...style,
    }}
  >
    <TouchableHighlight
      activeOpacity={disabled ? 1 : 0.4}
      underlayColor="#D7493BE5"
      onPress={disabled ? null : onPress}
    >
      <Content disabled={disabled}>
        {typeof children == 'string' ? (
          <Text disabled={disabled} children={children} />
        ) : (
          children
        )}
      </Content>
    </TouchableHighlight>
  </View>
);
