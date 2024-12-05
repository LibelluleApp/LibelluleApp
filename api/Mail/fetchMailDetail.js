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
        <GetMsgRequest xmlns="urn:zimbraMail" html="1">
          <m id="${id}" part=""/>
        </GetMsgRequest>
      </soap:Body>
    </soap:Envelope>`,
      "application/xml"
  );

  return new XMLSerializer().serializeToString(doc);
};

// Fonction pour parser les pièces jointes depuis la réponse XML
const parseAttachments = (xmlString) => {
  if (!xmlString) {
    console.error("Empty XML response");
    return [];
  }

  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");

    // Vérification des erreurs de parsing
    const parserError = xmlDoc.getElementsByTagName("parsererror");
    if (parserError.length) {
      console.error("XML parsing error:", parserError[0].textContent);
      return [];
    }

    const attachments = [];

    // Recherche des pièces jointes dans la structure XML
    // Utilisation de getElementsByTagName pour une meilleure compatibilité
    const parts = xmlDoc.getElementsByTagName("mp");

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const filename = part.getAttribute("filename");

      if (filename) {
        try {
          attachments.push({
            filename: filename,
            contentType: part.getAttribute("ct") || "",
            size: part.getAttribute("s") || "0",
            partId: part.getAttribute("part") || "",
            disposition: part.getAttribute("cd") || "attachment"
          });
        } catch (e) {
          console.error("Error parsing attachment:", e);
        }
      }
    }

    return attachments;

  } catch (error) {
    console.error("Error parsing XML:", error);
    return [];
  }
};

// Fonction pour télécharger une pièce jointe spécifique
const downloadAttachment = async (authToken, messageId, partId) => {
  try {
    const response = await fetch(
        `https://zimbra.univ-poitiers.fr/service/content/get?id=${messageId}&part=${partId}`,
        {
          method: "GET",
          headers: {
            "Cookie": `ZM_AUTH_TOKEN=${authToken}`
          }
        }
    );

    if (!response.ok) {
      throw new Error(`Failed to download attachment: ${response.status}`);
    }

    return response.blob();
  } catch (error) {
    console.error("Error downloading attachment:", error);
    throw error;
  }
};

// Fonction utilitaire pour effectuer la requête SOAP
const sendSoapRequest = async (authToken, id) => {
  const soapBody = createSoapBody(authToken, id);

  try {
    const response = await fetch("https://zimbra.univ-poitiers.fr/service/soap", {
      method: "POST",
      headers: {
        "Content-Type": "application/soap+xml; charset=utf-8",
      },
      body: soapBody,
    });

    if (!response.ok) {
      if (response.status === 500 || response.status === 401) {
        throw new Error("Token expired");
      }
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseText = await response.text();
    return responseText;

  } catch (error) {
    console.error("SOAP request failed:", error);
    throw error;
  }
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
      const response = await sendSoapRequest(authToken, id);
      const attachments = parseAttachments(response);

      return {
        rawResponse: response,
        attachments: attachments,
        downloadAttachment: async (partId) => {
          return await downloadAttachment(authToken, id, partId);
        }
      };

    } catch (error) {
      if (error.message === "Token expired") {
        authToken = await refreshAuthToken(email_edu, mot_de_passe);
        if (!authToken) {
          throw new Error("Unable to refresh token");
        }
        const response = await sendSoapRequest(authToken, id);
        const attachments = parseAttachments(response);
        return {
          rawResponse: response,
          attachments: attachments,
          downloadAttachment: async (partId) => {
            return await downloadAttachment(authToken, id, partId);
          }
        };
      }
      throw error;
    }
  } catch (error) {
    console.error("Error in fetchMailFromId:", error);
    return null;
  }
}

export default fetchMailFromId;