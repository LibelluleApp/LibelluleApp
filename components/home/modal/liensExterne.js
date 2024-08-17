import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import { RedirectTo } from "../../../assets/icons/Icons";
import fetchLinks from "../../../api/Links/fetchLinks";
import { showMessage } from "react-native-flash-message";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import { ThemeContext } from "./../../../utils/themeContext";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const getLinks = async () => {
  try {
    const response = await fetchLinks();
    return response;
  } catch (error) {
    showMessage({
      message: "Erreur de chargement",
      description: "Impossible de charger les liens",
      type: "danger",
      titleStyle: { fontFamily: "Ubuntu_400Regular" },
      statusBarHeight: 15,
    });
  }
};

function LiensExterne() {
  const { colors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    modalBackground: {
      backgroundColor: colors.background,
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
      color: colors.grey,
      marginBottom: 14,
    },
    liens: {
      flexDirection: "column",
      justifyContent: "space-between",
      gap: 7,
    },
    lien: {
      backgroundColor: colors.white_background,
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
      color: colors.black,
    },
    descriptionText: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 13,
      color: colors.grey,
    },
    content: {
      gap: 5,
    },
  });

  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getLinks().then((data) => {
      setLinks(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <View style={styles.modalBackground}>
      <View style={styles.container}>
        <View style={styles.liens}>
          {isLoading && (
            <>
              <ShimmerPlaceholder
                visible={isLoading ? false : true}
                style={{
                  width: "100%",
                  height: 70,
                  borderRadius: 10,
                  marginBottom: 10,
                }}
              />
              <ShimmerPlaceholder
                visible={isLoading ? false : true}
                style={{
                  width: "90%",
                  height: 70,
                  borderRadius: 10,
                  marginBottom: 10,
                }}
              />
              <ShimmerPlaceholder
                visible={isLoading ? false : true}
                style={{
                  width: "80%",
                  height: 70,
                  borderRadius: 10,
                  marginBottom: 10,
                }}
              />
            </>
          )}

          {!isLoading &&
            links.length > 0 &&
            links.map((link, index) => (
              <TouchableOpacity
                style={styles.lien}
                key={index}
                onPress={() => {
                  Linking.openURL(link.lien);
                }}
              >
                <View style={styles.content}>
                  <Text style={styles.titleText}>{link.titre}</Text>
                  <Text style={styles.descriptionText}>{link.description}</Text>
                </View>
                <RedirectTo
                  stroke={colors.grey}
                  strokeWidth={1.75}
                  width={16}
                  height={16}
                />
              </TouchableOpacity>
            ))}
        </View>
      </View>
    </View>
  );
}

export default LiensExterne;
