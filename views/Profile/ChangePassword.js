import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ThemeContext } from "../../utils/themeContext";

const { colors } = useContext(ThemeContext);

const ChangePassword = () => {
  return (
    <View style={styles.container}>
      <Text>Change Password</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
});

export default ChangePassword;
