import ApiManager from "../ApiManager";

import {getUserData} from "../../utils/storage";

async function lostPassword(email_edu) {
  try {
    const response = await ApiManager.post(`/user/lostpassword`, {
      email_edu: email_edu,
    });
    if (response.status === 200) {
      return response.data.message;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    throw new Error(
      error.response.data ||
        "Erreur lors de la réinitialisation du mot de passe."
    );
  }
}

async function lostPasswordConnected() {
  try {
    const user_data = getUserData();
    if (!user_data.email_edu) {
      throw new Error("L'adresse mail n'est pas défini dans AsyncStorage.");
    }

    const response = await ApiManager.post(`/user/lostpassword`, {
      email_edu: user_data.email_edu,
    });
    if (response.status === 200) {
      return response.data.message;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    throw new Error(
      error.response.data ||
        "Erreur lors de la réinitialisation du mot de passe."
    );
  }
}

export default lostPassword;
export { lostPasswordConnected };
