import React, { useContext } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "./../../utils/themeContext";

function ButtonAuth({ title, onPress, loading }) {
  const { colors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      width: "100%",
    },
    button: {
      flexDirection: "row",
      backgroundColor: colors.blue700,
      paddingHorizontal: 20,
      paddingVertical: 11,
      borderRadius: 10,
      width: "100%",
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      color: colors.white,
      fontSize: 17,
      letterSpacing: -0.4,
    },
  });

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={loading}
    >
      <View style={styles.button}>
        {loading ? (
          <ActivityIndicator size="small" color={colors.white} />
        ) : (
          <Text style={styles.buttonText}>{title}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default ButtonAuth;
