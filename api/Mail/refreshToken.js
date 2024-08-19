import * as SecureStore from "expo-secure-store";
import { DOMParser, XMLSerializer } from "xmldom";

async function refreshAuthToken(email_edu, mot_de_passe) {
  try {
    // Supprimer l'ancien token
    await SecureStore.deleteItemAsync("authToken");
    // Créer le document XML avec xmldom
    const doc = new DOMParser().parseFromString(
      `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope">
        <soap:Header/>
        <soap:Body>
          <AuthRequest xmlns="urn:zimbraAccount">
            <account by="name">${email_edu}</account>
            <password>${mot_de_passe}</password>
          </AuthRequest>
        </soap:Body>
      </soap:Envelope>
    `,
      "application/soap+xml"
    );

    // Sérialiser le document XML
    const xmlSerializer = new XMLSerializer();
    const xmlString = xmlSerializer.serializeToString(doc);

    const response = await fetch(
      "https://zimbra.univ-poitiers.fr/service/soap",
      {
        method: "POST",
        headers: {
          "Content-Type": "text/xml",
        },
        body: xmlString,
      }
    );
    console.log(xmlString);
    // if (!response.ok) {
    //   throw new Error(`HTTP error! Status: ${response.status}`);
    // }

    const data = await response.text();
    console.log("Response:", data);

    // Extraire le nouveau token du XML
    const newToken = await extractTokenFromXML(data);

    if (newToken) {
      await SecureStore.setItemAsync("authToken", newToken);
      console.log("Refreshed token saved:", newToken);
    } else {
      console.error("Failed to extract the token from the response");
    }

    return newToken;
  } catch (error) {
    console.error("Error refreshing auth token:", error.message);
    return null;
  }
}

// Fonction pour extraire le token depuis la réponse XML
async function extractTokenFromXML(xml) {
  try {
    const doc = new DOMParser().parseFromString(xml, "application/xml");
    const tokenNode = doc.getElementsByTagName("authToken")[0];
    return tokenNode ? tokenNode.textContent : null;
  } catch (error) {
    console.error("Error parsing XML:", error.message);
    return null;
  }
}

export default refreshAuthToken;
