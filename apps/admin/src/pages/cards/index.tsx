import React, { useEffect, useState } from 'react';
import { BasePageWrapper } from '../../common/wrappers/base-page-wrapper';
import styled from 'styled-components';
import { StyledModal, StyledTable } from '@business-loyalty-program/ui-kit';
import { useGetCompanyUsers } from '../../modules/users/users.api';
import { UserAvatar } from '../../modules/users/components/user-avatar';
import { UsersResponseDto } from '@business-loyalty-program/types';
import { TableSecondaryText } from '../../common/data-display/table/table-secondary-text';
import { TablePrimaryText } from '../../common/data-display/table/table-primary-text';
import { UserModalContent } from '../../modules/users/components/user-modal-content/user-modal-content';
import { DateTime } from 'luxon';
import { DisplayUserName } from '../../modules/users/components/display-user-name';
import { ColumnsType } from 'antd/es/table';

const TableWrapper = styled.div`
  margin-top: 32px;
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;
`;

const StyledUserAvatar = styled(UserAvatar)`
  width: 36px;
  height: 36px;
  margin-right: 12px;
`;

const columns: ColumnsType<UsersResponseDto> = [
  {
    title: 'Клиент',
    dataIndex: 'name',
    render: (name: string, record) => {
      return (
        <UserItem>
          <StyledUserAvatar image={record?.image} />
          <TablePrimaryText>
            <DisplayUserName user={record} />
          </TablePrimaryText>
        </UserItem>
      );
    },
  },
  {
    title: 'ID',
    dataIndex: 'id',
    render: (id) => {
      return <TableSecondaryText>{id}</TableSecondaryText>;
    },
  },
  {
    title: 'Регистрация',
    dataIndex: 'createdAt',
    render: (createdAt) => {
      return (
        <TableSecondaryText>
          {DateTime.fromISO(createdAt).toLocaleString({ locale: 'ru' })}
        </TableSecondaryText>
      );
    },
  },
  {
    title: 'Остаток баллов',
    dataIndex: 'bonusAmount',
    align: 'right',
    render: (bonusAmount) => (
      <TablePrimaryText align="right">{bonusAmount}</TablePrimaryText>
    ),
  },
];

const ClientsPage: React.FC = () => {
  const [userModalData, setUserModalData] = useState(undefined);

  const { isLoading, response, apiAction } = useGetCompanyUsers();

  const [isUserModalVisible, setIsUserModalVisible] = useState(false);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);

  const showModal = (user) => {
    setUserModalData(user);
    setIsUserModalVisible(true);
  };

  const handleCancel = () => {
    setUserModalData(undefined);
    setIsUserModalVisible(false);
  };

  const refreshData = () => {
    apiAction({ limit: pageSize });
    handleCancel();
  };

  useEffect(() => {
    apiAction({ limit: pageSize });
  }, []);

  useEffect(() => {
    if (page) {
      apiAction({ offset: pageSize * (page - 1), limit: pageSize });
    }
  }, [page]);

  return (
    <>
      <BasePageWrapper title="Карты">
        <TableWrapper>
          {response && (
            <StyledTable
              rowKey={(record: UsersResponseDto) => record.id}
              columns={columns}
              dataSource={response.data}
              loading={isLoading}
              rowClassName="row-clickable"
              onRow={(record) => {
                return {
                  onClick: () => {
                    showModal(record);
                  },
                };
              }}
              pagination={{
                hideOnSinglePage: true,
                total: response.meta.itemsAmount,
                current: response.meta.currentPage,
                pageSize: response.meta.pageSize,
                showSizeChanger: false,
                onChange: (page) => setPage(page),
              }}
            />
          )}
        </TableWrapper>
      </BasePageWrapper>

      <StyledModal
        visible={isUserModalVisible}
        onCancel={handleCancel}
        destroyOnClose={true}
        width={320}
      >
        {userModalData && (
          <UserModalContent user={userModalData} refreshData={refreshData} />
        )}
      </StyledModal>
    </>
  );
};

export default ClientsPage;
