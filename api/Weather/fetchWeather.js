import axios from "axios";
import * as Location from 'expo-location';

async function fetchWeather() {
  try {
    // Demande de permission pour accéder à la localisation
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Permission to access location was denied');
    }

    // Récupération de la localisation de l'utilisateur
    let currentLocation = await Location.getLastKnownPositionAsync({});
    const { latitude, longitude } = currentLocation.coords;

    // Appel à l'API pour récupérer les données météo
    const response = await axios.get(`https://weatherkit.apple.com/api/v1/weather/fr/${latitude}/${longitude}?dataSets=currentWeather`, {
      headers: {
        Authorization: "Bearer eyJhbGciOiJFUzI1NiIsImtpZCI6IjY4SDQ3UDZOUDciLCJpZCI6IlBVNFBENFI4VjcuY29tLmxpYmVsbHVsZS5saWJlbGx1bGUud2VhdGhlciJ9.eyJpc3MiOiJQVTRQRDRSOFY3IiwiaWF0IjoxNzI4MjI4NzIxLCJleHAiOjE4MjI4MzY3MjEsInN1YiI6ImNvbS5saWJlbGx1bGUubGliZWxsdWxlLndlYXRoZXIifQ.KNdMZex1O9pRwj3Coo-uyxGrLsdKdoN0q8PPdJD8vWjNanC1qdGyHFiygg_AIoTkWZNHhJMJ2fx063p2JHY5FA"
      }
    });

    if (response) {
      return response.data;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null; // Retourne null en cas d'erreur
  }
}

export default fetchWeather;
