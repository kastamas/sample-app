import React, { useEffect, useState } from 'react';
import { message, Upload } from 'antd';
import styled from 'styled-components';
import { BlpIcon, Caption } from '@business-loyalty-program/ui-kit';
import { FileResponseDto } from '@flexypw/files-core';
import { FilesApi } from '../../modules/files/files.api';

const UploadPlaceholder = styled.div`
  cursor: pointer;
  height: 200px;
  background: rgba(218, 224, 237, 0.4);
  width: 100%;
  border: 1px dashed #dae0ed;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledUpload = styled(Upload)`
  .ant-upload {
    width: 100%;
  }
`;

const IconContainer = styled.div`
  padding: 12px;
  background: #f3f4f8;
  border-radius: 8px;
  width: 48px;
  height: 48px;
  color: rgba(162, 170, 190, 1);
`;

const StyledCaption = styled(Caption)`
  margin-top: 16px !important;
  width: 200px;
  text-align: center;
  color: #aeb7cc;
  font-size: 12px;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

interface IComponentProps {
  value?: FileResponseDto;
  onChange?: (value: FileResponseDto) => void;
}

export const ImageFormItem: React.FC<IComponentProps> = ({
  value,
  onChange,
}) => {
  const [file, setFile] = useState(value);

  useEffect(() => {
    onChange(file);
  }, [file]);

  return (
    <StyledUpload
      showUploadList={false}
      accept="image/jpeg, image/png"
      customRequest={async ({ file }) => {
        const hide = message.loading('Изображение загружaется...', 0);
        const uploadedFile = await new FilesApi().uploadFile(file as any);
        setFile(uploadedFile);

        hide();
        message.success('Изображение успешно загружено!');
      }}
    >
      <UploadPlaceholder>
        {file ? (
          <StyledImage src={file?.medium} />
        ) : (
          <>
            <IconContainer>
              <BlpIcon iconName="upload-2" />
            </IconContainer>

            <StyledCaption>
              Загрузите изображение в формате .jpeg или .png
            </StyledCaption>
          </>
        )}
      </UploadPlaceholder>
    </StyledUpload>
  );
};
