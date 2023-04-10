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
  options: Item[];
  selected: Item[];
  onSave: (options: Item[]) => void;
  children: (options: Item[]) => JSX.Element[];
}

export function CheckboxModal<Item extends IOption>({
  title,
  height,
  options,
  selected,
  onSave,
  children,
}: IComponentProps<Item>) {
  const [previous] = useState(selected);

  const ids = {
    previous: previous.map((option) => option.id),
    current: selected.map((option) => option.id),
  };

  const unchanged =
    ids.previous.length == ids.current.length &&
    ids.previous.map((id) => ids.current.includes(id)).every(Boolean);

  const handlePress = (event: GestureResponderEvent) =>
    !unchanged && onSave(selected);

  return (
    <Wrapper height={height}>
      <Title children={title} />

      <Options children={children(options)} />

      <PrimaryButton onPress={handlePress} disabled={unchanged}>
        Сохранить
      </PrimaryButton>
    </Wrapper>
  );
}
