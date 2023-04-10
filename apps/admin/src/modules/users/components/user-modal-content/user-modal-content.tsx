import * as React from 'react';
import styled from 'styled-components';
import {
  BlpIcon,
  palette,
  buttonTextMixin,
} from '@business-loyalty-program/ui-kit';
import { UserAvatar } from '../user-avatar';
import { UsersResponseDto } from '@business-loyalty-program/types';
import { DisplayUserName } from '../display-user-name';
import { InfoColumn } from '../../../../common/data-display/info/info-column';
import { DisplayPhoneNumber } from '../../../../common/data-display/display/display-phone-number';
import { message } from 'antd';
import moment from 'moment';

const UserModalAvatar = styled(UserAvatar)`
  width: 88px;
  height: 88px;
  margin-bottom: 12px;
`;

const UserModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${BlpIcon} {
    color: ${palette.textSecondary};

    :hover {
      color: ${palette.text};
      cursor: pointer;
    }
  }
`;

const UserName = styled(DisplayUserName)`
  ${buttonTextMixin};
  text-align: left;
  margin-bottom: 4px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledInfoColumn = styled(InfoColumn)`
  margin-top: 16px;
  margin-bottom: 28px;
`;

const CopyIcon = styled(BlpIcon)`
  color: ${palette.textSecondary};
  margin-left: 8px;
  cursor: pointer;

  :hover {
    color: ${palette.text};
  }
`;

const CardNumberWrapper = styled.div`
  display: flex;
  align-items: center;
`;

interface IComponentProps {
  user: UsersResponseDto;
  refreshData(): void;
}

const formatCardNumber = (cardNumber: string) => {
  const formattedCardNumber = cardNumber
    .match(/(\d{3})|(\d{2})|(\d{1})/g)
    .join(' ');

  return formattedCardNumber;
};

export enum EUserModalMode {
  Add = 'add',
  Remove = 'remove',
}

export const UserModalContent: React.FC<IComponentProps> = ({ user }) => {
  const { bonusAmount, image, phone, cardNumber, dateOfBirth } = user;

  const copyCardNumberToClipboard = () => {
    navigator.clipboard.writeText(cardNumber).then(
      function () {
        message.success('Номер карты скопирован');
      },
      function (err) {
        message.error('Произошла ошибка при копировании');
        console.error('Async: Could not copy text: ', err);
      }
    );
  };

  const statisticsValues = [
    {
      title: 'Номер бонусной карты',
      value: (
        <CardNumberWrapper>
          {formatCardNumber(cardNumber)}
          <CopyIcon
            iconName={'copy'}
            title={'Скопировать'}
            onClick={() => copyCardNumberToClipboard()}
          />
        </CardNumberWrapper>
      ),
    },
    { title: 'Остаток баллов', value: bonusAmount },
    {
      title: 'Номер телефона',
      value: <DisplayPhoneNumber phone={phone} withLink={true} />,
    },
    {
      title: 'Дата рождения',
      value: dateOfBirth
        ? moment(dateOfBirth).format('DD.MM.YYYY')
        : 'Не указана',
    },
  ];

  return (
    <Wrapper>
      <UserModalAvatar image={image} />
      <UserModalHeader>
        <div>
          <UserName user={user} />
        </div>
      </UserModalHeader>

      <StyledInfoColumn infoValues={statisticsValues} />
    </Wrapper>
  );
};
