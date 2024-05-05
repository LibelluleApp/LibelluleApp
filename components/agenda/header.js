import React, {
  useRef,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
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
const HeaderCarousel = ({ currentIndex, setIndex, initialIndex }) => {
  const carouselRef = useRef(null);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        index: currentIndex,
        animated: true, // Animer le défilement
        duration: 100, // Durée de l'animation
      });
    }
  }, [currentIndex]); // Déplacer le carrousel lorsqu'un nouvel index est défini

  const handleSnapToItem = (index) => {
    if (index !== currentIndex) {
      setIndex(index); // Mettre à jour l'état lorsque l'utilisateur fait défiler
    }
  };
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
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
        renderItem={({ item, animationValue }) => (
          <Item
            animationValue={animationValue}
            labelDate={item.date}
            labelDay={item.dayOfWeek}
          />
        )}
      />
    </View>
  );
};

export default HeaderCarousel;
