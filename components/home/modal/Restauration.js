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
      color: colors.black,
    },
    stick: {
      backgroundColor: colors.black,
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
      color: colors.black,
    },
    content: {
      flexDirection: "row",
      gap: 5,
      alignItems: "center",
    },
    description: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 15,
      color: colors.black,
    },
    button: {
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      backgroundColor: colors.background,
      borderColor: colors.blue_variable,
      borderWidth: 0.5,
    },
    buttonToday: {
      backgroundColor: colors.blue_variable,
      borderWidth: 0,
    },
    buttonText: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 15,
      color: colors.blue_variable,
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
      color: colors.black,
    },
    descriptionPlat: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 15,
      color: colors.black,
      marginLeft: 10,
      textTransform: "capitalize",
    },
  });

  // Fonction pour récupérer les dates tout en sautant les week-ends
  const getValidDate = (daysToAdd) => {
    let date = moment().add(daysToAdd, "days");
    while (date.day() === 6 || date.day() === 0) {
      date = date.add(1, "days");
    }
    return date.format("YYYY-MM-DD");
  };

  // Fonction pour obtenir les dates formatées
  const getFormattedDate = (daysToAdd) => {
    let date = moment().add(daysToAdd, "days");
    while (date.day() === 6 || date.day() === 0) {
      date = date.add(1, "days");
    }
    if (daysToAdd === 0) return "Aujourd'hui";
    return date.format("ddd D MMM"); // Format "mar 4 sep"
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
                stroke={colors.black}
                strokeWidth={1.75}
                width={16}
                height={16}
              />
              <Text style={styles.description}>05.45.25.51.51</Text>
            </View>
            <View style={styles.content}>
              <Calendar
                stroke={colors.black}
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
          <TouchableOpacity
            style={[
              styles.button,
              selectedDay === "today" && styles.buttonToday,
            ]}
            onPress={() => setSelectedDay("today")}
          >
            <Text
              style={[
                styles.buttonText,
                selectedDay === "today" && styles.buttonTextToday,
              ]}
            >
              {getFormattedDate(0)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedDay === "tomorrow" && styles.buttonToday,
            ]}
            onPress={() => setSelectedDay("tomorrow")}
          >
            <Text
              style={[
                styles.buttonText,
                selectedDay === "tomorrow" && styles.buttonTextToday,
              ]}
            >
              {getFormattedDate(1)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedDay === "dayAfterTomorrow" && styles.buttonToday,
            ]}
            onPress={() => setSelectedDay("dayAfterTomorrow")}
          >
            <Text
              style={[
                styles.buttonText,
                selectedDay === "dayAfterTomorrow" && styles.buttonTextToday,
              ]}
            >
              {getFormattedDate(2)}
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* <Text style={styles.titleContent}>
          {selectedDay === "today"
            ? "Aujourd'hui"
            : selectedDay === "tomorrow"
            ? "Demain"
            : "Après-demain"}
        </Text> */}

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
