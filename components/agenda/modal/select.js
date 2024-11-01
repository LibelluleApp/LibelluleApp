import React, { useState, useContext, useRef, useEffect } from "react";
import { StyleSheet, Animated, Easing } from "react-native";
import { Dropdown } from "react-native-searchable-dropdown-kj";
import { ChevronDown } from "./../../../assets/icons/Icons";
import { ThemeContext } from "./../../../utils/themeContext";

const SelectComponent = ({ onChange, data, value }) => {
  const { colors } = useContext(ThemeContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Valeur animée pour la rotation
  const rotateValue = useRef(new Animated.Value(0)).current;

  // Déclencher l'animation de rotation
  const rotateChevron = (open) => {
    Animated.timing(rotateValue, {
      toValue: open ? 1 : 0, // 1 pour ouvert (180 degrés), 0 pour fermé (0 degré)
      duration: 250,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  // Rotation interpolée en fonction de l'état du menu déroulant
  const chevronRotation = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"], // rotation de 0 à 180 degrés
  });

  // Gestion de l'ouverture/fermeture du dropdown
  useEffect(() => {
    rotateChevron(isDropdownOpen);
  }, [isDropdownOpen]);

  const styles = StyleSheet.create({
    dropdown: {
      backgroundColor: colors.white_background,
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
      letterSpacing: -0.4,
      color: colors.blue950,
    },
    selectedTextStyle: {
      fontSize: 15,
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
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
      onFocus={() => setIsDropdownOpen(true)} // Activer quand le dropdown s'ouvre
      onBlur={() => setIsDropdownOpen(false)} // Désactiver quand le dropdown se ferme
      renderRightIcon={() => (
        <Animated.View style={{ transform: [{ rotate: chevronRotation }] }}>
          <ChevronDown
            stroke={colors.blue950}
            strokeWidth={1.75}
            width={18}
            height={18}
          />
        </Animated.View>
      )}
    />
  );
};

export default SelectComponent;
