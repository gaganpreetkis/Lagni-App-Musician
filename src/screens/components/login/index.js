import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Loader from "../../common/Loader";
import { moderateScale } from "../../../helpers/ResponsiveFonts";
import colors from "../../../constant/colors";
import { keys, setValue, getValue } from "../../../helpers/Storage";
import { loginWithFacebook } from "../../common/facebook_login";

import { BASE_URL, MAIN_FONT, MAIN_FONT_SEMI_BOLD } from "../../../constant/api";
import NetworkUtils from "../../common/NetworkUtills";
import AuthHeader from "../../common/AuthHeader";
import DeviceInfo from 'react-native-device-info';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function Login({ navigation }) {

  useEffect(() => {
    getValue(keys.USER_ID).then((value) => {
      console.log(value)
      if (value != null && value != undefined && value != '') {
        getValue(keys.APPROVED_ACCOUNT).then((approved) => {
          console.log(approved+"dfdsfdf")
          if (approved == null || approved == undefined || approved == '' || approved == 'false') {

          } else {
            HomeScreen();
          }
        })
      }
    }
    );
  }, [])

  // const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hidePass, setHidePass] = useState(true);
  const ref_password = useRef();

  function signupScreen() {
    navigation.navigate("Signup");
  }

  function forgotPasswordScreen() {
    navigation.navigate('ForgotPassword');
  }

  function HomeScreen() {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  }

  function validateLogin() {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email) {
      Alert.alert('Error', 'Please enter the email');
    } else if (reg.test(email) === false) {
      Alert.alert('Error', 'Please enter a valid email');
    } else if (!password) {
      Alert.alert('Error', 'Please enter the password');
    }/*  else if (!checked) {
      Alert.alert('Error', 'Please agree to the terms of services');
    }  */else {
      checkNetwork();
    }
  }

  checkNetwork = async () => {
    const isConnected = await NetworkUtils.isNetworkAvailable();
    if (isConnected) {
      makeLoginAPIcall();
    } else {

    }
  }

  function makeLoginAPIcall() {

    var data = new FormData();
    data.append('user_login', email);
    data.append('user_pass', password);
    data.append('remember', 'true');

    setIsLoading(true);

    fetch(BASE_URL + 'login.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setIsLoading(false);
        parseResponse(responseJson);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  }

  function parseResponse(responseJson) {
    console.log('response object:' + JSON.stringify(responseJson));
    if (responseJson.success) {
      console.log('user id :' + responseJson.user_id);
      setValue(keys.USER_ID, responseJson.user_id);
      setValue(keys.USER_NAME, responseJson.user_name);
      setValue(keys.TOKEN, responseJson.token);
      setValue(keys.APPROVED_ACCOUNT, true);

      
      setEmail('');
      setPassword('');

      HomeScreen();
    } else {
      alert(responseJson.message ? responseJson.message : "Something went wrong");
      setValue(keys.USER_ID, '');
      setPassword('');
      setValue(keys.APPROVED_ACCOUNT, false);
    }
  }

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={colors.red} />
      <Loader isLoading={isLoading} />

      <KeyboardAwareScrollView
        style={{ flex: 1 }}
      // behavior="position"
      // keyboardVerticalOffset={Platform.OS === "ios" ? moderateScale(-200) : moderateScale(-285)}
      >
        <View>

          <AuthHeader />
          <View style={styles.loginContainer}>

            <Text style={[styles.loginText]}>Hello</Text>
            <Text style={{ color: colors.lightBlack, fontSize: 12, fontFamily: Platform.OS === "ios" ? MAIN_FONT : MAIN_FONT_SEMI_BOLD, fontWeight: '600', }}>Sign in to your account</Text>

            <View style={styles.edTxtContainer}>
              <TextInput
                onChangeText={(email) => setEmail(email)}
                autoCapitalize={"none"}
                style={styles.lgn_txtInput}
                underlineColorAndroid={"rgba(0,0,0,0)"}
                autoCorrect={false}
                value={email}
                placeholderTextColor={colors.lightBlack}
                returnKeyType="next"
                placeholder="USERNAME"
                keyboardType={"email-address"}
                onSubmitEditing={() => ref_password.current.focus()}
              />
              <Image style={{ position: 'absolute', top: 12, left: 20, justifyContent: 'center', alignItems: 'center', height: 16, width: 16 }} source={require('../../../assets/images/ic_user.png')} />
            </View>

            <View style={styles.edTxtContainer}>
              <TextInput
                onChangeText={(password) => setPassword(password)}
                autoCapitalize={"none"}
                style={[styles.lgn_txtInput, { paddingRight: 40 }]}
                underlineColorAndroid={"rgba(0,0,0,0)"}
                autoCorrect={false}
                value={password}
                secureTextEntry={hidePass}
                placeholderTextColor={colors.lightBlack}
                placeholder="PASSWORD"
                ref={ref_password}
              />
              <Icon
                style={{ position: 'absolute', alignSelf: 'flex-end', right: 20, top: 14 }}
                name={hidePass ? 'eye-slash' : 'eye'}
                size={15}
                color="grey"
                onPress={() => setHidePass(!hidePass)}
              />
              <Image style={{ position: 'absolute', top: 8, left: 20, justifyContent: 'center', alignItems: 'center', height: 26, width: 20 }} resizeMode={'contain'} source={require('../../../assets/images/ic_password.png')} />
            </View>

            <View style={[styles.edTxtContainer, { marginTop: 0, marginBottom: moderateScale(10), }]}>
              <TouchableOpacity onPress={() => forgotPasswordScreen()}>
                <Text style={{ alignSelf: 'flex-end', color: colors.lightBlack, marginTop: moderateScale(15), fontFamily: MAIN_FONT ? MAIN_FONT : '', textDecorationLine: 'underline', textDecorationStyle: 'solid', textDecorationColor: colors.lightBlack, fontSize: 12, marginRight: 20 }}>forgot password?</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.btnStyle}>
              <TouchableOpacity
                onPress={() => validateLogin()}
                style={{ width: "100%", marginTop: 10, backgroundColor: colors.btnOrange, justifyContent: "center", alignItems: "center", width: moderateScale(275), height: moderateScale(43), borderRadius: 6 }}>
                <Text style={{ fontSize: moderateScale(16), color: colors.White, paddingTop: Platform.OS === "ios" ? moderateScale(0) : 0, fontFamily: Platform.OS === "ios" ? MAIN_FONT : MAIN_FONT_SEMI_BOLD, fontWeight: '600', marginTop: Platform.OS === "ios" ? 2 : 0 }}>
                  Sign In
            </Text>
              </TouchableOpacity>

              <Text style={{ color: colors.lightBlack, fontSize: 12, marginTop: 40, fontFamily: Platform.OS === "ios" ? MAIN_FONT : MAIN_FONT_SEMI_BOLD, fontWeight: '600', }}>or Sign In using social media</Text>

              <TouchableOpacity onPress={() => { loginWithFacebook(setIsLoading, navigation); }} style={[{
                width: 40, height: 40, borderRadius: 20, marginTop: 12, backgroundColor: '#4267B2', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
              }]}>

                <Icon name={"facebook-f"}
                  size={moderateScale(17)}
                  color={colors.White} />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, flexGrow: 1 }}></View>

            <View style={{ height: 1, backgroundColor: colors.dividerColor, width: '100%', marginBottom: 20, marginTop: 40, }}></View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: DeviceInfo.hasNotch() ? 40 : 20, }}>
              <Text style={{ fontSize: 12, color: colors.lightBlack, fontFamily: MAIN_FONT ? MAIN_FONT : '' }}>Don't have an account, </Text>
              <TouchableOpacity onPress={() => signupScreen()}>
                <Text style={{ fontSize: 12, color: colors.Black, fontFamily: MAIN_FONT ? MAIN_FONT : '' }}>Create Now?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.White,
  },
  loginContainer: {
    width: moderateScale(327),
    flex: 1,
    marginLeft: "auto",
    marginRight: "auto",
  },
  loginText: {
    color: colors.Black,
    fontSize: moderateScale(44),
    fontWeight: 'bold',
    fontFamily: Platform.OS === "ios" ? MAIN_FONT : MAIN_FONT_SEMI_BOLD,
    fontWeight: '600',
    marginTop: 60,
  },
  edTxtContainer: {
    shadowColor: '#013050',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 5,
    shadowOpacity: 0.1,
    marginTop: 20,
    borderRadius: 20,
    height: moderateScale(40),
    fontFamily: MAIN_FONT ? MAIN_FONT : '',
    // marginLeft: -5,
  },
  small_txtInput: {
    alignSelf: "center",
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(5),
    backgroundColor: "#EFF4F7",
    color: "black",
    padding: moderateScale(10),
    fontSize: moderateScale(17),
    borderColor: colors.Black,
    marginBottom: moderateScale(10),
    marginRight: moderateScale(10),
    marginLeft: moderateScale(10),
  },
  lgn_txtInput: {
    alignSelf: "flex-start",
    width: moderateScale(315),
    height: moderateScale(40),
    borderRadius: moderateScale(5),
    backgroundColor: colors.White,
    color: colors.Black,
    padding: moderateScale(10),
    fontSize: moderateScale(14),
    borderColor: colors.lightGrey,
    borderWidth: 1,
    marginBottom: moderateScale(10),
    borderRadius: 20,
    paddingLeft: 50,
  },
  titleStyle: {
    color: colors.Black,
    fontSize: moderateScale(11),
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 10,
    marginLeft: moderateScale(10),
  },
  btnStyle: {
    width: moderateScale(327),
    marginLeft: "auto",
    marginRight: "auto",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxStyle: {
    flexDirection: "row",
    marginLeft: moderateScale(6),
    marginTop: moderateScale(10),
    marginBottom: moderateScale(20),
  },
  checkboxInnerStyle: {
    height: moderateScale(15),
    width: moderateScale(15),
    backgroundColor: "#EFF4F7",
    borderRadius: 3,
  },
});
