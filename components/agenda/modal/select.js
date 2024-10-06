import React, { useState, useContext } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-searchable-dropdown-kj";
import { ChevronDown } from "./../../../assets/icons/Icons";
import { ThemeContext } from "./../../../utils/themeContext";

const SelectComponent = ({ onChange, data, value }) => {
  const { colors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    dropdown: {
      backgroundColor: colors.white_background,
      borderWidth: 0.5,
      borderColor: colors.input_border,
      borderRadius: 10,
      height: 58,
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      fontSize: 15,
      fontFamily: "Ubuntu_400Regular",
      color: colors.blue950,
    },
    selectedTextStyle: {
      fontSize: 15,
      fontFamily: "Ubuntu_400Regular",
      color: colors.blue950,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 15,
      color: "#252525",
    },
    containerStyle: {
      borderWidth: 1,
      borderColor: colors.white_background,
      borderRadius: 10,
      backgroundColor: colors.white_background,
    },
  });

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      containerStyle={styles.containerStyle}
      data={data}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Choisir le type de tâche"
      value={value}
      onChange={onChange}
      renderRightIcon={() => (
        <ChevronDown
          stroke={colors.blue950}
          strokeWidth={1.75}
          width={18}
          height={18}
        />
      )}
    />
  );
};

export default SelectComponent;
