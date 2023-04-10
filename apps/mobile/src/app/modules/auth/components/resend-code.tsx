import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { v4 } from 'uuid';
import { LinkButton } from '../../../common/components/buttons/link-button';
import { codeCheckActions } from '../code-check.branch';

const Wrapper = styled.View`
  display: flex;
  width: 100%;
  margin-top: 12px;
  margin-bottom: 12px;
`;

const Message = styled.Text`
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  color: rgba(0, 0, 0, 0.5);
`;

const StyledLinkButton = styled(LinkButton)`
  justify-content: center;
`;

export const CODE_SENT_TIMEOUT = 60 * 1000;

interface IComponentProps {
  cardNumber: string;
}

export const ResendCode: React.FC<IComponentProps> = ({ cardNumber }) => {
  const lastSentDate = useAppSelector(
    (state) => state.codeCheck.data.lastTryTime
  );
  const isLoading = useAppSelector((state) => state.codeCheck.loading);
  const [updateHash, setUpdateHash] = useState(v4());

  const dispatch = useAppDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      setUpdateHash(v4());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  function isPending() {
    return new Date().getTime() - lastSentDate < CODE_SENT_TIMEOUT;
  }

  function getRemainingTime() {
    const passedTime = new Date().getTime() - lastSentDate;
    const remainingTimeRow = CODE_SENT_TIMEOUT - passedTime;

    const remainingSeconds = (remainingTimeRow / 1000).toFixed();

    return remainingSeconds.length === 2
      ? remainingSeconds
      : `0${remainingSeconds}`;
  }

  return lastSentDate ? (
    <Wrapper key={updateHash}>
      {isPending() ? (
        <Message>Отправить код повторно через 00:{getRemainingTime()}</Message>
      ) : (
        <StyledLinkButton
          disabled={isLoading}
          onPress={() => dispatch(codeCheckActions.createCode(cardNumber))}
        >
          Отправить код повторно
        </StyledLinkButton>
      )}
    </Wrapper>
  ) : null;
};
