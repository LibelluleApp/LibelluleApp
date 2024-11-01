import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LoaderCircle } from "../../assets/icons/Icons";
import { ThemeContext } from "../../utils/themeContext";
import { getUserData } from "../../utils/storage";
import fetchMenu from "./../../api/Menu/fetchMenu";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

function Restauration() {
  const { colors } = useContext(ThemeContext);
  const [menu, setMenu] = useState([]);
  const [user, setUser] = useState({});

  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(withTiming(360, { duration: 2000 }), -1, false);
  }, []);

  // Détermine si aujourd'hui est un jour férié en France
  const estJourFerie = () => {
    const joursFeries = [
      "01-01", // Nouvel An
      "05-01", // Fête du Travail
      "05-08", // Victoire 1945
      "07-14", // Fête Nationale
      "08-15", // Assomption
      "11-01", // Toussaint
      "11-11", // Armistice
      "12-25", // Noël
    ];
    const today = new Date();
    const todayStr = `${String(today.getMonth() + 1).padStart(2, "0")}-${String(
      today.getDate()
    ).padStart(2, "0")}`;
    return joursFeries.includes(todayStr);
  };

  // Vérifie si aujourd'hui est le week-end
  const estWeekend = () => {
    const today = new Date();
    return today.getDay() === 6 || today.getDay() === 0; // 6 = samedi, 0 = dimanche
  };

  // Détermine si aujourd'hui est dans une période de vacances
  const estEnVacances = () => {
    const vacances = [
      { start: "2023-10-21", end: "2023-10-27" },
      { start: "2023-12-23", end: "2024-01-05" },
      { start: "2024-02-24", end: "2024-03-02" },
      { start: "2024-04-21", end: "2024-05-04" },
    ];
    const today = new Date();
    return vacances.some(({ start, end }) => {
      const startDate = new Date(start);
      const endDate = new Date(end);
      return today >= startDate && today <= endDate;
    });
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      const data = await fetchMenu(new Date().toISOString().split("T")[0]);
      if (isMounted) {
        setMenu(data);
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const getData = () => {
      try {
        const value = getUserData();
        setUser(value);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getData();
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const styles = StyleSheet.create({
    container: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      alignSelf: "center",
      width: "90%",
      marginTop: 22,
      marginBottom: 15,
    },
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      marginVertical: 20,
    },
    headerContent: {
      flexDirection: "column",
    },
    headerTitle: {
      fontSize: 16,
      fontFamily: "Ubuntu_500Medium",
      letterSpacing: -0.4,
      color: colors.regular950,
    },
    headerSubtitle: {
      fontSize: 14,
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      color: colors.regular800,
    },
    btnOutline: {
      borderColor: colors.regular700,
      borderWidth: 0.5,
      borderRadius: 50,
      paddingHorizontal: 20,
      paddingVertical: 7,
    },
    btnOutlineText: {
      color: colors.regular700,
      fontSize: 13,
      fontFamily: "Ubuntu_500Medium",
      letterSpacing: -0.4,
    },
    contentMeal: {
      backgroundColor: colors.white_background,
      borderRadius: 10,
      paddingHorizontal: 26,
      paddingVertical: 15,
    },
    noneDescriptionPlat: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    noneDescriptionPlatTitle: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 15,
      color: colors.regular800,
    },
    descriptionMeal: {
      fontFamily: "Ubuntu_500Medium",
      letterSpacing: -0.4,
      fontSize: 15,
      color: colors.regular950,
    },
    descriptionPlat: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 15,
      color: colors.regular950,
      textTransform: "capitalize",
    },
  });

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Menu du midi - Le Crousty</Text>
          {menu.length === 0 &&
          (estJourFerie() || estWeekend() || estEnVacances()) ? (
            <Text style={styles.headerSubtitle}>Fermé</Text>
          ) : (
            <Text style={styles.headerSubtitle}>Ouvert de 11h45 à 13h30</Text>
          )}
        </View>
        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => {
            Linking.openURL(
              "https://www.crous-poitiers.fr/restaurant/r-u-crousty/"
            );
          }}
          accessibilityLabel="Voir plus sur le restaurant Crousty"
        >
          <Text style={styles.btnOutlineText}>Voir plus</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentMeal}>
        {menu.length === 0 ? (
          estJourFerie() || estWeekend() || estEnVacances() ? (
            <View style={styles.noneDescriptionPlat}>
              <Text style={styles.noneDescriptionPlatTitle}>
                Aucun menu aujourd'hui
              </Text>
            </View>
          ) : (
            <View style={styles.noneDescriptionPlat}>
              <Animated.View style={animatedStyle}>
                <LoaderCircle
                  stroke={colors.regular800}
                  strokeWidth={1.75}
                  width={18}
                  height={18}
                />
              </Animated.View>
              <Text style={styles.noneDescriptionPlatTitle}>
                Non actualisé sur le site du Crousty
              </Text>
            </View>
          )
        ) : (
          menu.map((meal, index) => (
            <View key={index} style={styles.descriptionMeal}>
              <Text style={styles.descriptionPlat}>
                {"\u2022 "}
                {meal}
              </Text>
            </View>
          ))
        )}
      </View>
    </View>
  );
}

export default Restauration;
