import React from 'react';
import styled from 'styled-components';
import { Caption, palette, Text } from '@business-loyalty-program/ui-kit';

const Wrapper = styled.div`
  height: 40px;
  overflow: hidden;

  ${Text} {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const Title = styled(Caption)`
  color: ${palette.textSecondary};
`;

interface IComponentProps {
  title: string;
  children: React.ReactNode;
}

export const NotificationCardItem: React.FC<IComponentProps> = ({
  children,
  title,
}) => (
  <Wrapper>
    <Title>{title}</Title>
    <Text>{children}</Text>
  </Wrapper>
);
