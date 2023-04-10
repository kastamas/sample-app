import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { posActions } from '../modules/pos/pos.branch';
import { SceneMap, TabView } from 'react-native-tab-view';
import { PosMap } from '../modules/pos/components/pos-map';
import { PosList } from '../modules/pos/components/pos-list';
import { PosSearch } from '../modules/pos/components/pos-search';
import { TTabProps } from '../navigation/types';
import { EApplicationScreens } from '../screens';
import { PosMapOverlay } from '../modules/pos/components/pos-map-overlay';
import { CustomTabBar } from '../common/components/tab-bar/custom-tab-bar';
import { resetSelectedPos } from '../modules/pos/pos.store';
import { locationActions } from '../modules/location/location.branch';
import { BackHeader } from '../common/components/BackHeader';

const Wrapper = styled.View`
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex: 1;
`;

const StyledCustomTabBar = styled(CustomTabBar)`
  position: absolute;
  top: 108px;
  background-color: white;
  z-index: 10;
`;

const TabsWrapper = styled.View`
  position: absolute;
  top: 0;
  height: 100%;
  display: flex;
  flex: 1;
  width: 100%;
`;

const BackgroundLayer = styled(TouchableOpacity)`
  position: absolute;
  z-index: 20;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
`;

const tabMaxOffset = (Dimensions.get('window').width - 48) / 2;

export const AddressesScreen: React.FC<
  TTabProps<EApplicationScreens.Addresses>
> = ({ route, navigation }) => {
  const dispatch = useAppDispatch();

  const selectedPos = useAppSelector((state) => state.posSelection.pos);
  const posSelectionBadge = useAppSelector((state) => state.posSelection.badge);
  const location = useAppSelector((state) => state.location.data);

  const isPublic = !!route.params?.isPublic;

  const [index, setIndex] = useState(0);
  console.log(index);
  const [routes] = useState([
    { key: 'map', title: 'Карта' },
    { key: 'list', title: 'Список' },
  ]);

  const layout = useWindowDimensions();

  const renderMap = useCallback(
    () => (
      <View style={{ flex: 1, height: '100%' }}>
        <PosMap isPublic={isPublic} />
      </View>
    ),
    [isPublic]
  );

  const renderScene = SceneMap({
    map: renderMap,
    list: (props: any) => {
      return (
        <ScrollView style={{ flex: 1, marginTop: 168 }}>
          <PosList jumpTo={props.jumpTo} isPublic={isPublic} />
        </ScrollView>
      );
    },
  });

  useEffect(() => {
    if (location !== null) {
      dispatch(posActions.getPosList());
    }
  }, [location]);

  useEffect(() => {
    dispatch(locationActions.getLocation());
    dispatch(posActions.getPosList());
  }, []);

  return (
    <View style={{ display: `flex`, flex: 1, backgroundColor: `#fff` }}>
      {isPublic && (
        <BackHeader
          onPress={() => navigation.navigate(EApplicationScreens.CardSignIn)}
          title={'Назад'}
          style={{ marginTop: 58, marginBottom: 20, marginLeft: 20 }}
        />
      )}
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <Wrapper>
        {selectedPos ? (
          <BackgroundLayer
            activeOpacity={1}
            onPress={() => dispatch(resetSelectedPos())}
          />
        ) : null}

        <PosSearch
          onChange={(value) => dispatch(posActions.applyFilter(value))}
          inputBackground={index === 0 ? 'white' : '#F0F0F0'}
        />

        <TabsWrapper>
          <TabView
            renderTabBar={(props) => (
              <StyledCustomTabBar tabMaxOffset={tabMaxOffset} {...props} />
            )}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
          />
        </TabsWrapper>

        {selectedPos ? (
          <PosMapOverlay pos={selectedPos} badgeTitle={posSelectionBadge} />
        ) : null}
      </Wrapper>
    </View>
  );
};
