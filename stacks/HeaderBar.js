import React, { useContext } from "react";
import {View, Text, TouchableOpacity} from "react-native";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import { getHeaderTitle } from '@react-navigation/elements';
import LogoTitle from "../components/logo";
import { ThemeContext } from "../utils/themeContext";
import {useNavigation, useRoute} from "@react-navigation/native";
import {Bell, SettingsWheel} from "../assets/icons/Icons";
function NotificationBell() {
    const { colors } = useContext(ThemeContext);
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("Notifications")}
        >
            <Bell stroke={colors.grey} strokeWidth={2} width={22} height={22} />
        </TouchableOpacity>
    );
}

const CustomHeader = ({title}) => {
    const { colors } = useContext(ThemeContext);
    const insets = useSafeAreaInsets();
    return (
        <View style={{
            paddingTop: insets.top,
            backgroundColor: colors.background
        }}>
            <View style={{
                height: 40,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 21,

            }}>
                <SettingsWheel stroke={colors.grey}/>
                <Text style={{
                    fontFamily: "Ubuntu_500Medium",
                    fontSize: 18,
                    color: colors.blue950,
                }}>
                    {title}
                </Text>
                <NotificationBell />
            </View>
        </View>

    );
};

export default CustomHeader;
