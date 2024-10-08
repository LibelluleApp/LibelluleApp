import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Switch,
} from "react-native";
import { ThemeContext } from "./../../utils/themeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Calendar, ChevronRight } from "./../../assets/icons/Icons";

function Settings() {
  const { isDarkMode, toggleTheme, colors } = React.useContext(ThemeContext);
  const [isEnabled, setIsEnabled] = React.useState(false);
  const [isAlternant, setIsAlternant] = React.useState(false);
  const [userDatas, setUserDatas] = React.useState({});

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
      color: colors.black,
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
      color: colors.black,
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

  React.useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("user_data");
        return value ? JSON.parse(value) : {};
      } catch (error) {
        console.error("Error fetching user data:", error);
        return {};
      }
    };

    const getIsAlternant = async () => {
      try {
        const value = await AsyncStorage.getItem("isAlternant");
        setIsAlternant(value === "true");
      } catch (error) {
        console.error("Error fetching alternant status:", error);
      }
    };

    getData().then((data) => setUserDatas(data));
    getIsAlternant();
  }, []);

  const handleAlternant = async () => {
    const newAlternantStatus = !isAlternant;
    setIsAlternant(newAlternantStatus);
    try {
      await AsyncStorage.setItem(
        "isAlternant",
        JSON.stringify(newAlternantStatus)
      );
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
              true: colors.blue_variable,
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
                true: colors.blue_variable,
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
              stroke={colors.black}
              strokeWidth={1.75}
              width={18}
              height={18}
            />
            <Text style={styles.profileBtnText}>Emploi du temps</Text>
          </View>
          <ChevronRight
            stroke={colors.black}
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
