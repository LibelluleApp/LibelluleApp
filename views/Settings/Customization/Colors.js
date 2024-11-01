import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Switch,
} from "react-native";
import { ThemeContext } from "./../../../utils/themeContext";
import { useNavigation } from "@react-navigation/native";
import { Calendar, ChevronRight } from "./../../../assets/icons/Icons";
import {
  getAlternant,
  getUserData,
  setAlternant,
} from "../../../utils/storage";

function Colors() {
  const { isDarkMode, toggleTheme, colors } = useContext(ThemeContext);
  const [userDatas, setUserDatas] = useState({});
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flexDirection: "column",
      gap: 20,
      width: "90%",
      marginHorizontal: "auto",
      marginTop: 20,
    },
    profileSwitcher: {
      paddingHorizontal: 20,
      width: "100%",
      paddingVertical: 12,
    },
    switcherToggle: {
      flexDirection: "column",
      gap: Platform.OS === "ios" ? 10 : 0,
    },
    switcherContent: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    profileBtnSwitch: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 16,
      color: colors.blue950,
    },
    profileButton: {
      backgroundColor: colors.white_background,
      paddingVertical: 17,
      paddingHorizontal: 20,
      borderRadius: 10,
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    profileBtnText: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 15,
      color: colors.blue950,
    },
    profileBtnUnderText: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 13,
      color: colors.grey,
    },
    CTAContent: {
      flexDirection: "row",
      alignItems: "center",
      gap: 15,
    },
  });

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View style={styles.switcherContent}>
          <Text style={styles.profileBtnSwitch}>Mode sombre</Text>
          <Switch
            trackColor={{
              false: colors.grey,
              true: colors.blue700,
            }}
            thumbColor={isDarkMode ? colors.white : colors.white}
            onValueChange={toggleTheme}
            value={isDarkMode}
          />
        </View>
      </View>
    </View>
  );
}

export default Colors;
