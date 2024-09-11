import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Platform,
} from "react-native";
import { ThemeContext } from "./../../../utils/themeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

function TimetableSettings() {
  const { isDarkMode, toggleTheme, colors } = React.useContext(ThemeContext);
  const [isWeekDefault, setIsWeekDefault] = React.useState(false);
  const [isRandomColor, setIsRandomColor] = React.useState(false);

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
  });

  React.useEffect(() => {
    const getWeekDefault = async () => {
      try {
        const value = await AsyncStorage.getItem("week_default");
        return value ? JSON.parse(value) : false;
      } catch (error) {
        console.error(
          "Impossible de récupérer la vue semaine par défaut",
          error
        );
        return false;
      }
    };
    getWeekDefault().then((value) => {
      setIsWeekDefault(value);
    });
  }, []);

  const handleWeekDefault = async () => {
    const weekDefault = !isWeekDefault;
    setIsWeekDefault(weekDefault);
    try {
      await AsyncStorage.setItem("week_default", JSON.stringify(weekDefault));
    } catch (error) {
      console.error("Impossible de mettre la vue semaine par défaut", error);
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View style={styles.switcherContent}>
          <Text style={styles.profileBtnSwitch}>Vue semaine par défaut</Text>
          <Switch
            trackColor={{
              false: colors.grey,
              true: colors.blue_variable,
            }}
            thumbColor={isDarkMode ? colors.white : colors.white}
            onValueChange={handleWeekDefault}
            value={isWeekDefault}
          />
        </View>
        <View style={styles.switcherContent}>
          <Text style={styles.profileBtnSwitch}>
            Couleurs aléatoire des évènements
          </Text>
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
      </View>
    </View>
  );
}

export default TimetableSettings;
