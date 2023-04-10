import styled from 'styled-components';
import { palette } from '@business-loyalty-program/ui-kit';
import React from 'react';
import { MenuItem } from './menu-item';
import { routes } from '../../../routes';

const Wrapper = styled.div`
  padding-top: 20px;
  padding-bottom: 16px;
  padding-right: 12px;
  padding-left: 12px;

  background: ${palette.text};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ControlsWrapper = styled.div``;

const LogoWrapper = styled.div`
  margin-bottom: 32px;
  margin-left: 8px;
  display: flex;
  align-items: center;
`;

const LogoIcon = styled.img.attrs((props) => ({
  src: '/images/logo-icon.svg',
}))`
  width: 40px;
  height: 40px;
  margin-right: 8px;
`;

const LogoText = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
  color: ${palette.white};
`;

const MenuWrapper = styled.div``;

export const AppMenu: React.FC = () => {
  return (
    <Wrapper>
      <ControlsWrapper>
        <LogoWrapper>
          <LogoIcon />
          <LogoText>
            Loyalty
            <br />
            Program
          </LogoText>
        </LogoWrapper>
        <MenuWrapper>
          <MenuItem href={routes.cards} iconName="user-add">
            Карты
          </MenuItem>
          <MenuItem href={routes.pos} iconName="shopping-cart">
            Магазины
          </MenuItem>
          <MenuItem href={routes.settings} iconName="settings">
            Настройки
          </MenuItem>
          <MenuItem href={routes.promos} iconName="gift">
            Акции
          </MenuItem>
          <MenuItem href={routes.notifications} iconName="bell">
            Уведомления
          </MenuItem>
        </MenuWrapper>
      </ControlsWrapper>
    </Wrapper>
  );
};
