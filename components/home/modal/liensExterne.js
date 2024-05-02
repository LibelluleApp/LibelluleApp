import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import { RedirectTo } from "../../../assets/icons/Icons";

function LiensExterne() {
  return (
    <View style={styles.modalBackground}>
      <View style={styles.container}>
        <View style={styles.liens}>
          <TouchableOpacity
            style={styles.lien}
            onPress={() => {
              Linking.openURL("https://www.google.com/");
            }}
          >
            <View style={styles.content}>
              <Text style={styles.titleText}>Lien 1</Text>
              <Text style={styles.descriptionText}>Description du lien 1</Text>
            </View>
            <RedirectTo />
          </TouchableOpacity>
          <TouchableOpacity style={styles.lien}>
            <View style={styles.content}>
              <Text style={styles.titleText}>Lien 1</Text>
              <Text style={styles.descriptionText}>Description du lien 1</Text>
            </View>
            <RedirectTo />
          </TouchableOpacity>
          <TouchableOpacity style={styles.lien}>
            <View style={styles.content}>
              <Text style={styles.titleText}>Lien 1</Text>
              <Text style={styles.descriptionText}>Description du lien 1</Text>
            </View>
            <RedirectTo />
          </TouchableOpacity>
          <TouchableOpacity style={styles.lien}>
            <View style={styles.content}>
              <Text style={styles.titleText}>Lien 1</Text>
              <Text style={styles.descriptionText}>Description du lien 1</Text>
            </View>
            <RedirectTo />
          </TouchableOpacity>
          <TouchableOpacity style={styles.lien}>
            <View style={styles.content}>
              <Text style={styles.titleText}>Lien 1</Text>
              <Text style={styles.descriptionText}>Description du lien 1</Text>
            </View>
            <RedirectTo />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: "#F4F5F9",
    flex: 1,
  },
  container: {
    fontFamily: "Ubuntu_400Regular",
    alignSelf: "center",
    width: "90%",
    marginTop: 22,
    marginBottom: 15,
  },
  title: {
    fontFamily: "Ubuntu_500Medium",
    fontSize: 17,
    color: "#7A797C",
    marginBottom: 14,
  },
  liens: {
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 7,
  },
  lien: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    borderRadius: 10,
    padding: 17,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleText: {
    fontFamily: "Ubuntu_500Medium",
    fontSize: 15,
    color: "#000",
  },
  descriptionText: {
    fontFamily: "Ubuntu_400Regular",
    fontSize: 13,
    color: "#7A797C",
  },
  content: {
    gap: 5,
  },
});

export default LiensExterne;
