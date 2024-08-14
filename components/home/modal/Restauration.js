import React, { useContext } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Location, Clock } from "../../../assets/icons/Icons";
import { ThemeContext } from "./../../../utils/themeContext";

function Restauration() {
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
    infoTop: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      padding: 15,
    },
    infoLeft: {
      gap: 7,
      justifyContent: "center",
    },
    hour: {
      fontFamily: "Ubuntu_500Medium",
      fontSize: 20,
      color: colors.black,
    },
    stick: {
      backgroundColor: colors.black,
      height: "90%",
      width: 1,
      marginHorizontal: 15,
    },
    infoRight: {
      gap: 7,
      justifyContent: "center",
    },
    title: {
      fontFamily: "Ubuntu_500Medium",
      fontSize: 20,
      color: colors.black,
    },
    content: {
      flexDirection: "row",
      gap: 5,
      alignItems: "center",
    },
    description: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 15,
      color: colors.black,
    },
    titleContent: {
      fontFamily: "Ubuntu_500Medium",
      fontSize: 17,
      color: colors.grey,
      marginTop: 30,
    },
    contentMeal: {
      flexDirection: "column",
      gap: 5,
      marginTop: 10,
      backgroundColor: colors.white_background,
      borderRadius: 10,
      paddingHorizontal: 26,
      paddingVertical: 15,
    },
    descriptionMeal: {
      fontFamily: "Ubuntu_500Medium",
      fontSize: 15,
      color: colors.black,
    },
    descriptionPlat: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 15,
      color: colors.black,
      marginLeft: 10,
    },
  });

  return (
    <View style={styles.modalBackground}>
      <View style={styles.container}>
        <View style={styles.infoTop}>
          <View style={styles.infoLeft}>
            <Text style={styles.hour}>11:45</Text>
            <Text style={styles.hour}>13:30</Text>
          </View>
          <View style={styles.stick}></View>
          <View style={styles.infoRight}>
            <Text style={styles.title}>RU Le Crousty</Text>
            <View style={styles.content}>
              <Location fill={colors.black} />
              <Text style={styles.description}>05.45.25.51.51</Text>
            </View>
            <View style={styles.content}>
              <Clock fill={colors.black} />
              <Text style={styles.description}>Du Lundi au Vendredi</Text>
            </View>
          </View>
        </View>
        <Text style={styles.titleContent}>Aujourd'hui</Text>
        <View style={styles.contentMeal}>
          <Text style={styles.descriptionMeal}>Entrée</Text>
          <View>
            <Text style={styles.descriptionPlat}>
              {`\u2022`} Pannini raclette
            </Text>
            <Text style={styles.descriptionPlat}>
              {`\u2022`} Pannini raclette
            </Text>
            <Text style={styles.descriptionPlat}>
              {`\u2022`} Pannini raclette
            </Text>
            <Text style={styles.descriptionPlat}>
              {`\u2022`} Pannini raclette
            </Text>
          </View>
          <Text style={styles.descriptionMeal}>Plat</Text>
          <View>
            <Text style={styles.descriptionPlat}>
              {`\u2022`} Pannini raclette
            </Text>
            <Text style={styles.descriptionPlat}>
              {`\u2022`} Pannini raclette
            </Text>
            <Text style={styles.descriptionPlat}>
              {`\u2022`} Pannini raclette
            </Text>
            <Text style={styles.descriptionPlat}>
              {`\u2022`} Pannini raclette
            </Text>
          </View>
          <Text style={styles.descriptionMeal}>Dessert</Text>
          <View>
            <Text style={styles.descriptionPlat}>
              {`\u2022`} Pannini raclette
            </Text>
            <Text style={styles.descriptionPlat}>
              {`\u2022`} Pannini raclette
            </Text>
            <Text style={styles.descriptionPlat}>
              {`\u2022`} Pannini raclette
            </Text>
            <Text style={styles.descriptionPlat}>
              {`\u2022`} Pannini raclette
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default Restauration;
