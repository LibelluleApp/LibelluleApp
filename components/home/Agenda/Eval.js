import React, { useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { BigWarning, BigPouce } from "../../../assets/icons/Icons";
import { ThemeContext } from "./../../../utils/themeContext";

function Eval({ data }) {
  const { colors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      flexDirection: "row",
      backgroundColor: colors.red700,
      gap: 20,
      borderRadius: 10,
      paddingVertical: 12,
      paddingHorizontal: 24,
    },
    evalText: {
      color: colors.white,
      fontFamily: "Ubuntu_500Medium",
      fontSize: 14,
    },
    rightContainer: {
      flexDirection: "column",
      gap: 8,
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
      <View style={[styles.container, stylesNothing.container]}>
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
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <BigWarning />
        </View>
        <View style={styles.rightContainer}>
          {data.map((item) => (
            <View key={item.agenda_id} style={styles.rightContainer}>
              <Text style={styles.evalText}>
                [Evaluation] {item.Ressource.nom_ressource}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  }
}

export default Eval;
