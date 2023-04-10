import React, { useState } from 'react';
import { GestureResponderEvent } from 'react-native';

import { PrimaryButton } from '../buttons/primary';

import { IOption } from './helpers';
import { Wrapper } from './components/modal-wrapper';
import { Title } from './components/modal-title';
import { Options } from './components/modal-options';

interface IComponentProps<Item extends IOption> {
  title?: string;
  height?: string;
  selected?: Item;
  onSave: (option?: Item) => void;
  children: JSX.Element[];
}

export function RadioModal<Item extends IOption>({
  title,
  height,
  selected,
  onSave,
  children,
}: IComponentProps<Item>) {
  const [previous] = useState(selected?.id);

  const unchanged = previous === selected?.id;

  const handlePress = (event: GestureResponderEvent) =>
    !unchanged && onSave(selected);

  return (
    <Wrapper height={height}>
      <Title children={title} />

      <Options children={children} />

      <PrimaryButton onPress={handlePress} disabled={unchanged}>
        Сохранить
      </PrimaryButton>
    </Wrapper>
  );
}
