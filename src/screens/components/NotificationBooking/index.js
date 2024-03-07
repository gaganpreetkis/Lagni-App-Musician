import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { moderateScale } from '../../../helpers/ResponsiveFonts';
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../../../constant/colors';
import { MAIN_FONT } from '../../../constant/api';

export default function NotificationBooking(props) {

    const DATA = [
        {
            id: '1',
            type: 'booking',
            title: 'New booking request received for 05.02.2021',
        },
        {
            id: '2',
            type: 'booking',
            title: 'New booking request received for 10.02.2021',
        },
    ];

    const bookingRow = ({item}) => {
        return (
            <View style={[styles.rowStyle, styles.customRow]}>
                <View style={[styles.columnStyle, {justifyContent: 'center', flex: 1}]}>
                    <Text style={styles.bookingTxt}>Booking</Text>
                    <Text style={styles.subTxt}>{item.title}</Text>
                </View>
                <Icon name={'chevron-right'} size={18} color={colors.Black} solid style={{marginLeft: 10}} />
            </View>
        );
    }


    return (
        <View style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={bookingRow}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: moderateScale(20),
        paddingRight: moderateScale(20),
        paddingTop: moderateScale(20),
        paddingBottom: moderateScale(10),
    },
    rowStyle: {
        flexDirection: 'row',
    },
    columnStyle: {
        flexDirection: 'column'
    },
    customRow: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        paddingRight: 15,
        shadowColor: colors.shadowColor,
        shadowRadius: 3,
        shadowOpacity: 1.0,
        elevation: 0,
        shadowOffset: {
            width: 0,
            height: 3
        },
        borderColor: colors.shadowColor,
        borderWidth: 2,
        borderRadius: 6,
        backgroundColor: colors.White,
        marginBottom: moderateScale(10),
        alignItems: 'center',
    },
    bookingTxt: {
        color: colors.red,
        fontFamily: MAIN_FONT ? MAIN_FONT : '',
        fontSize: moderateScale(16),
        marginBottom: 2,
        fontWeight: '600',
    },
    feedbackTxt: {
        color: colors.yellow,
        fontFamily: MAIN_FONT ? MAIN_FONT : '',
        fontSize: moderateScale(16),
        marginBottom: 2,
        fontWeight: '600',
    },
    generalTxt: {
        color: colors.lightBlack,
        fontFamily: MAIN_FONT ? MAIN_FONT : '',
        fontSize: moderateScale(16),
        marginBottom: 2,
        fontWeight: '600',
    },
    subTxt: {
        fontFamily: MAIN_FONT ? MAIN_FONT : '',
        fontSize: moderateScale(12),
        fontWeight: '200',
        marginTop: 2, 
        lineHeight: 18,
        color: colors.lightBlack,
    },
});