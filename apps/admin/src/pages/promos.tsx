import React, { useEffect, useState } from 'react';
import { BasePageWrapper } from '../common/wrappers/base-page-wrapper';
import styled from 'styled-components';
import {
  useChangePromoStatus,
  useGetPromos,
} from '../modules/promos/promos.api';
import { Tabs } from 'antd';
import {
  PrimaryButtonSmall,
  StyledTabs,
} from '@business-loyalty-program/ui-kit';
import { EPromoStatus } from '@business-loyalty-program/enums';
import { NewPromoModal } from '../modules/promos/components/new-promo.modal';
import { PromoCard } from '../modules/promos/components/promo-card';
import {
  getOr,
  cond,
  flow,
  get,
  isEqual,
  stubTrue as otherwise,
  constant,
} from 'lodash/fp';
import { PromoResponseDto } from '@business-loyalty-program/types';
import { EditPromoModal } from '../modules/promos/components/edit-promo.modal';

const ControlsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;
  margin-bottom: 24px;
`;

const CustomStyledTabs = styled(StyledTabs)`
  .ant-tabs-nav {
    width: fit-content;
    margin: 0;
  }

  .ant-tabs-tab {
    margin: 0;
  }
`;

const ContentWrapper = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 0 20px;
`;

const getInvertedStatus = cond([
  [
    flow(get('status'), isEqual(EPromoStatus.Active)),
    constant(EPromoStatus.Archived),
  ],
  [otherwise, constant(EPromoStatus.Active)],
]);

const PromosPage: React.FC = () => {
  const { response, apiAction } = useGetPromos();
  const { response: statusChangeResponse, apiAction: changeStatus } =
    useChangePromoStatus();

  const [status, setStatus] = useState<string>(EPromoStatus.Active);
  const [isCreationModalVisible, setCreationModalVisibility] = useState(false);
  const [selectedPromo, setSelectedPromo] =
    useState<PromoResponseDto | undefined>();

  useEffect(() => {
    apiAction({ limit: 100, status: status as EPromoStatus });
  }, [status, statusChangeResponse]);

  const onItemAction =
    (item: PromoResponseDto) => (type: 'changeStatus' | 'edit') => {
      if (type === 'changeStatus') {
        changeStatus(item.id, getInvertedStatus(item));
      } else {
        setSelectedPromo(item);
      }
    };

  return (
    <>
      <NewPromoModal
        visible={isCreationModalVisible}
        onCreate={() =>
          apiAction({ limit: 100, status: status as EPromoStatus })
        }
        onClose={() => setCreationModalVisibility(false)}
      />
      <EditPromoModal
        item={selectedPromo}
        onClose={() => setSelectedPromo(undefined)}
        onUpdate={() =>
          apiAction({ limit: 100, status: status as EPromoStatus })
        }
      />
      <BasePageWrapper title="Акции">
        <ControlsWrapper>
          <CustomStyledTabs activeKey={status} onChange={setStatus}>
            <Tabs.TabPane tab="Активные" key={EPromoStatus.Active} />
            <Tabs.TabPane tab="В архиве" key={EPromoStatus.Archived} />
          </CustomStyledTabs>
          <PrimaryButtonSmall onClick={() => setCreationModalVisibility(true)}>
            Добавить акцию
          </PrimaryButtonSmall>
        </ControlsWrapper>
        <ContentWrapper>
          {getOr([], 'data', response).map((item) => (
            <PromoCard
              onAction={onItemAction(item)}
              key={item.id}
              item={item}
            />
          ))}
        </ContentWrapper>
      </BasePageWrapper>
    </>
  );
};

export default PromosPage;
