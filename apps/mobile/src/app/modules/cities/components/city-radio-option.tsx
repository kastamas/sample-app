import React from 'react';
import { Color } from '../../../common/components/helprers';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CitiesResponseDto } from '@business-loyalty-program/types';
import styled from 'styled-components/native';

interface IComponentProps {
  item: CitiesResponseDto;
  onPress(id: string): void;
  active: boolean;
}

const Label = styled.Text`
  color: #051c3f;
  font-size: 16px;
  font-weight: 400;
`;

const Option = styled.TouchableOpacity<{ active: boolean }>`
  margin-bottom: 16px;
  padding: 16px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border: 1px solid #0000001a;
  border-radius: 12px;
  background-color: ${({ active }) => (active ? '#f0f0f0' : '#ffffff')};
`;

export const CityRadioOption: React.FC<IComponentProps> = ({
  item,
  active,
  onPress,
}) => {
  const icon = `radio-button-${active ? 'on' : 'off'}`;
  const color = active ? Color.Active : Color.Incative;

  return (
    <Option active={active} onPress={() => onPress(item.id)}>
      <Label>{item.name}</Label>
      <Ionicons name={icon} color={color} size={24} />
    </Option>
  );
};
