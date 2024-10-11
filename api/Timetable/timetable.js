import ApiManager from "../ApiManager";

import {getAlternant, getUserData} from "../../utils/storage";

async function fetchTimetable() {
  try {
    const user_data = getUserData();

    if (!user_data.groupe_id) {
      throw new Error("Le groupe_id n'est pas défini dans AsyncStorage.");
    }

    let isAlternant = getAlternant();
    if (isAlternant) {
      user_data.groupe_id = user_data.groupe_id + "A";
    }

    const response = await ApiManager.post("/timetable/gettimetable", {
      groupe_id: user_data.groupe_id,
    });

    if (response.data.status === "success") {
      const transformedEvents = response.data.events.map(event => ({
        ...event,
        start: { dateTime: new Date(event.start) },
        end: { dateTime: new Date(event.end) }
      }));
      return transformedEvents;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("Error fetching timetable:", error);
    return null;
  }
}

export default fetchTimetable;
