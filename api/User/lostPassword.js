import ApiManager from "../ApiManager";

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

export default lostPassword;
