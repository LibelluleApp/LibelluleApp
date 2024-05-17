import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TimetableSmall, LeftArrow } from "../../assets/icons/Icons";

function Mail() {
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
          <TimetableSmall fill="#252525" />
          <Text style={styles.date}>01 avr.</Text>
        </View>
        <View style={styles.bottomRight}>
          <Text style={styles.action}>Ouvrir</Text>
          <LeftArrow />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 13,
    marginVertical: 5,
  },
  sender: {
    fontFamily: "Ubuntu_400Regular",
    fontSize: 13,
    color: "#7A797C",
    marginBottom: 5,
  },
  subject: {
    fontFamily: "Ubuntu_500Medium",
    fontSize: 15,
    color: "#252525",
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  bottomLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  bottomRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  date: {
    fontFamily: "Ubuntu_400Regular",
    fontSize: 13,
    color: "#252525",
  },
  action: {
    fontFamily: "Ubuntu_400Regular",
    fontSize: 13,
    color: "#252525",
  },
});

export default Mail;
