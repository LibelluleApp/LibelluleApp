import ApiManager from "../ApiManager";

import {getUserData} from "../../utils/storage";

async function fetchTp() {
  try {
    const user_data = getUserData();
    if (!user_data.email_edu) {
      throw new Error("L'adresse mail n'est pas défini dans AsyncStorage.");
    }

    const response = await ApiManager.post(`/groupe/fetchstudenttp`, {
      groupe_id: user_data.groupe_id,
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    throw new Error(
      "Impossible de récupérer les étudiants. Veuillez réessayer."
    );
  }
}

export default fetchTp;
