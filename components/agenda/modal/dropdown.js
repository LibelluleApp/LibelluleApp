import React, { useState, useContext } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-searchable-dropdown-kj";
import { ChevronUpDown } from "./../../../assets/icons/Icons";
import { ThemeContext } from "./../../../utils/themeContext";

const DropdownComponent = ({ onChange, data, value }) => {
  const { colors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    dropdown: {
      backgroundColor: colors.white_background,
      borderWidth: 0.5,
      borderColor: colors.input_border,
      borderRadius: 10,
      height: 45,
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    placeholderStyle: {
      fontSize: 15,
      fontFamily: "Ubuntu_400Regular",
      color: colors.black,
    },
    selectedTextStyle: {
      fontSize: 15,
      fontFamily: "Ubuntu_400Regular",
      color: colors.black,
    },
    iconStyle: {
      width: 20,
      height: 20,
      backgroundColor: colors.black,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 15,
      color: colors.black,
      borderBottomColor: colors.input_border,
      fontFamily: "Ubuntu_400Regular",
    },
    containerStyle: {
      borderWidth: 1,
      borderColor: colors.input_border,
      borderRadius: 10,
      backgroundColor: colors.white_background,
    },
  });

  return (
    <Dropdown
      style={styles.dropdown}
      activeColor={colors.white_background}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      containerStyle={styles.containerStyle}
      data={data}
      search={true}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Choisir une matière"
      searchPlaceholder="Rechercher ..."
      value={value}
      onChange={onChange}
      renderRightIcon={() => (
        <ChevronUpDown
          stroke={colors.black}
          strokeWidth={1.75}
          width={18}
          height={18}
        />
      )}
    />
  );
};

export default DropdownComponent;
