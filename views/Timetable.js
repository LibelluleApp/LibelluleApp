import React, { useContext, useEffect, useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Jour from "../components/timetable/jour";
import Semaine from "../components/timetable/semaine";
import { ThemeContext } from "../utils/themeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import Dropdown from "../components/dropdown/Dropdown";
import { ResetList } from "../assets/icons/Icons";

const Tab = createMaterialTopTabNavigator();

function Timetable() {
  const { colors } = useContext(ThemeContext);
  const [isWeekDefault, setIsWeekDefault] = useState(false);
  const [selectedView, setSelectedView] = useState("day"); // Par défaut à "day"
  const isFocused = useIsFocused();
  const [scrollToDateFunc, setScrollToDateFunc] = useState(null);

  const options = [
    { label: "Vue journée", value: "day" },
    { label: "Vue semaine", value: "week" },
  ];

  const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      backgroundColor: colors.background,
    },
    modalDropdown: {
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
      width: "90%",
      alignSelf: "center",
      paddingVertical: 10,
      zIndex: 999,
    },
  });

  useEffect(() => {
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

    if (isFocused) {
      getWeekDefault().then(setIsWeekDefault);
    }
  }, [isFocused]);

  const handleSelect = (value) => {
    setSelectedView(value); // Met à jour la vue sélectionnée
  };

  const handleScrollToDate = () => {
    if (scrollToDateFunc) {
      scrollToDateFunc(); // Appelle la fonction scrollToDate dans l'enfant
    } else {
      console.log("La fonction scrollToDate n'est pas définie");
    }
  };

  return (
    <View style={styles.modalBackground}>
      <View style={styles.modalDropdown}>
        <Dropdown options={options} onSelect={handleSelect} />
        <TouchableOpacity onPress={handleScrollToDate}>
          <ResetList stroke={colors.blue800} />
        </TouchableOpacity>
      </View>
      {selectedView === "day" && <Jour />}
      {selectedView === "week" && <Semaine />}
    </View>
  );
}

export default Timetable;
