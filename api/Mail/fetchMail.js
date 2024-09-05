import * as SecureStore from "expo-secure-store";
import refreshAuthToken from "./refreshToken";
// Fonction pour régénérer le token

async function fetchMailFromZimbra() {
  try {
    const email_edu = await SecureStore.getItemAsync("email_edu");
    const mot_de_passe = await SecureStore.getItemAsync("mdpMail");

    let authToken = await SecureStore.getItemAsync("authToken");
    let response = await fetch(
      `https://zimbra.univ-poitiers.fr/home/~/inbox?fmt=json&auth=qp&zauthtoken=${authToken}&limit=15`,
      {
        method: "GET",
      }
    );

    if (response.status === 401 || response.status === 500) {
      authToken = await refreshAuthToken(email_edu, mot_de_passe);

      if (!authToken) {
        throw new Error("Unable to refresh token");
      }

      response = await fetch(
        `https://zimbra.univ-poitiers.fr/home/~/inbox?fmt=json&auth=qp&zauthtoken=${authToken}&limit=15`,
        {
          method: "GET",
        }
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching mail:", error);
    return null;
  }
}

export default fetchMailFromZimbra;
