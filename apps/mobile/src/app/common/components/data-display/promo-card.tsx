import * as React from 'react';
import styled from 'styled-components/native';
import { EApplicationScreens } from '../../../screens';
import { PromoResponseDto } from '@business-loyalty-program/types';
import { TTabProps } from '../../../navigation/types';
import { TouchableOpacity } from 'react-native';

const CardImg = styled.ImageBackground`
  display: flex;
  flex-direction: row;
  width: 100%;
  //height: 148px;
  margin-top: 12px;

  overflow: hidden;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  //border: 1px solid #00000014;
  aspect-ratio: 1.7777777777777777;
  border-bottom-width: 0px;
`;

const CardContentWrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-top-width: 0px;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  background-color: #ffffff;
`;

const CardName = styled.Text`
  font-family: 'Rubik';
  margin-bottom: 4px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: rgba(0, 0, 0, 0.9);
`;

const CardDescription = styled.Text`
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: rgba(0, 0, 0, 0.5);
`;

interface IComponentProps extends TTabProps<EApplicationScreens.Promo> {
  item: PromoResponseDto;
}

export const PromoCard: React.FC<IComponentProps> = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate(EApplicationScreens.PromoCard, { id: item.id })
      }
    >
      <CardImg source={{ uri: item.image.medium }} />
      <CardContentWrapper>
        <CardName ellipsizeMode="tail" numberOfLines={1}>
          {item.name}
        </CardName>
        <CardDescription ellipsizeMode="tail" numberOfLines={1}>
          {item.description ? item.description : 'Нет описания'}
        </CardDescription>
      </CardContentWrapper>
    </TouchableOpacity>
  );
};
