import React, { useContext } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Calendar, ChevronRight } from "../../assets/icons/Icons";
import { ThemeContext } from "./../../utils/themeContext";

function Mail() {
  const { colors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.white_background,
      borderRadius: 10,
      paddingHorizontal: 15,
      paddingVertical: 13,
      marginVertical: 5,
    },
    sender: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 13,
      color: colors.grey,
      marginBottom: 5,
    },
    subject: {
      fontFamily: "Ubuntu_500Medium",
      fontSize: 15,
      color: colors.black,
    },
    bottom: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
    },
    bottomLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
    },
    bottomRight: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
    },
    date: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 13,
      color: colors.black,
    },
    action: {
      fontFamily: "Ubuntu_500Medium",
      fontSize: 13,
      color: colors.black,
    },
  });

  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("MailDetail")}
    >
      <Text style={styles.sender}>Pierre Martin</Text>
      <Text style={styles.subject}>Objet du mail</Text>
      <View style={styles.bottom}>
        <View style={styles.bottomLeft}>
          <Calendar
            stroke={colors.black}
            strokeWidth={1.75}
            width={15}
            height={15}
          />
          <Text style={styles.date}>01 avr.</Text>
        </View>
        <View style={styles.bottomRight}>
          <Text style={styles.action}>Ouvrir</Text>
          <ChevronRight
            stroke={colors.black}
            strokeWidth={1.75}
            width={18}
            height={18}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default Mail;
