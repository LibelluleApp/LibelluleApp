import React, { useRef, useCallback } from "react";
import { View, StyleSheet, Dimensions, Text, Pressable } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

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
      [-1, -0.5, 0, 0.5, 1],
      [0, 0.2, 1, 0.2, 0],
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
        <Text style={styles.date}>{labelDate}</Text>
        <Text style={styles.day}>{labelDay}</Text>
      </Animated.View>
    </Pressable>
  );
};

const HeaderCarousel = ({
  currentIndex,
  setIndex,
  initialIndex,
  scrollX,
  data,
}) => {
  const carouselRef = useRef(null);
  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={{ flex: 0.2 }}>
      <Carousel
        ref={carouselRef}
        style={{
          width: screenWidth,
          height: 70,
          justifyContent: "center",
        }}
        width={70}
        data={data}
        loop={false}
        defaultIndex={initialIndex}
        onSnapToItem={setIndex}
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
