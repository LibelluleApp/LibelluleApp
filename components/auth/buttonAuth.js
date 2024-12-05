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
import TouchableScale from "react-native-touchable-scale";

function ButtonAuth({ title, onPress, loading }) {
  const { colors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      width: "100%",
    },
    button: {
      flexDirection: "row",
      backgroundColor: colors.regular700,
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
    <TouchableScale
      friction={6}
      activeScale={0.97}
      onPress={onPress}
      disabled={loading}
    >
      <View style={styles.container}>
        <View style={styles.button}>
          {loading ? (
            <ActivityIndicator size="small" color={colors.white} />
          ) : (
            <Text style={styles.buttonText}>{title}</Text>
          )}
        </View>
      </View>
    </TouchableScale>
  );
}

export default ButtonAuth;
