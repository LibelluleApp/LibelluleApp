import { Tabs } from 'expo-router';
import React, { useContext } from "react";
import { ThemeContext } from "../../../utils/themeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import {Bell, Calendar, Check, Envelope, Home, User} from "../../../assets/icons/Icons";
import LogoTitle from "../../../components/logo";

function NotificationBell() {
    const { colors } = useContext(ThemeContext);
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={{ paddingRight: 10 }}
            onPress={() => navigation.navigate('Notifications')}
        >
            <Bell stroke={colors.grey} strokeWidth={1.75} width={22} height={22} />
        </TouchableOpacity>
    );
}

export default function TabLayout() {
    const { colors } = useContext(ThemeContext);
    const insets = useSafeAreaInsets();

    const getIcon = (Icon, focused) => {
        const fillColor = focused ? colors.blue_variable : colors.grey;
        return <Icon stroke={fillColor} />;
    };

    const baseHeaderOptions = {
        tabBarShowLabel: true,
        headerShown: true,
        tabBarStyle: {
            paddingHorizontal: 8,
            backgroundColor: colors.white_background,
            borderTopWidth: 0,
            height: insets.bottom > 30 ? 90 : 75,
        },
        headerStyle: {
            backgroundColor: colors.background,
            elevation: 0,
            shadowColor: colors.background,
        },
        headerTitleStyle: {
            fontFamily: "Ubuntu_500Medium",
            fontSize: 18,
            color: colors.black,
            allowFontScaling: false,
        },
        headerTitleAlign: "center",
        headerLeftContainerStyle: {
            paddingLeft: 17,
        },
        headerRightContainerStyle: {
            paddingRight: 17,
        },
        tabBarLabelStyle: {
            bottom: 12,
            fontFamily: "Ubuntu_500Medium",
            fontSize: 11,
        },
        lazy: false,
        tabBarActiveTintColor: colors.blue_variable,
        tabBarInactiveTintColor: colors.grey,
        headerRight: () => <NotificationBell />,
    };

    return (
        <Tabs>
            <Tabs.Screen
                name="home"
                options={{
                    tabBarLabel: "Accueil",
                    tabBarIcon: ({ focused }) => getIcon(Home, focused),
                    headerLeft: () => <LogoTitle />,
                    title: "Vue d'ensemble",
                    ...baseHeaderOptions,
                }}
            />
            <Tabs.Screen
                name="timetable"
                options={{
                    tabBarLabel: "Cours",
                    tabBarIcon: ({ focused }) => getIcon(Calendar, focused),
                    headerLeft: () => <LogoTitle />,
                    title: "Emploi du temps",
                    ...baseHeaderOptions,}}
            />
            <Tabs.Screen
                name="agenda"
                options={{
                    tabBarLabel: "Agenda",
                    tabBarIcon: ({ focused }) => getIcon(Check, focused),
                    headerLeft: () => <LogoTitle />,
                    title: "Agenda",
                    ...baseHeaderOptions,}}
            />
            <Tabs.Screen
                name="mails"
                options={{
                    tabBarLabel: "Mails",
                    tabBarIcon: ({ focused }) => getIcon(Envelope, focused),
                    headerLeft: () => <LogoTitle />,
                    title: "Boîte mails",
                    ...baseHeaderOptions,}}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarLabel: "Profil",
                    tabBarIcon: ({ focused }) => getIcon(User, focused),
                    headerLeft: () => <LogoTitle />,
                    title: "Profil",
                    ...baseHeaderOptions,}}
            />
        </Tabs>
    );
}
