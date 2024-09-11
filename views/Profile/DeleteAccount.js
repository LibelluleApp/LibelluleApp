import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import Input from "../../components/auth/input";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import deleteAccount from "../../api/User/deleteAccount";
import { ThemeContext } from "../../utils/themeContext";
import { useAuth } from "../../context/AuthContext";
import { Lock } from "../../assets/icons/Icons";

const DeleteAccount = () => {
  const [mot_de_passe, setMotDePasse] = React.useState("");
  const { colors } = React.useContext(ThemeContext);
  const { signOut } = useAuth();
  const navigation = useNavigation();

  const deleteAccountAction = async () => {
    try {
      await deleteAccount(mot_de_passe);
      ({
        message: "Votre compte a bien été supprimé.",
        type: "success",
        titleStyle: { fontFamily: "Ubuntu_400Regular" },
      });
      signOut();
      navigation.navigate("Login");
    } catch (error) {
      showMessage({
        message: error.message,
        type: "danger",
        titleStyle: { fontFamily: "Ubuntu_400Regular" },
      });
    }
  };

  const handleDeleteAccount = async () => {
    if (mot_de_passe === "") {
      showMessage({
        message: "Veuillez renseigner votre mot de passe.",
        type: "danger",
        titleStyle: { fontFamily: "Ubuntu_400Regular" },
      });
      return;
    }
    Alert.alert(
      "Suppression de compte",
      "Êtes-vous sûr de vouloir supprimer votre compte ?",
      [
        {
          text: "Annuler",
          onPress: () => console.log("Annuler"),
          style: "cancel",
        },
        { text: "Confirmer", onPress: () => deleteAccountAction() },
      ]
    );
  };

  const styles = StyleSheet.create({
    background: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },
    container: {
      width: "90%",
      paddingTop: 15,
      paddingBottom: 5,
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
    },
    input: {
      backgroundColor: colors.card,
      width: "80%",
      padding: 10,
      borderRadius: 5,
      marginBottom: 20,
      color: colors.text,
    },
    text: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 15,
      color: colors.black,
      marginBottom: 20,
    },
    textAdvertising: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 15,
      color: colors.black,
      marginBottom: 20,
    },
    editBtn: {
      backgroundColor: colors.red700,
      paddingHorizontal: 20,
      paddingVertical: 11,
      borderRadius: 10,
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center",
      alignSelf: "center",
      width: "100%",
      marginBottom: 25,
    },
    editBtnText: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 17,
      color: colors.white,
      letterSpacing: -0.5,
    },
  });

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View>
          <Text style={styles.textAdvertising}>
            En supprimant votre compte, vous perdrez toutes vos données et ne
            pourrez pas les récupérer. Cette action est irréversible. Si vous
            pensez avoir fait une erreur, contactez-nous par e-mail pour
            réactiver votre compte. En supprimant votre compte, vous supprimez
            également les données que vous avez renseignées sur l'application et
            dans l'agenda, pour vous et les autres utilisateurs. Vous ne pourrez
            pas récupérer ces données.
          </Text>
          <Text style={styles.text}>
            Pour supprimer votre compte, veuillez saisir votre mot de passe.
          </Text>
          <Input
            label="Mot de passe"
            placeholder="Votre mot de passe"
            icon={Lock}
            placeholderTextColor="#A3A3A3"
            autoComplete="password"
            secureTextEntry={true}
            onChangeText={setMotDePasse}
          />
        </View>
        <TouchableOpacity style={styles.editBtn} onPress={handleDeleteAccount}>
          <Text style={styles.editBtnText}>Supprimer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DeleteAccount;
