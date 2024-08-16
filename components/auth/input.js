import React, { useContext, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { Eye, EyeSlash, Mail } from "./../../assets/icons/Icons";
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
  icon: IconComponent,
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
      height: 58,
      fontFamily: "Ubuntu_400Regular",
      paddingHorizontal: 45,
      color: colors.black,
    },

    iconRight: {
      position: "absolute",
      right: 10,
      top: 19.3 - 10, // Hauteur de l'input / 3 - padding
      padding: 10,
    },
    iconLeft: {
      zIndex: 1,
      position: "absolute",
      left: 15,
      top: 19.3, // Hauteur de l'input / 3
    },
  });

  const [securePasswordEntry, setSecurePasswordEntry] =
    useState(secureTextEntry);

  return (
    <View style={styles.container}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View>
        {IconComponent && (
          <IconComponent
            style={styles.iconLeft}
            stroke={colors.black}
            strokeWidth={1.75}
            width={18}
            height={18}
          />
        )}
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
            style={styles.iconRight}
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
