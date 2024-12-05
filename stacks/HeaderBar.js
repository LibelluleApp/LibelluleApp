import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeContext } from "../utils/themeContext";
import { useNavigation } from "@react-navigation/native";
import { Bell, SettingsWheel } from "../assets/icons/Icons";
import TouchableScale from "react-native-touchable-scale";

function NotificationBell() {
  const { colors } = useContext(ThemeContext);
  const navigation = useNavigation();
  return (
    <TouchableScale
      friction={6}
      activeScale={0.7}
      onPress={() => navigation.navigate("Notifications")}
    >
      <Bell stroke={colors.grey} strokeWidth={2} width={22} height={22} />
    </TouchableScale>
  );
}

const CustomHeader = ({ title }) => {
  const { colors } = useContext(ThemeContext);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation(); // Utilisation du hook de navigation

  return (
    <View
      style={{
        paddingTop: insets.top,
        backgroundColor: colors.background,
      }}
    >
      <View
        style={{
          height: 40,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 21,
        }}
      >
        <TouchableScale
          friction={6}
          activeScale={0.7}
          onPress={() => navigation.navigate("Settings")}
        >
          <SettingsWheel stroke={colors.grey} strokeWidth={1.75} />
        </TouchableScale>

        <Text
          style={{
            fontFamily: "Ubuntu_500Medium",
            letterSpacing: -0.4,
            fontSize: 18,
            color: colors.regular950,
          }}
        >
          {title}
        </Text>
        <NotificationBell />
      </View>
    </View>
  );
};

export default CustomHeader;
