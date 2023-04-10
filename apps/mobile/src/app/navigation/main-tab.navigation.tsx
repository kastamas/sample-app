import React from 'react';
import { EApplicationScreens } from '../screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { getTabBarStyle } from './utils';
import { Text } from 'react-native';
import { cond, isEqual, constant } from 'lodash/fp';
import { HomeScreen } from '../screens/home.screen';
import { AddressesScreen } from '../screens/addresses.screen';
import { ProfileScreen } from '../screens/profile.screen';
import { PromosScreen } from '../screens/promos/promos.screen';
import { useAppSelector } from '../store/hooks';

const Tab = createBottomTabNavigator();

export const getTabTitle = cond([
  [isEqual(EApplicationScreens.Home), constant('Моя карта')],
  [isEqual(EApplicationScreens.Addresses), constant('Магазины')],
  [isEqual(EApplicationScreens.Promo), constant('Акции')],
  [isEqual(EApplicationScreens.Profile), constant('Профиль')],
]);

export const MainTabNavigation: React.FC = () => {
  const showTabs = useAppSelector((state) => state.config.data.showTabs);

  return (
    <Tab.Navigator
      initialRouteName={EApplicationScreens.Home}
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#D7493B',
        tabBarInactiveTintColor: '#00000080',
        tabBarItemStyle: {
          paddingTop: 9,
          paddingBottom: 25,
        },
        tabBarStyle: getTabBarStyle(showTabs),
        tabBarHideOnKeyboard: true,
        tabBarLabel: (props) => (
          <Text
            style={{
              color: props.focused ? '#000000e6' : '#00000080',
              fontFamily: 'Rubik',
              fontSize: 12,
              lineHeight: 16,
              fontWeight: '400',
            }}
          >
            {getTabTitle(route.name)}
          </Text>
        ),
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case EApplicationScreens.Home:
              return <Ionicons name="wallet-outline" size={20} color={color} />;
            case EApplicationScreens.Profile:
              return <Ionicons name="person-outline" size={20} color={color} />;
            case EApplicationScreens.Promo:
              return <Icon name="percent" size={20} color={color} />;
            case EApplicationScreens.Addresses:
              return <Icon name="map-pin" size={20} color={color} />;
          }
        },
        tabBarButton: (props) => (
          <TouchableOpacity {...props} activeOpacity={0.5} />
        ),
      })}
    >
      <Tab.Screen
        options={{
          title: getTabTitle(EApplicationScreens.Home),
          headerShown: false,
        }}
        name={EApplicationScreens.Home}
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          title: getTabTitle(EApplicationScreens.Addresses),
          headerShown: false,
        }}
        name={EApplicationScreens.Addresses}
        component={AddressesScreen}
      />
      <Tab.Screen
        options={{
          title: getTabTitle(EApplicationScreens.Promo),
          headerShown: false,
        }}
        name={EApplicationScreens.Promo}
        component={PromosScreen}
      />
      <Tab.Screen
        options={{
          title: getTabTitle(EApplicationScreens.Profile),
          headerShown: false,
        }}
        name={EApplicationScreens.Profile}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};
