import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { ThemeContext } from "../../utils/themeContext";
import { ChevronDown } from "../../assets/icons/Icons";
import TouchableScale from "react-native-touchable-scale";

const Dropdown = ({ options, onSelect, value, number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(
    options.find((option) => option.value === value)?.label || options[0]?.label
  );
  const { colors } = useContext(ThemeContext);

  const dropdownHeight = useSharedValue(0); // Pour animer la hauteur
  const dropdownOpacity = useSharedValue(0); // Pour animer l'opacité
  const chevronRotation = useSharedValue(0); // Pour animer la rotation du Chevron

  useEffect(() => {
    // Animation de la hauteur et de l'opacité
    dropdownHeight.value = withTiming(isOpen ? (number >= 3 ? 125 : 80) : 0, {
      duration: 250,
      easing: Easing.inOut(Easing.circle),
    });
    dropdownOpacity.value = withTiming(isOpen ? 1 : 0, {
      duration: 250,
      easing: Easing.inOut(Easing.circle),
    });

    // Animation de la rotation du Chevron
    chevronRotation.value = withTiming(isOpen ? 180 : 0, {
      duration: 250,
      easing: Easing.inOut(Easing.circle),
    });
  }, [isOpen]);

  useEffect(() => {
    // Met à jour le label sélectionné lorsque la prop `value` change
    const selectedOption = options.find((option) => option.value === value);
    if (selectedOption) {
      setSelectedLabel(selectedOption.label);
    }
  }, [value, options]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: dropdownHeight.value,
      opacity: dropdownOpacity.value,
    };
  });

  // Style animé pour la rotation du chevron
  const chevronStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${chevronRotation.value}deg` }],
    };
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (label, value) => {
    setSelectedLabel(label);
    onSelect(value);
    setIsOpen(false);
  };

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.background,
      position: "relative",
    },
    button: {
      backgroundColor: colors.background,
      borderColor: colors.regular700,
      borderWidth: 0.5,
      borderRadius: 50,
      paddingHorizontal: 16,
      paddingVertical: 7,
      flexDirection: "row",
      gap: 5,
      alignItems: "center",
      zIndex: 999,
    },
    buttonText: {
      color: colors.regular700,
      fontSize: 14,
      fontFamily: "Ubuntu_500Medium",
      letterSpacing: -0.4,
    },
    dropdown: {
      position: "absolute",
      top: 40,
      backgroundColor: colors.background,
      borderRadius: 10,
      overflow: "hidden",
      borderColor: colors.regular700,
      borderWidth: 0.5,
      width: number >= 3 ? 150 : 125,
      zIndex: 999,
    },
    dropdownItem: {
      paddingVertical: 10,
      paddingHorizontal: number >= 3 ? 5 : 15,
      backgroundColor: colors.background,
    },
    dropdownText: {
      fontSize: 14,
      textAlign: "center",
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      color: colors.regular700,
    },
    selectedText: {
      color: colors.regular700,
      fontFamily: "Ubuntu_500Medium",
      letterSpacing: -0.4,
    },
  });

  return (
    <View style={styles.container}>
      <TouchableScale friction={6} activeScale={0.95} onPress={toggleDropdown}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{selectedLabel}</Text>
          <Animated.View style={chevronStyle}>
            <ChevronDown
              stroke={colors.regular700}
              width={14}
              height={14}
              strokeWidth={1.75}
            />
          </Animated.View>
        </View>
      </TouchableScale>

      <Animated.View style={[styles.dropdown, animatedStyle]}>
        {options.map((option) => (
          <TouchableScale
            friction={6}
            activeScale={0.95}
            key={option.value}
            onPress={() => handleSelect(option.label, option.value)}
          >
            <View style={styles.dropdownItem}>
              <Text
                style={[
                  styles.dropdownText,
                  selectedLabel === option.label && styles.selectedText,
                ]}
              >
                {option.label}
              </Text>
            </View>
          </TouchableScale>
        ))}
      </Animated.View>
    </View>
  );
};

export default Dropdown;
