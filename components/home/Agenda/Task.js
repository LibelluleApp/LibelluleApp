import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { LeftArrow } from "../../../assets/icons/Icons";
import { useNavigation } from "@react-navigation/native";
import * as Progress from "react-native-progress";

function Task({ data }) {
  const checkedTask = data.filter((item) => item.estFait === 1);
  const navigation = useNavigation();
  const progression = checkedTask.length / data.length;
  const percentProgression = Math.round(progression * 100);

  if (!data || (Array.isArray(data) && data.length === 0)) {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <TouchableOpacity>
            <View style={styles.item}>
              <View style={styles.leftContainer}>
                <Text style={styles.taskTitle}>
                  Aucune tâche de prévu pour le moment
                </Text>
              </View>
            </View>
          </TouchableOpacity>
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
                <LeftArrow fill="#fff" />
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
            color="#fff"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
    flexDirection: "column",
  },
  topContainer: {
    width: "100%",
    paddingVertical: 18,
    paddingHorizontal: 18,
    flexDirection: "column",
    gap: 11,
    backgroundColor: "#0760FB",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomContainer: {
    width: "100%",
    paddingVertical: 11,
    paddingHorizontal: 20,
    backgroundColor: "#0F4199",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    gap: 5,
  },
  progressText: {
    color: "#fff",
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
    fontSize: 15,
    color: "#fff",
  },
  taskDesc: {
    fontFamily: "Ubuntu_400Regular",
    fontSize: 13,
    color: "#fff",
  },
});

export default Task;
