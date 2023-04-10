import { PromoCollectionDto } from '@business-loyalty-program/types';
import { BranchBuilder } from '../../common/services/branch-builder';

const { slice: promosSlice, actions: promosActions } =
  new BranchBuilder<PromoCollectionDto>()
    .setInitialData({
      data: [],
      meta: { itemsAmount: 0, pageSize: 0, pagesAmount: 0, currentPage: 0 },
    })
    .defineActions((api) => ({
      async getPromoList() {
        return await api.get<PromoCollectionDto>('/promos');
      },
    }))
    .build('promos');

export { promosSlice, promosActions };
