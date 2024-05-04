import React, { useRef, useState, useCallback, useMemo } from "react";
import { View, Pressable, Text, StyleSheet, Dimensions } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import moment from "moment";
import "moment/locale/fr"; // Importer la locale française

let screenWidth = Dimensions.get("window").width;

// Générer les jours entre le 1er septembre et le 10 juillet de l'année suivante
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

const Item = ({ animationValue, labelDate, labelDay, onPress }) => {
  const translateY = useSharedValue(0);

  const containerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animationValue.value,
      [-1, 0, 1],
      [0.5, 1, 0.5],
      Extrapolation.CLAMP
    );
    const borderWidth = interpolate(
      animationValue.value,
      [-1, 0, 1],
      [0, 1, 0],
      Extrapolation.CLAMP
    );
    return {
      opacity,
      borderWidth,
    };
  });

  const labelStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      animationValue.value,
      [-1, 0, 1],
      [1, 1.25, 1],
      Extrapolation.CLAMP
    );

    const color = interpolateColor(
      animationValue.value,
      [-1, 0, 1],
      ["#b6bbc0", "#0071fa", "#b6bbc0"]
    );

    return {
      transform: [{ scale }, { translateY: translateY.value }],
      color,
    };
  });

  const onPressIn = useCallback(() => {
    translateY.value = withTiming(-8, { duration: 250 });
  }, [translateY]);

  const onPressOut = useCallback(() => {
    translateY.value = withTiming(0, { duration: 250 });
  }, [translateY]);

  return (
    <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
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
        <Animated.Text style={styles.date}>{labelDate}</Animated.Text>
        <Animated.Text style={styles.day}>{labelDay}</Animated.Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
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
const getNextWeekday = (date) => {
  const dayOfWeek = date.isoWeekday();
  if (dayOfWeek === 6) {
    return date.add(2, "days"); // Sauter au lundi
  } else if (dayOfWeek === 7) {
    return date.add(1, "day"); // Sauter au lundi
  }
  return date;
};
const HeaderCarousel = () => {
  const carouselRef = useRef(null);
  const dates = useMemo(() => generateDates(), []); // Générer les dates entre le 1er septembre et le 10 juillet
  const currentDate = getNextWeekday(moment()); // Date actuelle
  const [currentIndex, setCurrentIndex] = useState(
    dates.findIndex((d) => d.fullDate.isSame(currentDate, "day"))
  );
  const [currentMonth, setCurrentMonth] = useState(
    dates[currentIndex].fullDate.format("MMMM") // Mois actuel
  );

  const itemWidth = screenWidth / 5 - 10; // Définir la largeur de chaque élément pour en afficher cinq

  // Mettre à jour le mois lorsque le carousel change
  const onSnapToItem = (index) => {
    setCurrentIndex(index);
    setCurrentMonth(dates[index].fullDate.format("MMMM")); // Mettre à jour le mois
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      {/* Afficher le mois actuel */}
      <Text
        style={{
          fontFamily: "Ubuntu_400Regular",
          fontSize: 15,
          color: "#252525",
          marginBottom: 10,
          textTransform: "capitalize",
        }}
      >
        {currentMonth}
      </Text>

      {/* Carousel */}
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
        data={dates}
        defaultIndex={currentIndex}
        onSnapToItem={onSnapToItem}
        windowSize={5}
        renderItem={({ item, animationValue }) => (
          <Item
            animationValue={animationValue}
            labelDate={item.date}
            labelDay={item.dayOfWeek}
            onPress={() =>
              carouselRef.current?.scrollTo({
                index: currentIndex,
                animated: true,
              })
            }
          />
        )}
      />
    </View>
  );
};

export default HeaderCarousel;
