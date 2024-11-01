import React, { useContext, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { ChevronRight, Check, ThumbsUp } from "../../../assets/icons/Icons";
import { useNavigation } from "@react-navigation/native";
import * as Progress from "react-native-progress";
import { ThemeContext } from "./../../../utils/themeContext";
import { checkAgenda, uncheckAgenda } from "../../../api/Agenda/check";
import * as Haptics from "expo-haptics";
import BouncyCheckbox from "react-native-bouncy-checkbox";

function Task({ data }) {
  const { colors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    containerTask: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: colors.white_background,
      borderRadius: 10,
      marginBottom: 15,
      paddingHorizontal: 17,
      paddingVertical: 12,
    },
    taskRight: {
      width: "15%",
      alignItems: "flex-end",
    },
    taskLeft: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 5,
      width: "85%",
    },
    taskLeftContent: {
      gap: 3,
    },
    taskTitle: {
      fontFamily: "Ubuntu_500Medium",
      letterSpacing: -0.4,
      fontSize: 16,
      color: colors.blue950,
    },
    taskContentDate: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      color: colors.blue950,
      fontSize: 13,
    },
    taskContentMore: {
      fontFamily: "Ubuntu_500Medium",
      letterSpacing: -0.4,
      color: colors.blue950,
      fontSize: 13,
    },
    taskDescription: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      color: colors.blue950,
    },
    strikethrough: {
      textDecorationLine: "line-through",
      color: colors.grey, // Optional: change color when striked through
    },
  });

  console.log(data);

  const navigation = useNavigation();
  const [isChecked, setIsChecked] = useState(estFait);
  const dates = moment(date).format("ddd D MMMM");
  const handleCheckboxPress = () => {
    setIsChecked(!isChecked);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    if (isChecked) {
      uncheckAgenda(agenda_id);
      if (typeof onTaskUncheck === "function") {
        onTaskUncheck(agenda_id);
      }
    } else {
      checkAgenda(agenda_id);
      if (typeof onTaskCheck === "function") {
        onTaskCheck(agenda_id);
      }
    }
  };

  // if (!data || (Array.isArray(data) && data.length === 0)) {
  //   return (
  //     <View style={styles.container}>
  //       <View
  //         style={[
  //           styles.topContainer,
  //           { backgroundColor: colors.green_variable, paddingHorizontal: 24 },
  //         ]}
  //       >
  //         <View style={styles.item}>
  //           <View style={styles.leftContainer}>
  //             <ThumbsUp
  //               stroke={colors.green900}
  //               width={20}
  //               height={20}
  //               strokeWidth={1.75}
  //             />
  //             <Text style={styles.taskTitleNone}>
  //               Aucune tâche de prévu pour le moment
  //             </Text>
  //           </View>
  //         </View>
  //       </View>
  //       <View
  //         style={[styles.bottomContainer, { backgroundColor: colors.green900 }]}
  //       >
  //         <View style={styles.progression}>
  //           <Text style={styles.progressText}>0/0 tâche</Text>
  //           <Text style={styles.progressText}>100%</Text>
  //         </View>
  //         <Progress.Bar
  //           progress={1}
  //           width={null}
  //           height={4}
  //           animated={false}
  //           unfilledColor="#345496"
  //           borderWidth={0}
  //           color="#fff"
  //         />
  //       </View>
  //     </View>
  //   );
  // } else if (progression === 1) {
  //   return (
  //     <View style={styles.container}>
  //       <View
  //         style={[
  //           styles.topContainer,
  //           { backgroundColor: colors.green_variable, paddingHorizontal: 24 },
  //         ]}
  //       >
  //         <View style={styles.item}>
  //           <View style={styles.leftContainer}>
  //             <Check
  //               stroke={colors.green900}
  //               width={20}
  //               height={20}
  //               strokeWidth={1.75}
  //             />
  //             <Text style={styles.taskTitleNone}>
  //               Bravo, toutes les tâches sont cochées
  //             </Text>
  //           </View>
  //         </View>
  //       </View>
  //       <View
  //         style={[styles.bottomContainer, { backgroundColor: colors.green900 }]}
  //       >
  //         <View style={styles.progression}>
  //           <Text style={styles.progressText}>
  //             {checkedTask.length}/{data.length}{" "}
  //             {data.length <= 1 ? "tâche" : "tâches"}
  //           </Text>
  //           <Text style={styles.progressText}>{percentProgression}%</Text>
  //         </View>
  //         <Progress.Bar
  //           progress={progression}
  //           width={null}
  //           height={4}
  //           animated={false}
  //           unfilledColor="#345496"
  //           borderWidth={0}
  //           color="#fff"
  //         />
  //       </View>
  //     </View>
  //   );
  // } else {
  //   return (
  //     <View>
  //       {data.map((item) => (
  //         <TouchableOpacity
  //           style={styles.containerTask}
  //           key={item.agenda_id}
  //           onPress={() => navigation.navigate("viewAgenda", { agenda_id })}
  //         >
  //           <View style={styles.taskLeft}>
  //             <BouncyCheckbox
  //               fillColor={colors.blue700}
  //               unfillColor={colors.white}
  //               isChecked={isChecked}
  //               onPress={handleCheckboxPress}
  //             />
  //             <View style={styles.taskLeftContent}>
  //               <Text
  //                 style={[styles.taskTitle, isChecked && styles.strikethrough]}
  //               >
  //                 {item.Ressource.nom_ressource}
  //               </Text>
  //               <Text
  //                 style={[
  //                   styles.taskDescription,
  //                   isChecked && styles.strikethrough,
  //                 ]}
  //               >
  //                 {item.titre}
  //               </Text>
  //             </View>
  //           </View>
  //           <View style={styles.taskRight}>
  //             <ChevronRight
  //               stroke={colors.blue950}
  //               strokeWidth={1.75}
  //               width={18}
  //               height={18}
  //             />
  //           </View>
  //         </TouchableOpacity>
  //       ))}
  //     </View>
  //   );
  // }
}

export default Task;
