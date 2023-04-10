import React from 'react';
import styled from 'styled-components';
import {
  CitiesResponseDto,
  NotificationsResponseDto,
  PosCollectionDto,
} from '@business-loyalty-program/types';
import { NotificationCardItem } from './notification-card-item';
import { EUserGender } from '@business-loyalty-program/enums';
import {
  constant,
  cond,
  isEqual,
  stubTrue as otherwise,
  flow,
  size,
  concat,
  get,
} from 'lodash/fp';
import { Tooltip } from 'antd';
import moment from 'moment';

const Wrapper = styled.div`
  padding: 20px 0;
  display: grid;
  gap: 16px;
  grid-template-columns: 64px 120px 80px 120px 250px 1fr;

  &:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  }
`;

const ImageWrapper = styled.div`
  height: 40px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
`;

interface IComponentProps {
  item: NotificationsResponseDto;
  pos: PosCollectionDto;
  cities: CitiesResponseDto[];
}

const getGender = cond([
  [isEqual(EUserGender.Female), constant('Женский')],
  [isEqual(EUserGender.Male), constant('Мужской')],
  [otherwise, constant('Любой')],
]);

const getMultipleChoseLabel = (collectionAmount: number, titleField: string) =>
  cond([
    [flow(size, isEqual(collectionAmount)), constant('Все')],
    [flow(size, isEqual(1)), get(`[0].${titleField}`)],
    [otherwise, flow(size, concat('Выбрано '))],
  ]);

export const NotificationCard: React.FC<IComponentProps> = ({
  item,
  pos,
  cities,
}) => {
  const getCitiesLabel = getMultipleChoseLabel(cities.length, 'name');
  const getPosLabel = getMultipleChoseLabel(pos.data.length, 'address');

  return (
    <Wrapper>
      <ImageWrapper>
        <img src={item.image.medium} />
      </ImageWrapper>
      <NotificationCardItem title="Дата">
        {moment(item.date).format('DD.MM.YYYY HH:mm')}
      </NotificationCardItem>
      <NotificationCardItem title="Пол">
        {getGender(item.gender)}
      </NotificationCardItem>
      <NotificationCardItem title="Город">
        <Tooltip
          title={item.cities.map((item) => (
            <p key={item.id}>{item.name}</p>
          ))}
        >
          {getCitiesLabel(item.cities)}
        </Tooltip>
      </NotificationCardItem>
      <NotificationCardItem title="Любимые магазины">
        <Tooltip
          title={item.pos.map((item) => (
            <p>{item.address}</p>
          ))}
        >
          {getPosLabel(item.pos)}
        </Tooltip>
      </NotificationCardItem>
      <NotificationCardItem title="Текст">
        <Tooltip title={item.text}>{item.text}</Tooltip>
      </NotificationCardItem>
    </Wrapper>
  );
};
