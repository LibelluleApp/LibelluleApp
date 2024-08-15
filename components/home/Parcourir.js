import React, { useContext } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BookOpen, Student, Utensils, Link } from "../../assets/icons/Icons";
import { ScrollView } from "react-native-gesture-handler";
import { ThemeContext } from "./../../utils/themeContext";

function ParcourirHome() {
  const { colors } = useContext(ThemeContext);

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
      fontSize: 15,
      color: colors.grey,
      marginBottom: 14,
    },
    tile: {
      backgroundColor: colors.white_background,
      width: 100,
      borderRadius: 10,
      paddingHorizontal: 17,
      paddingVertical: 10,
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      marginRight: 10,
    },
    tileText: {
      fontFamily: "Ubuntu_500Medium",
      fontSize: 13,
      color: colors.black,
    },
    disabled: {
      opacity: 0.4,
    },
  });

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
          <Link
            stroke={colors.black}
            width={20}
            height={20}
            strokeWidth={1.75}
          />
          <Text style={styles.tileText}>Liens</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Restauration")}
          style={styles.tile}
        >
          <Utensils
            stroke={colors.black}
            width={20}
            height={20}
            strokeWidth={1.75}
          />
          <Text style={styles.tileText}>Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tile}
          onPress={() => navigation.navigate("Scolarite")}
        >
          <BookOpen
            stroke={colors.black}
            width={20}
            height={20}
            strokeWidth={1.75}
          />
          <Text style={styles.tileText}>Scolarité</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tile, styles.disabled]}
          disabled={true}
        >
          <Student
            color={colors.black}
            width={20}
            height={20}
            strokeWidth={1.75}
          />
          <Text style={styles.tileText}>Ma Promo</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default ParcourirHome;
