import React, { FC, useState } from 'react';
import {
  View,
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native';
import styled from 'styled-components/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { flow, get } from 'lodash/fp';

import { Color } from '../helprers';
import {
  IBaseInputProps,
  IBaseInputStyledProps,
  EInputStatus,
  TextRequired,
  getBorderColor,
  getMarginBottom,
  renderStateMessage,
} from './helpers';

interface IComponentProps extends IBaseInputProps<boolean> {
  style?: StyleProp<ViewStyle>;
}

const Wrapper = styled.View<IBaseInputStyledProps>`
  margin-bottom: ${flow(get('status'), getMarginBottom)};

  display: flex;
  flex-direction: row;
`;

const Control = styled.TouchableOpacity`
  margin-right: 12px;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TextView = styled.View<IBaseInputStyledProps>`
  border-bottom-width: 1px;
  border-color: ${flow(get('status'), getBorderColor)};
`;

const Text = styled.Text<{ color: string }>`
  font-family: 'Rubik';
  margin-left: 8px;
  line-height: 19px;
  font-style: normal;
  font-weight: 400;
  color: ${get('color')};
  font-size: 16px;
`;

export const Checkbox: FC<IComponentProps> = ({
  label,
  value,
  onChange,
  required,
  style,
}) => {
  const [status, setStatus] = useState<EInputStatus>(EInputStatus.Pristine);

  const icon = value ? 'checkbox-marked' : 'checkbox-blank-outline';
  const color = value ? Color.Active : Color.Incative;

  const handleChange = (value: boolean) => (event: GestureResponderEvent) => {
    if (!value) {
      setStatus(EInputStatus.Empty);
    } else {
      setStatus(EInputStatus.Touched);
    }

    onChange(value, status);
  };

  return (
    <View style={style}>
      <Wrapper status={status}>
        <Control onPress={handleChange(!value)}>
          <MaterialCommunityIcons name={icon} color={color} size={24} />

          <TextView status={status}>
            <Text color={color}>
              {label} {required && <TextRequired>*</TextRequired>}
            </Text>
          </TextView>
        </Control>
      </Wrapper>

      {renderStateMessage(status)}
    </View>
  );
};
