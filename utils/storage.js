import AsyncStorage from '@react-native-async-storage/async-storage';
import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

export const hasMigratedFromAsyncStorage = storage.getBoolean(
    'hasMigratedFromAsyncStorage',
);

export async function migrateFromAsyncStorage() {
    console.log('Migrating from AsyncStorage -> MMKV...');
    const start = global.performance.now();

    const keys = await AsyncStorage.getAllKeys();

    for (const key of keys) {
        try {
            const value = await AsyncStorage.getItem(key);

            if (value != null) {
                if (['true', 'false'].includes(value)) {
                    storage.set(key, value === 'true');
                } else {
                    storage.set(key, value);
                }

                AsyncStorage.removeItem(key);
            }
        } catch (error) {
            console.error(
                `Failed to migrate key "${key}" from AsyncStorage to MMKV!`,
                error,
            );
            throw error;
        }
    }

    storage.set('hasMigratedFromAsyncStorage', true);

    const end = global.performance.now();
    console.log(`Migrated from AsyncStorage -> MMKV in ${end - start}ms!`);
}

export function getUserData(){
    const data = storage.getString('user_data');
    if(data){
        return JSON.parse(data);
    } else {
        return null;
    }

}
export function setUserData(userData){
    storage.set('user_data', userData);
}

export function setAlternant(data){
    storage.set('isAlternant', data);
}

export function getAlternant() {
    const data = storage.getBoolean('isAlternant');
    return data;
}

export function setWeekDefault(value){
    storage.set("week_default", value);
}
export function getWeekDefault() {
    const data = storage.getBoolean('week_default');
    return data;
}
export function setColorAlternant(value){
    storage.set('color_alternant', value);
}
export function getColorAlternant() {
    const data = storage.getString('color_alternant');
    return data;
}
export function setColorTimetable(value){
    storage.set('color_timetable', value);
}
export function getColorTimetable() {
    const data = storage.getString('color_timetable');
    return data;
}

export function setTheme(value){
    storage.set('theme', value);
}

export function getTheme(){
    const data = storage.getString('theme');
    return data;
}

export function setColors(value){
    storage.set('colors', value);
}
export function getColors(){
    const data = storage.getString('colors');
    return JSON.parse(data);
}

export function setIsFirstVisitAgenda(value){
    storage.set('isFirstVisitAgenda', value);
}
export function getIsFirstVisitAgenda() {
    const data = storage.getBoolean('isFirstVisitAgenda');
    return data;
}