import React, { useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { CircleAlert, BigPouce } from "../../../assets/icons/Icons";
import { ThemeContext } from "./../../../utils/themeContext";

function Eval({ data }) {
  const { colors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    containerTask: {
      alignItems: "center",
      flexDirection: "row",
      backgroundColor: colors.green_variable,
      gap: 20,
      borderRadius: 10,
      height: 50,
      paddingHorizontal: 24,
    },
    containerEval: {
      alignItems: "center",
      flexDirection: "row",
      backgroundColor: colors.red700,
      gap: 10,
      borderRadius: 10,
      paddingVertical: 15,
      paddingHorizontal: 20,
    },
    evalText: {
      color: colors.white,
      fontFamily: "Ubuntu_500Medium",
      fontSize: 14,
    },
    rightContainer: {
      flexDirection: "column",
      gap: 8,
      width: "85%",
    },
  });

  const stylesNothing = StyleSheet.create({
    container: {
      backgroundColor: colors.green_variable,
    },
    evalText: {
      color: colors.green900,
    },
  });

  if (!data || (Array.isArray(data) && data.length === 0)) {
    return (
      <View style={[styles.containerTask, stylesNothing.container]}>
        <View style={styles.leftContainer}>
          <BigPouce fill={colors.green900} />
        </View>
        <View style={styles.rightContainer}>
          <Text style={[styles.evalText, stylesNothing.evalText]}>
            Aucune évaluation de prévue
          </Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.containerEval}>
        <View style={styles.leftContainer}>
          <CircleAlert
            stroke={colors.white}
            strokeWidth={1.75}
            width={20}
            height={20}
          />
        </View>
        <View style={styles.rightContainer}>
          {data.map((item) => (
            <View key={item.agenda_id} style={styles.rightContainer}>
              <Text style={styles.evalText}>
                [Évaluation] {item.Ressource.nom_ressource}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  }
}

export default Eval;
