import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "./../../utils/themeContext";

function Input({
  label,
  placeholder,
  autoComplete,
  keyboardType,
  inputMode,
  secureTextEntry,
  onChangeText,
  placeholderTextColor,
}) {
  const { colors } = React.useContext(ThemeContext);

  const styles = StyleSheet.create({
    inputLabel: {
      fontFamily: "Ubuntu_500Medium",
      fontSize: 15,
      color: colors.black,
      marginTop: 25,
    },
    input: {
      backgroundColor: colors.white_background,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.white_background,
      marginTop: 5,
      paddingHorizontal: 20,
      paddingVertical: 15,
      fontFamily: "Ubuntu_400Regular",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        autoComplete={autoComplete}
        keyboardType={keyboardType}
        inputMode={inputMode}
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChangeText}
        placeholderTextColor={placeholderTextColor}
      />
    </View>
  );
}

export default Input;
