
import ApiManager from "../ApiManager";
import {getUserData} from "../../utils/storage";

async function fetchAgenda() {
  try {
    const user_data = getUserData();

    if (!user_data.groupe_id) {
      throw new Error("Le groupe_id n'est pas défini dans AsyncStorage.");
    }

    const response = await ApiManager.post(`/agenda/fetchagenda/`, {
      groupe_id: user_data.groupe_id,
      utilisateur_id: user_data.utilisateur_id,
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

export default fetchAgenda;
