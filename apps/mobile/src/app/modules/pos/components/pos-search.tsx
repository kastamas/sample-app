import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { debounce } from 'lodash';
import { useAppSelector } from '../../../store/hooks';

const Wrapper = styled.View`
  position: absolute;
  top: 68px;
  z-index: 10;
  width: 100%;
  padding: 0 24px;
`;

const StyledTextInput = styled.TextInput`
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  flex: 1;
  padding-left: 16px;
  height: 48px;
  border-radius: 12px;
`;

function callUpdate(event: (value: string) => void, value: string) {
  event(value);
}

const callUpdateDebounced = debounce(callUpdate, 500);

interface IComponentProps {
  onChange(value: string): void;
  inputBackground: string;
}

export const PosSearch: React.FC<IComponentProps> = ({
  onChange,
  inputBackground,
}) => {
  const [value, setValue] = useState('');
  const posList = useAppSelector((state) => state.pos.data.original);

  useEffect(() => {
    setValue('');
  }, [posList]);

  return (
    <Wrapper>
      <StyledTextInput
        onChangeText={(value) => {
          setValue(value);
          callUpdateDebounced(onChange, value);
        }}
        style={{ backgroundColor: inputBackground }}
        placeholder="Поиск по адресу"
        placeholderTextColor="rgba(0, 0, 0, 0.3)"
        value={value}
        allowFontScaling={false}
      />
    </Wrapper>
  );
};
