import * as SecureStore from "expo-secure-store";

async function refreshAuthToken(email_edu, mot_de_passe) {
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
      "https://zimbra.univ-poitiers.fr/service/soap",
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

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.text();

    const newToken = extractTokenFromXML(data);

    if (newToken) {
      await SecureStore.setItemAsync("authToken", newToken);
    } else {
      console.error("Failed to extract the token from the response");
      return null;
    }

    return newToken;
  } catch (error) {
    console.error("Error refreshing auth token:", error.message);
    return null;
  }
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
