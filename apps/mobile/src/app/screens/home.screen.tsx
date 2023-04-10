import React from 'react';
import { RefreshControl, StatusBar, SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import { BonusCard } from '../modules/bonuses/components/bonus-card';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { TTabProps } from '../navigation/types';
import { EApplicationScreens } from '../screens';
import { authActions } from '../modules/auth/auth.branch';

const Wrapper = styled.ScrollView`
  height: 100%;
  padding-right: 24px;
  padding-left: 24px;
  padding-top: 24px;
`;

export const HomeScreen: React.FC<TTabProps<EApplicationScreens.Home>> = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.data.user);

  const { balance, loading, corporateBalance } = useAppSelector((state) => ({
    balance: state.auth.data.user?.bonusAmount,
    loading: state.auth.loading,
    corporateBalance: state.auth.data.user?.corporateBonusAmount,
  }));

  function updateData() {
    dispatch(authActions.refreshUser());
  }

  if (!user) return null;

  return (
    <SafeAreaView style={{ backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Wrapper
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => updateData()} />
        }
      >
        <BonusCard balance={balance} />

        {user.corporateCardNumber && (
          <BonusCard balance={corporateBalance} isCorporate />
        )}
      </Wrapper>
    </SafeAreaView>
  );
};
