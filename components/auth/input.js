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

function Input({
  label,
  placeholder,
  autoComplete,
  keyboardType,
  inputMode,
  secureTextEntry,
  onChangeText,
}) {
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputLabel: {
    fontFamily: "Ubuntu_500Medium",
    fontSize: 15,
    color: "#252525",
    marginTop: 25,
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#7A797C",
    marginTop: 5,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontFamily: "Ubuntu_400Regular",
  },
});

export default Input;
