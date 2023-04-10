import React from 'react';
import { StatusBar, View } from 'react-native';
import styled from 'styled-components/native';
import { FadeInView } from '../animations/fade-in-view';

const StyledSafeAreaView = styled(View)`
  display: flex;
  height: 100%;
  background-color: #d7493b;
`;

const StyledView = styled.View`
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.Image`
  width: 282px;
  height: 35px;
  margin-bottom: 62px;
`;

const StyledImageBackground = styled.ImageBackground`
  flex: 1;
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  top: 0;
`;

interface IComponentProps {
  title: string;
  children: React.ReactNode;
}

export const AuthScreenWrapper: React.FC<IComponentProps> = ({
  children,
  title,
}) => {
  return (
    <StyledSafeAreaView>
      <StyledImageBackground
        source={require('../../../../assets/images/pattern.png')}
        resizeMode="cover"
      />

      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <StyledView>
        <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <FadeInView>
              <Logo
                source={require('../../../../assets/images/karelich_logo_xl.png')}
              />
            </FadeInView>
          </View>
          {children}
        </View>
      </StyledView>
    </StyledSafeAreaView>
  );
};
