import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Location, PeopleFill, Clock } from "../../../assets/icons/Icons";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { CustomPagination } from "./Pagination";

const { width } = Dimensions.get("window");
const slideWidth = width * 0.9; // Largeur de la diapositive
const slideHeight = 90; // Hauteur de la diapositive

function NextCourse() {
  return (
    <View style={styles.swiper}>
      <SwiperFlatList
        showPagination
        style={{ overHorizontal: "never" }}
        loop={false}
        PaginationComponent={CustomPagination}
      >
        {/* Première diapositive */}
        <TouchableOpacity style={[styles.slide, { width: slideWidth }]}>
          <View style={styles.container}>
            <View style={styles.hour}>
              <Text style={styles.textHour}>16:30</Text>
              <Text style={styles.textHour}>18:00</Text>
            </View>
            <View style={styles.stick}></View>
            <View style={styles.contentLeft}>
              <Text style={styles.textSubject}>Anglais</Text>
              <View style={styles.teacher}>
                <View style={styles.content}>
                  <Location />
                  <Text style={styles.textTeacher}>MMI311</Text>
                </View>
                <View style={styles.content}>
                  <PeopleFill />
                  <Text style={styles.textTeacher}>C.Mercier</Text>
                </View>
              </View>
              <View style={styles.content}>
                <Clock />
                <Text style={styles.textTeacher}>
                  Dans <Text style={styles.hourClock}>44 minutes</Text>
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/* Deuxième diapositive avec des informations supplémentaires */}
        <TouchableOpacity style={[styles.slide, { width: slideWidth }]}>
          <View style={styles.container}>
            <View style={styles.hour}>
              <Text style={styles.textHour}>18:00</Text>
            </View>
            <View style={styles.stick}></View>
            <View style={styles.contentLeft}>
              <Text style={styles.textSubject}>Mathématiques</Text>
              <View style={styles.teacher}>
                <View style={styles.content}>
                  <Location />
                  <Text style={styles.textTeacher}>Salle 203</Text>
                </View>
                <View style={styles.content}>
                  <PeopleFill />
                  <Text style={styles.textTeacher}>Professeur X</Text>
                </View>
              </View>
              <View style={styles.content}>
                <Clock />
                <Text style={styles.textTeacher}>
                  Dans{" "}
                  <Text style={styles.hourClock}>1 heure et 15 minutes</Text>
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </SwiperFlatList>
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
    marginBottom: 10, // Espacement entre les diapositives
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
});

export default NextCourse;
