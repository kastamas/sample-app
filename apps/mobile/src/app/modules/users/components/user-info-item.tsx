import React, { FC } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import styled from 'styled-components/native';

interface IComponentProps {
  title: string;
  children: string;
  style?: StyleProp<ViewStyle>;
}

const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
`;

const Label = styled.Text`
  font-family: 'Rubik';
  margin-bottom: 8.5px;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: rgba(0, 0, 0, 0.5);
`;

const Text = styled.Text`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: rgba(0, 0, 0, 0.9);
`;

export const UserInfoItem: FC<IComponentProps> = ({
  title,
  children,
  style,
}) => (
  <View style={style}>
    <Wrapper>
      <Label>{title}</Label>
      <Text>{children}</Text>
    </Wrapper>
  </View>
);
