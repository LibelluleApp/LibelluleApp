import React, { useEffect, useState, useRef, useContext } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { MapPin, UserRound, Clock } from "../../../assets/icons/Icons";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import fetchNextCourse from "../../../api/Timetable/nextcourse";
import { getRessourceColor } from "../../../utils/ressources/colorsRessources";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import { ThemeContext } from "./../../../utils/themeContext";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const { width } = Dimensions.get("window");
const slideWidth = width * 0.9;
const slideHeight = 90;

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
  const navigator = useNavigation();

  const styles = StyleSheet.create({
    slide: {
      height: slideHeight,
      alignSelf: "center",
      gap: 10,
    },
    container: {
      backgroundColor: "#5088F3",
      fontFamily: "Ubuntu_400Regular",
      includeFontPadding: false,
      borderRadius: 10,
      width: slideWidth,
      height: "100%",
      paddingHorizontal: 17,
      paddingVertical: 15,
      alignItems: "center",
      flexDirection: "row",
    },
    hour: {
      gap: 8,
      justifyContent: "center",
    },
    textHour: {
      fontFamily: "Ubuntu_500Medium",
      includeFontPadding: false,
      fontSize: 17,
      color: colors.white,
    },
    stick: {
      backgroundColor: colors.white,
      height: "90%",
      width: 1,
      marginHorizontal: 14,
    },
    textSubject: {
      fontFamily: "Ubuntu_500Medium",
      includeFontPadding: false,
      fontSize: 17,
      color: colors.white,
    },
    teacher: {
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
    },
    textTeacher: {
      fontFamily: "Ubuntu_400Regular",
      includeFontPadding: false,
      fontSize: 14,
      color: colors.white,
      gap: 10,
    },
    contentLeft: {
      justifyContent: "center",
    },
    hourClock: {
      fontFamily: "Ubuntu_500Medium",
      includeFontPadding: false,
      fontSize: 14,
      color: colors.white,
    },
    content: {
      flexDirection: "row",
      gap: 6,
      alignItems: "center",
    },
    placeholder: {
      justifyContent: "center",
      alignItems: "center",
    },
    placeholderText: {
      color: colors.text_placeholder,
      fontSize: 16,
    },
    slide: {
      height: slideHeight,
      backgroundColor: colors.white_background,
      borderRadius: 10,
    },
    title: {
      fontFamily: "Ubuntu_500Medium",
      fontSize: 13,
      color: colors.black,
    },
    content: {
      marginTop: 10,
      flexDirection: "row",
      gap: 5,
    },
    textContent: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 13,
      color: colors.black50,
    },
  });
  useEffect(() => {
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

  if (!data) {
    return (
      <TouchableOpacity style={[styles.slide]}>
        <View
          style={[
            styles.container,
            { backgroundColor: colors.white_background },
          ]}
        >
          <Text style={styles.textSubject}>Aucun cours à venir</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.slide]}
      onPress={() => navigator.navigate("DetailEvent", { data })}
    >
      <View style={[styles.container, color]}>
        <View style={styles.hour}>
          <Text style={styles.textHour}>{data.debut || "--:--"}</Text>
          <Text style={styles.textHour}>{data.fin || "--:--"}</Text>
        </View>
        <View style={styles.stick}></View>
        <View style={styles.contentLeft}>
          <Text style={styles.textSubject}>
            {data.title || "Matière indisponible"}
          </Text>
          <View style={styles.teacher}>
            <View style={styles.content}>
              <MapPin
                stroke={colors.white}
                width={14}
                height={14}
                strokeWidth={1.75}
              />
              <Text style={styles.textTeacher}>{data.lieu || "N/C"}</Text>
            </View>
            <View style={styles.content}>
              <UserRound
                stroke={colors.white}
                width={14}
                height={14}
                strokeWidth={1.75}
              />
              <Text style={styles.textTeacher}>
                {formatProfessorName(data.description) ||
                  "Professeur indisponible"}
              </Text>
            </View>
          </View>
          <View style={styles.content}>
            <Clock
              stroke={colors.white}
              width={14}
              height={14}
              strokeWidth={1.75}
            />
            <Text style={styles.textTeacher}>
              Dans <Text style={styles.hourClock}>{remainingTime}</Text>
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
  const [color, setColor] = useState("#5088F3");
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
        width={slideWidth}
        height={slideHeight}
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
