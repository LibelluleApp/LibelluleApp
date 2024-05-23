import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
  ScrollView,
} from "react-native";
import { People } from "../../assets/icons/Icons";

function MailDetail() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <View style={styles.mailContent}>
        <Text style={styles.subject}>
          Journée portes ouvertes - Samedi 10 février 2024
        </Text>
        <Text style={styles.body}>
          Bonjour à toutes et à tous,{"\n"}
          {"\n"}Ce samedi 10 février, l'IUT ouvre ses portes et accueillera les
          familles de 9h30 à 17h, sans interruption.
          {"\n"}
          {"\n"}L'entrée unique, pour les visiteurs, se fera par le portail
          situé en face du Crousty où ils seront accueillis dans un premier
          temps par des personnels des services communs (distribution de
          bracelets, administration d'un questionnaire) puis par des étudiants
          "navettes" qui les accompagneront jusqu'aux départements pour démarrer
          les visites.{"\n"}
          {"\n"}Comme indiqué précédemment par Isabelle, le portail pour accéder
          au parking avenue de Varsovie sera ouvert de 8h00 à 9h00 puis à partir
          de 12h30 jusqu'à 13h00, le tout sous le contrôle d'un personnel du
          service logistique et maintenance.{"\n"}
          {"\n"}N'hésitez pas à revenir vers moi pour toutes questions.{"\n"}
          {"\n"}Cordialement,{"\n"}Pierre
        </Text>
      </View>
      <View style={styles.mailSender}>
        <People fill="#252525" />
        <Text style={styles.sender}>Pierre Martin</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4F5F9",
    flex: 1,
  },
  mailContent: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    width: "90%",
    marginTop: 20,
    padding: 15,
  },
  subject: {
    fontFamily: "Ubuntu_500Medium",
    fontSize: 15,
    color: "#252525",
    marginBottom: 15,
  },
  body: {
    fontFamily: "Ubuntu_400Regular",
    fontSize: 15,
    color: "#252525",
  },
  mailSender: {
    width: "90%",
    marginTop: 20,
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  sender: {
    fontFamily: "Ubuntu_400Regular",
    fontSize: 15,
    color: "#252525",
  },
});

export default MailDetail;