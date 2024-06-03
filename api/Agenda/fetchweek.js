import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiManager from "../ApiManager";

function getNextMonday(date) {
  const day = date.getDay();
  const distanceToMonday = day === 0 ? 1 : 8 - day; // Dimanche -> 1, Samedi -> 2, autres jours -> 8 - jour
  date.setDate(date.getDate() + distanceToMonday);
  return date;
}

function adjustWeekendDates(startDate, endDate) {
  if (startDate.getDay() === 0 || startDate.getDay() === 6) {
    // Vérifie si c'est samedi ou dimanche
    startDate = getNextMonday(startDate);
  }
  if (endDate.getDay() === 0 || endDate.getDay() === 6) {
    // Vérifie si c'est samedi ou dimanche
    endDate = getNextMonday(endDate);
  }
  return { startDate, endDate };
}

async function fetchWeekAgenda() {
  try {
    let startDate = new Date();
    let endDate = new Date(new Date().setDate(new Date().getDate() + 5));

    let adjustedDates = adjustWeekendDates(startDate, endDate);
    startDate = adjustedDates.startDate;
    endDate = adjustedDates.endDate;

    const user_data = JSON.parse(await AsyncStorage.getItem("user_data"));

    if (!user_data.groupe_id) {
      throw new Error("Le groupe_id n'est pas défini dans AsyncStorage.");
    }

    const response = await ApiManager.post(`/agenda/fetchweekagenda/`, {
      groupe_id: user_data.groupe_id,
      utilisateur_id: user_data.utilisateur_id,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
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

export default fetchWeekAgenda;
