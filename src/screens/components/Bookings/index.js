import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, StatusBar, Dimensions, Alert, Platform } from 'react-native';
import SafeAreaView from "../../common/SafeView";
import colors from '../../../constant/colors';
import Loader from '../../common/Loader';
import UpcomingBookings from '../UpcomingBookings';
import RequestBooking from '../RequestBookings';
import CompletedBooking from '../CompletedBookings';
import { TabView, TabBar } from 'react-native-tab-view';
import { moderateScale } from '../../../helpers/ResponsiveFonts';
import Header from "../../common/Header";
import { MAIN_FONT } from '../../../constant/api';

const initialLayout = { width: Dimensions.get('window').width };
const screenWidth = Dimensions.get('window').width;
var fontSize = '';
if (Platform.OS === 'android') {
  if (screenWidth > 350) {
    fontSize = 14
  } else {
    fontSize = 12
  }
} else {
  if (screenWidth > 400) {
    fontSize = 14
  } else {
    fontSize = 12
  }
}
export function Bookings() {

  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'history', title: 'HISTORY ' },
    { key: 'upcoming', title: 'UPCOMING ' },
    { key: 'new_request', title: 'NEW REQUEST ' },
  ]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'transparent' }}
      activeColor={'red'}
      inactiveColor={colors.darkPurple}
      style={{ width: '100%', height: 65, /* alignSelf: 'center', */ backgroundColor: colors.transparent, width: moderateScale(340) }}
      renderLabel={({ route, focused, color }) => (
        <View style={{ justifyContent: 'center', alignItems: 'center', height: 50 }}>
          <Text style={[{ color, fontSize: fontSize, marginBottom: 10, fontWeight: focused ? 'bold' : 'normal', fontFamily: MAIN_FONT ? MAIN_FONT : '' }]}>
            {route.title}
          </Text>
          {focused ? <View style={styles.innerCircle} /> : <View style={{ width: 10, height: 10 }}></View>}
        </View>
      )}
      pressColor={colors.White}
    />
  );

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'upcoming':
        return <UpcomingBookings />;
      case 'new_request':
        return <RequestBooking />;
      case 'history':
        return <CompletedBooking />;
      default:
        return null;
    }
  };

  return (
    <>
      <StatusBar backgroundColor={colors.red} />
      <SafeAreaView colorTop={colors.Primary} colorBottom={colors.Primary}>
        {/* <View style = {{height : Platform.OS === 'ios' ? 0 : 10}}/>
        <Header/> */}
        <View style={{ height: Platform.OS === 'ios' ? 0 : 10 }} />
        <Loader isLoading={isLoading} />
        <View style={styles.mainContainer}>
          <TabView
            style={{ marginTop: Platform.OS === "ios" ? moderateScale(10) : moderateScale(0) }}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            renderTabBar={renderTabBar}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.light_pink,
  },
  scene: {
    flex: 1,
  },
  innerCircle: {
    borderRadius: 8,
    width: 8,
    height: 8,
    backgroundColor: 'red',
    shadowColor: 'red',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 5
  }
});
