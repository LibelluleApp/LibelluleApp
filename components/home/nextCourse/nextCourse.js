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
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import { CustomPagination } from "./Pagination";
import { el } from "date-fns/locale";

const { width } = Dimensions.get("window");
const slideWidth = width * 0.9; // Largeur de la diapositive
const slideHeight = 90; // Hauteur de la diapositive
const data = [...new Array(2).keys()];
const onPressPagination = (index) => {
  ref.current?.scrollTo({
    /**
     * Calculate the difference between the current index and the target index
     * to ensure that the carousel scrolls to the nearest index
     */
    count: index - progress.value,
    animated: true,
  });
};

function ItemCourse({ hour, subject, teacher }) {
  return (
    <TouchableOpacity style={[styles.slide]}>
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
  const ref = React.useRef(null);
  const progress = useSharedValue(0);

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
          index === 0 ? <ItemCourse /> : <ItemInfo />
        }
      />

      <Pagination.Basic
        progress={progress}
        data={data}
        dotStyle={{ backgroundColor: "#619AFE", borderRadius: 50, height: 8 }}
        activeDotStyle={{ backgroundColor: "#0760FB", borderRadius: 50 }}
        containerStyle={{ gap: 5, marginTop: 10 }}
        onPress={onPressPagination}
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
