import React, { useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import TouchableScale from "react-native-touchable-scale";
import { ThemeContext } from "./../../utils/themeContext";

function ButtonAuth({ title, onPress, loading, disabled }) {
  const { colors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      width: "100%",
    },
    button: {
      flexDirection: "row",
      backgroundColor: disabled
          ? colors.regular300
          : colors.regular700,
      paddingHorizontal: 20,
      paddingVertical: 11,
      borderRadius: 10,
      width: "100%",
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
      opacity: disabled ? 0.6 : 1,
    },
    buttonText: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      color: colors.white,
      fontSize: 17,
    },
  });

  return (
      <TouchableScale
          friction={6}
          activeScale={0.97}
          onPress={onPress}
          disabled={disabled || loading}
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
