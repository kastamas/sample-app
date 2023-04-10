import React, { useEffect, useState } from 'react';
import { Linking, View, Platform } from 'react-native';
import { PosResponseDto } from '@business-loyalty-program/types';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import parsePhoneNumber from 'libphonenumber-js';
import { useAppSelector } from '../../../store/hooks';
import { LocationService } from '../../../common/services/location-service';

const CallButton = styled.TouchableHighlight`
  flex: 1;
  display: flex;
  flex-direction: row;
`;

const Title = styled.Text`
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;

  color: rgba(0, 0, 0, 0.9);
`;

const InfoWrapper = styled.View`
  margin-top: 4px;
`;

const InfoItem = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 12px;
`;

const InfoItemText = styled.Text`
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: rgba(0, 0, 0, 0.9);
`;

const DistanceItem = styled.View`
  margin-top: 24px;
  flex-direction: row;
`;

const Distance = styled.Text`
  color: rgba(0, 0, 0, 0.5);
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
`;

const GetDirections = styled.TouchableOpacity`
  margin-left: 16px;
`;

const GetDirectionsText = styled.Text`
  color: rgba(0, 0, 0, 0.9);
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  text-decoration-line: underline;
  text-decoration-color: rgba(0, 0, 0, 0.9);
`;

const BadgeWrapper = styled.View`
  margin-top: 8px;
  align-self: flex-start;
  background: rgba(245, 142, 0, 0.08);
  border-radius: 6px;
`;

const BadgeText = styled.Text`
  font-style: normal;

  padding-left: 8px;
  padding-right: 8px;
  padding-top: 6px;
  padding-bottom: 6px;

  color: #f58e00;
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
`;

interface IComponentProps {
  pos: PosResponseDto;
  badgeTitle?: string;
}

export const PosInfo: React.FC<IComponentProps> = ({ pos, badgeTitle }) => {
  const [navigationUrl, setNavigationUrl] = useState<string | null>(null);
  const location = useAppSelector((state) => state.location.data);

  const parsedPhone = pos.phone
    ? parsePhoneNumber(pos.phone, 'RU').formatInternational()
    : 'Не указан';

  useEffect(() => {
    const scheme = Platform.select({
      ios: `maps:0,0?q=${pos.name}`,
      android: `geo:0,0?q=${pos.name}`,
    });
    const longitude = `${pos.coords[0]},${pos.coords[1]}`;
    const url = Platform.select({
      ios: `${scheme}@${longitude}`,
      android: `${scheme}${longitude}`,
    });

    setNavigationUrl(url);
  }, []);

  return (
    <>
      <Title>{pos.name}</Title>
      {badgeTitle ? (
        <BadgeWrapper>
          <BadgeText>{badgeTitle}</BadgeText>
        </BadgeWrapper>
      ) : null}
      <InfoWrapper>
        <InfoItem>
          <InfoItemText>{pos.address}</InfoItemText>
        </InfoItem>
        <InfoItem>
          <CallButton
            underlayColor="white"
            onPress={() => Linking.openURL(`tel:${pos.phone}`)}
          >
            <View>
              <InfoItemText>{parsedPhone}</InfoItemText>
            </View>
          </CallButton>
        </InfoItem>
        <DistanceItem>
          <Distance>
            {new LocationService(location).calculateDistance(pos.coords)}
          </Distance>
          <GetDirections
            activeOpacity={0.9}
            onPress={() => Linking.openURL(navigationUrl)}
          >
            <GetDirectionsText>Проложить маршрут</GetDirectionsText>
          </GetDirections>
        </DistanceItem>
      </InfoWrapper>
    </>
  );
};
