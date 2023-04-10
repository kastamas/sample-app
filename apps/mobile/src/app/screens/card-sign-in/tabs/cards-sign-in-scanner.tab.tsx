import 'react-native-reanimated';
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { Title } from '../../../common/components/typography/title';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { BarcodeFormat, useScanBarcodes } from 'vision-camera-code-scanner';
import { useEffect } from 'react';

const Wrapper = styled(View)`
  margin-right: 32px;
  margin-left: 32px;

  background-color: #fff;
`;

const StyledTitle = styled(Title)`
  margin-top: 40px;
  margin-bottom: 24px;
  font-weight: 400;
  font-size: 26px;
  line-height: 31px;
  font-family: 'Rubik';
  color: rgba(0, 0, 0, 0.9);
`;

const ScanArea = styled(View)`
  width: 100%;
  height: 172px;
  margin-bottom: 16px;
  border-radius: 24px;

  overflow: hidden;
`;

const Description = styled(Text)`
  text-align: center;
  font-family: 'Rubik';
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: rgba(0, 0, 0, 0.5);
`;

interface IComponentProps {
  isActive: boolean;
  jumpToManual(): void;
  onBarcodeChange(barcode: string): void;
}

export const CardsSignInScannerTab: React.FC<IComponentProps> = ({
  isActive,
  jumpToManual,
  onBarcodeChange,
}) => {
  const [hasPermission, setHasPermission] = React.useState(false);
  const devices = useCameraDevices();
  const device = devices.back;

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.EAN_13], {
    checkInverted: true,
  });

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  useEffect(() => {
    if (barcodes.length > 0) {
      jumpToManual();
      onBarcodeChange(barcodes[0].displayValue);
    }
  }, [barcodes]);

  return (
    <Wrapper>
      <StyledTitle>Наведите сканер{'\n'}на штрихкод карты</StyledTitle>
      <ScanArea>
        {device !== undefined && hasPermission && (
          <>
            <Camera
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={isActive}
              frameProcessor={frameProcessor}
              frameProcessorFps={1}
            />
          </>
        )}
      </ScanArea>
      <Description>
        Обязательно проверяйте номер карты после распознавания
      </Description>
    </Wrapper>
  );
};
