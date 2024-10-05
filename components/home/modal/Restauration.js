import React, { useContext, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Phone, Calendar } from "../../../assets/icons/Icons";
import { ThemeContext } from "./../../../utils/themeContext";
import fetchMenu from "../../../api/Menu/fetchMenu";
import moment from "moment";

function Restauration() {
  const [menu, setMenu] = React.useState([]);
  const [selectedDay, setSelectedDay] = React.useState("today"); // État pour le jour sélectionné
  const { colors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    modalBackground: {
      backgroundColor: colors.background,
      flex: 1,
    },
    container: {
      fontFamily: "Ubuntu_400Regular",
      alignSelf: "center",
      width: "90%",
      marginTop: 22,
      marginBottom: 15,
    },
    infoTop: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      padding: 15,
    },
    infoLeft: {
      gap: 7,
      justifyContent: "center",
    },
    hour: {
      fontFamily: "Ubuntu_500Medium",
      fontSize: 20,
      color: colors.blue950,
    },
    stick: {
      backgroundColor: colors.blue950,
      height: "90%",
      width: 1,
      marginHorizontal: 15,
    },
    infoRight: {
      gap: 7,
      justifyContent: "center",
    },
    title: {
      fontFamily: "Ubuntu_500Medium",
      fontSize: 20,
      color: colors.blue950,
    },
    content: {
      flexDirection: "row",
      gap: 5,
      alignItems: "center",
    },
    description: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 15,
      color: colors.blue950,
    },
    button: {
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      backgroundColor: colors.background,
      borderColor: colors.blue700,
      borderWidth: 0.5,
    },
    buttonToday: {
      backgroundColor: colors.blue700,
      borderWidth: 0,
    },
    buttonText: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 15,
      color: colors.blue700,
    },
    buttonTextToday: {
      color: colors.white,
    },
    titleContent: {
      fontFamily: "Ubuntu_500Medium",
      fontSize: 17,
      color: colors.grey,
      marginTop: 30,
    },
    contentMeal: {
      flexDirection: "column",
      gap: 5,
      marginTop: 10,
      backgroundColor: colors.white_background,
      borderRadius: 10,
      paddingHorizontal: 26,
      paddingVertical: 15,
    },
    descriptionMeal: {
      fontFamily: "Ubuntu_500Medium",
      fontSize: 15,
      color: colors.blue950,
    },
    descriptionPlat: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 15,
      color: colors.blue950,
      marginLeft: 10,
      textTransform: "capitalize",
    },
  });

  // Fonction pour récupérer les dates tout en sautant les week-ends
  const getValidDate = (daysToAdd) => {
    let date = moment().add(daysToAdd, "days");

    // Si on est samedi ou dimanche, on commence directement au lundi
    if (moment().day() === 6) {
      // Si c'est samedi
      return moment()
        .add(daysToAdd + 2, "days")
        .format("YYYY-MM-DD"); // Lundi, Mardi, Mercredi
    } else if (moment().day() === 0) {
      // Si c'est dimanche
      return moment()
        .add(daysToAdd + 1, "days")
        .format("YYYY-MM-DD"); // Lundi, Mardi, Mercredi
    }

    // Si on est vendredi, on saute le week-end pour afficher lundi et mardi
    if (moment().day() === 5) {
      if (daysToAdd === 1) {
        return moment().add(3, "days").format("YYYY-MM-DD"); // Lundi
      } else if (daysToAdd === 2) {
        return moment().add(4, "days").format("YYYY-MM-DD"); // Mardi
      }
    }

    // Saute les week-ends pour les autres jours de la semaine
    while (date.day() === 6 || date.day() === 0) {
      date = date.add(1, "days");
    }

    return date.format("YYYY-MM-DD");
  };

  // Fonction pour obtenir les dates formatées
  const getFormattedDate = (daysToAdd) => {
    let date = moment().add(daysToAdd, "days");

    // Si on est samedi, le premier bouton est lundi, ensuite mardi, mercredi
    if (moment().day() === 6) {
      return moment()
        .add(daysToAdd + 2, "days")
        .format("ddd D MMM");
    }
    // Si on est dimanche, le premier bouton est lundi, ensuite mardi, mercredi
    if (moment().day() === 0) {
      return moment()
        .add(daysToAdd + 1, "days")
        .format("ddd D MMM");
    }

    // Si on est vendredi, afficher lundi et mardi après aujourd'hui
    if (moment().day() === 5) {
      if (daysToAdd === 1) {
        return moment().add(3, "days").format("ddd D MMM"); // Lundi
      } else if (daysToAdd === 2) {
        return moment().add(4, "days").format("ddd D MMM"); // Mardi
      }
    }

    // Saute les week-ends pour les jours de la semaine
    while (date.day() === 6 || date.day() === 0) {
      date = date.add(1, "days");
    }

    // Si on est un jour de semaine (lundi à jeudi), afficher "Aujourd'hui"
    if (daysToAdd === 0 && moment().day() !== 6 && moment().day() !== 0) {
      return "Aujourd'hui";
    }

    return date.format("ddd D MMM");
  };

  useEffect(() => {
    let dayOffset = 0;
    if (selectedDay === "tomorrow") {
      dayOffset = 1;
    } else if (selectedDay === "dayAfterTomorrow") {
      dayOffset = 2;
    }

    const validDate = getValidDate(dayOffset);
    fetchMenu(validDate).then((data) => {
      setMenu(data);
      console.log(data);
    });
  }, [selectedDay]);

  // Calcul des jours à afficher
  const daysToDisplay = [
    { key: "today", label: getFormattedDate(0) },
    { key: "tomorrow", label: getFormattedDate(1) },
    { key: "dayAfterTomorrow", label: getFormattedDate(2) },
  ];

  return (
    <View style={styles.modalBackground}>
      <View style={styles.container}>
        <View style={styles.infoTop}>
          <View style={styles.infoLeft}>
            <Text style={styles.hour}>11:45</Text>
            <Text style={styles.hour}>13:30</Text>
          </View>
          <View style={styles.stick}></View>
          <View style={styles.infoRight}>
            <Text style={styles.title}>RU Le Crousty</Text>
            <View style={styles.content}>
              <Phone
                stroke={colors.blue950}
                strokeWidth={1.75}
                width={16}
                height={16}
              />
              <Text style={styles.description}>05.45.25.51.51</Text>
            </View>
            <View style={styles.content}>
              <Calendar
                stroke={colors.blue950}
                strokeWidth={1.75}
                width={16}
                height={16}
              />
              <Text style={styles.description}>Du lundi au vendredi</Text>
            </View>
          </View>
        </View>

        {/* Boutons pour changer de jour */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: "row",
            gap: 15,
            marginVertical: 15,
          }}
        >
          {daysToDisplay.map(({ key, label }) => (
            <TouchableOpacity
              key={key}
              style={[styles.button, selectedDay === key && styles.buttonToday]}
              onPress={() => setSelectedDay(key)}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedDay === key && styles.buttonTextToday,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Affichage du menu */}
        <View style={styles.contentMeal}>
          <Text style={styles.descriptionMeal}>Menu</Text>
          {menu.map((meal, index) => (
            <View key={index} style={styles.descriptionMeal}>
              <Text style={styles.descriptionPlat}>
                {"\u2022 "}
                {meal}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

export default Restauration;
