import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiManager from "../ApiManager";

async function fetchTask(task_id) {
  const user_data = JSON.parse(await AsyncStorage.getItem("user_data"));
  if (!user_data.groupe_id) {
    throw new Error("Le groupe_id n'est pas défini dans AsyncStorage.");
  }
  try {
    const response = await ApiManager.post(`/agenda/fetchtask/`, {
      agenda_id: task_id,
      utilisateur_id: user_data.utilisateur_id,
    });
    if (response.data.status === "success") {
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error(
      "Impossible de récupérer la tâche. Veuillez réessayer." + error
    );
  }
}

export default fetchTask;
