import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import { ThemeContext } from "./../../../utils/themeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import ColorPicker, {
  Panel2,
  Swatches,
  PreviewText,
} from "reanimated-color-picker";

const fetchStorageItem = async (key, defaultValue) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  } catch (error) {
    console.error(`Impossible de récupérer ${key}`, error);
    return defaultValue;
  }
};

const ColorModal = ({
  visible,
  onClose,
  color,
  onColorSelect,
  onSave,
  currentColorType,
}) => {
  const { colors } = useContext(ThemeContext);
  const opacity = useSharedValue(0);
  const modalAnimatedStyle = useAnimatedStyle(() => ({
    opacity: withSpring(opacity.value),
  }));

  const handleSave = () => {
    onSave();
    opacity.value = 0;
    setTimeout(onClose, 300); // Close modal after animation
  };

  useEffect(() => {
    opacity.value = visible ? 1 : 0;
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View
        style={[styles.modalContainer, { backgroundColor: colors.background }]}
      >
        <Animated.View style={[styles.pickerContainer, modalAnimatedStyle]}>
          <ColorPicker
            value={color}
            sliderThickness={25}
            thumbSize={24}
            thumbShape="circle"
            onChange={onColorSelect}
            boundedThumb
          >
            <Panel2 style={styles.panelStyle} />
            {currentColorType === "alternant" ? (
              <Swatches
                style={styles.swatchesContainer}
                swatchStyle={styles.swatchStyle}
                colors={["#9AA5B3", "#FF00FF", "#FF0000", "#D4C91D", "#4CAF50"]}
              />
            ) : (
              <Swatches
                style={styles.swatchesContainer}
                swatchStyle={styles.swatchStyle}
                colors={[
                  colors.blue700,
                  "#FF00FF",
                  "#FF0000",
                  "#D4C91D",
                  "#4CAF50",
                ]}
              />
            )}

            <PreviewText style={styles.previewText} />
          </ColorPicker>
          <Pressable
            style={[styles.closeButton, { backgroundColor: colors.blue700 }]}
            onPress={handleSave}
          >
            <Text
              style={[
                styles.closeButtonText,
                { color: colors.white, fontFamily: "Ubuntu_500Medium" },
              ]}
            >
              Fermer
            </Text>
          </Pressable>
        </Animated.View>
      </View>
    </Modal>
  );
};

function TimetableSettings() {
  const { isDarkMode, toggleTheme, colors } = useContext(ThemeContext);
  const [isWeekDefault, setIsWeekDefault] = useState(false);
  const [colorAlternant, setColorAlternant] = useState("#9AA5B3");
  const [colorTimetable, setColorTimetable] = useState(colors.blue700);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentColorType, setCurrentColorType] = useState(null);
  const [isAlternant, setIsAlternant] = useState(false);

  useEffect(() => {
    const initializeSettings = async () => {
      const [weekDefault, colorAlt, colorTime, Alternant] = await Promise.all([
        fetchStorageItem("week_default", false),
        fetchStorageItem("color_alternant", "#9AA5B3"),
        fetchStorageItem("color_timetable", colors.blue700),
        fetchStorageItem("isAlternant", false),
      ]);
      setIsWeekDefault(weekDefault);
      setColorAlternant(colorAlt);
      setIsAlternant(Alternant);
      setColorTimetable(colorTime);
    };
    initializeSettings();
  }, []);

  const handleWeekDefault = async () => {
    const weekDefault = !isWeekDefault;
    setIsWeekDefault(weekDefault);
    try {
      await AsyncStorage.setItem("week_default", JSON.stringify(weekDefault));
    } catch (error) {
      console.error("Impossible de mettre la vue semaine par défaut", error);
    }
  };

  const handleColorChange = async (key, color) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(color));
    } catch (error) {
      console.error(`Impossible de mettre la couleur ${key}`, error);
    }
  };

  const openColorModal = (colorType) => {
    setCurrentColorType(colorType);
    setIsModalVisible(true);
  };

  const closeColorModal = () => {
    setIsModalVisible(false);
  };

  const handleColorSelect = (color) => {
    if (currentColorType === "alternant") {
      setColorAlternant(color.hex);
    } else if (currentColorType === "timetable") {
      setColorTimetable(color.hex);
    }
  };

  const handleSaveColor = () => {
    if (currentColorType === "alternant") {
      handleColorChange("color_alternant", colorAlternant);
    } else if (currentColorType === "timetable") {
      handleColorChange("color_timetable", colorTimetable);
    }
    closeColorModal();
  };

  return (
    <View style={[styles.background, { backgroundColor: colors.background }]}>
      <View style={styles.container}>
        <View style={styles.switcherContent}>
          <Text style={[styles.profileBtnSwitch, { color: colors.blue950 }]}>
            Vue semaine par défaut
          </Text>
          <Switch
            trackColor={{ false: colors.grey, true: colors.blue700 }}
            thumbColor={isDarkMode ? colors.white : colors.white}
            onValueChange={handleWeekDefault}
            value={isWeekDefault}
          />
        </View>
        {/* <View style={styles.switcherContent}>
          <Text style={[styles.profileBtnSwitch, { color: colors.blue950 }]}>
            Couleurs aléatoires des évènements
          </Text>
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                "Fonctionnalité à venir",
                "Cette fonctionnalité sera disponible prochainement.",
                [{ text: "Non, je la voulais maintenant" }]
              )
            }
          >
            <Switch
              trackColor={{ false: colors.grey, true: colors.blue700 }}
              thumbColor={isDarkMode ? colors.white : colors.white}
              onValueChange={toggleTheme}
              value={isDarkMode}
              disabled
            />
          </TouchableOpacity>
        </View> */}
        {/* <View style={styles.switcherContent}>
          <Text style={[styles.profileBtnSwitch, { color: colors.blue950 }]}>
            Couleur des évènements par défaut
          </Text>
          <TouchableOpacity
            style={[styles.colorBox, { backgroundColor: colorTimetable }]}
            onPress={() => openColorModal("timetable")}
          />
        </View> */}
        {isAlternant && (
          <View style={styles.switcherContent}>
            <Text style={[styles.profileBtnSwitch, { color: colors.blue950 }]}>
              Couleur des évènements d'alternance
            </Text>
            <TouchableOpacity
              style={[styles.colorBox, { backgroundColor: colorAlternant }]}
              onPress={() => openColorModal("alternant")}
            />
          </View>
        )}

        <ColorModal
          visible={isModalVisible}
          onClose={closeColorModal}
          color={
            currentColorType === "alternant" ? colorAlternant : colorTimetable
          }
          onColorSelect={handleColorSelect}
          onSave={handleSaveColor}
          currentColorType={currentColorType}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    flexDirection: "column",
    gap: 20,
    width: "90%",
    marginTop: 20,
  },
  switcherContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileBtnSwitch: {
    fontFamily: "Ubuntu_400Regular",
    fontSize: 16,
  },
  colorBox: {
    width: 50,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  pickerContainer: {
    width: 300,
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#FFF",
    textAlign: "center",
  },
  panelStyle: {
    height: 150,
    width: "100%",
  },
  sliderStyle: {
    marginTop: 20,
    width: "100%",
    height: 40,
  },
  swatchesContainer: {
    marginTop: 20,
    justifyContent: "space-around",
  },
  swatchStyle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  previewText: {
    color: "#707070",
  },
});

export default TimetableSettings;
