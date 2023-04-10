import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  position: absolute;
  bottom: 32px;
  left: 32px;
  padding: 12px 16px;
  width: 80%;

  background: #212121;
  border-radius: 8px;
`;

const Message = styled.Text`
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  text-align: center;

  color: #fff;
`;

export const PublicMapToast: React.FC = () => {
  return (
    <Wrapper>
      <Message>Получите бонусную карту в ближайшем магазине</Message>
    </Wrapper>
  );
};
