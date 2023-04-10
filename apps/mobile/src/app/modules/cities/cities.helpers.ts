import { CitiesResponseDto } from '@business-loyalty-program/types';

export const getSelectedCity = (city?: CitiesResponseDto) =>
  city?.name || 'Не выбрано';
