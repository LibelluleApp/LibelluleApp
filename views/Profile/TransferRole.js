import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ThemeContext } from "../../utils/themeContext";
import { Dropdown } from "react-native-element-dropdown";
import { Info } from "../../assets/icons/Icons";
import fetchTp from "../../api/Groupe/fetchTp";

const data = [
  { label: "Item 1", value: "1", search: "Item 1" },
  { label: "Item 2", value: "2", search: "Item 2" },
  { label: "Item 3", value: "3", search: "Item 3" },
  { label: "Item 4", value: "4", search: "Item 4" },
  { label: "Item 5", value: "5", search: "Item 5" },
  { label: "Item 6", value: "6", search: "Item 6" },
  { label: "Item 7", value: "7", search: "Item 7" },
  { label: "Item 8", value: "8", search: "Item 8" },
];

const TransferRole = () => {
  const [value, setValue] = React.useState();
  const [isFocus, setIsFocus] = React.useState(false);
  const [tp, setTp] = React.useState([]);

  const { colors } = React.useContext(ThemeContext);
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },
    container: {
      width: "90%",
      paddingTop: 25,
      paddingBottom: 25,
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
    },
    editBtn: {
      backgroundColor: colors.blue700,
      paddingHorizontal: 20,
      paddingVertical: 11,
      borderRadius: 10,
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center",
      alignSelf: "center",
      width: "100%",
      marginBottom: 10,
    },
    editBtnText: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 17,
      color: colors.white,
      letterSpacing: -0.5,
    },
    dropdown: {
      borderWidth: 1,
      borderColor: colors.grey,
      borderRadius: 10,
      padding: 15,
      marginBottom: 10,
      backgroundColor: colors.white,
    },
    placeholderStyle: {
      color: colors.grey,
      fontFamily: "Ubuntu_400Regular",
    },
    selectedTextStyle: {
      color: colors.black,
      fontFamily: "Ubuntu_400Regular",
    },
    dropdownContainer: {
      borderRadius: 10,
      marginBottom: 10,
    },
    topInformations: {
      marginBottom: 20,
      flexDirection: "row",
      gap: 10,
      width: "90%",
    },
    textInformations: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 15,
      color: colors.black,
    },
    bold: {
      fontFamily: "Ubuntu_500Medium",
    },
    labelDropdown: {
      fontFamily: "Ubuntu_500Medium",
      fontSize: 15,
      color: colors.black,
      marginBottom: 10,
    },
    textDisclaimer: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 13,
      color: colors.grey,
      textAlign: "center",
    },
  });

  React.useEffect(() => {
    fetchTp().then((data) => {
      setTp(data);
      console.log(data);
    });
  }, []);
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View>
          <View style={styles.topInformations}>
            <Info width={16} heigh={16} stroke={colors.black} />
            <Text style={styles.textInformations}>
              Vous êtes <Text style={styles.bold}>responsable de l’agenda</Text>{" "}
              de votre groupe de classe. Avec l’accord d’un autre étudiant, le
              rôle peut lui être transmis.
            </Text>
          </View>
          <View>
            <Text style={[styles.labelDropdown]}>
              Sélectionner le prénom de l’étudiant auquel transmettre votre
              rôle.
            </Text>
            <Dropdown
              mode="modal"
              style={[
                styles.dropdown,
                isFocus && { borderColor: colors.black },
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={tp}
              maxHeight={300}
              minHeight={100}
              labelField="label"
              valueField="value"
              placeholder={"Séléctionner un étudiant"}
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(value) => setValue(value)}
              containerStyle={styles.dropdownContainer}
              itemContainerStyle={styles.dropdownContainer}
              itemTextStyle={styles.selectedTextStyle}
            />
          </View>
        </View>
        <View>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editBtnText}>Transmettre</Text>
          </TouchableOpacity>
          <Text style={styles.textDisclaimer}>
            En cliquant sur ce bouton, l’accord de l’étudiant pour assumer ce
            rôle est confirmé.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TransferRole;
