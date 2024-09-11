import * as SecureStore from "expo-secure-store";
import refreshAuthToken from "./refreshToken";
import { DOMParser, XMLSerializer } from "xmldom";

// Fonction pour créer le corps de la demande SOAP
const createSoapBody = (token, id) => {
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
    </soap:Envelope>`,
    "application/xml"
  );

  return new XMLSerializer().serializeToString(doc);
};

// Fonction utilitaire pour effectuer la requête SOAP
const sendSoapRequest = async (authToken, id) => {
  const soapBody = createSoapBody(authToken, id);
  const response = await fetch("https://zimbra.univ-poitiers.fr/service/soap", {
    method: "POST",
    headers: {
      "Content-Type": "application/soap+xml; charset=utf-8",
    },
    body: soapBody,
  });

  const responseText = await response.text();
  if (!response.ok) {
    if (response.status === 500 || response.status === 401) {
      throw new Error("Token expired");
    }
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return responseText;
};

async function fetchMailFromId(id) {
  try {
    let authToken = await SecureStore.getItemAsync("authToken");
    let email_edu = await SecureStore.getItemAsync("email_edu");
    let mot_de_passe = await SecureStore.getItemAsync("mdpMail");

    if (!authToken) {
      throw new Error("No authToken found");
    }

    try {
      return await sendSoapRequest(authToken, id);
    } catch (error) {
      if (error.message === "Token expired") {
        authToken = await refreshAuthToken(email_edu, mot_de_passe);
        if (!authToken) {
          throw new Error("Unable to refresh token");
        }
        return await sendSoapRequest(authToken, id);
      }
      throw error;
    }
  } catch (error) {
    console.error("Error fetching mail:", error);
    return null;
  }
}

export default fetchMailFromId;
