import React from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Book, Student, Meal, Links } from "../../assets/icons/Icons";
import { ScrollView } from "react-native-gesture-handler";

function ParcourirHome() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parcourir</Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.tilesContainer}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("liensExterne")}
          style={styles.tile}
        >
          <Links />
          <Text style={styles.tileText}>Liens</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Restauration")}
          style={styles.tile}
        >
          <Meal />
          <Text style={styles.tileText}>Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tile}
          onPress={() => navigation.navigate("Scolarite")}
        >
          <Book />
          <Text style={styles.tileText}>Scolarité</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tile}>
          <Student />
          <Text style={styles.tileText}>Mon TP</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: "Ubuntu_400Regular",
    alignSelf: "center",
    width: "100%",
    paddingLeft: "5%",
    marginTop: 22,
    marginBottom: 15,
  },
  title: {
    fontFamily: "Ubuntu_500Medium",
    fontSize: 17,
    color: "#7A797C",
    marginBottom: 14,
  },
  tile: {
    backgroundColor: "#FFFFFF",
    width: 90,
    borderRadius: 10,
    paddingHorizontal: 17,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginRight: 10,
  },
  tileText: {
    fontFamily: "Ubuntu_400Regular",
    color: "#252525",
  },
});

export default ParcourirHome;
