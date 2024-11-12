import React, { useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Touchable,
} from "react-native";
import {
  CircleAlert,
  ThumbsUp,
  ChevronRight,
} from "../../../assets/icons/Icons";
import { ThemeContext } from "./../../../utils/themeContext";
import TouchableScale from "react-native-touchable-scale";

function Eval({ data }) {
  const { colors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    containerEval: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      alignContent: "center",
      backgroundColor: colors.red50,
      gap: 10,
      borderRadius: 10,
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderWidth: 0.5,
      borderColor: colors.red300,
    },
    evalText: {
      color: colors.red500,
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 14,
    },
    leftContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
    },
    rightContainer: {},
  });

  // if (data && (Array.isArray(data) && data.length > 0)) {
  if (!data || (Array.isArray(data) && data.length === 0)) {
    return (
      <View>
        {data.map((item) => (
          <TouchableScale
            friction={6}
            activeScale={0.95}
            key={item.agenda_id}
            style={styles.container}
          >
            <View style={styles.containerEval}>
              <View style={styles.leftContainer}>
                <CircleAlert
                  stroke={colors.red500}
                  strokeWidth={1.75}
                  width={20}
                  height={20}
                />
                <Text style={styles.evalText}>
                  <Text style={{ fontWeight: "bold" }}>[Évaluation]</Text>{" "}
                  {item.Ressource.nom_ressource}
                </Text>
              </View>
              <View style={styles.rightContainer}>
                <ChevronRight
                  stroke={colors.red500}
                  strokeWidth={1.75}
                  width={18}
                  height={18}
                ></ChevronRight>
              </View>
            </View>
          </TouchableScale>
        ))}
      </View>
    );
  }
}

export default Eval;
