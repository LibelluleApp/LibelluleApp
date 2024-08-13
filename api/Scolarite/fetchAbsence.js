import ApiManager from "../ApiManager";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function fetchAbsence() {
  try {
    const user_data = JSON.parse(await AsyncStorage.getItem("user_data"));
    if (!user_data.email_edu) {
      throw new Error("L'adresse mail n'est pas défini dans AsyncStorage.");
    }

    const response = await ApiManager.post(`/scolarite/`, {
      email_edu: user_data.email_edu,
      semestre: "s4-2024",
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