import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiManager from "../ApiManager";

const USER_DATA_KEY = "user_data";

async function storeUserData(data) {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.removeItem(USER_DATA_KEY);
    await AsyncStorage.setItem(USER_DATA_KEY, jsonValue);
    await associateRessourceColor(data.groupe_id);
  } catch (error) {
    throw new Error("Could not save user data");
  }
}

async function refreshData() {
  try {
    console.log("refreshData");
    const user_data = JSON.parse(await AsyncStorage.getItem("user_data"));
    if (!user_data.utilisateur_id) {
      throw new Error("L'adresse mail n'est pas définie dans AsyncStorage.");
    }
    const response = await ApiManager.get(
      `/user/fetch/${user_data.utilisateur_id}`
    );
    if (response.status === 200) {
      const userData = { ...response.data };
      await storeUserData(userData);
      return response.data;
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    throw new Error("Impossible de récupérer les données. Veuillez réessayer.");
  }
}

export default refreshData;
