import * as SecureStore from "expo-secure-store";
import refreshAuthToken from "./refreshToken";

async function fetchMailFromZimbra() {
  try {
    const [email_edu, mot_de_passe, initialAuthToken] = await Promise.all([
      SecureStore.getItemAsync("email_edu"),
      SecureStore.getItemAsync("mdpMail"),
      SecureStore.getItemAsync("authToken"),
    ]);

    const fetchMails = async (authToken) => {
      const response = await fetch(
        `https://zimbra.univ-poitiers.fr/home/~/inbox?fmt=json&auth=qp&zauthtoken=${authToken}&limit=15`,
        { method: "GET" }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    };

    try {
      return await fetchMails(initialAuthToken);
    } catch (error) {
      if (error.message.includes("401") || error.message.includes("500")) {
        const newAuthToken = await refreshAuthToken(email_edu, mot_de_passe);
        if (!newAuthToken) {
          throw new Error("Unable to refresh token");
        }
        return await fetchMails(newAuthToken);
      }
      throw error;
    }
  } catch (error) {
    console.error("Error fetching mail:", error);
    return null;
  }
}

export default fetchMailFromZimbra;
