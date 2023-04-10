import React from 'react';
import styled from 'styled-components';
import { PromoResponseDto } from '@business-loyalty-program/types';
import { IconButton, palette } from '@business-loyalty-program/ui-kit';
import { EPromoStatus } from '@business-loyalty-program/enums';

const Wrapper = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: space-between;

  &:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  }
`;

const ImageWrapper = styled.div`
  height: 76px;
  width: 136px;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 6px;
  }
`;

const Content = styled.div`
  display: flex;
  gap: 20px;
`;

const Description = styled.div``;

const Title = styled.h3`
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
`;

const DescriptionText = styled.p`
  width: 300px;
  margin-top: 8px;
  color: ${palette.textSecondary};
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
`;

const Controls = styled.div`
  display: flex;
  gap: 8px;
`;

interface IComponentProps {
  item: PromoResponseDto;
  onAction(type: 'changeStatus' | 'edit'): void;
}

export const PromoCard: React.FC<IComponentProps> = ({ item, onAction }) => {
  return (
    <Wrapper>
      <Content>
        <ImageWrapper>
          <img src={item.image.medium} />
        </ImageWrapper>
        <Description>
          <Title>{item.name}</Title>
          <DescriptionText>{item.description}</DescriptionText>
        </Description>
      </Content>
      <Controls>
        <IconButton
          tooltipTitle="Редактировать"
          onClick={() => onAction('edit')}
          iconName="edit-2"
        />
        <IconButton
          tooltipTitle={
            item.status === EPromoStatus.Active
              ? 'Архивировать'
              : 'Разархивировать'
          }
          onClick={() => onAction('changeStatus')}
          iconName="arhive"
        />
      </Controls>
    </Wrapper>
  );
};
