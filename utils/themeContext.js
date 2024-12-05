// themeContext.js
import React, { createContext, useState, useEffect } from "react";
import { Appearance } from "react-native";
import { themes } from "./colorsVariables"; // Importez les couleurs de chaque thème
import { getTheme, setTheme, migrateFromAsyncStorage } from "./storage";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(null);
  const [currentTheme, setCurrentTheme] = useState("azure"); // thème par défaut

  useEffect(() => {
    const loadTheme = async () => {
      try {
        await migrateFromAsyncStorage(); // Migration des données si nécessaire
        const storedTheme = getTheme();
        if (storedTheme) {
          if(storedTheme === "light" || storedTheme === "dark") {
            const systemTheme = Appearance.getColorScheme();
            setIsDarkMode(systemTheme === storedTheme);
            setCurrentTheme("azure");
          }else {
            const { mode, theme } = JSON.parse(storedTheme);
            setIsDarkMode(mode === "dark");
            setCurrentTheme(theme);
          }
        } else {
          const systemTheme = Appearance.getColorScheme();
          setIsDarkMode(systemTheme === "dark");
          setCurrentTheme("azure");
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
        if (isDarkMode !== null && currentTheme) {
          await setTheme(
            JSON.stringify({
              mode: isDarkMode ? "dark" : "light",
              theme: currentTheme,
            })
          ); // Conversion de l'objet en chaîne JSON avant le stockage
        }
      } catch (error) {
        console.error("Failed to save theme to storage", error);
      }
    };

    saveTheme();
  }, [isDarkMode, currentTheme]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode; // Inverser l'état du mode
      return newMode; // Retourner le nouveau mode
    });
  };

  const changeTheme = (theme) => {
    if (themes[theme]) {
      setCurrentTheme(theme);
    } else {
      console.warn(`Theme ${theme} does not exist.`);
    }
  };

  const currentColors = themes[currentTheme]
    ? themes[currentTheme][isDarkMode ? "dark" : "light"]
    : {};

  if (isDarkMode === null) {
    return null; // Chargez le contexte avant de rendre quoi que ce soit
  }

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
        changeTheme,
        currentTheme,
        colors: currentColors,
        themes,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
