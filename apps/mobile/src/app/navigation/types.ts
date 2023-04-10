import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { EApplicationScreens } from '../screens';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type RootStackParamList = {
  [EApplicationScreens.MainTabs]: undefined;
  [EApplicationScreens.Auth]: undefined;
  [EApplicationScreens.PhoneCodeValidation]: {
    cardNumber: string;
  };
  [EApplicationScreens.Home]: undefined;
  [EApplicationScreens.Profile]: undefined;
  [EApplicationScreens.Addresses]: {
    isPublic: boolean;
  };
  [EApplicationScreens.Pos]: undefined;
  [EApplicationScreens.CardSignIn]: undefined;
  [EApplicationScreens.Promo]: undefined;
  [EApplicationScreens.PromoCard]: {
    id: string;
  };
  [EApplicationScreens.SignUp]: {
    isDemo: boolean;
  };
};

export type TTabProps<Route extends EApplicationScreens> = {
  route: RouteProp<RootStackParamList, Route>;
  navigation: BottomTabNavigationProp<RootStackParamList, Route>;
};

export type TScreenProps<Route extends EApplicationScreens> = {
  route: RouteProp<RootStackParamList, Route>;
  navigation: StackNavigationProp<RootStackParamList, Route>;
};
