import ApiManager from "../ApiManager";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function fetchTimetable() {
  try {
    const user_data = JSON.parse(await AsyncStorage.getItem("user_data"));

    if (!user_data.groupe_id) {
      throw new Error("Le groupe_id n'est pas défini dans AsyncStorage.");
    }

    const response = await ApiManager.post("/timetable/gettimetable", {
      groupe_id: user_data.groupe_id,
    });

    if (response.data.status === "success") {
      return response.data.events;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("Error fetching timetable:", error);
    return null;
  }
}

export default fetchTimetable;
