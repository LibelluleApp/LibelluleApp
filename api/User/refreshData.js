
import ApiManager from "../ApiManager";
import { jwtDecode } from "jwt-decode";
import {getUserData, setUserData} from "../../utils/storage";

const USER_DATA_KEY = "user_data";

function storeUserData(data) {
  try {
    const jsonValue = JSON.stringify(data);
    setUserData(jsonValue);
  } catch (error) {
    throw new Error("Could not save user data");
  }
}

async function refreshData() {
  try {
    const user_data = getUserData();

    if (!user_data.utilisateur_id) {
      throw new Error("L'adresse mail n'est pas définie dans AsyncStorage.");
    }

    const response = await ApiManager.get(`/user/fetch/${user_data.utilisateur_id}`);
    if (response.status === 200) {

      const userData = { ...response.data };
      storeUserData(userData);

      return userData;
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    throw new Error("Impossible de récupérer les données. Veuillez réessayer.");
  }
}

export default refreshData;
