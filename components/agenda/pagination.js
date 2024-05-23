import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LeftArrowAgenda, RightArrowAgenda } from "../../assets/icons/Icons";

const PaginationHeader = ({ currentDay, onPrev, onNext, index }) => {
  return (
    <View style={styles.container}>
      {index > 0 && (
        <TouchableOpacity onPress={onPrev}>
          <LeftArrowAgenda fill="#252525" />
        </TouchableOpacity>
      )}
      {index === 0 && (
        <TouchableOpacity disabled={true}>
          <LeftArrowAgenda fill="#7A7C7C" />
        </TouchableOpacity>
      )}

      <Text style={styles.day}>{currentDay}</Text>
      <TouchableOpacity onPress={onNext}>
        <RightArrowAgenda fill="#252525" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#F4F5F9",
  },
  day: {
    fontSize: 15,
    fontFamily: "Ubuntu_500Medium",
  },
});

export default PaginationHeader;
