import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { TTabProps } from '../../navigation/types';
import { EApplicationScreens } from '../../screens';
import { StatusBar, SafeAreaView, RefreshControl } from 'react-native';
import { PromoCard } from '../../common/components/data-display/promo-card';
import { InviteFriendsModal } from '../../modules/promos/components/invite-friends-modal';
import { promosActions } from '../../modules/promos/promos.branch';

const ContentWrapper = styled.ScrollView`
  height: 100%;
  padding: 24px;
  padding-top: 12px;
`;

const InviteWrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  margin-top: 12px;
  background: #ffffff;
  border-radius: 24px;
  border: 1px solid #00000014;
  overflow: hidden;
`;

const InviteImg = styled.Image`
  max-height: 110px;
  width: 25%;
`;

const InviteContent = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 75%;
  padding: 20px;
`;

const InviteName = styled.Text`
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #000000e6;
  margin-bottom: 4px;
`;

const InviteDescription = styled.Text`
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #00000080;
`;

export const PromosScreen: React.FC<TTabProps<EApplicationScreens.Promo>> = ({
  navigation,
  route,
}) => {
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector((state) => ({
    loading: state.promos.loading,
  }));

  const promos = useAppSelector((state) => state.promos.data);

  const [inviteFriendModal, setInviteFriendModal] = React.useState(false);

  const loadPromos = () => dispatch(promosActions.getPromoList());

  useEffect(() => {
    loadPromos();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <ContentWrapper
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={loadPromos} />
        }
      >
        <InviteWrapper
          onPress={() => setInviteFriendModal(true)}
          activeOpacity={0.5}
        >
          <InviteContent>
            <InviteName>100 баллов в подарок!</InviteName>
            <InviteDescription>
              Отправьте ссылку 3 друзьям и получите 100 баллов на счет после их
              регистрации
            </InviteDescription>
          </InviteContent>
          <InviteImg source={require('../../../assets/images/gift.png')} />
        </InviteWrapper>
        {promos
          ? promos.data.map((promo, index) => (
              <PromoCard
                key={index}
                item={promo}
                navigation={navigation}
                route={route}
              />
            ))
          : null}
      </ContentWrapper>

      <InviteFriendsModal
        setIsOpen={setInviteFriendModal}
        isOpen={inviteFriendModal}
      />
    </SafeAreaView>
  );
};
