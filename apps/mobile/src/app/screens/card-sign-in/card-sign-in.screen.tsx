import React, { FC, useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  useWindowDimensions,
} from 'react-native';

import { EApplicationScreens } from '../../screens';
import { TScreenProps } from '../../navigation/types';

import { CardSignInManualTab } from './tabs/card-sign-in-manual.tab';
import { CardsSignInScannerTab } from './tabs/cards-sign-in-scanner.tab';
import { TabView } from 'react-native-tab-view';
import { CustomTabBar } from '../../common/components/tab-bar/custom-tab-bar';

const tabMaxOffset = (Dimensions.get('window').width - 48) / 2;
export const CardSignInScreen: FC<
  TScreenProps<EApplicationScreens.CardSignIn>
> = ({ route, navigation }) => {
  const layout = useWindowDimensions();

  const [barcode, setBarcode] = useState(undefined);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'scanner', title: 'Сканировать карту' },
    { key: 'manual', title: 'Ввести вручную' },
  ]);

  const renderScene = ({ route, jumpTo, ...other }) => {
    switch (route.key) {
      case `scanner`:
        return (
          <CardsSignInScannerTab
            isActive={index === 0}
            jumpToManual={() => jumpTo(`manual`)}
            onBarcodeChange={setBarcode}
          />
        );

      case `manual`:
        return (
          <CardSignInManualTab
            isActive={index === 1}
            navigation={navigation}
            barcode={barcode}
          />
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <TabView
        renderTabBar={(props) => (
          <CustomTabBar tabMaxOffset={tabMaxOffset} {...props} />
        )}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </SafeAreaView>
  );
};
