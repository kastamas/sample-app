import React from 'react';
import styled from 'styled-components/native';
import { StyleProp, ViewStyle } from 'react-native';

const Wrapper = styled.TouchableOpacity`
  width: 100%;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  flex-direction: row;
`;

const ButtonText = styled.Text<{ disabled?: boolean }>`
  color: ${({ disabled }) =>
    disabled ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.9)'};
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  text-decoration-line: underline;
  text-decoration-color: rgba(0, 0, 0, 0.9);
`;

interface IComponentProps {
  children: string;
  onPress(): void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const LinkButton: React.FC<IComponentProps> = ({
  children,
  onPress,
  disabled,
  style,
}) => {
  return (
    <Wrapper
      disabled={disabled}
      style={style as any}
      activeOpacity={0.4}
      onPress={onPress}
    >
      <ButtonText>{children}</ButtonText>
    </Wrapper>
  );
};
