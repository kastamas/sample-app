import React, { useState } from 'react';
import styled from 'styled-components/native';
import {
  ToastAndroid,
  Vibration,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAppSelector } from '../../../store/hooks';
import Barcode from 'react-native-barcode-svg';
import Clipboard from '@react-native-clipboard/clipboard';
import { useToast } from 'react-native-toast-notifications';

const CardBackgroundWrapper = styled.View<{ isCorporate: boolean }>`
  background-color: ${(props) => (props.isCorporate ? '#212121' : '#D7493B')};
  border: 1px solid #00000014;
  border-bottom-width: 0;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  overflow: hidden; ;
`;

const InfoHeading = styled.Text`
  color: #ffffff99;
  font-style: normal;
  font-family: 'Rubik';
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
`;

const OrnamentImage = styled.Image`
  top: -7px;
  position: absolute;
  width: 100%;
  height: 70px;
  margin-left: 4px;
  margin-bottom: 14px;
`;

const CardContentContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 100px;
  padding: 12px 20px;
`;

const BalanceText = styled.Text`
  color: white;
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 40px;
  line-height: 40px;
`;

const BalanceWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const InfoWrapper = styled.View``;

const BarcodeWrapper = styled.View`
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  border: 1px solid #00000014;
  border-top-width: 0;
  padding-bottom: 20px;
  padding-top: 20px;
`;

const BarcodeView = styled.View`
  transform: scaleX(1.7);
  padding-bottom: 4px;
`;

const BarcodeNumber = styled.Text`
  margin-top: 4px;
  font-family: 'Rubik';
  color: white;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
`;

interface IComponentProps {
  balance: number;
  isCorporate?: boolean;
}

export const BonusCard: React.FC<IComponentProps> = ({
  balance,
  isCorporate,
}) => {
  const user = useAppSelector((state) => state.auth.data.user);
  const toast = useToast();

  const copyToClipboard = () => {
    Clipboard.setString(user.cardNumber);

    if (Platform.OS === 'ios') {
      toast.show('Номер карты скопирован в буфер обмена', {
        placement: 'top',
      });
    } else {
      ToastAndroid.showWithGravity(
        'Номер карты скопирован в буфер обмена',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }

    Vibration.vibrate(50);
  };

  const barcode = isCorporate ? user.corporateCardNumber : user.cardNumber;

  const [height, setHeight] = useState(40);

  const cardNumber = barcode?.match(/(\d{3})|(\d{2})|(\d{1})/g).join(' ');

  return (
    <TouchableOpacity
      onPress={() => setHeight(height === 40 ? 80 : 40)}
      onLongPress={copyToClipboard}
      activeOpacity={0.8}
    >
      <View style={{ marginBottom: 16 }}>
        <CardBackgroundWrapper isCorporate={isCorporate}>
          <OrnamentImage
            source={require('../../../../assets/images/ornament.png')}
          />

          <CardContentContainer>
            <InfoWrapper>
              <InfoHeading>
                {isCorporate ? 'Корпоративная' : 'Мои баллы'}
              </InfoHeading>
              <BarcodeNumber>{cardNumber}</BarcodeNumber>
            </InfoWrapper>

            <BalanceWrapper>
              <BalanceText>{balance}</BalanceText>
            </BalanceWrapper>
          </CardContentContainer>
        </CardBackgroundWrapper>

        <BarcodeWrapper>
          <BarcodeView activeOpacity={0.8}>
            <Barcode
              value={barcode}
              format="EAN13"
              singleBarWidth={2}
              height={height}
              lineColor="#051C3F"
            />
          </BarcodeView>
        </BarcodeWrapper>
      </View>
    </TouchableOpacity>
  );
};
