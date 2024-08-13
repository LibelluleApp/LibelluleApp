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

function GridTiles({ code, competence, moyenne, promo, rang }) {
  return (
    <View style={styles.gridTiles}>
      <View>
        <Text style={styles.gridTitle}>{code}</Text>
        <Text style={styles.gridTitle}>{competence}</Text>
      </View>
      <View>
        <Text style={styles.gridMoyenne}>
          Moyenne : {moyenne.toFixed(3)}/20
        </Text>
        <Text style={styles.gridPromo}>Promo : {promo.toFixed(2)}/20</Text>
        <Text style={styles.gridPromo}>Rang : {rang}</Text>
      </View>
    </View>
  );
}
function GridRecap({ number, moyenne }) {
  return (
    <View style={styles.gridRecap}>
      <Text style={styles.gridTitle}>Résumé des {number} compétences</Text>
      <Text style={styles.gridMoyenne}>Moyenne : {moyenne}/20</Text>
    </View>
  );
}

function CalculMoyenne(notes) {
  let total = 0;
  notes.forEach((note) => {
    total += note.moy;
  });
  return total / notes.length;
}

function Notes() {
  const [notes, setNotes] = React.useState([]);
  const [moyenne, setMoyenne] = React.useState(0);

  React.useEffect(() => {
    try {
      fetchAbsence().then((data) => {
        const ues = data.notes.ues;
        const notesArray = Object.values(ues);
        setNotes(notesArray);
        setMoyenne(CalculMoyenne(notesArray));
      });
    } catch (error) {
      console.error("Error fetching absence:", error);
    }
  }, []);

  if (!notes) {
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
        <View style={styles.gridContainer}>
          {notes.map((note, index) => (
            <GridTiles
              key={index} // Utiliser l'index comme clé si vous n'avez pas de propriété unique
              code={note.code}
              competence="Comprendre"
              moyenne={note.moy}
              promo={note.moy_promo}
              rang={note.rang}
            />
          ))}
          <GridRecap number={notes.length} moyenne={moyenne.toFixed(3)} />
        </View>
        <View style={styles.textContent}>
          <Info />
          <Text style={styles.content}>
            Pour valider une compétence, il faut avoir une moyenne d’au moins{" "}
            <Text style={{ fontFamily: "Ubuntu_500Medium" }}>10/20.</Text>
          </Text>
        </View>
        <View>
          <Text style={styles.altText}>
            Toutes les notes sont disponibles sur MMI Dashboard
          </Text>
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
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  gridTiles: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    width: "48%",
  },
  gridTitle: {
    fontFamily: "Ubuntu_500Medium",
    fontSize: 17,
    color: "#252525",
  },
  gridMoyenne: {
    fontFamily: "Ubuntu_400Regular",
    fontSize: 13,
    color: "#252525",
    marginTop: 10,
    marginBottom: 2,
  },
  gridPromo: {
    fontFamily: "Ubuntu_400Regular",
    fontSize: 13,
    color: "#7A797C",
  },
  gridRecap: {
    borderColor: "#7A797C",
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    width: "48%",
  },
});

export default Notes;
