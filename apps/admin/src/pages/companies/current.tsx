import React from 'react';
import { BasePageWrapper } from '../../common/wrappers/base-page-wrapper';
import styled from 'styled-components';
import { CompanyAvatarUpdate } from '../../modules/companies/company/company-avatar-update';
import { CompanyUpdateForm } from '../../modules/companies/company/company-update-form';

const Wrapper = styled.div`
  margin-top: 32px;
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr 1fr;
  gap: 40px;
  margin-top: 48px;
`;

const CurrentCompanyPage: React.FC = () => {
  return (
    <BasePageWrapper title="Профиль">
      <Wrapper>
        <ContentWrapper>
          <CompanyAvatarUpdate />
          <CompanyUpdateForm />
        </ContentWrapper>
      </Wrapper>
    </BasePageWrapper>
  );
};

export default CurrentCompanyPage;
