import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components/native';
import { Linking, TouchableOpacity, View } from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { EApplicationScreens } from '../../../screens';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useKeyboardState } from '../../../hooks/use-keyboard-state';

import { FadeInView } from '../../../common/components/animations/fade-in-view';
import { Title } from '../../../common/components/typography/title';
import { PrimaryButton } from '../../../common/components/buttons/primary';

import { codeCheckActions } from '../../../modules/auth/code-check.branch';

const PageWrapper = styled.View<{ isKeyboardOpen: boolean }>`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: ${(p) =>
    p.isKeyboardOpen ? `flex-start` : `space-between`};
  padding-bottom: 28px;
  padding-left: 24px;
  padding-right: 24px;

  background: #fff;
`;

const StyledTitle = styled(Title)`
  margin-top: 40px;
  margin-bottom: 24px;
`;

const PrivacyMessage = styled.Text<{ isDisplaying: boolean }>`
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: rgba(0, 0, 0, 0.5);

  opacity: ${(p) => (p.isDisplaying ? 1 : 0)};
`;

const PrimaryText = styled.Text`
  color: rgba(0, 0, 0, 0.9);
`;

const PrimaryTextUnderlined = styled.Text`
  color: rgba(0, 0, 0, 0.9);
  text-decoration: underline;
  text-decoration-color: rgba(0, 0, 0, 0.9);
`;

const StyledPrimaryButton = styled(PrimaryButton)`
  margin-bottom: 8px;
`;

const InputWrapper = styled.View`
  margin-top: 24px;
  margin-bottom: 48px;
`;

const StyledTextInputWrapper = styled.View``;

const StyledTextInput = styled.TextInput`
  //letter-spacing: 2px;
  background: #f0f0f0;
  font-family: 'Rubik';
  border-radius: 12px;
  padding: 14.5px 16px;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: rgba(0, 0, 0, 0.9);
`;

const ValidationMessage = styled.Text`
  text-align: center;
  margin-top: 8px;
  margin-bottom: 8px;

  color: #e66238;
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
`;

const NoCardMessage = styled.Text`
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;

  margin-top: 20px;
  margin-bottom: 40px;
  text-align: center;
  color: rgba(0, 0, 0, 0.5);
`;

interface IComponentProps {
  isActive: boolean;
  barcode?: string;
  navigation: BottomTabNavigationProp<any>;
}

export const CardSignInManualTab: React.FC<IComponentProps> = ({
  navigation,
  isActive,
  barcode,
}) => {
  const dispatch = useAppDispatch();

  const [cardNumber, setCardNumber] = useState<string>('');

  const [isValidNumber, setNumberValidity] = useState(false);

  const { createCodeData, loading, error } = useAppSelector((state) => ({
    createCodeData: state.codeCheck.data,
    loading: state.codeCheck.loading,
    error: state.codeCheck.error,
  }));

  function onCardNumberChange(value: string) {
    const numbersLimit = 13;

    const matched = value
      .replace(/\s/g, '')
      .slice(0, numbersLimit)
      .match(/(\d{3})|(\d{2})|(\d{1})/g);

    if (matched === null) {
      setCardNumber('');
    } else {
      setCardNumber(matched.join(' '));
    }
  }

  useEffect(() => {
    if (createCodeData && createCodeData.phone) {
      navigation.navigate(EApplicationScreens.PhoneCodeValidation, {
        cardNumber: cardNumber.replace(/\s/g, ''),
      });
    }
  }, [createCodeData]);

  useEffect(() => {
    if (barcode) {
      onCardNumberChange(barcode.toString());
    }
  }, [barcode]);

  useEffect(() => {
    if (cardNumber && cardNumber.replace(/\s/g, '').length === 13) {
      setNumberValidity(true);
    } else {
      setNumberValidity(false);
    }
  }, [cardNumber]);

  const { isKeyboardOpen } = useKeyboardState();

  const privacyPolicyLink = 'https://admin.blp.flexy.pw/privacy';

  const onOpen = () => {
    Linking.openURL(privacyPolicyLink).catch((err) =>
      console.error('An error occurred', err)
    );
  };

  const inputRef = useRef();

  useEffect(() => {
    if (isActive && inputRef?.current) {
      // @ts-ignore
      setTimeout(() => inputRef.current.focus(), 0);
    }
  }, [isActive]);

  return (
    <PageWrapper isKeyboardOpen={isKeyboardOpen}>
      <View>
        <StyledTitle>
          Введите номер{'\n'}
          бонусной карты
        </StyledTitle>

        <InputWrapper>
          <StyledTextInputWrapper>
            <StyledTextInput
              ref={inputRef}
              value={cardNumber}
              onChangeText={onCardNumberChange}
              keyboardType="phone-pad"
            />
          </StyledTextInputWrapper>

          {error && (
            <ValidationMessage>{error.error.message}</ValidationMessage>
          )}
        </InputWrapper>

        <StyledPrimaryButton
          disabled={!isValidNumber || loading}
          onPress={() =>
            dispatch(codeCheckActions.createCode(cardNumber.replace(/\s/g, '')))
          }
        >
          Войти
        </StyledPrimaryButton>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(EApplicationScreens.Addresses, {
              isPublic: true,
            })
          }
        >
          <NoCardMessage>
            Нет карты? Получите в{' '}
            <PrimaryTextUnderlined>нашем магазине</PrimaryTextUnderlined>
          </NoCardMessage>
        </TouchableOpacity>
      </View>

      <FadeInView>
        <TouchableOpacity onPress={onOpen}>
          <PrivacyMessage isDisplaying={isActive}>
            Продолжая, я подтверждаю, что ознакомлен с{' '}
            <PrimaryText>Политикой конфиденциальности</PrimaryText>, и принимаю
            её условия
          </PrivacyMessage>
        </TouchableOpacity>
      </FadeInView>
    </PageWrapper>
  );
};
