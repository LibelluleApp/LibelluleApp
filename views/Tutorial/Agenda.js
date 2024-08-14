import React, { useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const TutorialAgenda = () => {
  const navigation = useNavigation();
  const handleFirstVisit = async () => {
    try {
      await AsyncStorage.setItem("isFirstVisitAgenda", "false");
      navigation.navigate("Agenda");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View>
      <Text>Agenda</Text>
      <Button onPress={handleFirstVisit} title="Terminer le tutoriel" />
    </View>
  );
};

export default TutorialAgenda;
