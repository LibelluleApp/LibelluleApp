import React, { useContext } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Calendar, ChevronRight } from "../../assets/icons/Icons";
import { ThemeContext } from "./../../utils/themeContext";
import moment from "moment";
import TouchableScale from "react-native-touchable-scale";

function Mail({ email }) {
  const { colors } = useContext(ThemeContext);
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.white_background,
      borderRadius: 10,
      paddingHorizontal: 15,
      paddingVertical: 13,
      marginVertical: 10,
    },
    sender: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 13,
      color: colors.regular800,
      marginBottom: 5,
      textTransform: "capitalize",
    },
    subject: {
      fontFamily: "Ubuntu_500Medium",
      letterSpacing: -0.4,
      fontSize: 15,
      color: colors.regular950,
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
      letterSpacing: -0.4,
      fontSize: 13,
      color: colors.regular800,
    },
    action: {
      fontFamily: "Ubuntu_500Medium",
      letterSpacing: -0.4,
      fontSize: 13,
      color: colors.regular700,
    },
  });

  // Format date
  const date = moment(email.d).format("DD/MM/YYYY");

  // Extract email sender
  const from = email.e[email.e.length - 1]?.p;

  return (
    <TouchableScale
      friction={6}
      activeScale={0.97}
      onPress={() => navigation.navigate("MailDetail", { email })}
    >
      <View style={styles.container}>
        <Text style={styles.sender}>{from || email.e[0].a}</Text>
        <Text style={styles.subject}>{email.su}</Text>
        <View style={styles.bottom}>
          <View style={styles.bottomLeft}>
            <Calendar
              stroke={colors.regular800}
              strokeWidth={1.75}
              width={15}
              height={15}
            />
            <Text style={styles.date}>{date}</Text>
          </View>
          <View style={styles.bottomRight}>
            <Text style={styles.action}>Ouvrir</Text>
            <ChevronRight
              stroke={colors.regular700}
              strokeWidth={1.75}
              width={18}
              height={18}
            />
          </View>
        </View>
      </View>
    </TouchableScale>
  );
}

export default Mail;
