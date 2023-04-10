import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import parsePhoneNumber from 'libphonenumber-js';

import { EApplicationScreens } from '../screens';
import { TScreenProps } from '../navigation/types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { PrimaryButton } from '../common/components/buttons/primary';

import { ResendCode } from '../modules/auth/components/resend-code';
import { authActions, EAuthState } from '../modules/auth/auth.branch';
import { BackHeader } from '../common/components/BackHeader';

const ScreenWrapper = styled.View`
  padding-right: 32px;
  padding-left: 32px;
`;

const InputWrapper = styled.View`
  margin-bottom: 48px;
`;

const StyledTextInputWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const StyledTextInput = styled.TextInput`
  border-radius: 12px;
  background: #f0f0f0;
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: rgba(0, 0, 0, 0.9);

  padding: 14.5px 22.5px;
  width: 120px;

  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const ValidationMessage = styled.Text`
  color: #e66238;
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;

  text-align: center;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const Message = styled.Text`
  //margin-top: 56px;
  margin-bottom: 48px;
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 26px;
  line-height: 31px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -1px;

  color: rgba(0, 0, 0, 0.9);
`;

export const PhoneCodeValidationScreen: React.FC<
  TScreenProps<EApplicationScreens.PhoneCodeValidation>
> = ({ route, navigation }) => {
  const cardNumber = route.params?.cardNumber;
  const phone = useAppSelector((state) => state.codeCheck.data?.phone);
  const [formattedPhone, setFormattedPhone] = useState<string | null>(null);

  const error = useAppSelector((state) => state.auth.error);
  const authState = useAppSelector((state) => state.auth.data.authState);

  const [code, setCode] = useState<string>('');

  const dispatch = useAppDispatch();

  function onCodeChange(value: string) {
    const numbersLimit = 6;

    const matched = value
      .replace(/\s/g, '')
      .slice(0, numbersLimit)
      .match(/(\d{3})|(\d{2})|(\d{1})/g);

    if (matched === null) {
      setCode('');
    } else {
      setCode(matched.join(' '));
    }
  }

  useEffect(() => {
    if (authState === EAuthState.Unregistered) {
      navigation.navigate(EApplicationScreens.SignUp);
    }
  }, [authState]);

  useEffect(() => {
    if (!phone) {
      navigation.navigate(EApplicationScreens.CardSignIn);
    } else {
      const parsedNumber = parsePhoneNumber(phone, 'RU');
      setFormattedPhone(parsedNumber.formatInternational());
    }
  }, [phone]);

  return (
    <SafeAreaView style={{ backgroundColor: `#fff`, display: `flex`, flex: 1 }}>
      <ScreenWrapper>
        <BackHeader
          onPress={() => navigation.navigate(EApplicationScreens.CardSignIn)}
          title={'Подтверждение'}
        />
        <Message>
          Код отправлен на номер {'\n'} {formattedPhone}
        </Message>

        <InputWrapper>
          <StyledTextInputWrapper>
            <StyledTextInput
              autoFocus={true}
              value={code}
              onChangeText={onCodeChange}
              keyboardType="phone-pad"
              placeholder="Код"
              placeholderTextColor="#858ea3"
            />
          </StyledTextInputWrapper>

          {error && (
            <ValidationMessage>{error.error.message}</ValidationMessage>
          )}
        </InputWrapper>

        <PrimaryButton
          style={{ marginBottom: 8 }}
          disabled={code.replace(/\s/g, '').length !== 6}
          onPress={() =>
            dispatch(
              authActions.singInCode({ phone, code: code.replace(/\s/g, '') })
            )
          }
        >
          Подтвердить
        </PrimaryButton>

        <ResendCode cardNumber={cardNumber} />
      </ScreenWrapper>
    </SafeAreaView>
  );
};
