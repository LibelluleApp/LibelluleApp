import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  ArrowLeft,
  ArrowRight,
  ResetList,
  Student,
  Check,
} from "../../assets/icons/Icons";
import { ThemeContext } from "./../../utils/themeContext";
import * as Progress from "react-native-progress";
import whoIsChief from "../../api/Agenda/chef";
import Dropdown from "./../dropdown/Dropdown";
import TouchableScale from "react-native-touchable-scale";

const PaginationHeader = ({
  currentDate,
  onPrev,
  onNext,
  index,
  returnToday,
  defaultIndex,
  currentWeekNumber,
  evalCount,
  taskCount,
  totalTaskCount,
  onSelect,
  value,
  options,
  setReturnToday,
}) => {
  const [chef, setChef] = React.useState({});
  const { colors } = useContext(ThemeContext);
  let progression = 1;
  let percentProgression = 100;
  taskCount = totalTaskCount - taskCount;

  if (totalTaskCount === 0) {
    progression = 1;
  } else {
    progression = taskCount / totalTaskCount;
    percentProgression = Math.round(progression * 100);
  }

  const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      width: "100%",
    },
    responsableContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
      width: "90%",
      marginHorizontal: "auto",
    },
    textResponsableContent: {
      flexDirection: "row",
    },
    textResponsable: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 14,
      color: colors.regular800,
    },
    textResponsableName: {
      fontFamily: "Ubuntu_500Medium",
      letterSpacing: -0.4,
      fontSize: 14,
      color: colors.regular800,
      width: "49%",
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
    content: {
      marginTop: 15,
      flexDirection: "row",
      justifyContent: "space-between",
      width: "90%",
      marginHorizontal: "auto",
      alignItems: "center",
    },
    dayWeekContainer: {
      flexDirection: "column",
      alignItems: "center",
    },
    day: {
      fontSize: 16,
      fontFamily: "Ubuntu_500Medium",
      letterSpacing: -0.4,
      color: colors.regular950,
    },
    week: {
      fontSize: 14,
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      color: colors.grey,
    },
    arrowRightContainer: {
      flexDirection: "row",
      position: "relative",
    },
    resetIcon: {
      position: "absolute",
      right: 30,
      padding: 10,
    },
    aroundRight: {
      paddingLeft: 20,
      paddingBottom: 20,
      paddingTop: 15,
    },
    aroundLeft: {
      paddingRight: 20,
      paddingBottom: 20,
      paddingTop: 15,
    },
    counts: {
      width: "100%",
      paddingHorizontal: 20,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      gap: 5,
    },
    progressTextTask: {
      color: colors.regular700,
      fontFamily: "Ubuntu_500Medium",
      letterSpacing: -0.4,
      fontSize: 14,
    },
    progressTextPourcent: {
      color: colors.grey,
      fontFamily: "Ubuntu_500Medium",
      letterSpacing: -0.4,
      fontSize: 14,
    },
    progression: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
  });

  useEffect(() => {
    whoIsChief().then((res) => {
      setChef(res);
    });
  }, []);

  // Fonction pour gérer le retour à aujourd'hui
  const handleReturnToday = () => {
    setReturnToday(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.responsableContainer}>
        <Check
          stroke={colors.regular800}
          strokeWidth={1.75}
          width={17}
          height={17}
        />
        <View style={styles.textResponsableContent}>
          <Text style={styles.textResponsable}>Responsable de l'agenda : </Text>
          <Text
            style={styles.textResponsableName}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {chef.prenom + " " + chef.nom || "N/C"}
          </Text>
        </View>
      </View>
      <View style={styles.modalDropdown}>
        <Dropdown
          options={options}
          onSelect={onSelect}
          value={value}
          number={3}
        />
        {index !== defaultIndex && (
          <TouchableScale
            friction={6}
            activeScale={0.7}
            onPress={handleReturnToday}
          >
            <ResetList stroke={colors.regular800} />
          </TouchableScale>
        )}
      </View>
    </View>
  );
};

export default PaginationHeader;
