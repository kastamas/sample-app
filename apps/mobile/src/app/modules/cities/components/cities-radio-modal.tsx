import React, { FC, useEffect, useState } from 'react';

import { CitiesResponseDto } from '@business-loyalty-program/types';

import { useAppSelector } from '../../../store/hooks';

import { RadioModal } from '../../../common/components/modal/radio-modal';
import { CityRadioOption } from './city-radio-option';

interface IComponentProps {
  value?: CitiesResponseDto;
  onSave: (city?: CitiesResponseDto) => void;
}

export const CitiesRadioModal: FC<IComponentProps> = ({ onSave, value }) => {
  const cities = useAppSelector((state) => state.cities.data);
  console.log(cities);

  const [selected, setSelected] = useState(value);

  const changeSelected = (id: string) => {
    setSelected(cities.find((option) => option.id === id));
  };

  useEffect(() => {
    if (value) {
      setSelected(value);
    }
  }, [value]);

  return (
    <RadioModal title="Выбрать город" onSave={onSave} selected={selected}>
      {cities.map((item) => (
        <CityRadioOption
          key={item.id}
          item={item}
          active={item.id === selected?.id}
          onPress={changeSelected}
        />
      ))}
    </RadioModal>
  );
};
