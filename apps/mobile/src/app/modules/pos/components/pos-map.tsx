import React, { useEffect, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { configActions } from '../../config/config.branch';
import { PublicMapToast } from './public-map-toast';
import { ILocationData } from '../../location/location.branch';
import { isEqual } from 'lodash/fp';
import { resetSelectedPos, selectPos } from '../pos.store';

const Wrapper = styled.View`
  height: 100%;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  z-index: 20;
`;

const StyledMap = styled(MapView)`
  position: absolute;
  flex: 1;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

interface IComponentProps {
  isPublic: boolean;
}

export const PosMap: React.FC<IComponentProps> = ({ isPublic }) => {
  const location = useAppSelector((state) => state.location.data, isEqual);
  const [mapCenter, setMapCenter] = useState<ILocationData | undefined>();
  const pos = useAppSelector((state) => state.pos.data.filtered);
  const [marginBottom, setMarginBottom] = useState(1);
  const selectedItem = useAppSelector(
    (state) => state.posSelection.pos,
    isEqual
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    setMapCenter(location);
  }, [location]);

  useEffect(() => {
    if (selectedItem) {
      setMapCenter((previous) => ({
        ...previous,
        longitude: selectedItem.coords[1],
        latitude: selectedItem.coords[0],
      }));
    }

    dispatch(configActions.changeTabsVisibility(!selectedItem));
  }, [selectedItem]);

  return mapCenter ? (
    <>
      <StyledMap
        provider={PROVIDER_GOOGLE}
        showsIndoors={false}
        onPress={(event) => {
          if (event.nativeEvent.action !== 'marker-press') {
            dispatch(resetSelectedPos());
          }
        }}
        showsBuildings={true}
        showsIndoorLevelPicker={false}
        showsTraffic={false}
        showsUserLocation={true}
        showsPointsOfInterest={false}
        region={mapCenter}
        showsCompass={true}
        showsScale={true}
        zoomTapEnabled={true}
        zoomEnabled={true}
        zoomControlEnabled={true}
        toolbarEnabled={true}
        showsMyLocationButton={true}
        onMapReady={() => setMarginBottom(0)}
        style={{ marginBottom: marginBottom }}
      >
        {pos.map((item) => (
          <Marker
            key={item.id}
            onPress={() => dispatch(selectPos(item))}
            opacity={selectedItem && selectedItem.id === item.id ? 1 : 0.7}
            coordinate={{
              latitude: item.coords[0],
              longitude: item.coords[1],
            }}
            pinColor="black"
          />
        ))}
      </StyledMap>

      {!selectedItem && isPublic ? <PublicMapToast /> : null}
    </>
  ) : (
    <Wrapper>
      <ActivityIndicator color="#2f8dfe" size="large" />
    </Wrapper>
  );
};
