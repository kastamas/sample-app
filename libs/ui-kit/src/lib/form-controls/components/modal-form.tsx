import * as React from 'react';
import styled from 'styled-components';
import {
  ModalCancelButton,
  PrimaryButtonBig,
  StyledForm,
  useDisableForm,
} from '@business-loyalty-program/ui-kit';
import { Form, FormProps } from 'antd';

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

interface IComponentProps extends FormProps {
  actionButton?: {
    title?: string;
  };
  requiredFields?: string[];
  editMode?: boolean;
  isLoading?: boolean;
  onCancel?(): void;
}

export const ModalForm: React.FC<IComponentProps> = (props) => {
  const {
    children,
    onCancel,
    actionButton,
    requiredFields,
    editMode,
    isLoading,
    ...formProps
  } = props;

  const { form, checkIsDisabled } = useDisableForm(requiredFields, editMode);

  const buttonTitle = actionButton?.title || 'Отправить';

  return (
    <StyledForm form={form} layout="vertical" {...formProps}>
      <>
        {children}

        <Form.Item shouldUpdate>
          {() => (
            <ButtonsWrapper>
              {onCancel ? (
                <ModalCancelButton style={{ flex: 1 }} onClick={onCancel}>
                  Отмена
                </ModalCancelButton>
              ) : null}

              <PrimaryButtonBig
                style={{ flex: 1 }}
                disabled={checkIsDisabled() || isLoading}
              >
                {buttonTitle}
              </PrimaryButtonBig>
            </ButtonsWrapper>
          )}
        </Form.Item>
      </>
    </StyledForm>
  );
};
