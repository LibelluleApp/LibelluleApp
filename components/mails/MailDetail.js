import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { UserRound } from "../../assets/icons/Icons";
import { ThemeContext } from "./../../utils/themeContext";
import fetchMailFromId from "../../api/Mail/fetchMailDetail";

import Autolink from "react-native-autolink";
import { htmlToText } from "html-to-text";

function decodeHTMLEntities(text) {
  const entities = {
    "&#39;": "'",
    "&quot;": '"',
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&#43;": "+",
    // Ajoutez d'autres entités si nécessaire
  };

  return text.replace(/&#?\w+;/g, (match) => entities[match] || match);
}

const extractData = (xml) => {
  // Extract content inside <fr> tags
  const contentMatch = xml.match(/<fr>([\s\S]*?)<\/fr>/);
  const content = contentMatch ? contentMatch[1].trim() : "";

  // Extract subject inside <su> tags
  const suMatch = xml.match(/<su>([\s\S]*?)<\/su>/);
  const su = suMatch ? suMatch[1].trim() : "";

  // Extract email addresses from <e> tags
  const emailMatches =
    xml.match(
      '<e\\s+p="([^"]+)"\\s+a="([^"]+)"\\s+d="([^"]+)"\\s+t="([^"]+)"/>'
    ) || [];

  const emailAddresses = emailMatches.map((email) => {
    const pMatch = email.match(/p="([^"]+)"/);
    const aMatch = email.match(/a="([^"]+)"/);
    const dMatch = email.match(/d="([^"]+)"/);
    return {
      p: pMatch ? pMatch[1] : "",
      a: aMatch ? aMatch[1] : "",
      d: dMatch ? dMatch[1] : "",
    };
  });

  // Extract plain text content inside <content> tags within <mp>
  const plainTextContentMatch = xml.match(
    /<mp[^>]*?ct="text\/plain"[^>]*?><content>([\s\S]*?)<\/content>/i
  );
  const plainTextContent = plainTextContentMatch
    ? plainTextContentMatch[1].trim()
    : "";

  // Extract HTML content inside <content> tags within <mp>
  const htmlContentMatch = xml.match(
    /<mp[^>]*?ct="text\/html"[^>]*?><content>([\s\S]*?)<\/content>/i
  );
  let htmlContent = htmlContentMatch ? htmlContentMatch[1].trim() : "";
  htmlContent = htmlContent.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ""); // Supprime les balises <style>
  htmlContent = htmlContent.replace(/ style="[^"]*"/gi, ""); // Supprime les attributs style

  htmlContent = decodeHTMLEntities(htmlContent);

  htmlContent = htmlToText(htmlContent, {
    wordwrap: 130,
    selectors: [
      { selector: "img", format: "skip" }, // Skip images
      { selector: "a", options: { ignoreHref: true } }, // Ignore links' href attributes
    ],
  });

  return {
    content, // Body content inside <fr> tag
    su, // Subject inside <su> tag
    emailAddresses, // List of email addresses
    plainTextContent, // Plain text content from <content> tag
    htmlContent, // HTML content from <content> tag
  };
};

function MailDetail({ route }) {
  const email = route.params.email;
  const [mail, setMail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMail = async () => {
      try {
        const fetchedMail = await fetchMailFromId(email.id);
        setMail(fetchedMail);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch mail:", error);
        setLoading(false);
      }
    };
    fetchMail();
  }, [email.id]);

  const { colors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      flex: 1,
    },
    mailContent: {
      backgroundColor: colors.white_background,
      borderRadius: 10,
      width: "90%",
      marginTop: 20,
      padding: 20,
    },
    subject: {
      fontFamily: "Ubuntu_500Medium",
      fontSize: 15,
      color: colors.blue950,
      marginBottom: 15,
    },
    body: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 15,
      color: colors.blue950,
    },
    mailSender: {
      width: "90%",
      marginVertical: 20,
      backgroundColor: colors.white_background,
      borderRadius: 10,
      padding: 20,
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
    },
    sender: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 15,
      color: colors.blue950,
    },
  });

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  if (!mail) {
    return (
      <View style={styles.container}>
        <Text>No mail data available.</Text>
      </View>
    );
  }

  const { content, su, emailAddresses, plainTextContent, htmlContent } =
    extractData(mail);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <View style={styles.mailContent}>
        <Text style={styles.subject}>{su}</Text>
        {htmlContent ? (
          <Autolink
            text={htmlContent}
            textProps={{ style: styles.body, selectable: true }}
          />
        ) : (
          <Autolink
            text={plainTextContent}
            textProps={{ style: styles.body, selectable: true }}
          />
        )}
      </View>
      <View style={styles.mailSender}>
        <UserRound
          stroke={colors.blue950}
          strokeWidth={1.75}
          width={18}
          height={18}
        />
        <Text style={styles.sender}>
          {emailAddresses[0]?.p || emailAddresses[0]?.a || "Expéditeur inconnu"}
        </Text>
      </View>
    </ScrollView>
  );
}

export default MailDetail;
