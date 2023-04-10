import React, { FC, useState, useEffect } from 'react';
import { StatusBar, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

import {
  PosResponseDto,
  PromoResponseDto,
} from '@business-loyalty-program/types';

import { EApplicationScreens } from '../../screens';
import { TScreenProps } from '../../navigation/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import { PrimaryButton } from '../../common/components/buttons/primary';
import { LocationService } from '../../common/services/location-service';

import { selectPOSFromPromo } from '../../modules/pos/pos.store';

const ContentWrapper = styled.View`
  width: 100%;
  height: 100%;
`;

const Img = styled.ImageBackground`
  width: 100%;
  height: 650px;
  z-index: 5;
`;

const ModalWrapper = styled.View`
  width: 100%;
  position: absolute;
  max-height: 600px;
  min-height: 300px;
  bottom: 0;
  background: #ffffff;
  border-radius: 16px;
  padding: 16px;
  z-index: 10;
`;

const EmptyBlock = styled.View`
  height: 148px;
`;

const ModalContent = styled.ScrollView``;

const IconWrapper = styled(TouchableOpacity)`
  position: absolute;
  left: 16px;
  top: 48px;
  z-index: 20;
`;

const CardName = styled.Text`
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  color: #051c3f;
  margin-bottom: 8px;
`;

const CardDescription = styled.Text`
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #858ea3;
`;

const StyledLinearGradient = styled(LinearGradient)`
  position: absolute;
  width: 100%;
  height: 200px;
  top: 0;
  z-index: 6;
`;

const ButtonWrapper = styled(LinearGradient)`
  position: absolute;
  padding-top: 24px;
  padding-bottom: 48px;
  bottom: 0;
  z-index: 20;
  display: flex;
  justify-content: center;
  flex-direction: row;
  width: 100%;
`;

export const PromoCardScreen: FC<
  TScreenProps<EApplicationScreens.PromoCard>
> = ({ navigation, route }) => {
  const dispatch = useAppDispatch();

  const pos = useAppSelector((state) => state.pos.data.original);
  const promos = useAppSelector((state) => state.promos.data);
  const location = useAppSelector((state) => state.location.data);

  const [promo, setPromo] = useState<PromoResponseDto | null>(null);
  const [closestPos, setClosestPos] = useState<PosResponseDto | null>(null);

  useEffect(() => {
    const filteredPromo = promos.data.find(
      (item) => item.id === route.params.id
    );
    setPromo(filteredPromo);
  }, [route.params.id]);

  useEffect(() => {
    if (promo?.pos && location) {
      const sortedPos = [...promo.pos].sort((a, b) =>
        new LocationService(location).sortByDistance(a, b)
      );
      if (sortedPos) {
        setClosestPos(sortedPos[0]);
      }
    }
  }, [promo, location]);

  return (
    <View style={{ backgroundColor: '#fff' }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      {promo ? (
        <ContentWrapper>
          <StyledLinearGradient
            colors={['rgba(0, 0, 0, 0.7) 0', 'rgba(0, 0, 0, 0) 100%']}
          />
          <Img source={{ uri: promo.image.large }} />
          <IconWrapper
            onPress={() => {
              setPromo(null);
              navigation.goBack();
            }}
            activeOpacity={1}
          >
            <Icon name="arrow-left" color="white" size={32} />
          </IconWrapper>

          <ModalWrapper>
            <ModalContent>
              <CardName>{promo.name}</CardName>
              <CardDescription>{promo.description}</CardDescription>
              <EmptyBlock />
            </ModalContent>
          </ModalWrapper>

          <ButtonWrapper
            colors={[
              'rgba(255, 255, 255, 0) 100%',
              'rgba(255, 255, 255, 1) 36.5%',
            ]}
          >
            <PrimaryButton
              onPress={() => {
                dispatch(
                  selectPOSFromPromo({
                    badge: promo.name,
                    pos: pos.find((item) => (item.id = closestPos.id)),
                  })
                );

                navigation.pop(1);
                navigation.navigate(EApplicationScreens.Addresses, {
                  isPublic: false,
                });
              }}
            >
              Показать ближайший магазин
            </PrimaryButton>
          </ButtonWrapper>
        </ContentWrapper>
      ) : null}
    </View>
  );
};
