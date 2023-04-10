import React, { useEffect } from 'react';
import { BasePageWrapper } from '../common/wrappers/base-page-wrapper';
import { StyledTable } from '@business-loyalty-program/ui-kit';
import styled from 'styled-components';
import { useGetCompanyPOS } from '../modules/pos/pos.api';
import { ColumnsType } from 'antd/es/table';
import { TableSecondaryText } from '../common/data-display/table/table-secondary-text';
import { TablePrimaryText } from '../common/data-display/table/table-primary-text';
import { PosResponseDto } from '@business-loyalty-program/types';
import { DisplayPhoneNumber } from '../common/data-display/display/display-phone-number';

const TableWrapper = styled.div`
  margin-top: 20px;
`;

const columns: ColumnsType<PosResponseDto> = [
  {
    title: 'ID',
    dataIndex: 'id',
    render: (id) => {
      return <TableSecondaryText>{id}</TableSecondaryText>;
    },
  },
  {
    title: 'Название',
    dataIndex: 'name',
    render: (name) => {
      return <TableSecondaryText>{name}</TableSecondaryText>;
    },
  },
  {
    title: 'Адрес',
    dataIndex: 'address',
    render: (address) => {
      return <TablePrimaryText>{address}</TablePrimaryText>;
    },
  },
  {
    title: 'Примечание',
    dataIndex: 'note',
    render: (note) => {
      return <TableSecondaryText>{note ? note : '-'}</TableSecondaryText>;
    },
  },
  {
    title: 'Телефон',
    dataIndex: 'phone',
    render: (phone) => {
      return (
        <TablePrimaryText>
          <DisplayPhoneNumber phone={phone} />
        </TablePrimaryText>
      );
    },
  },
];

const POSPage: React.FC = () => {
  const { isLoading, response, apiAction } = useGetCompanyPOS();

  useEffect(() => {
    apiAction({ limit: 100 });
  }, []);

  return (
    <>
      <BasePageWrapper title="Торговые точки">
        <TableWrapper>
          <StyledTable
            rowKey={(record: PosResponseDto) => record.id}
            columns={columns}
            dataSource={response?.data}
            loading={isLoading}
          />
        </TableWrapper>
      </BasePageWrapper>
    </>
  );
};

export default POSPage;
