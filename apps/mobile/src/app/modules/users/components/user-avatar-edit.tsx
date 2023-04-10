import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { ImageSourcePropType, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { FilesApiService } from '../../files/files-api.service';
import { UsersResponseDto } from '@business-loyalty-program/types';
import { useAppSelector } from '../../../store/hooks';
import { EAuthState } from '../../auth/auth.branch';
import { useToast } from 'react-native-toast-notifications';
import { showToast } from '../../../common/utils';

const Wrapper = styled.View`
  display: flex;
`;

const Avatar = styled.Image`
  height: 96px;
  width: 96px;

  border-radius: 24px;
`;

const PlaceholderAvatar = styled.View`
  height: 96px;
  width: 96px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 24px;
  background-color: #f0f0f0;
`;

const PlaceholderText = styled.Text`
  color: #00000080;
  font-family: 'Rubik';
  font-weight: 400;
  font-size: 40px;
  line-height: 47px;
`;

interface IComponentProps {
  user: UsersResponseDto;
  onSubmit(data: any): void;
}

export const UserAvatarEdit: React.FC<IComponentProps> = ({
  user,
  onSubmit,
}) => {
  const authState = useAppSelector((state) => state.auth.data.authState);
  const toast = useToast();

  const [imageSource, setImageSource] = useState<ImageSourcePropType | null>(
    null
  );

  useEffect(() => {
    if (user.image) {
      setImageSource({ uri: user.image.medium });
    }
  }, [user]);

  if (!user) {
    return null;
  }

  function uploadImage() {
    if (authState === EAuthState.Demo) {
      showToast(toast, 'Загрузка аватара невозможна в режиме демонстрации');
      return;
    }

    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      (response) => {
        if (response.didCancel) {
          return;
        }

        const image = response.assets[0];

        if (image.uri) {
          setImageSource({
            uri: image.uri,
          });

          new FilesApiService().upload(image).then(({ id }) => {
            onSubmit({ imageId: id });
          });
        }
      }
    );
  }

  return (
    <TouchableOpacity onPress={() => uploadImage()}>
      <Wrapper>
        {imageSource ? (
          <Avatar source={imageSource} />
        ) : (
          <PlaceholderAvatar>
            <PlaceholderText>
              {[user.name[0], user.surname[0]]
                .map((substring) => substring.toUpperCase())
                .join('')}
            </PlaceholderText>
          </PlaceholderAvatar>
        )}
      </Wrapper>
    </TouchableOpacity>
  );
};
