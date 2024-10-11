import React, { useContext, useEffect, useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Jour from "../components/timetable/jour";
import Semaine from "../components/timetable/semaine";
import { ThemeContext } from "../utils/themeContext";
import { useIsFocused } from "@react-navigation/native";
import Dropdown from "../components/dropdown/Dropdown";
import { ResetList } from "../assets/icons/Icons";
import { getWeekDefault as getWeek } from "../utils/storage"; // MMKV

const Tab = createMaterialTopTabNavigator();

const fetchWeekDefault = () => {
  try {
    const value = getWeek(); // Pas de besoin d'async ici car MMKV est synchrone
    return value;
  } catch (error) {
    console.error("Impossible de récupérer la vue semaine par défaut", error);
    return false;
  }
};

function Timetable() {
  const { colors } = useContext(ThemeContext);
  const [selectedView, setSelectedView] = useState("day"); // Par défaut à "day"
  const [options, setOptions] = useState([]);
  const isFocused = useIsFocused();
  const semaineRef = useRef(null);
  const jourRef = useRef(null);

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
    const updateWeekDefault = () => {
      const isWeekDefault = fetchWeekDefault();
      if (isWeekDefault) {
        setSelectedView("week");
      } else {
        setSelectedView("day");
      }
      setOptions([
        { label: "Vue journée", value: "day" },
        { label: "Vue semaine", value: "week" },
      ]);
    };

    if (isFocused) {
      updateWeekDefault();
    }
  }, [isFocused]);

  const handleSelect = (value) => {
    setSelectedView(value);
  };

  const handleGoToToday = () => {
    if (semaineRef.current && selectedView === "week") {
      semaineRef.current.goToToday();
    }
    if (jourRef.current && selectedView === "day") {
      jourRef.current.goToToday();
    }
  };

  return (
      <View style={styles.modalBackground}>
        <View style={styles.modalDropdown}>
          <Dropdown options={options} onSelect={handleSelect} value={selectedView} />
          <TouchableOpacity onPress={handleGoToToday}>
            <ResetList stroke={colors.blue800} />
          </TouchableOpacity>
        </View>
        {selectedView === "day" && <Jour ref={jourRef} />}
        {selectedView === "week" && <Semaine ref={semaineRef} />}
      </View>
  );
}

export default Timetable;
