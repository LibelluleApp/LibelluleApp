import * as SecureStore from "expo-secure-store";
import { DOMParser, XMLSerializer } from "xmldom";

async function connectZimbra(email_edu, mot_de_passe) {
  try {
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

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/xml");
    myHeaders.append("User-Agent", "PostmanRuntime/7.41.2");
    myHeaders.append("Accept", "*/*");
    myHeaders.append("Cache-Control", "no-cache");
    myHeaders.append("Connection", "keep-alive");
    myHeaders.append("Pragma", "no-cache");
    myHeaders.append("Expires", "0");

    try {
      const responseBis = await fetch(
        "https://zimbra.univ-poitiers.fr/service/soap",
        {
          method: "POST",
          headers: myHeaders,
          body: soapBody,
          credentials: "omit",
        }
      );
      const data = await responseBis.text();

      const responseDoc = new DOMParser().parseFromString(
        data,
        "application/xml"
      );

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
