/*
Async Storage
 * */
"use strict";

import AsyncStorage from '@react-native-community/async-storage';

export let keys = {
    USER_ID : "user_id",
    TOKEN: "token_id",
    USER_NAME: "user_name",
    USER_EMAIL: "user_email",
    USER_PIC: "user_pic",
    APPROVED_ACCOUNT: "approved_account",
}
// module.exports = keys;

export async function setValue(key,value){
    try {
        return await AsyncStorage.setItem(key,value+"");
    } catch (e) {
        return ''
    }
}
export async function getValue(key){
    try {
        return await AsyncStorage.getItem(key);
    } catch (e) {
        alert('Failed to fetch the data from storage')
  }
}
/*export async function setValue(key, value){
    return new Promise((resolve, reject) => {
        await AsyncStorage.setItem(key, value)
    });
}*/