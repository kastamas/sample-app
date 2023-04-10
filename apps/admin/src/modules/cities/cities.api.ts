import { ApiMethod, BaseApi, buildApiHooks } from '@flexypw/react-tools';
import { CitiesResponseDto } from '@business-loyalty-program/types';

export class CitiesApi extends BaseApi {
  @ApiMethod()
  public getCities(): Promise<CitiesResponseDto[]> {
    return this.client.get('/cities');
  }
}

const { useGetCities } = buildApiHooks(CitiesApi);

export { useGetCities };
