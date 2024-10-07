import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { ThemeContext } from "../../utils/themeContext";
import { ChevronDown, ChevronUp } from "../../assets/icons/Icons";

const Dropdown = ({ options, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState(options[0]?.label || '');
    const { colors } = useContext(ThemeContext);

    const dropdownHeight = useSharedValue(0);

    useEffect(() => {
        dropdownHeight.value = withTiming(isOpen ? 100 : 0, { duration: 250 });
    }, [isOpen]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            height: dropdownHeight.value,
            opacity: isOpen ? 1 : 0,
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
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.background,
        },
        button: {
            backgroundColor: colors.background,
            borderColor: colors.blue700,
            borderWidth: 0.5,
            borderRadius: 30,
            paddingHorizontal: 14,
            paddingVertical: 7.5,
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
            zIndex: 999,
        },
        buttonText: {
            color: colors.blue700,
            fontSize: 16,
            fontFamily: "Ubuntu_500Medium",
        },
        dropdown: {
            position: 'absolute',
            top: 50,
            backgroundColor: colors.background,
            borderRadius: 15,
            overflow: 'hidden',
            borderColor: colors.blue700,
            borderWidth: 0.5,
            width: 150,
            zIndex: 999,
            elevation: 5,
        },
        dropdownItem: {
            paddingVertical: 15,
            paddingHorizontal: 15,
        },
        dropdownText: {
            fontSize: 16,
            textAlign: 'center',
            fontFamily: "Ubuntu_400Regular",
            color: colors.blue700,
        },
        selectedText: {
            color: colors.blue700,
            fontFamily: "Ubuntu_500Medium",
        },
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleDropdown} style={styles.button}>
                <Text style={styles.buttonText}>
                    {selectedLabel}
                </Text>
                {isOpen ? <ChevronUp /> : <ChevronDown />}
            </TouchableOpacity>

            <Animated.View style={[styles.dropdown, animatedStyle]}>
                {options.map((option) => (
                    <TouchableOpacity
                        key={option.value}
                        style={styles.dropdownItem}
                        onPress={() => handleSelect(option.label, option.value)}
                    >
                        <Text style={[styles.dropdownText, selectedLabel === option.label && styles.selectedText]}>
                            {option.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </Animated.View>
        </View>
    );
};

export default Dropdown;
