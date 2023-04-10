import React from 'react';
import { TextInput } from 'react-native';
import styled from 'styled-components/native';

export enum EInputStatus {
  Touched = 'touched',
  Pristine = 'pristine',
  Empty = 'empty',
  Error = 'error',
}

export interface IBaseInputProps<Value> {
  required?: boolean;
  label?: string;
  placeholder?: string;
  value?: Value;
  format?: RegExp;
  formatMessage?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  onChange: (value: Value, status?: EInputStatus) => void;
}

export interface IBaseInputStyledProps extends Partial<TextInput> {
  status: EInputStatus;
  isRequired?: boolean;
}

export const TextRequired = styled.Text`
  color: #e56238;
`;

export const TextError = styled.Text`
  color: #e56238;
`;

export const formatDateOfBirth = (dateOfBirth: string) => {
  const [search, date, month, year] = /([0-9]{2})\.([0-9]{2})\.([0-9]{4})/.exec(
    dateOfBirth
  );

  return [year, month, date].join('-');
};

export const getBorderColor = (status: EInputStatus, isRequired = false) => {
  switch (status) {
    case EInputStatus.Empty:
      return isRequired ? '#e56238' : 'transparent';
    case EInputStatus.Error:
      return '#e56238';
    default:
      return 'transparent';
  }
};

export const getMarginBottom = (status: EInputStatus) => {
  switch (status) {
    case EInputStatus.Empty:
    case EInputStatus.Error:
      return '4px';
    default:
      return '0';
  }
};

export const renderStateMessage = (
  state: EInputStatus,
  isRequired = false,
  formatMessage?: string
) => {
  switch (state) {
    case EInputStatus.Empty:
      return isRequired ? <TextError>Обязательное поле</TextError> : null;

    case EInputStatus.Error:
      return (
        <TextError>
          {formatMessage
            ? ['Укажите в формате', '-', formatMessage].join(' ')
            : 'Неверный формат'}
        </TextError>
      );
  }
};
