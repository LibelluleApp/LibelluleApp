import ApiManager from "../ApiManager";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function deleteAccount(mot_de_passe) {
  try {
    const user_data = JSON.parse(await AsyncStorage.getItem("user_data"));
    if (!user_data.email_edu) {
      throw new Error("L'adresse mail n'est pas défini dans AsyncStorage.");
    }

    const response = await ApiManager.post(`/user/delete`, {
      utilisateur_id: user_data.utilisateur_id,
      mot_de_passe: mot_de_passe,
    });

    if (response.status === 200) {
      return response.data.message;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    throw new Error(
      error.response.data || "Erreur lors de la suppression du compte."
    );
  }
}

export default deleteAccount;
