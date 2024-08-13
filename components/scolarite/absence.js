import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import { Info, ClockEmpty } from "../../assets/icons/Icons";
import Button from "./button";
import fetchAbsence from "../../api/Scolarite/fetchAbsence";

function Absence() {
  const [absence, setAbsence] = React.useState(null);

  React.useEffect(() => {
    try {
      fetchAbsence().then((data) => {
        setAbsence(data.absences);
        console.log(absence);
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
      <View style={styles.container}>
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
          <ClockEmpty />
          <Text style={styles.content}>
            Les absences sont relevées en fin de semaine.
          </Text>
        </View>
        <View style={styles.textContent}>
          <Info />
          <Text style={styles.content}>
            Au delà de{" "}
            <Text style={{ fontFamily: "Ubuntu_500Medium" }}>
              5 absences injustifiées
            </Text>
            , chaque absence supplémentaire entraine un malus de 0.2 points sur
            chacune des compétences.
          </Text>
        </View>
        <View>
          <Text style={styles.altText}>Données provenant de MMI Dashboard</Text>
          <Button
            title="MMI Dashboard"
            onPress={() => {
              Linking.openURL(
                "https://mmi-angouleme-dashboard.alwaysdata.net/login"
              );
            }}
            icon
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#F4F5F9",
    flex: 1,
  },
  container: {
    marginTop: 25,
    fontFamily: "Ubuntu_400Regular",
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
  },
  absTop: {
    backgroundColor: "#FFF",
    flexDirection: "column",
    borderRadius: 10,
    width: "100%",
    paddingHorizontal: 17,
    paddingVertical: 12,
  },
  absTitle: {
    fontFamily: "Ubuntu_500Medium",
    fontSize: 17,
    color: "#252525",
    marginBottom: 7,
  },
  absContent: {
    fontFamily: "Ubuntu_400Regular",
    color: "#252525",
    marginBottom: 2,
  },
  content: {
    fontFamily: "Ubuntu_400Regular",
    color: "#252525",
  },
  altText: {
    fontFamily: "Ubuntu_400Regular",
    color: "#252525",
    fontSize: 13,
    alignSelf: "center",
    marginTop: 40,
  },
  textContent: {
    flexDirection: "row",
    gap: 6,
    marginTop: 15,
  },
});

export default Absence;
