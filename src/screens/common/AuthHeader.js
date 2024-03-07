import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export default function AuthHeader(props) {
    console.log(JSON.stringify(DeviceInfo.hasNotch()));

    return (
        <View style={styles.bgImageHeight}>
            <Image style={styles.bgImageHeight} source={require('../../assets/images/login_header.png')} />
            <Image style={styles.logoIcon} source={require('../../assets/images/logo_white.png')} resizeMode={'contain'} />
            {props.enableBackButton ?
                <TouchableOpacity onPress={props.onClick} style={styles.backContainer}>
                    <Image source={require('../../assets/images/ic_back.png')} style={styles.backIcon} />
                </TouchableOpacity>
                : <></>}
        </View>
    );
}

const styles = StyleSheet.create({
    bgImageHeight: {
        height: DeviceInfo.hasNotch() ? 240 : 190,
        // height: 185,
        width: '100%',
    },
    logoIcon: {
        position: 'absolute',
        height: 80,
        width: 80,
        alignSelf: 'center',
        top: DeviceInfo.hasNotch() ? 65 : 40,
    },
    backContainer: {
        position: 'absolute',
        top: DeviceInfo.hasNotch() ? 45 : 25,
        left: 15,
    },
    backIcon: {
        height: 24,
        width: 24,
    }
});