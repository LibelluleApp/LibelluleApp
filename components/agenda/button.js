import React, { useContext } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Plus } from "./../../assets/icons/Icons";
import { ThemeContext } from "./../../utils/themeContext";
import TouchableScale from "react-native-touchable-scale";

function Button({ title, onPress, style }) {
  const { colors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    button: {
      flexDirection: "row",
      backgroundColor: colors.regular700,
      width: 50,
      height: 50,
      borderRadius: 50,
      marginTop: 10,
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      color: colors.white,
      fontSize: 16,
    },
  });

  return (
    <TouchableScale
      friction={6}
      activeScale={0.9}
      onPress={onPress}
      style={style}
    >
      <View style={styles.button}>
        <Plus stroke={colors.white} strokeWidth={1.75} width={25} height={25} />
      </View>
    </TouchableScale>
  );
}

export default Button;
