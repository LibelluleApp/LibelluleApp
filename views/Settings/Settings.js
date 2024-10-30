import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Switch,
} from "react-native";
import { ThemeContext } from "./../../utils/themeContext";
import { useNavigation } from "@react-navigation/native";
import { Calendar, ChevronRight } from "./../../assets/icons/Icons";
import { getAlternant, getUserData, setAlternant } from "../../utils/storage";

function Settings() {
  const { isDarkMode, toggleTheme, colors } = useContext(ThemeContext);
  const [isAlternant, setIsAlternant] = useState(false);
  const [userDatas, setUserDatas] = useState({});

  const navigation = useNavigation();

  const styles = StyleSheet.create({
    background: {
      flex: 1,
      alignItems: "center",
      backgroundColor: colors.background,
    },
    container: {
      flexDirection: "column",
      gap: 20,
      width: "90%",
      marginTop: 20,
    },
    profileSwitcher: {
      paddingHorizontal: 20,
      width: "100%",
      marginVertical: 12,
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
      fontSize: 15,
      color: colors.blue950,
    },
    profileBtnUnderText: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 13,
      color: colors.grey,
    },
    CTAContent: {
      flexDirection: "row",
      alignItems: "center",
      gap: 15,
    },
  });

  useEffect(() => {
    const getData = () => {
      try {
        const value = getUserData();
        setUserDatas(value);
      } catch (error) {
        console.error("Error fetching user data:", error);
        return {};
      }
    };

    const getIsAlternant = () => {
      try {
        const value = getAlternant();
        setIsAlternant(value);
      } catch (error) {
        console.error("Error fetching alternant status:", error);
      }
    };

    getData();
    getIsAlternant();
  }, []);

  const handleAlternant = () => {
    const newAlternantStatus = !isAlternant;
    setIsAlternant(newAlternantStatus);
    try {
      setAlternant(newAlternantStatus);
    } catch (error) {
      console.error("Error setting alternant mode:", error);
    }
  };

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
        {userDatas.groupe_id?.includes("Y3UI") && (
          <View style={styles.switcherContent}>
            <Text style={styles.profileBtnSwitch}>Mode alternant</Text>
            <Switch
              trackColor={{
                false: colors.grey,
                true: colors.blue700,
              }}
              thumbColor={isAlternant ? colors.white : colors.white}
              onValueChange={handleAlternant}
              value={isAlternant}
            />
          </View>
        )}
        <TouchableOpacity
          style={[styles.profileButton]}
          onPress={() => navigation.navigate("TimetableSettings")}
        >
          <View style={styles.CTAContent}>
            <Calendar
              stroke={colors.blue950}
              strokeWidth={1.75}
              width={18}
              height={18}
            />
            <Text style={styles.profileBtnText}>Emploi du temps</Text>
          </View>
          <ChevronRight
            stroke={colors.blue950}
            strokeWidth={1.75}
            width={18}
            height={18}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Settings;
