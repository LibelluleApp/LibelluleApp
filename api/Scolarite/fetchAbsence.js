import ApiManager from "../ApiManager";
import {getUserData} from "../../utils/storage";

async function fetchAbsence(semester) {
  try {
    const user_data = getUserData();
    if (!user_data.email_edu) {
      throw new Error("L'adresse mail n'est pas défini dans AsyncStorage.");
    }

    const response = await ApiManager.post(`/scolarite/absence`, {
      email_edu: user_data.email_edu,
      semestre: semester,
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    throw new Error("Impossible de récupérer les tâches. Veuillez réessayer.");
  }
}

export default fetchAbsence;
