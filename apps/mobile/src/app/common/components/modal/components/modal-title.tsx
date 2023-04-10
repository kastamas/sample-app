import React, { FC } from 'react';
import styled from 'styled-components/native';

interface IComponentProps {
  children?: string;
}

const Text = styled.Text`
  margin-bottom: 16px;

  color: #051c3f;
  font-size: 20px;
  font-weight: 600;
  font-style: normal;
  line-height: 23px;
`;

export const Title: FC<IComponentProps> = ({ children }) =>
  children && <Text children={children} />;
