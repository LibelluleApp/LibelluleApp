import ApiManager from "../ApiManager";

import {getUserData} from "../../utils/storage";

async function updatePassword(oldPassword, newPassword, confirmPassword) {
  try {
    const user_data = getUserData();
    if (!user_data.email_edu) {
      throw new Error("L'adresse mail n'est pas défini dans AsyncStorage.");
    }

    const response = await ApiManager.post(`/user/changepassword`, {
      email_edu: user_data.email_edu,
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    });
    if (response.status === 200) {
      return response.data.message;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    throw new Error(
      error.response.data || "Erreur lors de la mise à jour du mot de passe."
    );
  }
}

export default updatePassword;
