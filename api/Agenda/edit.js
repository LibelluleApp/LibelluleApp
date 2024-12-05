import ApiManager from "../ApiManager";
import * as SecureStore from "expo-secure-store";

import {getUserData} from "../../utils/storage";

async function saveEditAgenda(
  titre,
  description,
  date,
  ressource_name,
  type,
  agenda_id
) {
  const user_data = getUserData();

  if (!user_data.groupe_id) {
    throw new Error("Le groupe_id n'est pas défini dans AsyncStorage.");
  }
  try {
    const data = {
      agenda_id,
      titre,
      description,
      date,
      ressource_name,
      type,
      groupe_id: user_data.groupe_id,
      utilisateur_id: user_data.utilisateur_id,
    };
    const response = await ApiManager.post("/agenda/edittask", data);
    if (response.data.status === "success") {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error("Impossible d'ajouter la tâche. Veuillez réessayer.");
  }
}

export default saveEditAgenda;
