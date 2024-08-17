import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
  ScrollView,
} from "react-native";
import { UserRound } from "../../assets/icons/Icons";
import { ThemeContext } from "./../../utils/themeContext";
import fetchMailFromId from "../../api/Mail/fetchMailDetail";

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
    /<mp ct="text\/plain"[\s\S]*?<content>([\s\S]*?)<\/content>/
  );
  const plainTextContent = plainTextContentMatch
    ? plainTextContentMatch[1].trim()
    : "";

  return {
    content, // Body content inside <fr> tag
    su, // Subject inside <su> tag
    emailAddresses, // List of email addresses
    plainTextContent, // Plain text content from <content> tag
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
      color: colors.black,
      marginBottom: 15,
    },
    body: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 15,
      color: colors.black,
    },
    mailSender: {
      width: "90%",
      marginTop: 20,
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
      color: colors.black,
    },
  });

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
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

  const { content, su, emailAddresses, plainTextContent } = extractData(mail); // Make sure mail.xmlData is correct

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <View style={styles.mailContent}>
        <Text style={styles.subject}>{su}</Text>
        <Text style={styles.body}>{plainTextContent}</Text>
      </View>
      <View style={styles.mailSender}>
        <UserRound
          stroke={colors.black}
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
