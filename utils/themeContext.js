import React, { createContext, useState, useEffect } from "react";
import { Appearance } from "react-native";
import { lightModeColors, darkModeColors } from "./colorsVariables";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemTheme = Appearance.getColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemTheme === "dark");

  useEffect(() => {
    setIsDarkMode(systemTheme === "dark");
  }, [systemTheme]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const currentColors = isDarkMode ? darkModeColors : lightModeColors;

  return (
    <ThemeContext.Provider
      value={{ isDarkMode, toggleTheme, colors: currentColors }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
