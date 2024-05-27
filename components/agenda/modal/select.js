import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-searchable-dropdown-kj";
import { BottomArrow } from "./../../../assets/icons/Icons";

const data = [
  { label: "Tâche à faire", value: "task" },
  { label: "Évaluation", value: "eval" },
];

const SelectComponent = () => {
  const [value, setValue] = useState(null);

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
      onChange={(item) => {
        setValue(item.value);
      }}
      renderRightIcon={() => <BottomArrow />}
    />
  );
};

export default SelectComponent;

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#252525",
    borderRadius: 10,
    height: 45,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 15,
    fontFamily: "Ubuntu_400Regular",
    color: "#252525",
  },
  selectedTextStyle: {
    fontSize: 15,
    fontFamily: "Ubuntu_400Regular",
    color: "#252525",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 15,
    color: "#252525",
    borderBottomColor: "#252525",
  },
  containerStyle: {
    borderWidth: 1,
    borderColor: "#252525",
    borderRadius: 10,
  },
});
