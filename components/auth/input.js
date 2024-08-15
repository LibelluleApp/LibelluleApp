import React, { useContext, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { Eye, EyeSlash } from "./../../assets/icons/Icons";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "./../../utils/themeContext";
import { set } from "date-fns";

function Input({
  label,
  placeholder,
  autoComplete,
  keyboardType,
  inputMode,
  onChangeText,
  secureTextEntry,
  placeholderTextColor,
}) {
  const { colors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      gap: 5,
      width: "100%",
    },
    inputLabel: {
      fontFamily: "Ubuntu_500Medium",
      fontSize: 15,
      color: colors.black,
    },
    input: {
      backgroundColor: colors.white_background,
      borderRadius: 10,
      borderWidth: 0.5,
      borderColor: colors.input_border,
      paddingHorizontal: 20,
      paddingVertical: 15,
      fontFamily: "Ubuntu_400Regular",
      paddingRight: 40,
    },
    icon: {
      position: "absolute",
      right: 10,
      top: 7,
      padding: 10,
    },
  });

  const [securePasswordEntry, setSecurePasswordEntry] =
    useState(secureTextEntry);

  return (
    <View style={styles.container}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View>
        <TextInput
          secureTextEntry={securePasswordEntry}
          autoComplete={autoComplete}
          keyboardType={keyboardType}
          inputMode={inputMode}
          style={styles.input}
          placeholder={placeholder}
          onChangeText={onChangeText}
          placeholderTextColor={placeholderTextColor}
        />
        {autoComplete === "password" && (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setSecurePasswordEntry(!securePasswordEntry)}
          >
            {securePasswordEntry ? (
              <EyeSlash color={colors.grey} />
            ) : (
              <Eye color={colors.grey} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default Input;
