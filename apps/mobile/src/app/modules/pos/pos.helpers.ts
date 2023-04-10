import { PosResponseDto } from '@business-loyalty-program/types';

export const getSelectedPos = (pos?: PosResponseDto[]) =>
  pos?.length ? `Выбрано: ${pos.length}` : 'Не выбрано';
