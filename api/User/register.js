import ApiManager from "../ApiManager";

async function register(
  email_edu,
  mot_de_passe,
  confirmPassword,
  prenom,
  nom,
  groupe_id
) {
  try {
    const response = await ApiManager.post("/user/signup", {
      email_edu,
      mot_de_passe,
      confirmPassword,
      prenom,
      nom,
      groupe_id,
    });
    if (response.status === 200) {
      return response;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    throw new Error(
      error.response.data.message || "Erreur lors de l'inscription."
    );
  }
}

export default register;
