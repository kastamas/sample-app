import { BranchBuilder } from '../../common/services/branch-builder';
import { AuthApiService } from './auth-api.service';

interface ICodeCheckBranchData {
  lastTryTime: number;
  phone: string;
}

const { slice: codeCheckSlice, actions: codeCheckActions } =
  new BranchBuilder<ICodeCheckBranchData>()
    .defineActions((api) => ({
      async createCode(cardNumber: string) {
        const data = await new AuthApiService().createCode(cardNumber);

        return {
          lastTryTime: new Date().getTime(),
          phone: data.phone,
        };
      },
    }))
    .build('codeCheck');

export { codeCheckSlice, codeCheckActions };
