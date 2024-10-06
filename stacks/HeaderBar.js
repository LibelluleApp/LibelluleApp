import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as DropdownMenu from 'zeego/dropdown-menu';
import { ThemeContext } from "../utils/themeContext";
import { useNavigation } from "@react-navigation/native";
import { Bell, SettingsWheel } from "../assets/icons/Icons";

function NotificationBell() {
    const { colors } = useContext(ThemeContext);
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
            <Bell stroke={colors.grey} strokeWidth={2} width={22} height={22} />
        </TouchableOpacity>
    );
}

const CustomHeader = ({ title }) => {
    const { colors } = useContext(ThemeContext);
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();  // Utilisation du hook de navigation

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
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                        <TouchableOpacity>
                            <SettingsWheel stroke={colors.grey} />
                        </TouchableOpacity>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                        <DropdownMenu.Item
                            key="profile"
                            onSelect={() => navigation.navigate("Profile")}>
                            <DropdownMenu.ItemTitle>
                                Voir mon profil
                            </DropdownMenu.ItemTitle>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item
                            key="settings"
                            onSelect={() => navigation.navigate("Profile")}>
                            <DropdownMenu.ItemTitle>
                                Accéder aux paramètres
                            </DropdownMenu.ItemTitle>
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>

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
