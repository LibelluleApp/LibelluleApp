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
import { ThemeContext } from "../../utils/themeContext";
import { getUserData } from "../../utils/storage";

function getProfileData() {
  try {
    return getUserData();
  } catch (e) {
    console.error(e);
  }
}

function Absence({ setSemestre }) {
  const { colors } = useContext(ThemeContext);

  function findYear() {
    const semesterYear = {
      Y1: "s2-2025",
      Y2: "s4-2025",
      Y3: "s6-2025",
    };

    const user_data = getProfileData();
    let year = user_data.groupe_id.split("UI");
    setSemestre(semesterYear[year[0]]);
    return semesterYear[year[0]];
  }

  const styles = StyleSheet.create({
    background: {
      backgroundColor: colors.background,
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
    },
    containerContent: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      borderRadius: 10,
    },
    absTop: {
      backgroundColor: colors.white_background,
      borderRadius: 10,
      paddingHorizontal: 26,
      paddingVertical: 15,
    },
    absTitle: {
      fontFamily: "Ubuntu_500Medium",
      letterSpacing: -0.4,
      fontSize: 17,
      color: colors.regular950,
      marginBottom: 7,
    },
    absContent: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 15,
      color: colors.regular950,
      textTransform: "capitalize",
    },
    content: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 14,
      color: colors.regular950,
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
      letterSpacing: -0.4,
      color: colors.regular950,
      fontSize: 14,
      alignSelf: "center",
    },
    altTextLink: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      color: colors.regular950,
      fontSize: 14,
      alignSelf: "center",
      lineHeight: 20,
      textDecorationLine: "underline",
    },
  });

  const [absence, setAbsence] = React.useState(null);

  React.useEffect(() => {
    try {
      fetchAbsence(findYear()).then((data) => {
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
          {absence.J && absence.J > 1 ? (
            <Text style={styles.absContent}>
              {`\u2022`} {absence.J} absences justifées
            </Text>
          ) : (
            <Text style={styles.absContent}>
              {`\u2022`} {absence.J} absence justifée
            </Text>
          )}
          {absence.I && absence.I > 1 ? (
            <Text style={styles.absContent}>
              {`\u2022`} {absence.I} absences injustifiées
            </Text>
          ) : (
            <Text style={styles.absContent}>
              {`\u2022`} {absence.I} absence injustifiée
            </Text>
          )}
        </View>
        {/* <View style={styles.textContent}>
          <Clock
            stroke={colors.regular950}
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
            stroke={colors.regular950}
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
        </View> */}
      </View>
      {/* <View style={styles.containerAltText}>
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
      </View> */}
    </View>
  );
}

export default Absence;
