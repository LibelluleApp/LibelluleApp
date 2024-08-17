import * as SecureStore from "expo-secure-store";
import refreshAuthToken from "./refreshToken";
import { DOMParser, XMLSerializer } from "xmldom";

async function fetchMailFromId(id) {
  try {
    let authToken = await SecureStore.getItemAsync("authToken");
    let email_edu = await SecureStore.getItemAsync("email_edu");
    let mot_de_passe = await SecureStore.getItemAsync("mdpMail");
    if (!authToken) {
      throw new Error("No authToken found");
    }

    // Fonction pour créer le corps de la demande SOAP
    const createSoapBody = (token) => {
      const doc = new DOMParser().parseFromString(
        `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope">
          <soap:Header>
            <context xmlns="urn:zimbra">
              <userAgent name="zclient" version="9.0.0_GA_3962"/>
              <authToken>${token}</authToken>
            </context>
          </soap:Header>
          <soap:Body>
            <GetMsgRequest xmlns="urn:zimbraMail">
              <m id="${id}"/>
            </GetMsgRequest>
          </soap:Body>
        </soap:Envelope>
      `,
        "application/xml"
      );

      const xmlSerializer = new XMLSerializer();
      return xmlSerializer.serializeToString(doc);
    };

    const soapBody = createSoapBody(authToken);

    let response = await fetch("https://zimbra.univ-poitiers.fr/service/soap", {
      method: "POST",
      headers: {
        "Content-Type": "application/soap+xml; charset=utf-8",
      },
      body: soapBody,
    });

    // Log the full response for debugging
    const responseText = await response.text();

    if (response.status === 500 || response.status === 401) {
      // Token expiré, régénérer le token

      authToken = await refreshAuthToken(email_edu, mot_de_passe);

      if (!authToken) {
        throw new Error("Unable to refresh token");
      }

      // Réessayez avec le nouveau token
      const newSoapBody = createSoapBody(authToken);

      response = await fetch("https://zimbra.univ-poitiers.fr/service/soap", {
        method: "POST",
        headers: {
          "Content-Type": "application/soap+xml; charset=utf-8",
        },
        body: newSoapBody,
      });

      // Log the full response for debugging
      const retryResponseText = await response.text();
    }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Retournez les données ou traitez-les selon les besoins
    return responseText;
  } catch (error) {
    console.error("Error fetching mail:", error);
    return null;
  }
}

export default fetchMailFromId;
