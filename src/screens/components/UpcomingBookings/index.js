import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { moderateScale } from '../../../helpers/ResponsiveFonts';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Card } from 'react-native-shadow-cards';
import colors from '../../../constant/colors';
import { MAIN_FONT } from '../../../constant/api';
import { BASE_URL } from "../..//../constant/api";
import { keys, setValue, getValue } from "../../../helpers/Storage";
import { useIsFocused } from '@react-navigation/native';
import NetworkUtils from "../../common/NetworkUtills";

export default function UpcomingBookings() {

    const [upcomingBookings, setUpcomingBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState('');

    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            getInitialData();
        }
    }, [isFocused]);

    const getInitialData = async () => {
        checkNetworkUpcoming();
    }  
    
    checkNetworkUpcoming = async () => {
        const isConnected = await NetworkUtils.isNetworkAvailable();
        if (isConnected) {
            getValue(keys.USER_ID).then((value) => {
                setUserId(value)
                console.log(value)
                getUpcomingBookings(value)
            }
            );
        } else {
    
        }
    }

    const getUpcomingBookings = (id) => {
        var data = new FormData();
        data.append('user_id', id);
        setIsLoading(true);
        fetch(BASE_URL + 'eventlisting.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: data,
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                setIsLoading(false);
                setUpcomingBookings(responseJson.eventListing);
            })
            .catch((error) => {
                setIsLoading(false);
                console.error(error);
            });
    }

    function tConvert(time) {
        // Check correct time format and split into components
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) { // If time format correct
            time = time.slice(1);  // Remove full string match value
            time[5] = +time[0] < 12 ? 'am' : 'pm'; // Set AM/PM
            if (time[0] % 12 < 10) {
                time[0] = '0' + time[0] % 12;
            } else {
                time[0] = time[0] % 12 || 12;
            }
            // time[0] = '0' + time[0] % 12 || 12; // Adjust hours
        }
        return time.join(''); // return adjusted time or original string
    }

    function getFormattedDate(sdate) {
        return (
            sdate.length === 14 ? <View style={styles.rowStyle}>
                <Text style={styles.dateText}>{(sdate!== undefined) ? sdate.split(',')[0].trim().substring(0, 2) : ''}</Text>
                <Text style={[styles.dateText, { textTransform: 'lowercase', fontSize: 14 }]}>{(sdate !== undefined) ? sdate.split(',')[0].trim().substring(2, 4) : ''}</Text>
                <Text style={styles.dateText}>{(sdate !== undefined) ? sdate.split(',')[0].trim().substring(4) : ''}</Text>
            </View>
                :
                <View style={styles.rowStyle}>
                    <Text style={styles.dateText}>{(sdate !== undefined) ? sdate.split(',')[0].trim().substring(0, 1) : ''}</Text>
                    <Text style={[styles.dateText, { textTransform: 'lowercase', fontSize: 14 }]}>{(sdate !== undefined) ? sdate.split(',')[0].trim().substring(1, 3) : ''}</Text>
                    <Text style={styles.dateText}>{(sdate !== undefined) ? sdate.split(',')[0].trim().substring(3) : ''}</Text>
                </View>
        );
    }
    
    const getBookingStatus = (status) => {
        /* 1: New Request
        2: confirm
        3: reject
        4: complete */
        switch (status) {
            case "1":
                return 'New';
            case "2":
                return 'Approved';
            case "3":
                return 'Rejected';
            case "4":
                return 'Completed';
        }
    }

    const RenderItem = (item, index ) => (
        <TouchableOpacity>
            <Card style={[styles.cardBackground, {marginTop: index == 0 ? 20 : 0,height : 180}]}>
                <View style={styles.rowStyle}>
                    <View style ={styles.onePartContainer}>
                        <View style={[styles.columnStyle,{marginBottom : moderateScale(25)}]}>
                            <Text style = {styles.yearText}>{(item.user_date !== undefined) ? item.user_date.split(',')[1].trim() : ''}</Text>
                            {getFormattedDate(item.user_date)}
                            <Text style = {styles.statusText}>{getBookingStatus(item.user_status)}</Text>
                        </View>
                    </View>
                    <View style = {{width : 3,height : 180}}></View>
                    <View style ={styles.secondPartContainer}>
                        <View style={[styles.columnStyle,{paddingStart : moderateScale(12),marginEnd : moderateScale(4)}]}>
                            <View style = {{flexDirection : 'row'}}>
                                <Text style = {{fontSize : moderateScale(20),fontFamily: MAIN_FONT ? MAIN_FONT : ''}}>@</Text>
                                <Text style = {styles.timeText}>{tConvert(item.user_time)}</Text>
                            </View>
                            <Text style = {styles.addressText} numberOfLines = {3}>{item.user_address}</Text>
                            <View style={{borderWidth:0.6, borderStyle:'dashed', borderRadius:1,borderColor: colors.blackTitleFontColor,marginTop : moderateScale(10)}}></View>
                            <TouchableOpacity style = {styles.leaveView}>
                                <Text style = {styles.leavingText}>LEAVING</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </Card>
        </TouchableOpacity>
    );

    return (<View>
            {upcomingBookings.length > 0 ? 
            <FlatList
                    data={upcomingBookings}
                    renderItem={({item, index}) => RenderItem(item, index)}
                    keyExtractor={(item, index) => index.toString()}
            /> :
            <View style = {{justifyContent : 'center',alignItems : 'center',width : '100%',height : 600}}>
                <Text style = {[styles.noBookingsText,{marginBottom : Platform.OS === 'ios' ? 0 : 60}]}>No Bookings Yet</Text>
            </View> }
                    
            </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardBackground: {
        width: '90%',
        alignSelf: 'center',
        marginBottom: 18,
        backgroundColor: colors.Primary,
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 25,
        shadowColor: colors.shadowColor,
        shadowRadius: 0,
        shadowOpacity: 0,
        elevation: 0,
        borderColor: colors.shadowColor,
        borderWidth: 2,
    },
    rowStyle: {
        flexDirection: 'row',   
    },
    columnStyle: {
        flexDirection: 'column',
        width : '100%'
    },
    leaveView : {
        backgroundColor : '#b2b2b2',
        borderRadius : Platform.OS == 'ios' ? 4 : moderateScale(4),
        marginTop : moderateScale(10),
        padding  : Platform.OS === 'ios' ? moderateScale(5) : moderateScale(0),
        width : moderateScale(100),
    },
    leavingText : {
        color : colors.White,
        fontSize : moderateScale(14),
        fontFamily: MAIN_FONT ? MAIN_FONT : '',
        textAlign : 'center',
        marginBottom : Platform.OS === 'ios' ? moderateScale(0) : moderateScale(4),
    },
    onePartContainer : {
        width : '35%',
        height : 180,
        justifyContent : 'center',
        alignItems : 'center',
        paddingStart : 16,
        paddingBottom : 16,
        paddingTop : 16
    },
    secondPartContainer : {
        width : '65%',
        height : 180,
        justifyContent : 'center',
        alignItems : 'center',
        paddingEnd : 16,
        paddingBottom : 16,     
        paddingTop : 16,
        backgroundColor : colors.White,
        borderTopEndRadius : 25,
        borderBottomEndRadius: 25,
        borderColor: colors.shadowColor,
        borderWidth: 2
    },
    statusText : {
        color : colors.green,
        fontSize : moderateScale(16),
        fontFamily: MAIN_FONT ? MAIN_FONT : '',
        marginTop : Platform.OS == 'ios' ? 4 : 0
    },
    addressText : {
        color : colors.blackTitleFontColor,
        opacity : 0.7,
        fontSize : moderateScale(14),
        fontFamily: MAIN_FONT ? MAIN_FONT : '',
        marginTop : Platform.OS === 'ios' ? 4 : 0,
        lineHeight : 20,
        textAlign: 'justify',
    },
    timeText : {
        color : '#ff1d25',
        fontSize : moderateScale(20),
        fontFamily: MAIN_FONT ? MAIN_FONT : '',
        fontWeight : 'bold'
    },
    dateText : {
        color : colors.darkPurple,
        fontSize : moderateScale(22),
        fontFamily: MAIN_FONT ? MAIN_FONT : '',
        fontWeight : 'bold'
    },
    yearText : {
        color : colors.Black,
        fontSize : moderateScale(16),
        fontFamily: MAIN_FONT ? MAIN_FONT : ''
    },
    noBookingsText : {
        fontSize : moderateScale(14),
        fontFamily: MAIN_FONT ? MAIN_FONT : '',
        color : colors.Black,
        fontWeight : '200',
    } 
});