import ApiManager from "../ApiManager";

import {getAlternant, getUserData} from "../../utils/storage";

async function fetchHourOfDay(date) {
  try {
    const user_data = getUserData();
    if (!user_data.groupe_id) {
      throw new Error("Le groupe_id n'est pas défini dans AsyncStorage.");
    }

    let isAlternant = getAlternant();
    if (isAlternant === "true") {
      user_data.groupe_id = user_data.groupe_id + "A";
    }

    const response = await ApiManager.post("/timetable/findtotalhourofday", {
      groupe_id: user_data.groupe_id,
      day: date,
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    console.error("Error fetching hour of day:", error);
    return null;
  }
}

export default fetchHourOfDay;
