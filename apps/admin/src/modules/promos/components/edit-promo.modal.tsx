import React, { useEffect } from 'react';
import {
  CheckboxSelector,
  ModalForm,
  StyledModal,
  StyledTextArea,
} from '@business-loyalty-program/ui-kit';
import { Form } from 'antd';
import { useUpdatePromo } from '../promos.api';
import styled from 'styled-components';
import { useGetCompanyPOS } from '../../pos/pos.api';
import { PromoResponseDto } from '@business-loyalty-program/types';
import { get } from 'lodash/fp';
import { ImageFormItem } from '../../../common/form-items/image-form-item';

interface IComponentProps {
  item?: PromoResponseDto;
  onClose(): void;
  onUpdate(): void;
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

export const EditPromoModal: React.FC<IComponentProps> = ({
  item,
  onClose,
  onUpdate,
}) => {
  const { response: pos, apiAction: getPos } = useGetCompanyPOS();
  const { isLoading, response, apiAction } = useUpdatePromo();

  useEffect(() => {
    if (response) {
      onUpdate();
      onClose();
    }
  }, [response]);

  useEffect(() => {
    getPos({ limit: 1000 });
  }, []);

  const posItems = (pos?.data || []).map(({ id, address }) => ({
    value: id,
    label: address,
  }));

  return (
    <StyledModal
      visible={!!item}
      onCancel={onClose}
      destroyOnClose={true}
      width={420}
      isAltColour
    >
      {item ? (
        <StyledModalForm
          editMode
          actionButton={{ title: 'Сохранить изменения' }}
          initialValues={{
            image: item.image,
            posIds: item.pos.map(get('id')),
            name: item.name,
            summary: item.summary,
            description: item.description,
          }}
          onFinish={({ image, ...values }) => {
            apiAction(item.id, { imageId: image.id, ...values });
          }}
          isLoading={isLoading}
        >
          <Form.Item name="image" rules={[{ required: true }]}>
            <ImageFormItem />
          </Form.Item>

          <Form.Item name="posIds" rules={[{ required: true }]}>
            <CheckboxSelector allPlaceholder="Все магазины" items={posItems} />
          </Form.Item>

          <Form.Item name="name" rules={[{ required: true }]}>
            <NameTextArea placeholder="Наименование акции" />
          </Form.Item>

          <Form.Item name="summary" rules={[{ required: true }]}>
            <NameTextArea maxLength={60} placeholder="Краткое описание" />
          </Form.Item>

          <Form.Item name="description" rules={[{ required: true }]}>
            <DescriptionTextArea placeholder="Описание" />
          </Form.Item>
        </StyledModalForm>
      ) : null}
    </StyledModal>
  );
};
