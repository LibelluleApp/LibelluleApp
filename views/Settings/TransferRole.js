import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { ThemeContext } from "../../utils/themeContext";
import { Dropdown } from "react-native-element-dropdown";
import { Info } from "../../assets/icons/Icons";
import fetchTp from "../../api/Groupe/fetchTp";
import { showMessage } from "react-native-flash-message";
import transferRole from "../../api/Groupe/transferRole";
import { useAuth } from "../../context/AuthContext";
import TouchableScale from "react-native-touchable-scale";

const TransferRole = () => {
  const [value, setValue] = React.useState();
  const [isFocus, setIsFocus] = React.useState(false);
  const [tp, setTp] = React.useState([]);

  const { colors } = React.useContext(ThemeContext);
  const { signOut } = useAuth();
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
      backgroundColor: colors.regular700,
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
      letterSpacing: -0.4,
      fontSize: 17,
      color: colors.white,
      letterSpacing: -0.4,
    },
    dropdown: {
      borderRadius: 10,
      padding: 15,
      marginBottom: 10,
      backgroundColor: colors.white_background,
    },
    placeholderStyle: {
      color: colors.grey,
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 15,
    },
    selectedTextStyle: {
      color: colors.regular950,
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 15,
    },
    dropdownContainer: {
      // borderRadius: 10,
      // marginBottom: 10,
      backgroundColor: colors.white_background,
    },
    topInformations: {
      marginBottom: 20,
      flexDirection: "row",
      gap: 10,
      width: "90%",
    },
    textInformations: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 15,
      color: colors.regular950,
    },
    bold: {
      fontFamily: "Ubuntu_500Medium",
      letterSpacing: -0.4,
    },
    labelDropdown: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 15,
      color: colors.regular900,
      marginBottom: 10,
    },
    textDisclaimer: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 13,
      color: colors.grey,
      textAlign: "center",
    },
  });

  React.useEffect(() => {
    fetchTp().then((data) => {
      setTp(data);
    });
  }, []);

  const handleChange = async () => {
    if (!value) {
      showMessage({
        message: "Veuillez sélectionner un étudiant",
        type: "danger",
      });
      return;
    }

    Alert.alert(
      "Transfert de rôle",
      `Voulez-vous vraiment transmettre votre rôle à ${value.label} ? \n Cette action vous déconnectera de l'application.`,
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Confirmer",
          onPress: async () => {
            try {
              const response = await transferRole(value.value);
              if (response) {
                showMessage({
                  message: "Le rôle a été transmis avec succès",
                  type: "success",
                });

                signOut();
              }
            } catch (error) {
              showMessage({
                message:
                  error.response?.data?.message ||
                  error.message ||
                  "Erreur inconnue",
                type: "danger",
              });
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View>
          <View style={styles.topInformations}>
            <Info width={16} heigh={16} stroke={colors.regular950} />
            <Text style={styles.textInformations}>
              Vous êtes <Text style={styles.bold}>responsable des devoirs</Text>{" "}
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
              mode="default"
              style={[
                styles.dropdown,
                isFocus && { borderColor: colors.regular950 },
              ]}
              activeColor={colors.white_background}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={tp}
              minHeight={100}
              labelField="label"
              valueField="value"
              placeholder={"Sélectionner un étudiant"}
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
          <TouchableScale
            friction={6}
            activeScale={0.95}
            onPress={handleChange}
          >
            <View style={styles.editBtn}>
              <Text style={styles.editBtnText}>Transmettre</Text>
            </View>
          </TouchableScale>
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
