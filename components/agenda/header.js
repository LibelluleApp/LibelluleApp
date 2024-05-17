import React, { useRef, useEffect } from "react";
import { View, Pressable, Text, StyleSheet, Dimensions } from "react-native";
import Animated, {
  interpolate,
  Extrapolation,
  useAnimatedStyle,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import moment from "moment";
import "moment/locale/fr";

const screenWidth = Dimensions.get("window").width;

const HeaderCarousel = ({ currentIndex, setIndex, initialIndex, scrollX }) => {
  const carouselRef = useRef(null);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        index: currentIndex,
        animated: true,
        duration: 100,
      });
    }
  }, [currentIndex]);

  const handleSnapToItem = (index) => {
    if (index !== currentIndex) {
      setIndex(index);
    }
  };

  const Item = ({ labelDate, labelDay }) => {
    const containerStyle = useAnimatedStyle(() => {
      const opacity = interpolate(
        0,
        [-1, 0, 1],
        [0.5, 1, 0.5],
        Extrapolation.CLAMP
      );
      const borderWidth = interpolate(
        0,
        [-1, 0, 1],
        [0, 1, 0],
        Extrapolation.CLAMP
      );
      return {
        opacity,
        borderWidth,
      };
    });

    // const labelStyle = useAnimatedStyle(() => {
    //   const scale = interpolate(
    //     scrollX.value,
    //     [-1, 0, 1],
    //     [1, 1.25, 1],
    //     Extrapolation.CLAMP
    //   );

    //   const color = interpolateColor(
    //     scrollX.value,
    //     [-1, 0, 1],
    //     ["#b6bbc0", "#0071fa", "#b6bbc0"]
    //   );

    //   return {
    //     transform: [{ scale }, { translateY: translateY.value }],
    //     color,
    //   };
    // });

    return (
      <Pressable onPress={() => {}}>
        <Animated.View
          style={[
            {
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              borderColor: "black",
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
              marginHorizontal: 5,
            },
            containerStyle,
          ]}
        >
          <Text style={styles.date}>{labelDate}</Text>
          <Text style={styles.day}>{labelDay}</Text>
        </Animated.View>
      </Pressable>
    );
  };

  return (
    <View style={{ alignItems: "center" }}>
      <Carousel
        ref={carouselRef}
        loop={false}
        style={{
          width: screenWidth,
          height: 70,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
        }}
        width={70}
        data={generateDates()}
        defaultIndex={initialIndex}
        onSnapToItem={handleSnapToItem}
        windowSize={5}
        scrollAnimationDuration={100}
        renderItem={({ item }) => (
          <Item labelDate={item.date} labelDay={item.dayOfWeek} />
        )}
      />
    </View>
  );
};

const generateDates = () => {
  const startDate = moment("2023-09-01").locale("fr");
  const endDate = moment("2024-07-10").locale("fr");
  const dates = [];

  let current = startDate.clone();
  while (current.isSameOrBefore(endDate)) {
    const dayOfWeek = current.isoWeekday(); // 1 (lundi) à 7 (dimanche)

    // Vérifiez si le jour n'est pas un week-end (samedi ou dimanche)
    if (dayOfWeek !== 6 && dayOfWeek !== 7) {
      dates.push({
        date: current.format("D"),
        fullDate: current.clone(),
        dayOfWeek: current.format("ddd"),
      });
    }
    current.add(1, "day"); // Passer au jour suivant
  }
  return dates;
};

const styles = StyleSheet.create({
  item: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
  },
  date: {
    fontSize: 20,
    fontFamily: "Ubuntu_500Medium",
    color: "#252525",
  },
  day: {
    fontSize: 15,
    fontFamily: "Ubuntu_400Regular",
    color: "#252525",
  },
});

export default HeaderCarousel;
