import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiManager from "../ApiManager";

async function whoIsChief() {
  try {
    const user_data = JSON.parse(await AsyncStorage.getItem("user_data"));
    if (!user_data.groupe_id) {
      throw new Error("Le groupe_id n'est pas défini dans AsyncStorage.");
    }
    const response = await ApiManager.post(`/agenda/whoischief/`, {
      groupe_id: user_data.groupe_id,
    });
    if (response.data.status === "success") {
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error("Impossible de récupérer les tâches. Veuillez réessayer.");
  }
}

export default whoIsChief;
