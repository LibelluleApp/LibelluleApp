import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Switch,
} from "react-native";
import { ThemeContext } from "./../../../utils/themeContext";
import {
  Lightbulb,
  LightbulbOff,
  Palette,
} from "./../../../assets/icons/Icons";

function Colors() {
  const { isDarkMode, toggleTheme, changeTheme, colors, themes } =
    useContext(ThemeContext);
  const [selectedColor, setSelectedColor] = useState("azure"); // État pour stocker la couleur sélectionnée

  const themeKeys = Object.keys(themes); // Récupérer les noms des thèmes

  // Met à jour la couleur sélectionnée au démarrage
  useEffect(() => {
    // Ici, on détermine la couleur à partir du thème actuel
    const currentTheme = isDarkMode ? "dark" : "light";
    const currentColor = Object.keys(themes).find(
      (theme) => themes[theme][currentTheme].regular900 === colors.regular900 // Vérifie la couleur active
    );
    if (currentColor) {
      setSelectedColor(currentColor);
    }
  }, [isDarkMode, colors, themes]);

  // Fonction pour gérer la sélection de la couleur
  const handleColorSelect = (theme) => {
    setSelectedColor(theme);
    changeTheme(theme); // Change le thème selon la couleur sélectionnée
  };

  const styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flexDirection: "column",
      gap: 20,
      width: "90%",
      marginHorizontal: "auto",
      marginTop: 20,
    },
    sectionPageContainer: {
      marginTop: 15,
      width: "90%",
      marginHorizontal: "auto",
      gap: 20,
    },
    sectionTitle: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 15,
      color: colors.grey,
      letterSpacing: -0.6,
    },
    sectionPageItem: {
      gap: 10,
    },
    pageSeparation: {
      height: 0.5,
      width: "85%",
      backgroundColor: colors.grey,
      alignSelf: "flex-end",
    },
    pageContainer: {
      backgroundColor: colors.white_background,
      borderRadius: 10,
    },
    pageItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 15,
    },
    profilPicture: {
      width: 50,
      height: 50,
      borderRadius: 50,
    },
    pageProfilContainer: {
      flexDirection: "row",
      gap: 15,
    },
    pageProfilContent: {
      flexDirection: "column",
      gap: 3,
    },
    pageProfilTitle: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    profilName: {
      fontFamily: "Ubuntu_500Medium",
      letterSpacing: -0.4,
      fontSize: 15,
      color: colors.regular950,
      letterSpacing: -0.6,
    },
    profilGroupContent: {
      backgroundColor: colors.regular200_2,
      paddingHorizontal: 10,
      paddingVertical: 3,
      borderRadius: 5,
    },
    profilGroupTitle: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 13,
      color: colors.regular900_2,
      letterSpacing: -0.6,
    },
    profilEmail: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 13,
      color: colors.grey,
      letterSpacing: -0.6,
    },
    pageContent: {
      flexDirection: "row",
      gap: 12,
      alignItems: "center",
    },
    pageTitle: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 15,
      color: colors.regular900,
      letterSpacing: -0.6,
    },
    pageSubtitle: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 13,
      color: colors.grey,
      letterSpacing: -0.6,
    },
    pageIcon: {
      backgroundColor: colors.regular900,
      borderRadius: 8,
      padding: 8,
      justifyContent: "center",
      alignItems: "center",
    },
    profileSwitcher: {
      paddingHorizontal: 20,
      width: "100%",
      paddingVertical: 12,
    },
    switcherToggle: {
      flexDirection: "column",
      gap: Platform.OS === "ios" ? 10 : 0,
    },
    switcherContent: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    colorContainer: {
      justifyContent: "center",
      alignItems: "center",
      gap: 5,
    },
    colorContent: {
      width: 58,
      height: 25,
      borderRadius: 5,
    },
    colorTitle: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 12,
    },
  });

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View style={styles.sectionPageItem}>
          <View style={styles.pageContainer}>
            <View style={styles.pageItem}>
              <View style={styles.pageContent}>
                <View style={styles.pageIcon}>
                  {isDarkMode ? (
                    <LightbulbOff
                      stroke={colors.regular100}
                      width={18}
                      height={18}
                    />
                  ) : (
                    <Lightbulb
                      stroke={colors.regular100}
                      width={18}
                      height={18}
                    />
                  )}
                </View>
                <Text style={styles.pageTitle}>Mode sombre</Text>
              </View>
              <Switch
                trackColor={{ false: colors.grey, true: colors.regular700 }}
                thumbColor={isDarkMode ? colors.white : colors.white}
                onValueChange={toggleTheme}
                value={isDarkMode}
              />
            </View>
          </View>
        </View>
        <View style={styles.sectionPageItem}>
          <View style={styles.pageContainer}>
            <View style={styles.pageItem}>
              <View style={styles.pageContent}>
                <View style={styles.pageIcon}>
                  <Palette stroke={colors.regular100} width={18} height={18} />
                </View>
                <Text style={styles.pageTitle}>Thème de couleurs</Text>
              </View>
            </View>
            <View style={[styles.pageItem, { paddingTop: 5 }]}>
              {themeKeys.map((theme) => (
                <TouchableOpacity
                  key={theme}
                  style={styles.colorContainer}
                  onPress={() => handleColorSelect(theme)}
                >
                  <View
                    style={[
                      styles.colorContent,
                      {
                        backgroundColor:
                          themes[theme][isDarkMode ? "dark" : "light"]
                            .regular900,
                        opacity: selectedColor === theme ? 1 : 0.3,
                      },
                    ]}
                  />
                  <Text
                    style={[
                      styles.colorTitle,
                      {
                        color: isDarkMode
                          ? colors.lightText
                          : themes[theme][isDarkMode ? "dark" : "light"]
                              .regular900,
                        opacity: selectedColor === theme ? 1 : 0.3,
                      },
                    ]}
                  >
                    {theme.charAt(0).toUpperCase() + theme.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default Colors;
