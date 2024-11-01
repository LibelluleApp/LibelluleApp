import React, { useContext } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import { Info } from "../../assets/icons/Icons";
import fetchAbsence from "../../api/Scolarite/fetchAbsence";
import { ThemeContext } from "./../../utils/themeContext";

function Notes() {
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
      letterSpacing: -0.4,
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
      letterSpacing: -0.4,
      fontSize: 17,
      color: colors.regular950,
      marginBottom: 7,
    },
    absContent: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      color: colors.regular950,
      marginBottom: 2,
    },
    content: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      color: colors.regular950,
    },
    altText: {
      marginTop: 40,
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      color: colors.regular950,
      fontSize: 14,
      alignSelf: "center",
    },
    textContent: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginTop: 15,
      width: "95%",
    },
    gridContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
    },
    gridTiles: {
      backgroundColor: colors.white_background,
      borderRadius: 10,
      padding: 15,
      width: "48%",
    },
    gridTitle: {
      fontFamily: "Ubuntu_500Medium",
      letterSpacing: -0.4,
      fontSize: 17,
      color: colors.regular950,
    },
    gridMoyenne: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 13,
      color: colors.regular950,
      marginTop: 10,
      marginBottom: 2,
    },
    gridPromo: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 13,
      color: colors.grey,
    },
    gridRecap: {
      borderColor: colors.grey,
      borderWidth: 1,
      borderRadius: 10,
      padding: 15,
      width: "48%",
    },
    containerAltText: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: 20,
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
      <View style={styles.containerContent}>
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
          <GridRecap number={notes.length} moyenne={moyenne.toFixed(2)} />
        </View>
        <View style={styles.textContent}>
          <Info
            stroke={colors.regular950}
            strokeWidth={1.75}
            width={18}
            height={18}
          />
          <Text style={styles.content}>
            Pour valider une compétence, il faut avoir une moyenne d’au moins{" "}
            <Text style={{ fontFamily: "Ubuntu_500Medium" }}>10/20.</Text>
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

export default Notes;
