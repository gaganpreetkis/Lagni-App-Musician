import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    StatusBar
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/FontAwesome5';
import Loader from '../../common/Loader';
import { moderateScale } from '../../../helpers/ResponsiveFonts';
import colors from '../../../constant/colors';
import { keys, setValue, getValue } from "../../../helpers/Storage";
import { loginWithFacebook } from "../../common/facebook_login";
import { BASE_URL, MAIN_FONT, MAIN_FONT_SEMI_BOLD, TERMS_AND_CONDITION_URL } from "../..//../constant/api";
import NetworkUtils from '../../common/NetworkUtills';
import AuthHeader from '../../common/AuthHeader';

export default function Signup() {
    const navigation = useNavigation();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [countryCode, setCountryCode] = useState('');
    const ref_lastName = useRef();
    const ref_email = useRef();
    const ref_phone = useRef();
    const ref_password = useRef();
    const ref_phone_code = useRef();

    function setCheckedfun() {
        if (checked) {
            setChecked(false);
        } else {
            setChecked(true);
        }
    }

    function validateSignup() {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!firstName) {
            Alert.alert('Error', 'Please enter your first name');
        } else if (!lastName) {
            Alert.alert('Error', 'Please enter your last name');
        } else if (!email) {
            Alert.alert('Error', 'Please enter the email');
        } else if (reg.test(email) === false) {
            Alert.alert('Error', 'Please enter a valid email');
        } else if (!phone) {
            Alert.alert('Error', 'Please enter the phone number');
        } else if (phone && phone.length < 10) {
            Alert.alert('Error', 'Please enter 10 digit phone number');
        } else if (!password) {
            Alert.alert('Error', 'Please enter the password');
        } else if (!checked) {
            Alert.alert('Error', 'Please agree to the terms of services');
        } else {
            makeRegisterApiCall();
        }
    }

    checkNetwork = async () => {
        const isConnected = await NetworkUtils.isNetworkAvailable();
        if (isConnected) {
            makeRegisterApiCall();
        } else {

        }
    }

    const showTermsAndConditions = () => {
        navigation.navigate('CommonWebView', {
            url: TERMS_AND_CONDITION_URL,
            title: 'Terms and Conditions'
        })
    }

    function makeRegisterApiCall() {
        var data = new FormData();
        data.append('firstname', firstName);
        data.append('lastname', lastName);
        data.append('email', email);
        data.append('password', password);
        data.append('phonenumber', phone);

        setIsLoading(true);

        fetch(BASE_URL + 'register.php', {
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
        if (responseJson.success == true) {
            console.log('user id :' + responseJson.user_id);
            setValue(keys.USER_ID, responseJson.user_id);
            setValue(keys.USER_NAME, responseJson.user_name);
            setValue(keys.TOKEN, responseJson.token);

            setFirstName('');
            setLastName('');
            setEmail('');
            setPhone('');
            setCountryCode('');
            setPassword('');

            //navigation.navigate('Home');
            navigation.navigate('CompleteProfile', {
                screen: 'Signup'
            });
        } else {
            alert(responseJson.message ? responseJson.message : "Something went wrong");
        }
    }

    return (
        <>
            <View style={styles.mainContainer}>
                <StatusBar backgroundColor={colors.red} />
                <Loader isLoading={isLoading} />
                <KeyboardAwareScrollView>
                    <View>
                        <AuthHeader enableBackButton={true} onClick={() => navigation.goBack()} />
                        <View style={styles.loginContainer}>
                            <TextInput
                                onChangeText={firstName => setFirstName(firstName.trim())}
                                autoCapitalize={'none'}
                                underlineColorAndroid={'rgba(0,0,0,0)'}
                                autoCorrect={false}
                                value={firstName}
                                placeholderTextColor={colors.lightBlack}
                                placeholder="First Name"
                                returnKeyType="next"
                                onSubmitEditing={() => ref_lastName.current.focus()}
                                style={[styles.edTxtContainer, styles.lgn_txtInput]}
                            />

                            <TextInput
                                onChangeText={lastName => setLastName(lastName.trim())}
                                autoCapitalize={'none'}
                                style={[styles.edTxtContainer, styles.lgn_txtInput]}
                                underlineColorAndroid={'rgba(0,0,0,0)'}
                                autoCorrect={false}
                                value={lastName}
                                placeholderTextColor={colors.lightBlack}
                                placeholder="Last Name"
                                returnKeyType="next"
                                ref={ref_lastName}
                                onSubmitEditing={() => ref_email.current.focus()}
                            />

                            <TextInput
                                onChangeText={email => setEmail(email)}
                                autoCapitalize={'none'}
                                style={[styles.edTxtContainer, styles.lgn_txtInput]}
                                underlineColorAndroid={'rgba(0,0,0,0)'}
                                autoCorrect={false}
                                value={email}
                                placeholderTextColor={colors.lightBlack}
                                placeholder="Email Address"
                                returnKeyType="next"
                                ref={ref_email}
                                keyboardType={'email-address'}
                                onSubmitEditing={() => ref_phone.current.focus()}
                            />

                            {/* <View style={styles.rowStyle}> */}
                            {/* <Text style={styles.PlusStyle}>+</Text>
                                <TextInput onChangeText={codeNo => setCountryCode(codeNo.trim())}
                                    autoCapitalize={'none'}
                                    style={[styles.edTxtContainer, styles.small_txtInput]}
                                    secureTextEntry={false}
                                    underlineColorAndroid={'rgba(0,0,0,0)'}
                                    autoCorrect={false}
                                    value={`${countryCode}`}
                                    keyboardType={'phone-pad'}
                                    maxLength={5}
                                    ref={ref_phone_code}
                                    placeholderTextColor={colors.lightBlack}
                                    placeholder="Country Code"
                                    onSubmitEditing={() => ref_phone.current.focus()}
                                    returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'} /> */}

                            <TextInput
                                onChangeText={phoneNo => setPhone(phoneNo.replace(/[^0-9]/g, '').trim())}
                                autoCapitalize={'none'}
                                style={[styles.edTxtContainer, styles.lgn_txtInput, /* { width: moderateScale(155) } */]}
                                secureTextEntry={false}
                                underlineColorAndroid={'rgba(0,0,0,0)'}
                                autoCorrect={false}
                                value={phone}
                                keyboardType={'phone-pad'}
                                maxLength={10}
                                placeholderTextColor={colors.lightBlack}
                                placeholder="Phone Number"
                                ref={ref_phone}
                                onSubmitEditing={() => ref_password.current.focus()}
                                returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                            />
                            {/* </View> */}

                            <TextInput
                                onChangeText={password => setPassword(password.trim())}
                                autoCapitalize={'none'}
                                style={[styles.edTxtContainer, styles.lgn_txtInput]}
                                underlineColorAndroid={'rgba(0,0,0,0)'}
                                autoCorrect={false}
                                value={password}
                                secureTextEntry={true}
                                placeholderTextColor={colors.lightBlack}
                                placeholder="Password"
                                ref={ref_password}
                            />

                            <View style={[styles.rowStyle, { justifyContent: 'flex-start', margin: moderateScale(10) }]}>
                                <TouchableOpacity style={styles.checkboxStyle} onPress={setCheckedfun}>
                                    <View style={styles.checkboxInnerStyle}>
                                        <Icon
                                            name={checked ? "check-square" : "square"}
                                            size={moderateScale(17)}
                                            color={colors.gray}
                                            opacity={0.5}
                                        />
                                    </View>
                                </TouchableOpacity>
                                <Text style={{ marginLeft: moderateScale(10), fontSize: 14, fontFamily: Platform.OS === "ios" ? MAIN_FONT : MAIN_FONT, /* fontWeight: '600', */ paddingBottom: 2, }}> I accept all </Text>
                                <TouchableOpacity onPress={() => showTermsAndConditions()}><Text style={{ textDecorationLine: 'underline', fontSize: 14, fontFamily: Platform.OS === "ios" ? MAIN_FONT : MAIN_FONT, /* fontWeight: '600', */ marginTop: Platform.OS === 'ios' ? 2 : -2, }}>term and conditions</Text></TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                onPress={() => validateSignup()}
                                style={{ width: moderateScale(327), marginTop: 10, backgroundColor: colors.btnOrange, justifyContent: "center", alignItems: "center", width: moderateScale(275), height: moderateScale(43), borderRadius: 6, alignSelf: 'center' }}>
                                <Text style={{ fontSize: moderateScale(14), color: colors.White, paddingTop: Platform.OS === "ios" ? moderateScale(0) : 0, fontFamily: Platform.OS === "ios" ? MAIN_FONT : MAIN_FONT_SEMI_BOLD, fontWeight: '600', marginTop: Platform.OS === "ios" ? 2 : 0 }}>
                                    Sign Up & complete your profile </Text>
                            </TouchableOpacity>


                            <Text style={{ color: colors.lightBlack, fontSize: 12, marginTop: 40, fontFamily: Platform.OS === "ios" ? MAIN_FONT : MAIN_FONT_SEMI_BOLD, fontWeight: '600', }}>or Create Account using social media</Text>
                            <TouchableOpacity onPress={() => {
                                if (!checked) {
                                    Alert.alert('Error', 'Please agree to the terms of services');
                                } else {
                                    loginWithFacebook(setIsLoading, navigation);
                                }
                            }} style={[{
                                width: 40, height: 40, borderRadius: 20, marginTop: 12, backgroundColor: '#4267B2', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                            }]}>

                                <Icon name={"facebook-f"}
                                    size={moderateScale(17)}
                                    color={colors.White} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.White,
    },
    rowStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // marginLeft: moderateScale(10),
        width: moderateScale(315),
    },
    loginContainer: {
        width: moderateScale(327),
        flex: 1,
        alignSelf: 'center',
        paddingTop: 30,
        alignItems: 'center',
        paddingBottom: 20,
    },
    loginText: {
        color: colors.Black,
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginBottom: moderateScale(30),
        fontSize: moderateScale(24),
        fontWeight: 'bold',
        marginTop: moderateScale(30)
    },
    small_txtInput: {
        alignSelf: 'center',
        width: moderateScale(120),
        height: moderateScale(40),
        borderRadius: moderateScale(20),
        backgroundColor: colors.White,
        color: 'black',
        padding: moderateScale(10),
        fontSize: moderateScale(14),
        borderColor: colors.Black,
        marginBottom: moderateScale(10),
        marginRight: moderateScale(10),
        marginLeft: moderateScale(10)
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
        paddingLeft: 15,
    },
    edTxtContainer: {
        shadowColor: '#013050',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 5,
        shadowOpacity: 0.1,
        marginTop: 10,
        borderRadius: 20,
        height: moderateScale(40),
        fontFamily: MAIN_FONT ? MAIN_FONT : '',
    },
    titleStyle: {
        color: colors.Black,
        fontSize: moderateScale(11),
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 10,
        marginLeft: moderateScale(10),
    },
    btnStyle: {
        width: moderateScale(327),
        marginLeft: 'auto',
        marginRight: 'auto',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxStyle: {
        alignSelf: 'flex-start',
        marginLeft: 10,
    },
    checkboxInnerStyle: {
        height: moderateScale(15),
        width: moderateScale(15),
    },
    backArrowStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        padding: moderateScale(15)
    },
    backTxtStyle: {
        color: '#FF647C',
        fontSize: moderateScale(11),
    },
    PlusStyle: {
        color: colors.Black,
        fontSize: moderateScale(22),
        textAlign: 'center',
        fontFamily: MAIN_FONT ? MAIN_FONT : '',
        alignItems: 'center'
    },
});