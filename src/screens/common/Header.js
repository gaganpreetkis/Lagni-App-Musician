import React from "react";
import { StyleSheet, View, Image,Text } from "react-native";
import colors from "../../constant/colors";
import { moderateScale } from "../../helpers/ResponsiveFonts";

export default function Header(props){

    return (
        <View style = {styles.container}>
            <Image style={styles.imageContainer} source={require("../../assets/images/logo_white.png")} resizeMode = {'contain'} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.transparent,
        height: moderateScale(40),
        justifyContent : 'center'
    },
    imageContainer : {
        width: 35,
        height: 35,
        marginStart : moderateScale(12)
    }
});