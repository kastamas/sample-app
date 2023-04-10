import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import type { PosResponseDto } from '@business-loyalty-program/types';
import Ionicons from 'react-native-vector-icons/Entypo';
import { PosInfo } from './pos-info';
import { useAppSelector } from '../../../store/hooks';
import _ from 'lodash';

const Wrapper = styled.View`
  position: absolute;
  bottom: -10px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  z-index: 100;
`;

const ContentWrapper = styled.View`
  background-color: white;
  height: 265px;
  width: 100%;
  padding: 32px 20px;
  border-radius: 16px;
`;

const IconWrapper = styled.View`
  width: 28px;
  height: 28px;
  background-color: transparent;
  position: absolute;
  right: 30px;
  top: 28px;
`;

interface IComponentProps {
  pos: PosResponseDto;
  badgeTitle?: string;
}

export const PosMapOverlay: React.FC<IComponentProps> = ({
  pos,
  badgeTitle,
}) => {
  const user = useAppSelector((state) => state.auth.data.user);
  const userFavoritePosIds = _.map(user?.favouritePos, 'id');

  const isSelected = (item: PosResponseDto) =>
    userFavoritePosIds.includes(item.id);

  return (
    <Wrapper>
      <ContentWrapper>
        <IconWrapper>
          <Ionicons
            name="heart"
            color={isSelected(pos) ? '#D7493B' : '#D8D8D8'}
            size={28}
          />
        </IconWrapper>
        <PosInfo pos={pos} badgeTitle={badgeTitle} />
      </ContentWrapper>
    </Wrapper>
  );
};
