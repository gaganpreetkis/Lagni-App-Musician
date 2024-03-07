import React from 'react';
import { StyleSheet, View, StatusBar, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import colors from '../../../constant/colors';
import SafeAreaView from '../../common/SafeView';
import { Card } from 'react-native-shadow-cards';
import { moderateScale } from '../../../helpers/ResponsiveFonts';
import { MAIN_FONT } from '../../../constant/api';

export default function Transactions(props) {
    const params = props.route.params;
    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'First Item',
            imageUrl: '',
            name: 'John Doe',
            ddate: '12 Jan 2021',
            transaction_id: 'xyz'
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Second Item',
            imageUrl: '',
            name: 'Oliver Queen',
            ddate: '25 Dec 2020',
            transaction_id: 'abc'
        },
    ];

    const renderItem = ({ item }) => {
        var icon = "";
        if (item.imageUrl) {
            icon = { uri: item.imageUrl }
        } else {
            icon = require("../../../assets/images/default_profile.png");
        }
        return (
            <TouchableOpacity onPress={() => { console.log("onclick " + item.name)}}>
                <Card style={[styles.cardBackground, styles.rowStyle]}>
                    <Image style={{ width: 60, height: 60, borderRadius: Platform.OS === 'ios' ? 30 : 60 }}
                        source={icon} />
                    <View style={[styles.columnStyle, styles.nameContainer]}>
                        <Text style={styles.nameStyle}>{item.name}</Text>
                        <Text style={styles.dateStyle}>{item.ddate}</Text>
                    </View>
                    <Text style={styles.detailStyle}>DETAIL</Text>
                </Card>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView colorTop={colors.White} colorBottom={colors.White} style={styles.container}>
            <View style={styles.header}></View>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    header: {
        height: Platform.OS == 'ios' ? 40 : 0,
    },
    cardBackground: {
        marginRight: moderateScale(2),
        marginBottom: moderateScale(10),
        marginLeft: moderateScale(20),
        padding: 15
    },
    rowStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    columnStyle: {
        flexDirection: 'column'
    },
    profileImage: {
        width: 30,
        height: 30,
        borderRadius: Platform.OS === 'ios' ? 30 / 2 : 30,
        borderWidth: 1.5,
        borderColor: colors.White,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.lightGrey
    },
    nameContainer: {
        marginLeft: moderateScale(15),
        flexGrow: 1,
        flexBasis: 100,
        justifyContent: 'center'
    },
    nameStyle: {
        fontFamily: MAIN_FONT ? MAIN_FONT : '',
        fontSize: moderateScale(16),
        fontWeight: 'bold',
        marginBottom: 2,
    },
    dateStyle: {
        marginTop: 2,
        fontSize: moderateScale(14),
        color: colors.DarkGray
    },
    detailStyle: {
        color: colors.DarkGray
    },
});