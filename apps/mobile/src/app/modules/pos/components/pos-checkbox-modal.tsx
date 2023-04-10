import React, { FC, useState } from 'react';
import { GestureResponderEvent } from 'react-native';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Entypo';

import { PosResponseDto } from '@business-loyalty-program/types';

import { useAppSelector } from '../../../store/hooks';

import { Color } from '../../../common/components/helprers';
import { CheckboxModal } from '../../../common/components/modal/checkbox-modal';

interface IComponentProps {
  onSave: (pos: PosResponseDto[]) => void;
}

type TChangeSelected = (
  id: PosResponseDto
) => (event: GestureResponderEvent) => void;

const Option = styled.TouchableOpacity`
  margin-bottom: 16px;
  padding-bottom: 16px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;

  border-bottom-width: 1px;
  border-bottom-color: #0000000a;
`;

const Information = styled.View`
  flex-grow: 1;
  flex-shrink: 1;
`;

const Title = styled.Text`
  margin-bottom: 4px;

  color: #051c3f;
  font-size: 16px;
  font-weight: 500;
`;

const Address = styled.Text`
  color: #051c3f;
  font-size: 12px;
  font-weight: 400;
`;

const renderOptions =
  (selected: PosResponseDto[], changeSelected: TChangeSelected) =>
  (items: PosResponseDto[]) =>
    items.map((item) => {
      const active = selected.find(({ id }) => id == item.id);

      const color = active ? '#D7493B' : Color.Incative;

      return (
        <Option key={item.id} onPress={changeSelected(item)}>
          <Information>
            <Title children={item?.name} />
            <Address children={item?.address} />
          </Information>

          <Ionicons name="heart" color={color} size={24} />
        </Option>
      );
    });

export const PosCheckboxModal: FC<IComponentProps> = ({ onSave }) => {
  const user = useAppSelector((state) => state.auth.data.user);
  const pos = useAppSelector((state) => state.pos.data.original);

  const [selected, setSelected] = useState(user.favouritePos);

  const changeSelected: TChangeSelected = (pos) => (event) =>
    setSelected((previous) => {
      const found = previous.find(({ id }) => id == pos.id);

      return found
        ? previous.filter(({ id }) => id != pos.id)
        : previous.concat(pos);
    });

  return (
    <CheckboxModal
      title="Любимые магазины"
      height="80%"
      onSave={onSave}
      selected={selected}
      options={pos}
    >
      {renderOptions(selected, changeSelected)}
    </CheckboxModal>
  );
};
