import { CitiesResponseDto } from '@business-loyalty-program/types';
import { BranchBuilder } from '../../common/services/branch-builder';

const { slice: citiesSlice, actions: citiesActions } = new BranchBuilder<
  CitiesResponseDto[]
>()
  .setInitialData([])
  .defineActions((api) => ({
    async getCitiesList() {
      return await api.get<CitiesResponseDto[]>('/cities');
    },
  }))
  .build('cities');

export { citiesSlice, citiesActions };
