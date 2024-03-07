import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import Colors from "../../constant/colors";
import colors from "../../constant/colors";
const width = Dimensions.get('screen').width;
import DeviceInfo from 'react-native-device-info';

const Header2 = (props) => {
    return (
        <View style={styles.container}>
            {/* <View style={styles.innerContainer}> */}
                <TouchableOpacity style={styles.onePartContainer} onPress={props.backHandler}>
                    <Image source={require('../../assets/images/ic_back_color.png')} style={styles.imageIconStyle} />
                </TouchableOpacity>
                <Text style={styles.titleStyle}>{props.title}</Text>
            {/* </View> */}
        </View>
    );
};

export default Header2;

const styles = StyleSheet.create({
    container: {
        // backgroundColor: colors.lightBlack,
        height: DeviceInfo.hasNotch() ? 60 : 50,
        alignItems: 'center',
        flexDirection: "row",
    },
    imageIconStyle: {
        width: moderateScale(26),
        height: moderateScale(26),
        marginLeft: 15
    },
    innerContainer: {
        marginLeft: "auto",
        marginRight: "auto",
        width: width,
    },
    onePartContainer: {
        width: '10%',
        alignItems: "center"
    },
    titleStyle: {
        color: colors.Black,
        fontSize: moderateScale(20),
        fontWeight: 'bold',
        // textAlign: 'center',
        marginLeft: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        textAlignVertical:'center',
        // backgroundColor:'red',
        marginRight: moderateScale(50)
    },
});