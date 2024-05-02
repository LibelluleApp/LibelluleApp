import ApiManager from "../ApiManager";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  } catch (error) {
    throw new Error("Could not save user data");
  }
}

async function login(edu_mail, password) {
  if (!edu_mail || !password) {
    return {
      status: "error",
      message: "Données manquantes. Veuillez remplir tous les champs.",
    };
  }

  try {
    const response = await ApiManager.post("/user/login", {
      edu_mail,
      password,
    });

    if (response.data.status === "success") {
      const token = response.data.token;
      await saveToken(token);

      const userData = { ...response.data };
      delete userData.token;
      delete userData.status;

      await storeUserData(userData);

      return { status: "success", message: "Connexion réussite" };
    } else {
      await deleteToken();
      return {
        status: "error",
        message: "Identifiants et/ou mot de passe incorrect",
      };
    }
  } catch (error) {
    console.error("Login error:", error);
    await deleteToken();
    return {
      status: "error",
      message:
        "Une erreur s'est produite lors de la connexion. Veuillez réessayer.",
    };
  }
}

export default login;
