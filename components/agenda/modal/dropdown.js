import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-searchable-dropdown-kj";
import { SearchArrows } from "./../../../assets/icons/Icons";

const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];

const DropdownComponent = () => {
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
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Choisir une matière"
      searchPlaceholder="Rechercher ..."
      value={value}
      onChange={(item) => {
        setValue(item.value);
      }}
      renderRightIcon={() => <SearchArrows />}
    />
  );
};

export default DropdownComponent;

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
