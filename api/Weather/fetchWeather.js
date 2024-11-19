import axios from "axios";
import * as Location from 'expo-location';

// Coordonnées d'Angoulême
const ANGOULEME_COORDS = {
  latitude: 45.6495695,
  longitude: 0.1509964
};

async function fetchWeather() {
  try {
    let coordinates;

    try {
      // Tentative de récupération de la localisation de l'utilisateur
      let { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status === 'granted') {
        let currentLocation = await Location.getLastKnownPositionAsync({});
        if (currentLocation) {
          coordinates = {
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude
          };
        } else {
          coordinates = ANGOULEME_COORDS;
          console.log("Impossible d'obtenir la position actuelle, utilisation des coordonnées d'Angoulême");
        }
      } else {
        coordinates = ANGOULEME_COORDS;
        console.log("Permission de localisation refusée, utilisation des coordonnées d'Angoulême");
      }
    } catch (locationError) {
      coordinates = ANGOULEME_COORDS;
      console.log("Erreur de localisation, utilisation des coordonnées d'Angoulême:", locationError);
    }

    // Appel à l'API pour récupérer les données météo
    const response = await axios.get(
      `https://weatherkit.apple.com/api/v1/weather/fr/${coordinates.latitude}/${coordinates.longitude}?dataSets=currentWeather`,
      {
        headers: {
          Authorization: "Bearer eyJhbGciOiJFUzI1NiIsImtpZCI6IjY4SDQ3UDZOUDciLCJpZCI6IlBVNFBENFI4VjcuY29tLmxpYmVsbHVsZS5saWJlbGx1bGUud2VhdGhlciJ9.eyJpc3MiOiJQVTRQRDRSOFY3IiwiaWF0IjoxNzI4MjI4NzIxLCJleHAiOjE4MjI4MzY3MjEsInN1YiI6ImNvbS5saWJlbGx1bGUubGliZWxsdWxlLndlYXRoZXIifQ.KNdMZex1O9pRwj3Coo-uyxGrLsdKdoN0q8PPdJD8vWjNanC1qdGyHFiygg_AIoTkWZNHhJMJ2fx063p2JHY5FA"
        }
      }
    );

    if (response) {
      return {
        weather: response.data,
        usingDefaultLocation: coordinates === ANGOULEME_COORDS
      };
    } else {
      throw new Error(response);
    }
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
}

export default fetchWeather;