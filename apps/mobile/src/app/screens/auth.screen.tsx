import React, { FC } from 'react';

import { EApplicationScreens } from '../screens';
import { TScreenProps } from '../navigation/types';
import { useAppSelector } from '../store/hooks';

import { AuthScreenWrapper } from '../common/components/wrappers/auth-screen.wrapper';

import { PrimaryButtonAlter } from '../common/components/buttons/primary-button-alter';
import { GhostButton } from '../common/components/buttons/ghost-button';
import { FadeInView } from '../common/components/animations/fade-in-view';

export const AuthScreen: FC<TScreenProps<EApplicationScreens.Auth>> = ({
  navigation,
}) => {
  const loading = useAppSelector((state) => state.auth.loading);

  return (
    <AuthScreenWrapper title="AppName">
      <FadeInView>
        <PrimaryButtonAlter
          disabled={loading}
          style={{
            backgroundColor: `#FFFFFF`,
            marginBottom: 12,
          }}
          onPress={() => navigation.navigate(EApplicationScreens.CardSignIn)}
        >
          Войти по номеру карты
        </PrimaryButtonAlter>
      </FadeInView>

      <FadeInView>
        <GhostButton
          disabled={loading}
          onPress={() =>
            navigation.navigate(EApplicationScreens.SignUp, {
              isDemo: true,
            })
          }
        >
          Попробовать демо
        </GhostButton>
      </FadeInView>
    </AuthScreenWrapper>
  );
};
