import React from 'react';
import {
  View,
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Color } from '../helprers';
import { IBaseInputProps, EInputStatus } from './helpers';

interface IContract {
  label: string;
  value: any;
}

interface IComponentProps<Item extends IContract>
  extends IBaseInputProps<Item> {
  items: Item[];
  value: Item['value'];
  onChange: (value: Item['value'], status?: EInputStatus) => void;
  style?: StyleProp<ViewStyle>;
}

const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
`;

const Control = styled.TouchableOpacity`
  margin-right: 12px;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Text = styled.Text`
  margin-left: 8px;

  color: #051c3f;
  font-size: 16px;
`;

export function RadioPicker<Item extends IContract>({
  items,
  value,
  onChange,
  style,
}: IComponentProps<Item>) {
  return (
    <View style={style}>
      <Wrapper>
        {items.map((item) => {
          const active = item.value === value;

          const icon = `radio-button-${active ? 'on' : 'off'}`;
          const color = active ? Color.Active : Color.Incative;

          const handleChange =
            (value: Item) => (event: GestureResponderEvent) => {
              active ? onChange(undefined) : onChange(value);
            };

          return (
            <View key={item.value} style={style}>
              <Control onPress={handleChange(item.value)}>
                <Ionicons name={icon} color={color} size={24} />

                <Text>{item.label}</Text>
              </Control>
            </View>
          );
        })}
      </Wrapper>
    </View>
  );
}
