import React, { useEffect, useState, useRef, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  StyleSheet,
  Pressable,
} from "react-native";
import {
  MapPin,
  UserRound,
  Clock,
  Minus,
  Plus,
} from "../../../assets/icons/Icons";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import fetchNextCourse from "../../../api/Timetable/nextcourse";
import { getRessourceColor } from "../../../utils/ressources/colorsRessources";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import { ThemeContext } from "./../../../utils/themeContext";
import { getColorTimetable as getColorsTimetable } from "../../../utils/storage";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const fetchCourse = async () => {
  try {
    const response = await fetchNextCourse();
    return response;
  } catch (error) {
    console.error("Error fetching next course:", error);
    return null; // Return null in case of error
  }
};

// const fetchColor = async (data) => {
//   try {
//     const response = await getRessourceColor(data.title);
//     return response;
//   } catch (error) {
//     console.error("Error fetching next course:", error);
//     return null; // Return null in case of error
//   }
// };

function ItemCourse({ data, color }) {
  const { colors } = useContext(ThemeContext);
  const [remainingTime, setRemainingTime] = useState("");
  const [colorTimetable, setColorTimetable] = useState(colors.regular200);
  const getColorTimetable = () => {
    try {
      let storedColor = getColorsTimetable();

      if (storedColor) {
        storedColor = storedColor.replace(/['"]+/g, "");
        setColorTimetable(storedColor);
      }
    } catch (error) {
      console.error("Failed to fetch color from storage:", error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.regular200,
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      includeFontPadding: false,
      borderRadius: 10,
      width: "100%",
      paddingHorizontal: 20,
      paddingVertical: 15,
      alignItems: "start",
      flexDirection: "column",
      gap: 8,
      position: "relative",
      overflow: "hidden",
    },
    beforeElement: {
      width: 7,
      height: 400,
      backgroundColor: colors.regular600,
      position: "absolute",
      left: 0,
      top: 0,
    },
    subjectContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },
    subjectText: {
      fontFamily: "Ubuntu_500Medium",
      letterSpacing: -0.4,
      includeFontPadding: false,
      fontSize: 16,
      color: colors.regular950,
      Width: "90%",
    },
    descriptionContainer: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
    },
    descriptionContent: {
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
    },
    descriptionText: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      includeFontPadding: false,
      fontSize: 13,
      color: colors.regular800,
    },
    hourContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },
  });

  useEffect(() => {
    getColorTimetable();
    if (!data) return; // Exit early if there's no data

    const calculateTimeRemaining = () => {
      const targetTime = new Date(data.start).getTime();
      const now = Date.now();
      const remainingTime = targetTime - now;

      if (remainingTime <= 0) {
        setRemainingTime("maintenant");
        return;
      }

      const hours = Math.floor(remainingTime / 3600000);
      const minutes = Math.floor((remainingTime % 3600000) / 60000);
      const seconds = Math.floor((remainingTime % 60000) / 1000);

      if (hours === 0 && minutes === 0) {
        setRemainingTime(`${seconds}s`);
      } else if (hours === 0) {
        setRemainingTime(`${minutes}m ${seconds}s`);
      } else {
        setRemainingTime(`${hours}h ${minutes}m ${seconds}s`);
      }
    };

    calculateTimeRemaining(); // Call once immediately

    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [data]);

  function formatProfessorName(professor) {
    const parts = professor?.split(" ");
    if (parts.length < 2) return professor; // Handle cases where the name format is unexpected
    const initial = parts[1][0];
    const nom = parts[0];
    return `${initial}. ${nom}`;
  }

  // Animation de la card

  // État pour savoir si la carte est ouverte ou non
  const [isExpanded, setIsExpanded] = useState(true);

  // Valeur partagée pour l'animation de hauteur et d'opacité
  const animationHeight = useSharedValue(0); // Hauteur minimale ajustée
  const animationOpacity = useSharedValue(0);
  const rotation = useSharedValue(0); // Valeur de rotation

  // Animation pour la hauteur de la carte
  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(isExpanded ? 25 : 0, {
        duration: 300,
        easing: Easing.inOut(Easing.circle),
      }), // Ajuste la hauteur pour pliage/dépliage
    };
  });

  // Animation pour le gap entre les éléments
  const animatedGapStyle = useAnimatedStyle(() => {
    return {
      gap: withTiming(isExpanded ? 7 : 4, {
        duration: 300,
        easing: Easing.inOut(Easing.circle),
      }), // Ajuste le gap pour pliage/dépliage
    };
  });

  // Animation pour l'opacité des éléments à masquer
  const animatedOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isExpanded ? 1 : 0, {
        duration: 300,
        easing: Easing.inOut(Easing.circle),
      }), // Ajuste l'opacité pour masquer les icônes et texte
    };
  });

  // Animation pour la rotation de l'icône
  const animatedRotationStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  // Fonction pour gérer le clic et changer l'état
  const toggleCard = () => {
    setIsExpanded(!isExpanded);
    animationHeight;
    animationOpacity;
    animatedGapStyle;
    rotation.value = withTiming(isExpanded ? 0 : 180, { duration: 300 }); // Animation de rotation
  };

  if (!data) {
    return (
      <TouchableOpacity>
        <View style={[styles.container]}>
          <View style={styles.beforeElement} />
          <View style={styles.subjectContainer}>
            <Text style={styles.subjectText}>Aucun cours à venir.</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <Pressable onPress={toggleCard}>
      <Animated.View
        style={[
          styles.container,
          data.title !== "Alternance" ? animatedGapStyle : null,
        ]}
      >
        <View style={styles.beforeElement} />
        <View style={styles.subjectContainer}>
          <Text style={styles.subjectText}>
            {data.title || "Matière indisponible"}
          </Text>

          {/* Animation seulement si c'est "Alternance" */}
          {data.title !== "Alternance" && (
            <Animated.View style={animatedRotationStyle}>
              {isExpanded ? (
                <Minus
                  stroke={colors.regular700}
                  strokeWidth={1.75}
                  width={15}
                  height={15}
                />
              ) : (
                <Plus
                  stroke={colors.regular700}
                  strokeWidth={1.75}
                  width={15}
                  height={15}
                />
              )}
            </Animated.View>
          )}
        </View>

        {/* Contenu animé seulement si "Alternance" */}
        {data.title !== "Alternance" && (
          <Animated.View style={[styles.descriptionContainer, animatedStyle]}>
            <Animated.View
              style={[
                styles.descriptionContent,
                { width: "35%" },
                animatedOpacityStyle,
              ]}
            >
              <MapPin
                stroke={colors.regular800}
                width={14}
                height={14}
                strokeWidth={1.75}
              />
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.descriptionText}
              >
                {data.lieu || "N/C"}
              </Text>
            </Animated.View>
            <Animated.View
              style={[
                styles.descriptionContent,
                { width: "55%" },
                animatedOpacityStyle,
              ]}
            >
              <UserRound
                stroke={colors.regular800}
                width={14}
                height={14}
                strokeWidth={1.75}
              />
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.descriptionText}
              >
                {formatProfessorName(data.description) || "N/C"}
              </Text>
            </Animated.View>
          </Animated.View>
        )}

        <View style={styles.hourContainer}>
          <View style={styles.descriptionContent}>
            <Clock
              stroke={colors.regular800}
              width={14}
              height={14}
              strokeWidth={1.75}
            />
            <Text style={styles.descriptionText}>
              De{" "}
              <Text style={{ fontWeight: "bold" }}>
                {data.debut || "--:--"}
              </Text>{" "}
              à{" "}
              <Text style={{ fontWeight: "bold" }}>{data.fin || "--:--"}</Text>
            </Text>
          </View>

          {/* Affiche l'animation uniquement pour "Alternance" */}
          {data.title !== "Alternance" ? (
            <Animated.View style={animatedOpacityStyle}>
              <Text style={styles.descriptionText}>
                Dans <Text style={{ fontWeight: "bold" }}>{remainingTime}</Text>
              </Text>
            </Animated.View>
          ) : (
            <Text style={styles.descriptionText}>
              Dans <Text style={{ fontWeight: "bold" }}>{remainingTime}</Text>
            </Text>
          )}
        </View>
      </Animated.View>
    </Pressable>
  );
}

// function ItemInfo() {
//   return (
//     <View style={[infos.slide]}>
//       <Text style={infos.title}>Informations</Text>
//       <View style={infos.content}>
//         <Text style={infos.textContent}>•</Text>
//         <Text style={infos.textContent}>
//           01/04 au 05/04 : Vous êtes le propriétaire du cahier.
//         </Text>
//       </View>
//     </View>
//   );
// }

function NextCourse() {
  const { colors } = useContext(ThemeContext);
  const ref = useRef(null);
  const progress = useSharedValue(0);
  const [nextCourse, setNextCourse] = useState(null);
  const [color, setColor] = useState("#b7e1ff");
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCourse().then((response) => {
      if (response !== null) {
        setNextCourse(response);
        // fetchColor(response).then((color) => {
        //   setColor(color);
        //   setIsLoading(false);
        // });
        setIsLoading(false);
      } else {
        setNextCourse(null);
        setIsLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchCourse().then((response) => {
        if (response !== null) {
          setNextCourse(response);
          // fetchColor(response).then((color) => {
          //   setColor(color);
          //   setIsLoading(false);
          // });
          setIsLoading(false);
        } else {
          setNextCourse(null);
          setIsLoading(false);
        }
      });
    }
  }, [isFocused]);

  const styles = StyleSheet.create({
    swiper: {
      width: "90%",
      alignSelf: "center",
    },
  });

  return (
    <View style={styles.swiper}>
      <ShimmerPlaceholder
        shimmerStyle={{ borderRadius: 10 }}
        // width={slideWidth}
        // height={slideHeight}
        visible={isLoading ? false : true}
      >
        <ItemCourse data={nextCourse} color={color} />
        {/* 
        <Pagination.Basic
          progress={progress}
          data={data}
          dotStyle={{ backgroundColor: "#619AFE", borderRadius: 50, height: 8 }}
          activeDotStyle={{ backgroundColor: "#0760FB", borderRadius: 50 }}
          containerStyle={{ gap: 5, marginTop: 10 }}
        /> */}
      </ShimmerPlaceholder>
    </View>
  );
}

export default NextCourse;
