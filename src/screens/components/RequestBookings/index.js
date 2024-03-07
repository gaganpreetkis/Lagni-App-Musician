import React from 'react';;
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { moderateScale } from '../../../helpers/ResponsiveFonts';
import SafeAreaView from "../../common/SafeView";

import { FlatList } from 'react-native-gesture-handler';
import { Card } from 'react-native-shadow-cards';
import colors from '../../../constant/colors';
import { useNavigation } from '@react-navigation/native';

export default function RequestBookings(props) {
    // const params = props.route.params;
    // const navigation = props.propss.navigation;
    // console.log(JSON.stringify(props.propss));
    //console.log(JSON.stringify(navigation) + " --- " );
    const navigation = useNavigation();

    function navigateToEventDetail() {
        navigation.navigate('EventDetail');
    }

    const DATA = [
        {
            id: '1',
            name: 'Jack Stone',
            performanceHours: '3',
            location: 'Miyako Hibachi & Sushi Bar, 1403 St Charles Ave, New Orleans, LA 70130, United States',
            genre: 'Jazz',
            area: '1200',
            performanceDate: '02 Feb 2021',
            performanceTime: '07:00 PM',
            venue: 'Indoor',
            arrivalTime: '06:00PM'
        },
        {
            id: '2',
            name: 'Oliver Queen',
            performanceHours: '1',
            location: 'GW Fins, 808 Bienville St, New Orleans, LA 70112, United States',
            genre: 'Brass',
            area: '600',
            performanceDate: '01 Feb 2021',
            performanceTime: '02:30 PM',
            venue: 'Indoor',
            arrivalTime: '01:30PM'
        },
    ];

    const RenderItem = (item, index) => (
        <TouchableOpacity onPress={() => { navigateToEventDetail() }}>
            <Card style={[styles.cardBackground, { marginTop: index == 0 ? 20 : 0 }]}>
                <View style={styles.columnStyle}>
                    <View style={styles.rowStyle}>
                        <Text style={[styles.title, styles.fiftyPercent]}><Text style={styles.textBold}>Name: </Text>{item.name}</Text>
                        <Text style={styles.title}><Text style={styles.textBold}>Performance Hours: </Text>{item.performanceHours}</Text>
                    </View>
                    <View style={styles.rowStyle}>
                        <Text style={[styles.title, styles.fiftyPercent]}><Text style={styles.textBold}>Genre: </Text>{item.genre}</Text>
                        <Text style={styles.title}><Text style={styles.textBold}>Total Area: </Text>{item.area} sq. ft.</Text>
                    </View>
                    <View style={styles.rowStyle}>
                        <Text style={[styles.title, styles.fiftyPercent]}><Text style={styles.textBold}>Venue: </Text>{item.venue}</Text>
                        <Text style={styles.title}><Text style={styles.textBold}>Arrival Time: </Text>{item.arrivalTime}</Text>
                    </View>
                    <Text style={styles.title}><Text style={styles.textBold}>Date & Time: </Text>{item.performanceDate} - {item.performanceTime}</Text>
                    <Text style={styles.title}><Text style={styles.textBold}>Location: </Text>{item.location}</Text>
                </View>
            </Card>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* <FlatList
                data={DATA}
                renderItem={({ item, index }) => RenderItem(item, index)}
                keyExtractor={item => item.id}
            /> */}
            <View style = {{justifyContent : 'center',alignItems : 'center',width : '100%',height : 600}}>
                <Text style = {[styles.noBookingsText,{marginBottom : Platform.OS === 'ios' ? 0 : 60}]}>Bookings will appear here</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardBackground: {
        padding: 16,
        width: '95%',
        alignSelf: 'center',
        marginBottom: 20,
        backgroundColor: colors.White,
    },
    rowStyle: {
        flexDirection: 'row',
    },
    columnStyle: {
        flexDirection: 'column',
    },
    fiftyPercent: {
        width: '48%',
    },
    title: {
        fontSize: 14,
        marginBottom: 10,
        lineHeight: 20,
    },
    textBold: {
        fontWeight: 'bold',
    },
});