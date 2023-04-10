import React, { FC } from 'react';
import { GestureResponderEvent } from 'react-native';
import styled from 'styled-components/native';

interface ComponentProps {
  onPress?: (event: GestureResponderEvent) => void;
}

const TouchableOpacity = styled.TouchableOpacity`
  background-color: #0000004d;

  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
`;

export const TouchableBackground: FC<ComponentProps> = (props) => (
  <TouchableOpacity {...props} />
);
