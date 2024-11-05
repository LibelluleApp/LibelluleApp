import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { UserRound, Paperclip } from "../../assets/icons/Icons";
import { ThemeContext } from "./../../utils/themeContext";
import fetchMailFromId from "../../api/Mail/fetchMailDetail";
import Autolink from "react-native-autolink";
import { htmlToText } from "html-to-text";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

function decodeHTMLEntities(text) {
  const entities = {
    "&#39;": "'",
    "&quot;": '"',
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&#43;": "+",
  };

  return text.replace(/&#?\w+;/g, (match) => entities[match] || match);
}

const extractData = (xmlString) => {
  if (!xmlString) {
    console.error("No XML string provided to extractData");
    return {
      content: "",
      su: "",
      emailAddresses: [],
      plainTextContent: "",
      htmlContent: "",
      attachments: []
    };
  }

  try {
    // Extract content inside <fr> tags
    const contentMatch = xmlString.match(/<fr>([\s\S]*?)<\/fr>/);
    const content = contentMatch ? contentMatch[1].trim() : "";

    // Extract subject inside <su> tags
    const suMatch = xmlString.match(/<su>([\s\S]*?)<\/su>/);
    const su = suMatch ? suMatch[1].trim() : "";

    // Extract email addresses
    const emailRegex = /<e\s+p="([^"]+)"\s+a="([^"]+)"\s+d="([^"]+)"\s+t="([^"]+)"\/>/g;
    let match;
    const emailAddresses = [];

    while ((match = emailRegex.exec(xmlString)) !== null) {
      emailAddresses.push({
        p: match[1],
        a: match[2],
        d: match[3]
      });
    }

    // Extract plain text content
    const plainTextContentMatch = xmlString.match(
        /<mp[^>]*?ct="text\/plain"[^>]*?><content>([\s\S]*?)<\/content>/i
    );
    const plainTextContent = plainTextContentMatch
        ? plainTextContentMatch[1].trim()
        : "";

    // Extract HTML content
    const htmlContentMatch = xmlString.match(
        /<mp[^>]*?ct="text\/html"[^>]*?><content>([\s\S]*?)<\/content>/i
    );
    let htmlContent = htmlContentMatch ? htmlContentMatch[1].trim() : "";
    htmlContent = htmlContent.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");
    htmlContent = htmlContent.replace(/ style="[^"]*"/gi, "");
    htmlContent = decodeHTMLEntities(htmlContent);

    htmlContent = htmlToText(htmlContent, {
      wordwrap: 130,
      selectors: [
        { selector: "img", format: "skip" },
        { selector: "a", options: { ignoreHref: true } },
      ],
    });

    return {
      content,
      su,
      emailAddresses,
      plainTextContent,
      htmlContent
    };
  } catch (error) {
    console.error("Error in extractData:", error);
    return {
      content: "",
      su: "",
      emailAddresses: [],
      plainTextContent: "",
      htmlContent: "",
    };
  }
};

function MailDetail({ route }) {
  const email = route.params.email;
  const [mailData, setMailData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloadFunction, setDownloadFunction] = useState(null);
  const [downloadingFile, setDownloadingFile] = useState(false);
  const { colors } = useContext(ThemeContext);

  useEffect(() => {
    const fetchMail = async () => {
      try {
        const response = await fetchMailFromId(email.id);
        if (response && response.rawResponse) {
          const extractedData = extractData(response.rawResponse);
          setMailData({
            ...extractedData,
            attachments: response.attachments || [],
          });
          setDownloadFunction(() => response.downloadAttachment);
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch mail:", error);
        setLoading(false);
      }
    };
    fetchMail();
  }, [email.id]);

  const handleDownloadAttachment = async (attachment) => {
    try {
      if (!downloadFunction) {
        Alert.alert("Erreur", "Impossible de télécharger le fichier");
        return;
      }
      setDownloadingFile(true);

      const tempFileName = `${FileSystem.cacheDirectory}${Date.now()}-${attachment.filename}`;

      const blob = await downloadFunction(attachment.partId);

      // Conversion du blob en base64
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64Data = reader.result.split(',')[1];

          // Écriture du fichier dans le stockage temporaire
          await FileSystem.writeAsStringAsync(tempFileName, base64Data, {
            encoding: FileSystem.EncodingType.Base64,
          });

          // Vérification que le partage est disponible
          const isAvailable = await Sharing.isAvailableAsync();
          if (isAvailable) {
            // Ouverture du fichier avec le gestionnaire de fichiers par défaut
            await Sharing.shareAsync(tempFileName, {
              mimeType: attachment.contentType,
              dialogTitle: `Ouvrir ${attachment.filename}`,
              UTI: attachment.contentType
            });
          } else {
            Alert.alert(
                "Erreur",
                "Le partage de fichiers n'est pas disponible sur cet appareil"
            );
          }

          try {
            await FileSystem.deleteAsync(tempFileName);
          } catch (cleanupError) {
            console.error("Error cleaning up temp file:", cleanupError);
          }

        } catch (error) {
          Alert.alert(
              "Erreur",
              "Une erreur est survenue lors de l'ouverture du fichier"
          );
          console.error("Error processing file:", error);
        } finally {
          setDownloadingFile(false);
        }
      };

      reader.onerror = () => {
        setDownloadingFile(false);
        Alert.alert(
            "Erreur",
            "Une erreur est survenue lors de la lecture du fichier"
        );
      };

      reader.readAsDataURL(blob);

    } catch (error) {
      setDownloadingFile(false);
      Alert.alert(
          "Erreur",
          "Impossible de télécharger la pièce jointe"
      );
      console.error("Error downloading attachment:", error);
    }
  };

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
      letterSpacing: -0.4,
      fontSize: 15,
      color: colors.regular950,
      marginBottom: 15,
    },
    body: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 15,
      color: colors.regular950,
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
      letterSpacing: -0.4,
      fontSize: 15,
      color: colors.regular950,
    },
    attachmentsContainer: {
      width: "90%",
      paddingTop: 10,
    },
    attachmentTitle: {
      fontFamily: "Ubuntu_500Medium",
      fontSize: 15,
      color: colors.regular950,
      marginBottom: 10,
    },
    attachmentItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 8,
      gap: 10,
    },
    attachmentName: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 14,
      color: colors.regular950,
      flex: 1,
    },
  });



  if (loading) {
    return (
        <View style={styles.container}>
          <Text>Chargement...</Text>
        </View>
    );
  }

  if (!mailData) {
    return (
        <View style={styles.container}>
          <Text>No mail data available.</Text>
        </View>
    );
  }

  const { su, emailAddresses, plainTextContent, htmlContent, attachments } = mailData;


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

        {attachments && attachments.length > 0 && (
            <View style={styles.attachmentsContainer}>
              {attachments.map((attachment, index) => (
                  <TouchableOpacity
                      key={index}
                      style={styles.attachmentItem}
                      onPress={() => handleDownloadAttachment(attachment)}
                  >
                    <Paperclip
                        stroke={colors.regular950}
                        strokeWidth={1.75}
                        width={18}
                        height={18}
                    />
                    <Text style={styles.attachmentName}>{attachment.filename}</Text>
                  </TouchableOpacity>
              ))}
            </View>
        )}

        <View style={styles.mailSender}>
          <UserRound
              stroke={colors.regular950}
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