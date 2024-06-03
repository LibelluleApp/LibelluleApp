import ApiManager from "../ApiManager";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function fetchNextCourse() {
  try {
    const user_data = JSON.parse(await AsyncStorage.getItem("user_data"));

    if (!user_data.groupe_id) {
      throw new Error("Le groupe_id n'est pas défini dans AsyncStorage.");
    }
    console.log(user_data);
    const response = await ApiManager.post("/timetable/nextcours", {
      groupe_id: user_data.groupe_id,
    });

    if (response.data.status === "success") {
      return response.data.result;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("Error fetching next course:", error);
    return null; // Return null in case of error
  }
}

export default fetchNextCourse;