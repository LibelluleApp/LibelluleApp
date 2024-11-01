import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ArrowLeft, ArrowRight } from "../../../assets/icons/Icons";

const PaginationHeader = ({
  currentDate,
  onPrev,
  onNext,
  index,
  returnToday,
  defaultIndex,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {index > 0 && (
          <TouchableOpacity
            onPress={onPrev}
            style={styles.around}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            <ArrowLeft
              stroke={colors.regular950}
              strokeWidth={1.75}
              width={18}
              height={18}
            />
          </TouchableOpacity>
        )}
        {index === 0 && (
          <TouchableOpacity
            disabled={true}
            style={styles.around}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            <ArrowLeft
              stroke={colors.grey}
              strokeWidth={1.75}
              width={18}
              height={18}
            />
          </TouchableOpacity>
        )}

        <Text style={styles.day}>{currentDate}</Text>
        <TouchableOpacity
          onPress={onNext}
          style={styles.around}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <ArrowRight
            stroke={colors.regular950}
            strokeWidth={1.75}
            width={18}
            height={18}
          />
        </TouchableOpacity>
      </View>
      {index !== defaultIndex && (
        <TouchableOpacity onPress={returnToday} style={styles.btntoday}>
          <Text style={styles.return}>Revenir à aujourd'hui</Text>
        </TouchableOpacity>
      )}
      {index === defaultIndex && (
        <TouchableOpacity
          onPress={returnToday}
          style={{ opacity: 0 }}
          disabled={true}
        >
          <Text style={styles.return}>Revenir à aujourd'hui</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#F4F5F9",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "#F4F5F9",
  },
  day: {
    fontSize: 15,
    fontFamily: "Ubuntu_500Medium",
    letterSpacing: -0.4,
  },
  btntoday: {
    alignItems: "center",
  },
  around: {
    padding: 10,
  },
  return: {
    fontSize: 15,
    fontFamily: "Ubuntu_500Medium",
    letterSpacing: -0.4,
    color: "#7A797C",
    paddingHorizontal: 24,

    alignItems: "center",
    textDecorationLine: "underline",
  },
});

export default PaginationHeader;
