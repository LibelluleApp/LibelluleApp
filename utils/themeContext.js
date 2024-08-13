import React, { createContext, useState, useEffect } from "react";
import { Appearance } from "react-native";
import { lightModeColors, darkModeColors } from "./colorsVariables";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(null);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('theme');
        if (storedTheme !== null) {
          setIsDarkMode(storedTheme === 'dark');
        } else {
          const systemTheme = Appearance.getColorScheme();
          setIsDarkMode(systemTheme === "dark");
        }
      } catch (error) {
        console.error("Failed to load theme from storage", error);
      }
    };

    loadTheme();
  }, []);

  useEffect(() => {
    const saveTheme = async () => {
      try {
        await AsyncStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
      } catch (error) {
        console.error("Failed to save theme to storage", error);
      }
    };

    if (isDarkMode !== null) {
      saveTheme();
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const currentColors = isDarkMode ? darkModeColors : lightModeColors;

  if (isDarkMode === null) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{ isDarkMode, toggleTheme, colors: currentColors }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
