import ApiManager from "../ApiManager";
async function fetchWeather(date) {
  try {
    const response = await ApiManager.post("/weather/fetchweather", {
      date: date,
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
}

export default fetchWeather;
