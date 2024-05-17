import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

function ButtonAuth({ title, onPress, loading }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={loading}
    >
      <View style={styles.button}>
        {loading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>{title}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#0760FB",
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: 10,
    marginTop: 20,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Ubuntu_400Regular",
    color: "#FFF",
    fontSize: 16,
  },
});

export default ButtonAuth;
