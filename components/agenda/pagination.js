import React, { useContext } from "react";
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
}) => {
  const { colors } = useContext(ThemeContext);

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
      fontSize: 14,
      color: colors.grey,
    },
    textResponsableName: {
      fontFamily: "Ubuntu_500Medium",
      fontSize: 14,
      color: colors.grey,
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
      paddingVertical: 5,
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
    // evalCount: {
    //   flexDirection: "row",
    //   justifyContent: "center",
    //   borderColor: colors.red_variable,
    //   borderWidth: 1,
    //   paddingVertical: 7,
    //   borderRadius: 10,
    //   width: "51%",
    // },
    // taskCount: {
    //   flexDirection: "row",
    //   justifyContent: "center",
    //   borderColor: colors.blue_variable,
    //   borderWidth: 1,
    //   borderRadius: 10,
    //   paddingVertical: 7,
    //   width: "45%",
    // },
    // evalText: {
    //   fontFamily: "Ubuntu_400Regular",
    //   fontSize: 15,
    //   color: colors.red_variable,
    // },
    // taskText: {
    //   fontFamily: "Ubuntu_400Regular",
    //   fontSize: 15,
    //   color: colors.blue_variable,
    // },
  });

  // const checkedTask = taskCount.filter((item) => item.estFait === 1);
  // const navigation = useNavigation();
  // const progression = checkedTask.length / data.length;
  // const percentProgression = Math.round(progression * 100);

  return (
    <View style={styles.container}>
      {/* <View style={styles.recap}>
        <Text style={styles.week}>Semaine {currentWeekNumber}</Text>
        {index !== defaultIndex && (
          <TouchableOpacity
            onPress={returnToday}
            style={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 10 }}
          >
            <ResetList stroke={colors.grey_variable} strokeWidth={1.75} />
          </TouchableOpacity>
        )}
        {index === defaultIndex && (
          <TouchableOpacity
            onPress={returnToday}
            style={{
              opacity: 0,
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 10,
            }}
            disabled={true}
          >
            <ResetList stroke={colors.grey_variable} strokeWidth={1.75} />
          </TouchableOpacity>
        )}
      </View> */}
      <View style={styles.responsableContainer}>
        <Check stroke={colors.grey} strokeWidth={1.75} width={17} height={17} />
        <View style={styles.textResponsableContent}>
          <Text style={styles.textResponsable}>Responsable de l'agenda : </Text>
          <Text style={styles.textResponsableName}>
            {/* {chef.nom + " " + chef.prenom || "N/C"} */}
            Amitou Lucas
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
          <Text style={styles.progressTextTask}>
            {/* {checkedTask.length}/{taskCount.length} tâches */}
            3/3 tâches
          </Text>
          <Text style={styles.progressTextPourcent}>
            {/* {percentProgression}% */}
            100%
          </Text>
        </View>
        <Progress.Bar
          // progress={progression}
          progress={0.5}
          width={null}
          height={4}
          animated={true}
          unfilledColor={colors.grey}
          borderWidth={0}
          color={colors.blue_variable}
        />
        {/* <View style={styles.evalCount}>
          <Text style={styles.evalText}>
            {evalCount} évaluation{evalCount > 1 ? "s prévues" : " prévue"}
          </Text>
        </View>
        <View style={styles.taskCount}>
          <Text style={styles.taskText}>
            {taskCount} tâche{taskCount > 1 ? "s restantes" : " restante"}
          </Text>
        </View> */}
      </View>
    </View>
  );
};

export default PaginationHeader;
