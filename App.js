/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { Settings, Text, Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './src/screens/components/login';
import Signup from './src/screens/components/signup';
import ForgotPassword from './src/screens/components/forgotPassword';
import ResetPassword from "./src/screens/components/resetPassword";
import VerifyChangePasswordToken from './src/screens/components/verifyChangePasswordToken';
import { ProfileNew } from './src/screens/components/newProfile';
import { Bookings } from './src/screens/components/Bookings';
import { Notifications } from "./src/screens/components/Notifications";
import { HomeScreen } from './src/screens/components/HomeScreen';
import Profile from './src/screens/components/profile';
import colors from './src/constant/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { BookingCalendar } from './src/screens/components/bookingCalendar';
import CommonWebView from './src/screens/components/CommonWebView';
import UserSettings from "./src/screens/components/UserSettings";
import ContactSupport from './src/screens/components/ContactSupport';
import { MAIN_FONT, MAIN_FONT_SEMI_BOLD } from './src/constant/api';
import ZoomImage from "./src/screens/components/zoomImage";
import Transactions from './src/screens/components/Transactions';
import Rating from "./src/screens/components/ratingCustomer";
import EventDetail from './src/screens/components/EventDetail';
import CompleteProfile from "./src/screens/components/completeProfile";
import YourRequirement from './src/screens/components/YourRequirement';
import SplashScreen from 'react-native-splash-screen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {

  useEffect(() => {
    SplashScreen.hide()
  },[]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'Login'}
        headerShown={false}
        screenOptions={{
          headerTransparent: true,
          gestureEnabled: false,
          headerShown: false
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="VerifyChangePasswordToken" component={VerifyChangePasswordToken} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="BookingCalendar" component={BookingCalendar} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerBackTitleVisible: false }} />
        <Stack.Screen name="CommonWebView" component={CommonWebView} />
        <Stack.Screen name="ContactSupport" component={ContactSupport} />
        <Stack.Screen name="ZoomImage" component={ZoomImage} options={{ headerBackTitleVisible: false }} />
        <Stack.Screen name="Transactions" component={Transactions} />
        <Stack.Screen name="Rating" component={Rating} options={{ headerBackTitleVisible: false }} />
        <Stack.Screen name="EventDetail" component={EventDetail} />
        <Stack.Screen name="CompleteProfile" component={CompleteProfile}/>
        <Stack.Screen name="YourRequirement" component={YourRequirement}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const customTabBarStyle = {
  activeTintColor: '#0091EA',
  inactiveTintColor: 'gray',
  style: {
    // backgroundColor: 'gray',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    borderColor: colors.LightGray,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderWidth: 1,
    height: 80,
    paddingTop: 10,
    paddingBottom: 10,
  },
}

function Home() {
  return (
    <Tab.Navigator

      activeColor="#fff"
      tabBarOptions={customTabBarStyle}
      shifting="false"
      screenOptions={({ route, navigation }) => {
        return {
          tabBarLabel: navigation.isFocused() ? route.name : '',
          tabBarIcon: ({ focused, tintColor }) => {
            // const { routeName } = navigation.state;
            let icon;
            switch (route.name) {
              case 'HomeScreen':
                return icon = <Image resizeMode={'contain'} style={{ width: 28, height: 28 }} source={focused ? require('./src/assets/images/ic_home_selected.png') : require('./src/assets/images/ic_home.png')} />
              case 'Bookings':
                // tabBarLabel = true
                // return icon = <Icon name='calendar-alt' size={20} color={focused ? colors.barBlue : colors.gray} />
                return icon = <Image resizeMode={'contain'} style={{ width: 28, height: 28 }} source={focused ? require('./src/assets/images/ic_booking_selected.png') : require('./src/assets/images/ic_booking.png')} />
              case 'Notifications':
                return icon = <Image resizeMode={'contain'} style={{ width: 28, height: 28 }} source={focused ? require('./src/assets/images/ic_notification_selected.png') : require('./src/assets/images/ic_notification.png')} />
              case 'Profile':
                return icon = <Image resizeMode={'contain'} style={{ width: 28, height: 28 }} source={focused ? require('./src/assets/images/ic_account_selected.png') : require('./src/assets/images/ic_account.png')} />
            }
            return icon
          },
          tabBarLabel: ({ focused, color }) => {
            let label;
            switch (route.name) {
              case 'HomeScreen':
                return label = focused ? <Text style={[color, { textTransform: 'uppercase', fontFamily: Platform.OS === "ios" ? MAIN_FONT : MAIN_FONT_SEMI_BOLD, fontWeight: 'bold', color: colors.btnOrange, fontSize: 11 }]}>Home</Text> : <Text></Text>;
              case 'Bookings':
                // label = focused ? 'Bookings' : null;
                // return label = focused ? <Text style={{ color }}>Bookings</Text> : null
                // return label = <Text style={[color, { fontFamily: MAIN_FONT ? MAIN_FONT : 'HurmeGeometricSans1' }]}>Bookings</Text>
                return label = focused ? <Text style={[color, { textTransform: 'uppercase', fontFamily: Platform.OS === "ios" ? MAIN_FONT : MAIN_FONT_SEMI_BOLD, fontWeight: 'bold', color: colors.btnOrange, fontSize: 11 }]}>Booking</Text> : <Text></Text>;
              case 'Notifications':
                return label = focused ? <Text style={[color, { textTransform: 'uppercase', fontFamily: Platform.OS === "ios" ? MAIN_FONT : MAIN_FONT_SEMI_BOLD, fontWeight: 'bold', color: colors.btnOrange, fontSize: 11}]}>Notification</Text> : <Text></Text>;
              case 'Profile':
                return label = focused ? <Text style={[color, { textTransform: 'uppercase', fontFamily: Platform.OS === "ios" ? MAIN_FONT : MAIN_FONT_SEMI_BOLD, fontWeight: 'bold', color: colors.btnOrange, fontSize: 11 }]}>Profile</Text> : <Text></Text>;
            }
            return label
          }
        };
      }}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="Bookings" component={Bookings} />
      <Tab.Screen name="Notifications" component={Notifications} />
      {/* <Tab.Screen name="Profile" component={Profile} /> */}
      <Tab.Screen name="Profile" component={ProfileNew} />
    </Tab.Navigator>
  );
}

export default App;

