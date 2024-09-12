import * as SecureStore from "expo-secure-store";
import { DOMParser } from "xmldom";

const MAX_RETRIES = 2; // Nombre maximum de tentatives

async function refreshAuthToken(email_edu, mot_de_passe) {
  let attempts = 0;

  while (attempts < MAX_RETRIES) {
    try {
      await SecureStore.deleteItemAsync("authToken");

      const xmlString = `<?xml version="1.0" ?>
        <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope">
            <soap:Header>
                <context xmlns="urn:zimbra">
                    <format type="xml"/>
                </context>
            </soap:Header>
            <soap:Body>
                <AuthRequest xmlns="urn:zimbraAccount">
                    <account by="name">${email_edu}</account>
                    <password>${mot_de_passe}</password>
                </AuthRequest>
            </soap:Body>
        </soap:Envelope>`;

      const response = await fetch(
        "https://zimbra.univ-poitiers.fr/service/soap/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: 0,
            Credentials: "omit",
          },
          body: xmlString,
        }
      );

      if (response.ok) {
        const data = await response.text();

        const newToken = extractTokenFromXML(data);

        if (newToken) {
          await SecureStore.setItemAsync("authToken", newToken);
          return newToken;
        } else {
          console.error("Failed to extract the token from the response");
          return null;
        }
      } else if (response.status === 500) {
        console.error(
          `HTTP error 500! Status: ${response.status}. Retrying...`
        );
        attempts++;
        await new Promise((res) => setTimeout(res, 1000));
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error refreshing auth token:", error.message);
      return null;
    }
  }

  console.error("Failed to refresh auth token after multiple attempts");
  return null;
}

function extractTokenFromXML(xml) {
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
