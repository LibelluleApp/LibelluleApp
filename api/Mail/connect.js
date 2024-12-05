import * as SecureStore from "expo-secure-store";
import { DOMParser, XMLSerializer } from "xmldom";

const ZIMBRA_ENDPOINT = "https://zimbra.univ-poitiers.fr/service/soap";
const STORAGE_KEYS = {
  AUTH_TOKEN: "authToken",
  EMAIL: "email_edu",
  PASSWORD: "mdpMail",
};

/**
 * Génère le XML SOAP pour la requête d'authentification
 * @param {string} email - Email universitaire
 * @param {string} password - Mot de passe
 * @returns {string} Document XML formaté
 */
const createAuthRequestXML = (email, password) => {
  const template = `<?xml version="1.0" ?>
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope">
    <soap:Header>
        <context xmlns="urn:zimbra">
            <format type="xml"/>
        </context>
    </soap:Header>
    <soap:Body>
        <AuthRequest xmlns="urn:zimbraAccount">
            <account by="name">${email}</account>
            <password>${password}</password>
        </AuthRequest>
    </soap:Body>
</soap:Envelope>`;

  return new DOMParser().parseFromString(template, "application/xml");
};

/**
 * Configure les en-têtes HTTP pour la requête
 * @returns {Headers} En-têtes HTTP configurés
 */
const getRequestHeaders = () => {
  const headers = new Headers({
    "Content-Type": "application/xml",
    "User-Agent": "PostmanRuntime/7.41.2",
    Accept: "*/*",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    Pragma: "no-cache",
    Expires: "0",
  });
  return headers;
};

/**
 * Extrait le token d'authentification de la réponse XML
 * @param {string} responseData - Réponse XML du serveur
 * @returns {string|null} Token d'authentification ou null si non trouvé
 */
const extractAuthToken = (responseData) => {
  try {
    const doc = new DOMParser().parseFromString(responseData, "application/xml");
    const authTokenNode = doc.getElementsByTagName("authToken")[0];
    return authTokenNode ? authTokenNode.textContent : null;
  } catch (error) {
    console.error("Erreur lors de l'extraction du token:", error);
    return null;
  }
};

/**
 * Sauvegarde les informations d'authentification dans le SecureStore
 * @param {string} authToken - Token d'authentification
 * @param {string} email - Email universitaire
 * @param {string} password - Mot de passe
 * @returns {Promise<void>}
 */
const saveCredentials = async (authToken, email, password) => {
  try {
    await Promise.all([
      SecureStore.setItemAsync(STORAGE_KEYS.AUTH_TOKEN, authToken),
      SecureStore.setItemAsync(STORAGE_KEYS.EMAIL, email),
      SecureStore.setItemAsync(STORAGE_KEYS.PASSWORD, password),
    ]);
  } catch (error) {
    console.error("Erreur lors de la sauvegarde des credentials:", error);
    throw error;
  }
};

/**
 * Se connecte au service Zimbra
 * @param {string} email_edu - Email universitaire
 * @param {string} mot_de_passe - Mot de passe
 * @returns {Promise<string|null>} Token d'authentification ou null en cas d'échec
 */
async function connectZimbra(email_edu, mot_de_passe) {
  try {
    // Validation des entrées
    if (!email_edu || !mot_de_passe) {
      throw new Error("Email et mot de passe requis");
    }

    // Création de la requête XML
    const doc = createAuthRequestXML(email_edu, mot_de_passe);
    const soapBody = new XMLSerializer().serializeToString(doc);

    // Appel API
    const response = await fetch(ZIMBRA_ENDPOINT, {
      method: "POST",
      headers: getRequestHeaders(),
      body: soapBody,
      credentials: "omit",
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const responseData = await response.text();
    const authToken = extractAuthToken(responseData);

    if (!authToken) {
      throw new Error("Token d'authentification non trouvé dans la réponse");
    }

    // Sauvegarde des credentials
    await saveCredentials(authToken, email_edu, mot_de_passe);
    return authToken;

  } catch (error) {
    console.error("Erreur de connexion Zimbra:", error.message);
    return null;
  }
}

export default connectZimbra;