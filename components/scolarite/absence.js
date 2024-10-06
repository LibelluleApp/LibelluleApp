import React, { useContext } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import { Info, Clock } from "../../assets/icons/Icons";
import fetchAbsence from "../../api/Scolarite/fetchAbsence";
import { ThemeContext } from "./../../utils/themeContext";

function Absence() {
  const { colors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    background: {
      backgroundColor: colors.background,
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
    },
    containerContent: {
      marginTop: 25,
      fontFamily: "Ubuntu_400Regular",
      borderRadius: 10,
      width: "90%",
      alignSelf: "center",
    },
    absTop: {
      backgroundColor: colors.white_background,
      flexDirection: "column",
      borderRadius: 10,
      width: "100%",
      paddingHorizontal: 17,
      paddingVertical: 12,
    },
    absTitle: {
      fontFamily: "Ubuntu_500Medium",
      fontSize: 17,
      color: colors.blue950,
      marginBottom: 7,
    },
    absContent: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 14,
      color: colors.blue950,
      marginBottom: 2,
    },
    content: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 14,
      color: colors.blue950,
    },
    textContent: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginTop: 15,
    },
    containerAltText: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: 20,
    },
    altText: {
      fontFamily: "Ubuntu_400Regular",
      color: colors.blue950,
      fontSize: 14,
      alignSelf: "center",
    },
    altTextLink: {
      fontFamily: "Ubuntu_400Regular",
      color: colors.blue950,
      fontSize: 14,
      alignSelf: "center",
      lineHeight: 20,
      textDecorationLine: "underline",
    },
  });

  const [absence, setAbsence] = React.useState(null);

  React.useEffect(() => {
    try {
      fetchAbsence().then((data) => {
        setAbsence(data.absences);
      });
    } catch (error) {
      console.error("Error fetching absence:", error);
    }
  }, []);

  if (!absence) {
    return (
      <View style={styles.background}>
        <View style={styles.container}>
          <Text>Chargement...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.background}>
      <View style={styles.containerContent}>
        <View style={styles.absTop}>
          <Text style={styles.absTitle}>Semestre 4</Text>
          {absence.total_abs && absence.total_abs > 1 ? (
            <Text style={styles.absContent}>
              {`\u2022`} {absence.total_abs} absences justifées
            </Text>
          ) : (
            <Text style={styles.absContent}>
              {`\u2022`} {absence.total_abs} absence justifée
            </Text>
          )}
          {absence.total_absI && absence.total_absI > 1 ? (
            <Text style={styles.absContent}>
              {`\u2022`} {absence.total_absI} absences injustifiées
            </Text>
          ) : (
            <Text style={styles.absContent}>
              {`\u2022`} {absence.total_absI} absence injustifiée
            </Text>
          )}
        </View>
        <View style={styles.textContent}>
          <Clock
            stroke={colors.blue950}
            strokeWidth={1.75}
            width={18}
            height={18}
          />
          <Text style={styles.content}>
            Les absences sont relevées en fin de semaine.
          </Text>
        </View>
        <View style={styles.textContent}>
          <Info
            stroke={colors.blue950}
            strokeWidth={1.75}
            width={18}
            height={18}
          />
          <Text style={styles.content}>
            Au delà de{" "}
            <Text style={{ fontFamily: "Ubuntu_500Medium" }}>
              5 absences injustifiées
            </Text>
            , chaque absence supplémentaire entraine un malus de 0.2 points sur
            chacune des compétences.
          </Text>
        </View>
      </View>
      <View style={styles.containerAltText}>
        <Text style={styles.altText}>Données provenant de </Text>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(
              "https://mmi-angouleme-dashboard.alwaysdata.net/login"
            );
          }}
        >
          <Text style={styles.altTextLink}>MMI Dashboard.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Absence;
