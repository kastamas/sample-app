import { BranchBuilder } from '../../common/services/branch-builder';

export interface IConfigData {
  showTabs: boolean;
}

const { slice: configSlice, actions: configActions } =
  new BranchBuilder<IConfigData>()
    .setInitialData({
      showTabs: true,
    })
    .defineActions((api) => ({
      async changeTabsVisibility(visibility: boolean) {
        return {
          showTabs: visibility,
        };
      },
    }))
    .build('config');

export { configSlice, configActions };
