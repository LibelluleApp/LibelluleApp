import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import ColorPicker, {
  Panel1,
  Swatches,
  Preview,
  OpacitySlider,
  HueSlider,
} from "reanimated-color-picker";
import { getColors, setColors as setColor } from "../../utils/storage";

const CustomColor = () => {
  const [showModal, setShowModal] = useState(false);
  const [colors, setColors] = useState({});
  const [newColorName, setNewColorName] = useState("");
  const [newColorValue, setNewColorValue] = useState("");
  const [selectedColor, setSelectedColor] = useState({ value: "#000000" });

  useEffect(() => {
    const loadColors = () => {
      try {
        const storedColors = getColors();
        if (storedColors) {
          setColors(storedColors);
        }
      } catch (error) {
        console.error("Failed to load colors", error);
      }
    };

    loadColors();
  }, []);

  const saveColors = (updatedColors) => {
    try {
      setColor(updatedColors);
      setColors(updatedColors);
    } catch (error) {
      console.error("Failed to save colors", error);
    }
  };

  const saveSelectedColor = async () => {
    if (selectedColor.value) {
      const updatedColors = { ...colors };
      const colorNameToUpdate = Object.keys(updatedColors).find(
        (key) => updatedColors[key] === newColorValue
      );
      if (colorNameToUpdate) {
        updatedColors[colorNameToUpdate] = selectedColor.value;
        saveColors(updatedColors);
      }
    }
  };

  const removeColor = (colorName) => {
    const updatedColors = { ...colors };
    delete updatedColors[colorName];
    saveColors(updatedColors);
  };

  const onSelectColor = ({ hex }) => {
    setSelectedColor({ value: hex });
  };

  const renderColorItem = ({ item }) => {
    const colorName = item[0];
    const colorValue = item[1];

    return (
      <View style={styles.colorItem}>
        <TouchableOpacity
          style={[styles.colorPreview, { backgroundColor: colorValue }]}
          onPress={() => {
            setSelectedColor({ value: colorValue });
            setShowModal(true);
          }}
        />
        <View style={styles.colorDetails}>
          <Text style={styles.colorName}>{colorName}</Text>
          <Text style={styles.colorValue}>{colorValue}</Text>
        </View>
        <TouchableOpacity
          onPress={() => removeColor(colorName)}
          style={styles.menuButton}
        >
          <Text style={styles.menuButtonText}>⋮</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Couleurs par ressource</Text>
      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <ColorPicker
              value={selectedColor.value}
              thumbSize={24}
              thumbShape="circle"
              onChange={onSelectColor}
            >
              <Panel1 style={styles.panelStyle} />
              <HueSlider style={styles.sliderStyle} />
              <OpacitySlider style={styles.sliderStyle} />
              <Swatches
                style={styles.swatchesContainer}
                swatchStyle={styles.swatchStyle}
                colors={Object.values(colors)}
              />
              <Preview style={styles.previewStyle} />
            </ColorPicker>

            <Button
              title="Ok"
              onPress={() => {
                setShowModal(false);
                saveSelectedColor();
              }}
            />
          </View>
        </View>
      </Modal>
      <FlatList
        data={Object.entries(colors)}
        keyExtractor={(item) => item[0]}
        renderItem={renderColorItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F4F5F9",
  },
  label: {
    fontSize: 15,
    fontFamily: "Ubuntu_500Medium",
    letterSpacing: -0.4,
    marginBottom: 8,
    color: "#7A797C",
  },
  input: {
    width: "100%",
    padding: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 16,
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  colorItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  colorPreview: {
    width: 50,
    height: 25,
    marginRight: 10,
    borderRadius: 4,
  },
  colorDetails: {
    flex: 1,
  },
  colorName: {
    fontSize: 17,
    fontFamily: "Ubuntu_500Medium",
    letterSpacing: -0.4,
  },
  colorValue: {
    fontSize: 15,
    color: "#7A797C",
    fontFamily: "Ubuntu_400Regular",
    letterSpacing: -0.4,
  },
  menuButton: {
    padding: 5,
  },
  menuButtonText: {
    fontSize: 18,
    color: "#000",
  },
  panelStyle: {
    padding: 10,
  },
  sliderStyle: {
    height: 30,
  },
  swatchesContainer: {
    marginTop: 10,
    marginBottom: 20,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  swatchStyle: {
    width: 30,
    height: 30,
    borderRadius: 4,
    marginRight: 10,
    marginBottom: 10,
  },
  previewStyle: {
    width: "100%",
    height: 50,
    borderRadius: 4,
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000aa",
  },
  modal: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
});

export default CustomColor;
