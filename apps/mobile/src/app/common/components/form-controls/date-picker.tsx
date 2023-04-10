import React, { FC, useState } from 'react';
import {
  View,
  StyleProp,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Feather';

import {
  IBaseInputProps,
  IBaseInputStyledProps,
  EInputStatus,
  TextRequired,
  getBorderColor,
  getMarginBottom,
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

const InputWrapper = styled.View<IBaseInputStyledProps>`
  margin-bottom: ${({ status }) => getMarginBottom(status)};

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  background-color: #f0f0f0;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${({ status, isRequired }) =>
    getBorderColor(status, isRequired)};
`;

const TextInput = styled.TextInput`
  flex-grow: 1;
  padding: 14.5px 12px;

  color: black;
  font-size: 16px;
`;

export const DatePicker: FC<IComponentProps> = ({
  required,
  label,
  value,
  format,
  formatMessage,
  onChange,
  placeholder,
  style,
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

      <InputWrapper status={status} isRequired={required}>
        <TextInput
          placeholder={placeholder ? placeholder : 'дд.мм.гггг'}
          placeholderTextColor="#0000004D"
          value={value}
          onChange={handleChange}
        />

        <Ionicons
          name="calendar"
          size={20}
          color="#858ea3"
          style={{ marginRight: 12 }}
        />
      </InputWrapper>

      {renderStateMessage(status, required, formatMessage)}
    </View>
  );
};
