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
import NextCourse from "../components/home/nextCourse/nextCourse";
import AgendaHome from "../components/home/Agenda/agendaHome";
import ParcourirHome from "../components/home/Parcourir";
import { useAuth } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

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
  const today = moment();
  const dayIndex = today.format("ddd");
  const formattedDate = today.format("ddd D MMMM");
  const { signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setUser(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.topContainer}>
          <ShimmerPlaceHolder
            width={50}
            height={50}
            shimmerStyle={{ borderRadius: 100 }}
            visible={isLoading ? false : true}
          >
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.image}
            />
          </ShimmerPlaceHolder>

          <View style={styles.headerInfo}>
            <View style={styles.topContent}>
              <ShimmerPlaceHolder
                width={100}
                visible={isLoading ? false : true}
              >
                <Text
                  style={{
                    fontFamily: "Ubuntu_400Regular",
                    fontSize: 13,
                  }}
                >
                  Bonne journée,
                </Text>
              </ShimmerPlaceHolder>
              <ShimmerPlaceHolder
                width={150}
                height={20}
                visible={isLoading ? false : true}
              >
                <Text style={{ fontFamily: "Ubuntu_500Medium", fontSize: 17 }}>
                  {user.prenom}
                </Text>
              </ShimmerPlaceHolder>
            </View>
            <ShimmerPlaceHolder width={70} visible={isLoading ? false : true}>
              <Text
                style={{
                  fontFamily: "Ubuntu_500Medium",
                  color: "#0760FB",
                  fontSize: 15,
                }}
              >{`${formattedDate}`}</Text>
            </ShimmerPlaceHolder>
          </View>
        </View>
        <NextCourse />
        <AgendaHome />
        <ParcourirHome />
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4F5F9",
    fontFamily: "Ubuntu_400Regular",
    flex: 1,
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
    alignSelf: "center",
  },
  topContent: {
    flexDirection: "column",
  },
  headerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    alignItems: "center",
  },
});

export default Home;
