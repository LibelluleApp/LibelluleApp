import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
  Platform,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { format, getDay } from "date-fns";
import { fr } from "date-fns/locale";
import NextCourse from "../components/home/nextCourse";
import AgendaHome from "../components/home/agendaHome";
import ParcourirHome from "../components/home/Parcourir";
import { useAuth } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const daysOfWeek = [
  "dimanche",
  "lundi",
  "mardi",
  "mercredi",
  "jeudi",
  "vendredi",
  "samedi",
];

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("user_data");
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

function Home() {
  const [user, setUser] = useState({});
  const today = new Date();
  const dayIndex = getDay(today);
  const formattedDate = format(today, "d MMMM", { locale: fr });
  const { signOut } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setUser(data);
    };

    fetchData();
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.topContainer}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.image}
          />
          <View>
            <Text
              style={{
                fontFamily: "Ubuntu_400Regular",
                fontSize: 17,
              }}
            >
              Bonjour{" "}
              <Text style={{ fontFamily: "Ubuntu_500Medium" }}>
                {user.prenom}
              </Text>
            </Text>
            <Text
              style={{
                fontFamily: "Ubuntu_400Regular",
                fontSize: 15,
              }}
            >
              Nous sommes le{" "}
              <Text
                style={{ fontFamily: "Ubuntu_500Medium" }}
              >{`${daysOfWeek[dayIndex]} ${formattedDate}`}</Text>
            </Text>
          </View>
        </View>
        <NextCourse />
        <AgendaHome />
        <ParcourirHome />
        <Button title="Se déconnecter" onPress={signOut} />
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4F5F9",
    fontFamily: "Ubuntu_400Regular",
  },
  image: {
    width: 50,
    height: 50,
  },
  topContainer: {
    flexDirection: "row",
    width: "90%",
    paddingVertical: 25,
    gap: 11,
    alignItems: "center",
    alignSelf: "center",
  },
});

export default Home;
