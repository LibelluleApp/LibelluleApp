import ApiManager from "../ApiManager";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function saveNotifications(token) {
  try {
    const user_data = JSON.parse(await AsyncStorage.getItem("user_data"));
    if (!user_data.utilisateur_id) {
      throw new Error("L'utilisateur_id n'est pas défini dans AsyncStorage.");
    }
    const response = await ApiManager.post("/notification/save", {
      utilisateur_id: user_data.utilisateur_id,
      token: token,
    });

    if (response.data.status === "success") {
      return response.data.result;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    console.error("Error saving notifications token:", error);
    return null;
  }
}

export default saveNotifications;