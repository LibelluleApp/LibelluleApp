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

const PaginationHeader = ({
  currentDay,
  onPrev,
  onNext,
  index,
  returnToday,
  defaultIndex,
  currentWeekNumber,
  evalCount,
  taskCount,
  totalTaskCount,
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
      marginBottom: 15,
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
      fontSize: 14,
      color: colors.grey,
    },
    textResponsableName: {
      fontFamily: "Ubuntu_500Medium",
      fontSize: 14,
      color: colors.grey,
      width: "49%",
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
      color: colors.black,
    },
    week: {
      fontSize: 14,
      fontFamily: "Ubuntu_400Regular",
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
      color: colors.blue_variable,
      fontFamily: "Ubuntu_500Medium",
      fontSize: 14,
    },
    progressTextPourcent: {
      color: colors.grey_variable,
      fontFamily: "Ubuntu_500Medium",
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

  return (
    <View style={styles.container}>
      <View style={styles.responsableContainer}>
        <Check stroke={colors.grey} strokeWidth={1.75} width={17} height={17} />
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
      <View style={styles.content}>
        {index > 0 && (
          <TouchableOpacity
            onPress={onPrev}
            style={styles.aroundLeft}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            <ArrowLeft
              stroke={colors.black}
              strokeWidth={1.75}
              width={20}
              height={20}
            />
          </TouchableOpacity>
        )}
        {index === 0 && (
          <TouchableOpacity
            disabled={true}
            style={styles.aroundLeft}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            <ArrowLeft
              stroke={colors.black}
              strokeWidth={1.75}
              width={20}
              height={20}
            />
          </TouchableOpacity>
        )}
        <View style={styles.dayWeekContainer}>
          <Text style={styles.day}>{currentDay}</Text>
          <Text style={styles.week}>Semaine {currentWeekNumber}</Text>
        </View>
        <View style={styles.arrowRightContainer}>
          {index !== defaultIndex && (
            <TouchableOpacity onPress={returnToday} style={styles.resetIcon}>
              <ResetList stroke={colors.grey_variable} strokeWidth={1.75} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={onNext}
            style={styles.aroundRight}
            hitSlop={{ top: 20, bottom: 20, right: 20 }}
          >
            <ArrowRight
              stroke={colors.black}
              strokeWidth={1.75}
              width={20}
              height={20}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.counts}>
        <View style={styles.progression}>
          {totalTaskCount >= 0 && (
            <Text style={styles.progressTextTask}>
              {taskCount}/{totalTaskCount}{" "}
              {totalTaskCount <= 1 ? "tâche" : "tâches"}
            </Text>
          )}
          <Text style={styles.progressTextPourcent}>{percentProgression}%</Text>
        </View>
        <Progress.Bar
          progress={progression}
          width={null}
          height={4}
          animated={true}
          unfilledColor={colors.grey}
          borderWidth={0}
          color={colors.blue_variable}
        />
      </View>
    </View>
  );
};

export default PaginationHeader;
