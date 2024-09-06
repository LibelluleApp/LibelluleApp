import React, { useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { ChevronRight } from "../../../assets/icons/Icons";
import { useNavigation } from "@react-navigation/native";
import * as Progress from "react-native-progress";
import { ThemeContext } from "./../../../utils/themeContext";

function Task({ data }) {
  const { colors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      marginTop: 10,
      alignItems: "center",
      flexDirection: "column",
    },
    topContainer: {
      width: "100%",
      paddingVertical: 18,
      paddingHorizontal: 18,
      flexDirection: "column",
      gap: 11,
      backgroundColor: colors.blue700,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    bottomContainer: {
      width: "100%",
      paddingVertical: 11,
      paddingHorizontal: 20,
      backgroundColor: colors.blue900,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      gap: 5,
    },
    progressText: {
      color: colors.white,
      fontFamily: "Ubuntu_500Medium",
      fontSize: 11,
    },
    progression: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    item: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    taskTitle: {
      fontFamily: "Ubuntu_500Medium",
      fontSize: 14,
      color: colors.white,
    },
    taskDesc: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 13,
      color: colors.white,
    },
    leftContainer: {
      width: "85%",
    },
    rightContainer: {
      width: "15%",
      alignItems: "flex-end",
    },
  });

  const checkedTask = data.filter((item) => item.estFait === 1);
  const navigation = useNavigation();
  const progression = checkedTask.length / data.length;
  const percentProgression = Math.round(progression * 100);

  if (!data || (Array.isArray(data) && data.length === 0)) {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.item}>
            <View style={styles.leftContainer}>
              <Text style={styles.taskTitle}>
                Aucune tâche de prévu pour le moment
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.progression}>
            <Text style={styles.progressText}>0/0 tâche</Text>
            <Text style={styles.progressText}>100%</Text>
          </View>
          <Progress.Bar
            progress={1}
            width={null}
            height={4}
            animated={false}
            unfilledColor="#345496"
            borderWidth={0}
            color="#fff"
          />
        </View>
      </View>
    );
  } else if (progression === 1) {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.item}>
            <View style={styles.leftContainer}>
              <Text style={styles.taskTitle}>
                Bravo, vous avez terminé toutes vos tâches
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.progression}>
            <Text style={styles.progressText}>
              {checkedTask.length}/{data.length} tâches
            </Text>
            <Text style={styles.progressText}>{percentProgression}%</Text>
          </View>
          <Progress.Bar
            progress={progression}
            width={null}
            height={4}
            animated={false}
            unfilledColor="#345496"
            borderWidth={0}
            color="#fff"
          />
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          {data.map((item) => (
            <TouchableOpacity
              key={item.agenda_id}
              onPress={() => navigation.navigate("viewAgenda", item)}
            >
              <View style={styles.item}>
                <View style={styles.leftContainer}>
                  <Text style={styles.taskTitle}>
                    {item.Ressource.nom_ressource}
                  </Text>
                  <Text style={styles.taskDesc}>{item.titre}</Text>
                </View>
                <View style={styles.rightContainer}>
                  <ChevronRight
                    stroke={colors.white}
                    strokeWidth={1.75}
                    width={18}
                    height={18}
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.progression}>
            <Text style={styles.progressText}>
              {checkedTask.length}/{data.length} tâches
            </Text>
            <Text style={styles.progressText}>{percentProgression}%</Text>
          </View>
          <Progress.Bar
            progress={progression}
            width={null}
            height={4}
            animated={false}
            unfilledColor="#345496"
            borderWidth={0}
            color={colors.white}
          />
        </View>
      </View>
    );
  }
}

export default Task;
