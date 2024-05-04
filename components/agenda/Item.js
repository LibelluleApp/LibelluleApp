import React, { useCallback } from "react";
import { Pressable, StyleSheet } from "react-native";
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

  const styles = StyleSheet.create({
    container: {
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
    },
    day: {
      fontSize: 15,
      fontFamily: "Ubuntu_400Regular",
    },
  });

  return (
    <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View style={[styles.container, containerStyle]}>
        <Animated.Text style={labelStyle}>{labelDate}</Animated.Text>
        <Animated.Text style={labelStyle}>{labelDay}</Animated.Text>
      </Animated.View>
    </Pressable>
  );
};

export default Item;
