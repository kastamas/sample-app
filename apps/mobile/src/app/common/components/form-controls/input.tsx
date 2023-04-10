import React, { FC, useState } from 'react';
import {
  View,
  StyleProp,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import styled from 'styled-components/native';

import {
  IBaseInputProps,
  IBaseInputStyledProps,
  EInputStatus,
  TextRequired,
  getMarginBottom,
  getBorderColor,
  renderStateMessage,
} from './helpers';

interface IComponentProps extends IBaseInputProps<string> {
  style?: StyleProp<ViewStyle>;
}

const Label = styled.Text`
  margin-bottom: 4px;

  color: #858ea3;
  font-size: 12px;
`;

const TextInput = styled.TextInput<IBaseInputStyledProps>`
  margin-bottom: ${({ status }) => getMarginBottom(status)};
  padding: 14.5px 12px;

  color: black;
  font-size: 16px;

  background-color: #f0f0f0;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${({ status, isRequired }) =>
    getBorderColor(status, isRequired)};
`;

export const Input: FC<IComponentProps> = ({
  label,
  value,
  format,
  formatMessage,
  placeholder,
  onChange,
  required,
  style,
  autoCapitalize,
}) => {
  const [status, setStatus] = useState<EInputStatus>(EInputStatus.Pristine);

  const handleChange = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    const value = event.nativeEvent.text;

    if (value.trim() === '') {
      setStatus(EInputStatus.Empty);
    } else if (format && !format.test(value)) {
      setStatus(EInputStatus.Error);
    } else {
      setStatus(EInputStatus.Touched);
    }

    onChange(value, status);
  };

  return (
    <View style={style}>
      <Label>
        {label} {required && <TextRequired>*</TextRequired>}
      </Label>

      <TextInput
        isRequired={required}
        status={status}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        autoCapitalize={autoCapitalize}
      />

      {renderStateMessage(status, required, formatMessage)}
    </View>
  );
};
