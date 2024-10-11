import React, { useContext, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BookOpen, Student, Utensils, Link } from "../../assets/icons/Icons";
import { ScrollView } from "react-native-gesture-handler";
import { ThemeContext } from "./../../utils/themeContext";
import {getUserData} from "../../utils/storage";

function ParcourirHome() {
  const { colors } = useContext(ThemeContext);
  const [user, setUser] = React.useState({});

  useEffect(() => {
    const getData = () => {
      try {
        const value = getUserData();
        setUser(value);
      } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
      }
    };
  getData();
  }, []);

  const styles = StyleSheet.create({
    container: {
      fontFamily: "Ubuntu_400Regular",
      alignSelf: "center",
      width: "90%",
      marginHorizontal: "auto",
      marginTop: 22,
      marginBottom: 15,
    },
    title: {
      fontFamily: "Ubuntu_500Medium",
      fontSize: 15,
      color: colors.blue950,
      marginBottom: 14,
    },
    tile: {
      backgroundColor: colors.white_background,
      width: "47%",
      borderRadius: 10,
      paddingHorizontal: 17,
      paddingVertical: 13,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
    },
    tileText: {
      fontFamily: "Ubuntu_500Medium",
      fontSize: 13,
      color: colors.blue800,
    },
    disabled: {
      opacity: 0.4,
    },
  });

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parcourir</Text>
      {/* <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ alignSelf: "center" }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("liensExterne")}
          style={styles.tile}
        >
          <Link
            stroke={colors.blue950}
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
            stroke={colors.blue950}
            width={20}
            height={20}
            strokeWidth={1.75}
          />
          <Text style={styles.tileText}>Menu</Text>
        </TouchableOpacity>
        {user?.groupe_id?.includes("UI") && (
          <TouchableOpacity
            style={[styles.tile, styles.disabled]}
            onPress={() => navigation.navigate("Scolarite")}
            disabled={true}
          >
            <BookOpen
              stroke={colors.blue950}
              width={20}
              height={20}
              strokeWidth={1.75}
            />
            <Text style={styles.tileText}>Scolarité</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.tile, styles.disabled]}
          disabled={true}
        >
          <Student
            color={colors.blue950}
            width={20}
            height={20}
            strokeWidth={1.75}
          />
          <Text style={styles.tileText}>Ma Promo</Text>
        </TouchableOpacity>
      </ScrollView> */}
      <View
        style={{
          flexDirection: "row",
          gap: 15,
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("liensExterne")}
          style={styles.tile}
        >
          <Link
            stroke={colors.blue800}
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
            stroke={colors.blue800}
            width={20}
            height={20}
            strokeWidth={1.75}
          />
          <Text style={styles.tileText}>Menu</Text>
        </TouchableOpacity>
        {/* {user?.groupe_id?.includes("UI") && (
          <TouchableOpacity
            style={[styles.tile, styles.disabled]}
            onPress={() => navigation.navigate("Scolarite")}
            disabled={true}
          >
            <BookOpen
              stroke={colors.blue950}
              width={20}
              height={20}
              strokeWidth={1.75}
            />
            <Text style={styles.tileText}>Scolarité</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.tile, styles.disabled]}
          disabled={true}
        >
          <Student
            color={colors.blue950}
            width={20}
            height={20}
            strokeWidth={1.75}
          />
          <Text style={styles.tileText}>Ma Promo</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

export default ParcourirHome;
