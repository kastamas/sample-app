import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useEffect } from 'react';
import { authActions, EAuthState } from '../modules/auth/auth.branch';
import { NavigationContainer } from '@react-navigation/native';

import RNBootSplash from 'react-native-bootsplash';
import { EApplicationScreens } from '../screens';
import { AuthScreen } from '../screens/auth.screen';
import { CardSignInScreen } from '../screens/card-sign-in/card-sign-in.screen';
import { PhoneCodeValidationScreen } from '../screens/phone-code-validation.screen';
import { AddressesScreen } from '../screens/addresses.screen';
import { SignupScreen } from '../screens/signup.screen';
import { createStackNavigator } from '@react-navigation/stack';
import { PrivateNavigation } from './private.navigation';

const Stack = createStackNavigator();

export const Navigation: React.FC = () => {
  const [isNavigationReady, setIsNavigationReady] = React.useState(false);

  const dispatch = useAppDispatch();

  const authState = useAppSelector((state) => state.auth.data.authState);

  useEffect(() => {
    dispatch(authActions.checkAuth());
  }, []);

  useEffect(() => {
    if (authState !== EAuthState.Initial && isNavigationReady) {
      RNBootSplash.hide({ fade: true, duration: 500 });
    }
  }, [authState]);

  const isSignedIn = authState === EAuthState.LoggedIn;
  const isDemo = authState === EAuthState.Demo;

  return (
    <NavigationContainer onReady={() => setIsNavigationReady(true)}>
      <Stack.Navigator>
        {isSignedIn || isDemo ? (
          <Stack.Screen
            options={{ headerShown: false }}
            name={EApplicationScreens.Home}
            component={PrivateNavigation}
          />
        ) : (
          <>
            <Stack.Screen
              options={{
                headerShown: false,
                animationTypeForReplace: !isSignedIn ? 'push' : 'pop',
              }}
              name={EApplicationScreens.Auth}
              component={AuthScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name={EApplicationScreens.CardSignIn}
              component={CardSignInScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name={EApplicationScreens.PhoneCodeValidation}
              component={PhoneCodeValidationScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name={EApplicationScreens.Addresses}
              component={AddressesScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name={EApplicationScreens.SignUp}
              component={SignupScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
