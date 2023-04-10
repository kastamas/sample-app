import React from 'react';
import styled from 'styled-components';
import { BlpIcon } from '../icons/blp-icon';
import { palette } from '../styles/theme';
import { Tooltip } from 'antd';

const Wrapper = styled.div`
  width: 36px;
  height: 36px;
  background-color: ${palette.backgroundPrimary};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 4px;
  color: #a2aabe;

  &:hover {
    color: ${palette.primary};
    background-color: rgba(47, 141, 254, 0.08);
  }
`;

interface IComponentProps {
  iconName: string;
  tooltipTitle: string;
  onClick(): void;
}

export const IconButton: React.FC<IComponentProps> = ({
  iconName,
  tooltipTitle,
  onClick,
}) => {
  return (
    <Tooltip title={tooltipTitle} placement="top">
      <Wrapper onClick={onClick}>
        <BlpIcon iconName={iconName} />
      </Wrapper>
    </Tooltip>
  );
};
