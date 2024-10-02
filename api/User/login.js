import ApiManager from "../ApiManager";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import associateRessourceColor from "../../utils/ressources/colorsRessources";

const TOKEN_KEY = "secure_user_token";
const USER_DATA_KEY = "user_data";

async function saveToken(token) {
  try {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  } catch (error) {
    throw new Error("Could not save the token");
  }
}

async function deleteToken() {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  } catch (error) {
    throw new Error("Could not delete the token");
  }
}

async function storeUserData(data) {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(USER_DATA_KEY, jsonValue);
    await associateRessourceColor(data.groupe_id);
  } catch (error) {
    throw new Error("Could not save user data");
  }
}

async function login(email_edu, mot_de_passe) {
  if (!email_edu || !mot_de_passe) {
    return {
      status: "error",
      message: "Données manquantes. Veuillez remplir tous les champs.",
    };
  }

  try {
    const response = await ApiManager.post("/user/login", {
      email_edu,
      mot_de_passe,
    });
    if (response.data.status === "success") {
      // const token = response.data.token;
      // await saveToken(token);

      const userData = { ...response.data };
      delete userData.token;
      delete userData.status;
      delete userData.user.mot_de_passe;

      await storeUserData(userData.user);

      return response.data;
    } else {
      await deleteToken();
      return {
        status: "error",
        message: "Identifiants et/ou mot de passe incorrect",
      };
    }
  } catch (err) {
    await deleteToken();
    if(err.response.status === 402){
      return {
        status: "warning",
        message:
        err.response.data.message,
      };
    }
    return {
      status: "error",
      message:
        err.response.data.message,
    };
  }
}

export default login;
