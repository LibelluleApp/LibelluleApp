import React, { useContext } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Pressable,
} from "react-native";
import { Info } from "../../assets/icons/Icons";
import fetchAbsence from "../../api/Scolarite/fetchAbsence";
import { ThemeContext } from "./../../utils/themeContext";
import { getUserData } from "../../utils/storage";
function getProfileData() {
  try {
    return getUserData();
  } catch (e) {
    console.error(e);
  }
}
function Notes({ setSemestre }) {
  const { colors } = useContext(ThemeContext);
  const [ueError, setUeError] = React.useState(null);
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
    title: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 10,
      textTransform: "uppercase",
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
    container: {
      backgroundColor: colors.white_background,
      borderRadius: 10,
      paddingHorizontal: 26,
      paddingVertical: 15,
    },
    errorMessage:{
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 15,
      color: colors.regular800,
    }
  });

  function GridTiles({ note }) {
    return (
      <View style={styles.gridTiles}>
        <View>
          <Text style={styles.gridTitle}>{note[0]}</Text>
          <Text style={styles.gridTitle}>
            {findUes(note[0].split("."))[0].competence}
          </Text>
        </View>
        <View>
          <Text style={styles.gridMoyenne}>
            Moyenne : {note[1].moy.toFixed(3)}/20
          </Text>
          <Text style={styles.gridPromo}>Rang : {note[1].rang}</Text>
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

  function findUes(code) {
    const ues = [
      {
        code: "1",
        competence: "Comprendre",
      },
      {
        code: "2",
        competence: "Concevoir",
      },
      {
        code: "3",
        competence: "Exprimer",
      },
      {
        code: "4",
        competence: "Développer",
      },
      {
        code: "5",
        competence: "Entreprendre",
      },
    ];
    return ues.filter((u) => u.code === code[1]);
  }

  function calculMoyenne(notes) {
    let total = 0;
    notes.forEach((note) => {
      total += note[1].moy;
    });
    return total / notes.length;
  }

  const [notes, setNotes] = React.useState(null);
  const [moyenne, setMoyenne] = React.useState(null);

  React.useEffect(() => {
    try {
      fetchAbsence(findYear()).then((data) => {
        const ues = data.notes.ues;
        const listNotes = Object.keys(ues).map((key) => [key, ues[key]]);
        setNotes(listNotes);
        setMoyenne(calculMoyenne(listNotes));
      });
    } catch (error) {
      console.error("Error fetching absence:", error);
    }
  }, []);


  if (!notes || !moyenne) {
    return (
      <View style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.errorMessage}>Maquette indisponible, elle arrivera prochainement :)</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.background}>
      <View style={styles.containerContent}>
        <View style={styles.gridContainer}>
          {notes.map((note, index) => (
            <GridTiles key={index} note={note} />
          ))}
          <GridRecap number={notes.length} moyenne={moyenne.toFixed(2)} />
        </View>
        {/* <View style={styles.textContent}>
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

export default Notes;
