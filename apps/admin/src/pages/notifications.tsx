import React, { useEffect, useState } from 'react';
import { BasePageWrapper } from '../common/wrappers/base-page-wrapper';
import styled from 'styled-components';
import { PrimaryButtonSmall } from '@business-loyalty-program/ui-kit';
import { getOr } from 'lodash/fp';
import { useGetNotifications } from '../modules/notifications/notifications.api';
import { NewNotificationModal } from '../modules/notifications/components/new-notification-modal';
import { NotificationCard } from '../modules/notifications/components/notification-card';
import { useGetCompanyPOS } from '../modules/pos/pos.api';
import { useGetCities } from '../modules/cities/cities.api';

const ControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 32px;
  margin-bottom: 24px;
`;

const ContentWrapper = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 0 20px;
`;

const NotificationsPage: React.FC = () => {
  const { response: pos, apiAction: getPos } = useGetCompanyPOS();
  const { response: cities, apiAction: getCities } = useGetCities();
  const { response, apiAction } = useGetNotifications();

  const [isCreationModalVisible, setCreationModalVisibility] = useState(false);

  useEffect(() => {
    apiAction();
    getPos({ limit: 2000 });
    getCities();
  }, []);

  return (
    <>
      <NewNotificationModal
        pos={pos}
        cities={cities}
        visible={isCreationModalVisible}
        onCreate={() => apiAction()}
        onClose={() => setCreationModalVisibility(false)}
      />
      <BasePageWrapper title="Уведомления">
        <ControlsWrapper>
          <PrimaryButtonSmall onClick={() => setCreationModalVisibility(true)}>
            Добавить уведомление
          </PrimaryButtonSmall>
        </ControlsWrapper>
        <ContentWrapper>
          {getOr([], 'data', response).map((item) => (
            <NotificationCard
              key={item.id}
              pos={pos}
              cities={cities || []}
              item={item}
            />
          ))}
        </ContentWrapper>
      </BasePageWrapper>
    </>
  );
};

export default NotificationsPage;
