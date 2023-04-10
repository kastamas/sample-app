import * as React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';

const Wrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 34px;
`;

const Title = styled.Text`
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.9);
  margin-left: 16px;
`;

interface IComponentProps {
  onPress: () => void;
  title: string;
  style?: any;
}

export const BackHeader: React.FC<IComponentProps> = ({
  style,
  onPress,
  title,
}) => {
  return (
    <Wrapper onPress={onPress} activeOpacity={0.5} style={style}>
      <Icon name="arrow-left" color="#B3B3B3" size={24} />
      <Title>{title}</Title>
    </Wrapper>
  );
};
