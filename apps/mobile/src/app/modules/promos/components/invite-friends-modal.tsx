import React, { FC } from 'react';
import styled from 'styled-components/native';
import {
  Share,
  TouchableOpacity,
  Alert,
  View,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { PrimaryButton } from '../../../common/components/buttons/primary';
import { useAppSelector } from '../../../store/hooks';

interface IComponentProps {
  setIsOpen(value: boolean): void;
  isOpen: boolean;
}

const Overlay = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
`;

const ModalContent = styled.View`
  margin: 24px;
  border-radius: 24px;
  padding: 24px;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  background-color: white;
`;

const IconWrapper = styled(TouchableOpacity)`
  position: absolute;
  right: 16px;
  top: 16px;
  z-index: 20;
`;

const InviteGif = styled.Image`
  width: 130px;
  height: 130px;
`;

const InviteContent = styled.View`
  margin-top: 24px;
`;

const InviteTitle = styled.Text`
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: #000000e6;
`;

const InviteDescription = styled.Text`
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: rgba(0, 0, 0, 0.5);
  max-width: 280px;
  margin-top: 8px;
  margin-bottom: 24px;
`;

const ButtonText = styled.Text`
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
`;

const StyledIonicons = styled(Ionicons)`
  margin-right: 10px;
`;

export const InviteFriendsModal: FC<IComponentProps> = ({
  setIsOpen,
  isOpen,
}) => {
  const user = useAppSelector((state) => state.auth.data.user);

  const onShare = async () => {
    try {
      const { referralCode } = user;
      const test = `Загружай приложение AppName!\n\niOS\nhttps://apps.apple.com/ru/app/%D0%BA%D0%B0%D1%80%D0%B5%D0%BB%D1%8B%D1%87/id1599812121\n\nAndroid\nhttps://play.google.com/store/apps/details?id=com.flexy.business.loyalty.program\n\nИспользуй промокод при регистрации: ${referralCode}`;

      const message = referralCode ? test : `У вас нет реферального кода`;

      await Share.share({
        message,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setIsOpen(!isOpen);
      }}
    >
      <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
        <Overlay>
          <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ModalContent
                style={{
                  elevation: 5,
                }}
              >
                <IconWrapper onPress={() => setIsOpen(false)}>
                  <Icon name="x" color="#A2AABE" size={26} />
                </IconWrapper>

                <InviteGif
                  source={require('../../../../assets/images/giftbox.gif')}
                />

                <InviteContent>
                  <InviteTitle>100 баллов в подарок!</InviteTitle>

                  <InviteDescription>
                    Отправьте ссылку 3 друзьям и получите 100 баллов на счет
                    после их регистрации
                  </InviteDescription>
                </InviteContent>

                <PrimaryButton onPress={onShare}>
                  <StyledIonicons
                    name="share-social-outline"
                    color="#FFFFFF"
                    size={20}
                  />

                  <ButtonText>Поделиться с друзьями</ButtonText>
                </PrimaryButton>
              </ModalContent>
            </View>
          </TouchableWithoutFeedback>
        </Overlay>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
