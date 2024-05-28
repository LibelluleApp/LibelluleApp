import ApiManager from "../ApiManager";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function saveAgenda(
  titre,
  description,
  date,
  ressource_id,
  type,
  utilisateur_id,
  groupe_id
) {
  try {
    const data = {
      titre,
      description,
      date,
      ressource_id,
      type,
      utilisateur_id,
      groupe_id,
    };
    const response = await ApiManager.post("/agenda/add", data);
    if (response.data.status === "success") {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error("Impossible d'ajouter la tâche. Veuillez réessayer.");
  }
}

export default saveAgenda;
