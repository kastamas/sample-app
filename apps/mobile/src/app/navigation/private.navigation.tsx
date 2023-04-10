import React, { useEffect } from 'react';
import { EApplicationScreens } from '../screens';
import OneSignal from 'react-native-onesignal';
import { useAppSelector } from '../store/hooks';
import { createStackNavigator } from '@react-navigation/stack';
import { MainTabNavigation } from './main-tab.navigation';
import { PromoCardScreen } from '../screens/promos/promo-card.screen';
import { EAuthState } from '../modules/auth/auth.branch';

const Stack = createStackNavigator();
export const PrivateNavigation: React.FC = () => {
  const user = useAppSelector((state) => state.auth.data.user);
  const authState = useAppSelector((state) => state.auth.data.authState);

  const isDemo = authState === EAuthState.Demo;

  useEffect(() => {
    if (!isDemo && user) {
      OneSignal.setExternalUserId(user.id, (results) => {
        console.log('Results of setting external user id');
        console.log(results);
      });
    }
  }, [isDemo]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name={EApplicationScreens.MainTabs}
        component={MainTabNavigation}
      />
      <Stack.Screen
        options={{ header: () => null }}
        name={EApplicationScreens.PromoCard}
        component={PromoCardScreen}
      />
    </Stack.Navigator>
  );
};
