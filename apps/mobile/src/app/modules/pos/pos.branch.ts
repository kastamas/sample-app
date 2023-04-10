import { PosResponseDto } from '@business-loyalty-program/types';
import { BranchBuilder } from '../../common/services/branch-builder';
import { LocationService } from '../../common/services/location-service';
import { ILocationData } from '../location/location.branch';

interface IPosBranchData {
  original: PosResponseDto[];
  filtered: PosResponseDto[];
}

const { slice: posSlice, actions: posActions } =
  new BranchBuilder<IPosBranchData>()
    .setInitialData({
      original: [],
      filtered: [],
    })
    .defineActions((api) => ({
      async getPosList(_: void, { getState }) {
        const state: any = getState();
        const location: ILocationData = state.location.data;

        const data = await api.get<PosResponseDto[]>('/pos');

        const sortedData = location
          ? data.sort((a, b) =>
              new LocationService(location).sortByDistance(a, b)
            )
          : data;

        return {
          original: sortedData,
          filtered: sortedData,
        };
      },
      async applyFilter(filter: string, { getState }) {
        const state: any = getState();
        const original: PosResponseDto[] = state.pos.data.original;

        const filtered = original.filter(
          ({ name, address }) =>
            name.toLowerCase().includes(filter.toLowerCase()) ||
            address.toLowerCase().includes(filter.toLowerCase())
        );

        return {
          original,
          filtered,
        };
      },
    }))
    .build('pos');

export { posSlice, posActions };
