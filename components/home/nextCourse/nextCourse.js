import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Location, PeopleFill, Clock } from "../../../assets/icons/Icons";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import fetchNextCourse from "../../../api/Timetable/nextcourse";
import { getRessourceColor } from "../../../utils/ressources/colorsRessources";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { el } from "date-fns/locale";

const { width } = Dimensions.get("window");
const slideWidth = width * 0.9; // Largeur de la diapositive
const slideHeight = 90; // Hauteur de la diapositive
const data = [...new Array(2).keys()];

const fetchCourse = async () => {
  try {
    const response = await fetchNextCourse();
    return response;
  } catch (error) {
    console.error("Error fetching next course:", error);
    return null; // Return null in case of error
  }
};

const fetchColor = async (data) => {
  try {
    const response = await getRessourceColor(data.title);
    return response;
  } catch (error) {
    console.error("Error fetching next course:", error);
    return null; // Return null in case of error
  }
};

function ItemCourse({ data, color }) {
  if (!data) {
    return (
      <View style={[styles.slide, styles.placeholder]}>
        <Text style={styles.placeholderText}>Loading...</Text>
      </View>
    );
  }
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const targetTime = new Date(data.dtstart_tz).getTime();
      const now = Date.now();
      const remainingTime = targetTime - now;

      if (remainingTime <= 0) {
        setRemainingTime("maintenant");
        return;
      }

      const hours = Math.floor(remainingTime / 3600000);
      const minutes = Math.floor((remainingTime % 3600000) / 60000);
      const seconds = Math.floor((remainingTime % 60000) / 1000);

      setRemainingTime(`${hours}h ${minutes}m ${seconds}s`);
      if (hours === 0 && minutes === 0) {
        setRemainingTime(`${seconds}s`);
      } else if (hours === 0) {
        setRemainingTime(`${minutes}m ${seconds}s`);
      }
    };

    calculateTimeRemaining(); // Call once immediately

    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [data]);

  return (
    <TouchableOpacity style={[styles.slide]}>
      <View style={[styles.container, color && { backgroundColor: color }]}>
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
              <Location />
              <Text style={styles.textTeacher}>{data.lieu || "N/C"}</Text>
            </View>
            <View style={styles.content}>
              <PeopleFill />
              <Text style={styles.textTeacher}>
                {data.description || "Professeur indisponible"}
              </Text>
            </View>
          </View>
          <View style={styles.content}>
            <Clock />
            <Text style={styles.textTeacher}>
              Dans <Text style={styles.hourClock}>{remainingTime}</Text>
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function ItemInfo() {
  return (
    <View style={[infos.slide]}>
      <Text style={infos.title}>Informations</Text>
      <View style={infos.content}>
        <Text style={infos.textContent}>•</Text>
        <Text style={infos.textContent}>
          01/04 au 05/04 : Vous êtes le propriétaire du cahier.
        </Text>
      </View>
    </View>
  );
}

function NextCourse() {
  const ref = useRef(null);
  const progress = useSharedValue(0);
  const [nextCourse, setNextCourse] = useState(null);
  const [color, setColor] = useState("#5088F3");
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchCourse().then((response) => {
      setNextCourse(response);
      fetchColor(response).then((color) => {
        setColor(color);
      });
    });
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchCourse().then((response) => {
        setNextCourse(response);
        fetchColor(response).then((color) => {
          setColor(color);
        });
      });
    }
  }, [isFocused]);

  return (
    <View style={styles.swiper}>
      <Carousel
        ref={ref}
        width={slideWidth}
        height={slideHeight}
        data={data}
        loop={false}
        onProgressChange={progress}
        renderItem={({ index }) =>
          index === 0 ? (
            <ItemCourse data={nextCourse} color={color} />
          ) : (
            <ItemInfo />
          )
        }
      />

      <Pagination.Basic
        progress={progress}
        data={data}
        dotStyle={{ backgroundColor: "#619AFE", borderRadius: 50, height: 8 }}
        activeDotStyle={{ backgroundColor: "#0760FB", borderRadius: 50 }}
        containerStyle={{ gap: 5, marginTop: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  swiper: {
    width: "90%",
    alignSelf: "center",
  },
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
    color: "#fff",
  },
  stick: {
    backgroundColor: "#fff",
    height: "90%",
    width: 1,
    marginHorizontal: 14,
  },
  textSubject: {
    fontFamily: "Ubuntu_500Medium",
    includeFontPadding: false,
    fontSize: 17,
    color: "#fff",
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
    color: "#fff",
    gap: 10,
  },
  contentLeft: {
    gap: 5,
    justifyContent: "center",
  },
  hourClock: {
    fontFamily: "Ubuntu_500Medium",
    includeFontPadding: false,
    fontSize: 14,
    color: "#fff",
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
    color: "#999",
    fontSize: 16,
  },
});

const infos = StyleSheet.create({
  slide: {
    height: slideHeight,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
  },
  title: {
    fontFamily: "Ubuntu_500Medium",
    fontSize: 13,
    color: "#252525",
  },
  content: {
    marginTop: 10,
    flexDirection: "row",
    gap: 5,
  },
  textContent: {
    fontFamily: "Ubuntu_400Regular",
    fontSize: 13,
    color: "#535353",
  },
});

export default NextCourse;