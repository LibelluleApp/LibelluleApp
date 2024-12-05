import ApiManager from "../ApiManager";

import {getAlternant, getUserData} from "../../utils/storage";

async function fetchNextCourse() {
  try {
    const user_data = getUserData();
    if (!user_data.groupe_id) {
      throw new Error("Le groupe_id n'est pas défini dans AsyncStorage.");
    }
    let isAlternant = getAlternant();

    if (isAlternant === "true") {
      user_data.groupe_id = user_data.groupe_id + "A";
    }
    const response = await ApiManager.post("/timetable/nextcours", {
      groupe_id: user_data.groupe_id,
    });

    if (response.data.status === "success") {
      return response.data.result;
    } else if (response.data.status === "nothing") {
      return null;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    console.error("Error fetching next course:", error);
    return null;
  }
}

export default fetchNextCourse;
