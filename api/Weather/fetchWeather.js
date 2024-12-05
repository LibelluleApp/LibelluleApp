import axios from "axios";
import * as Location from 'expo-location';

// Coordonnées d'Angoulême
const ANGOULEME_COORDS = {
  latitude: 45.6458,
  longitude: 0.1558
};

async function fetchWeather() {
  try {
    let coordinates;
    
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
      
      coordinates = currentLocation.coords;
    } catch (locationError) {
      console.log("Utilisation des coordonnées d'Angoulême:", locationError.message);
      coordinates = ANGOULEME_COORDS;
    }

    try {
      const response = await axios.get(
        `https://weatherkit.apple.com/api/v1/weather/fr/${coordinates.latitude}/${coordinates.longitude}?dataSets=currentWeather`,
        {
          headers: {
            Authorization: "Bearer eyJhbGciOiJFUzI1NiIsImtpZCI6IjY4SDQ3UDZOUDciLCJpZCI6IlBVNFBENFI4VjcuY29tLmxpYmVsbHVsZS5saWJlbGx1bGUud2VhdGhlciJ9.eyJpc3MiOiJQVTRQRDRSOFY3IiwiaWF0IjoxNzI4MjI4NzIxLCJleHAiOjE4MjI4MzY3MjEsInN1YiI6ImNvbS5saWJlbGx1bGUubGliZWxsdWxlLndlYXRoZXIifQ.KNdMZex1O9pRwj3Coo-uyxGrLsdKdoN0q8PPdJD8vWjNanC1qdGyHFiygg_AIoTkWZNHhJMJ2fx063p2JHY5FA"
          },
          timeout: 5000
        }
      );
      return response.data;
    } catch (apiError) {
      throw new Error('API_ERROR');
    }
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
      case 'API_ERROR':
        errorMessage = 'Erreur de connexion au service météo';
        break;
      default:
        errorMessage = 'Erreur lors de la récupération des données météo';
    }
    
    return {
      error: true,
      message: errorMessage,
      usingFallbackLocation: coordinates === ANGOULEME_COORDS
    };
  }
}

export default fetchWeather;