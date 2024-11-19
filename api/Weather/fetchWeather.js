import axios from "axios";
import * as Location from 'expo-location';

async function fetchWeather() {
  try {
    const locationEnabled = await Location.hasServicesEnabledAsync();
    if (!locationEnabled) {
      throw new Error('Location services are disabled');
    }

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Permission to access location was denied');
    }

    const currentLocation = await Location.getLastKnownPositionAsync({});
    if (!currentLocation) {
      throw new Error('Unable to get location');
    }

    const { latitude, longitude } = currentLocation.coords;

    const response = await axios.get(
      `https://weatherkit.apple.com/api/v1/weather/fr/${latitude}/${longitude}?dataSets=currentWeather`,
      {
        headers: {
          Authorization: "Bearer eyJhbGciOiJFUzI1NiIsImtpZCI6IjY4SDQ3UDZOUDciLCJpZCI6IlBVNFBENFI4VjcuY29tLmxpYmVsbHVsZS5saWJlbGx1bGUud2VhdGhlciJ9.eyJpc3MiOiJQVTRQRDRSOFY3IiwiaWF0IjoxNzI4MjI4NzIxLCJleHAiOjE4MjI4MzY3MjEsInN1YiI6ImNvbS5saWJlbGx1bGUubGliZWxsdWxlLndlYXRoZXIifQ.KNdMZex1O9pRwj3Coo-uyxGrLsdKdoN0q8PPdJD8vWjNanC1qdGyHFiygg_AIoTkWZNHhJMJ2fx063p2JHY5FA"
        },
        timeout: 5000
      }
    );

    return response.data;
  } catch (error) {
    let errorMessage;
    
    switch(error.message) {
      case 'Location services are disabled':
        errorMessage = 'Veuillez activer les services de localisation';
        break;
      case 'Permission to access location was denied':
        errorMessage = 'Autorisation de localisation refusée';
        break;
      case 'Unable to get location':
        errorMessage = 'Impossible de récupérer votre position';
        break;
      default:
        errorMessage = 'Erreur lors de la récupération des données météo';
    }

    console.error("Error:", error.message);
    return {
      error: true,
      message: errorMessage
    };
  }
}

export default fetchWeather;
