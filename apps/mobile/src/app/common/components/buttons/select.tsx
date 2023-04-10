import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { flow, get } from 'lodash/fp';

import {
  IBaseInputStyledProps,
  getBorderColor,
  getMarginBottom,
  EInputStatus,
  renderStateMessage,
  TextRequired,
} from '../form-controls/helpers';

interface IButtonProps<Value> {
  label: string;
  value: Value;
  onPress: () => void;
  required?: boolean;
  children: string;
  style?: StyleProp<ViewStyle>;
}

const TouchableOpacity = styled.TouchableOpacity<IBaseInputStyledProps>`
  margin-top: 4px;
  margin-bottom: ${flow(get('status'), getMarginBottom)};
  padding: 14.5px 12px;
  background: #f0f0f0;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-radius: 12px;
  border-width: 1px;
  border-color: ${({ status, isRequired }) =>
    getBorderColor(status, isRequired)};
`;

const Label = styled.Text`
  margin-bottom: 4px;
  font-family: 'Rubik';
  color: rgba(0, 0, 0, 0.5);
  font-size: 12px;
  line-height: 14px;
  font-style: normal;
  font-weight: 400;
`;

const Text = styled.Text`
  font-family: 'Rubik';
  color: rgba(0, 0, 0, 0.9);
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
`;

export function Select<Value>({
  label,
  value,
  onPress,
  required,
  style,
  children,
}: IButtonProps<Value>) {
  const [status, setStatus] = useState<EInputStatus>(EInputStatus.Pristine);

  const initialRender = useRef(true);

  const updateStatus = () => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      if (value) {
        setStatus(EInputStatus.Touched);
      } else {
        setStatus(EInputStatus.Empty);
      }
    }
  };

  useEffect(() => {
    updateStatus();
  }, [value]);

  const handlePress = (event: GestureResponderEvent) => {
    updateStatus();
    onPress();
  };

  return (
    <View style={style}>
      <Label>
        {label} {required && <TextRequired>*</TextRequired>}
      </Label>

      <TouchableOpacity
        onPress={handlePress}
        status={status}
        isRequired={required}
      >
        <Text children={children} />

        <Ionicons name="chevron-forward" color="#a2aabe" size={20} />
      </TouchableOpacity>

      {renderStateMessage(status, required)}
    </View>
  );
}
