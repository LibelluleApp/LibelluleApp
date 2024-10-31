import React, { useContext, useEffect } from "react";
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
  const [menu, setMenu] = React.useState([]);
  const [user, setUser] = React.useState({});

  // Initialiser la rotation avec Reanimated
  const rotation = useSharedValue(0);

  useEffect(() => {
    // Lancer une rotation infinie
    rotation.value = withRepeat(
      withTiming(360, { duration: 2000 }), // 1000ms pour une rotation complète
      -1, // Répétition infinie
      false // Pas de retour en arrière
    );
  }, []);

  useEffect(() => {
    let isMounted = true; // pour suivre si le composant est monté
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

  // Style animé pour la rotation
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const styles = StyleSheet.create({
    container: {
      fontFamily: "Ubuntu_400Regular",
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
      color: colors.blue950,
    },
    headerSubtitle: {
      fontSize: 14,
      fontFamily: "Ubuntu_400Regular",
      color: colors.blue800,
    },
    btnOutline: {
      borderColor: colors.blue700,
      borderWidth: 0.5,
      borderRadius: 50,
      paddingHorizontal: 20,
      paddingVertical: 7,
    },
    btnOutlineText: {
      color: colors.blue700,
      fontSize: 13,
      fontFamily: "Ubuntu_500Medium",
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
      fontSize: 15,
      color: colors.blue800,
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
      textTransform: "capitalize",
    },
  });

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Menu du Crousty</Text>
          <Text style={styles.headerSubtitle}>Ouvert de 11h45 à 13h30</Text>
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
          <View style={styles.noneDescriptionPlat}>
            <Animated.View style={animatedStyle}>
              <LoaderCircle
                stroke={colors.blue800}
                strokeWidth={1.75}
                width={18}
                height={18}
              />
            </Animated.View>
            <Text style={styles.noneDescriptionPlatTitle}>
              Non actualisé sur le site du Crousty
            </Text>
          </View>
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
