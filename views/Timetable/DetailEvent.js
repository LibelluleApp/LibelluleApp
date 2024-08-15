import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { ThemeContext } from "../../utils/themeContext";

const DetailEvent = ({ route }) => {
  const { colors } = useContext(ThemeContext);
  const event = route.params.event;
  console.log(event);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },
  });
  return (
    <View style={styles.container}>
      <View>
        <Text>{event.title}</Text>
        <Text>{event.description}</Text>
        <Text>{event.date}</Text>
        <Text>{event.time}</Text>
      </View>
      <View></View>
    </View>
  );
};

export default DetailEvent;
