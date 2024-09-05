import * as SecureStore from "expo-secure-store";
import { DOMParser, XMLSerializer } from "xmldom";

async function connectZimbra(email_edu, mot_de_passe) {
  try {
    await SecureStore.deleteItemAsync("authToken");

    // Créez le document XML pour la requête SOAP
    const doc = new DOMParser().parseFromString(
      `<?xml version="1.0" ?>
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
</soap:Envelope>
    `,
      "application/xml"
    );

    // Sérialisez le document XML en chaîne
    const xmlSerializer = new XMLSerializer();
    const soapBody = xmlSerializer.serializeToString(doc);

    console.log("Sending SOAP request with body:", soapBody);

    // Envoyer la requête
    const response = await fetch(
      "https://zimbra.univ-poitiers.fr/service/soap",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/xml",
        },
        body: soapBody,
      }
    );

    const data = await response.text();

      const responseDoc = new DOMParser().parseFromString(
        data,
        "application/xml"
      );
      // Envoyer la requête

      // Utiliser DOMParser pour analyser la réponse XML

      // Extraire le token d'authentification
      const authTokenNode = responseDoc.getElementsByTagName("authToken")[0];
      const authToken = authTokenNode ? authTokenNode.textContent : null;

      if (authToken) {
        await SecureStore.setItemAsync("authToken", authToken);
        await SecureStore.setItemAsync("email_edu", email_edu);
        await SecureStore.setItemAsync("mdpMail", mot_de_passe);
        return authToken;
      } else {
        console.error("Failed to extract auth token from the response");
        return null;
      }
    } catch (error) {
      console.error("Error connecting to Zimbra:", error);
      return null;
    }
  } catch (error) {
    console.error("Error connecting to Zimbra:", error);
    return null;
  }
}

export default connectZimbra;
