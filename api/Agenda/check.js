import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiManager from "../ApiManager";

async function checkAgenda(agenda_id) {
  try {
    const user_data = JSON.parse(await AsyncStorage.getItem("user_data"));

    if (!user_data.utilisateur_id) {
      throw new Error("L'ID' n'est pas défini dans AsyncStorage.");
    }

    const response = await ApiManager.post(`/agenda/check/`, {
      utilisateur_id: user_data.utilisateur_id,
      agenda_id: agenda_id,
    });
    if (response.data.status === "success") {
      return true;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error("Impossible de récupérer les tâches. Veuillez réessayer.");
  }
}
async function uncheckAgenda(agenda_id) {
  try {
    const user_data = JSON.parse(await AsyncStorage.getItem("user_data"));

    if (!user_data.utilisateur_id) {
      throw new Error("L'ID' n'est pas défini dans AsyncStorage.");
    }

    const response = await ApiManager.post(`/agenda/uncheck/`, {
      utilisateur_id: user_data.utilisateur_id,
      agenda_id: agenda_id,
    });
    if (response.data.status === "success") {
      return false;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error("Impossible de récupérer les tâches. Veuillez réessayer.");
  }
}

async function fetchCheckedAgenda(agenda_id) {
  try {
    const user_data = JSON.parse(await AsyncStorage.getItem("user_data"));

    if (!user_data.utilisateur_id) {
      throw new Error("L'ID' n'est pas défini dans AsyncStorage.");
    }

    const response = await ApiManager.post(`/agenda/fetchchecked/`, {
      utilisateur_id: user_data.utilisateur_id,
      agenda_id: agenda_id,
    });
    if (response.data.status === "success") {
      if (response.data.data.length > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error("Impossible de récupérer les tâches. Veuillez réessayer.");
  }
}

export { checkAgenda, uncheckAgenda, fetchCheckedAgenda };
