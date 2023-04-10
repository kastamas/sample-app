import React, { useEffect } from 'react';
import {
  CheckboxSelector,
  ModalForm,
  StyledModal,
  StyledTextArea,
} from '@business-loyalty-program/ui-kit';
import { DatePicker, Form, Select } from 'antd';
import styled from 'styled-components';
import { ImageFormItem } from '../../../common/form-items/image-form-item';
import { useCreateNotification } from '../notifications.api';
import { EUserGender } from '@business-loyalty-program/enums';
import moment from 'moment';
import {
  CitiesResponseDto,
  PosCollectionDto,
} from '@business-loyalty-program/types';

interface IComponentProps {
  visible: boolean;
  onClose(): void;
  onCreate(): void;
  pos: PosCollectionDto;
  cities: CitiesResponseDto[];
}

const NameTextArea = styled(StyledTextArea)`
  height: 60px !important;
`;

const DescriptionTextArea = styled(StyledTextArea)`
  height: 120px !important;
`;

const StyledModalForm = styled(ModalForm)`
  padding-top: 32px;

  .ant-form-item-explain-error {
    display: none;
  }

  .ant-form-item-with-help {
    margin-bottom: 24px;
  }
`;

const TwoColumnsControls = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  .ant-picker {
    width: 100%;
    border: 0;
    height: 44px;
  }
`;

export const NewNotificationModal: React.FC<IComponentProps> = ({
  visible,
  onClose,
  onCreate,
  cities,
  pos,
}) => {
  const { isLoading, response, apiAction } = useCreateNotification();

  useEffect(() => {
    if (response) {
      onCreate();
      onClose();
    }
  }, [response]);

  const posItems = (pos?.data || []).map(({ id, address }) => ({
    value: id,
    label: address,
  }));

  const cityItems = (cities || []).map(({ id, name }) => ({
    value: id,
    label: name,
  }));

  const genderItem = [
    { value: EUserGender.Male, label: 'Мужской' },
    { value: EUserGender.Female, label: 'Женский' },
  ];

  return (
    <StyledModal
      visible={visible}
      onCancel={onClose}
      destroyOnClose={true}
      width={420}
      isAltColour
    >
      <StyledModalForm
        actionButton={{ title: 'Добавить уведомление' }}
        onFinish={({ image, date, gender, ...values }) => {
          apiAction({
            imageId: image.id,
            date: moment(date).toISOString(),
            gender: gender.length === 1 ? gender[0] : undefined,
            ...values,
          });
        }}
        isLoading={isLoading}
      >
        <TwoColumnsControls>
          <Form.Item name="date" rules={[{ required: true }]}>
            <DatePicker showTime={{ format: 'HH:mm' }} placeholder="Дата" />
          </Form.Item>

          <Form.Item name="gender" rules={[{ required: true }]}>
            <CheckboxSelector allPlaceholder="Любой пол" items={genderItem} />
          </Form.Item>
        </TwoColumnsControls>

        <Form.Item name="cityIds" rules={[{ required: true }]}>
          <CheckboxSelector allPlaceholder="Все города" items={cityItems} />
        </Form.Item>

        <Form.Item name="posIds" rules={[{ required: true }]}>
          <CheckboxSelector allPlaceholder="Все магазины" items={posItems} />
        </Form.Item>

        <Form.Item name="text" rules={[{ required: true }]}>
          <DescriptionTextArea placeholder="Текст уведомления" />
        </Form.Item>

        <Form.Item name="image" rules={[{ required: true }]}>
          <ImageFormItem />
        </Form.Item>
      </StyledModalForm>
    </StyledModal>
  );
};
