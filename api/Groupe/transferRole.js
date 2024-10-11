import ApiManager from "../ApiManager";

import refreshData from "../User/refreshData";
import {getUserData} from "../../utils/storage";

async function transferRole(other_id) {
  try {
    const user_data = getUserData();
    if (!user_data.utilisateur_id) {
      throw new Error("L'adresse mail n'est pas défini dans AsyncStorage.");
    }

    const response = await ApiManager.post(`/groupe/transferrole`, {
      myId: user_data.utilisateur_id,
      otherId: other_id,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    throw new Error(
      "Impossible de récupérer les étudiants. Veuillez réessayer."
    );
  }
}

export default transferRole;
