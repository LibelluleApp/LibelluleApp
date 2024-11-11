import React, { useState, useEffect, useCallback, useContext, memo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  RefreshControl,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "./../utils/themeContext";
import { MailSearch, Settings } from "./../assets/icons/Icons";

// Components
import Mail from "../components/mails/Mail";


// API
import fetchMailFromZimbra from "../api/Mail/fetchMail";

// Constants
const ZIMBRA_URL = "https://webmail.univ-poitiers.fr/";

// Memoized components
const MemoizedMail = memo(Mail);

const NoMessages = memo(({ message, colors }) => (
    <View style={styles.noMessageContainer}>
      <MailSearch
          stroke={colors.regular950}
          strokeWidth={1.75}
          width={18}
          height={18}
      />
      <Text style={[styles.noMailText, { color: colors.regular950 }]}>{message}</Text>
    </View>
));

const NotAuthenticated = memo(({ colors, onNavigateToSettings }) => (
    <View style={styles.notAuthContainer}>
      <Settings
          stroke={colors.regular950}
          strokeWidth={1.75}
          width={24}
          height={24}
      />
      <Text style={[styles.notAuthTitle, { color: colors.regular950 }]}>
        Service non activé
      </Text>
      <Text style={[styles.notAuthDescription, { color: colors.regular800 }]}>
        Pour accéder à vos mails universitaires, vous devez d'abord activer le service dans les paramètres.
      </Text>
      <TouchableOpacity
          style={[styles.settingsButton, { backgroundColor: colors.primary }]}
          onPress={onNavigateToSettings}
      >
        <Text style={styles.settingsButtonText}>Aller aux paramètres</Text>
      </TouchableOpacity>
    </View>
));

function Mails() {
  const navigation = useNavigation();
  const { colors } = useContext(ThemeContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emails, setEmails] = useState([]);
  const [messages, setMessages] = useState("");

  const fetchEmails = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchMailFromZimbra();
      if (data?.m) {
        setEmails(data.m);
        setMessages("");
      } else {
        setEmails([]);
        setMessages("Aucun mail à afficher.");
      }
    } catch (error) {
      console.error("Error fetching emails:", error);
      setMessages("Erreur lors de la récupération des mails.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = await SecureStore.getItemAsync("authToken");
        if (token) {
          setIsAuthenticated(true);
          fetchEmails();
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
      }
    };

    checkAuthentication();
  }, [fetchEmails]);

  const handleNavigateToSettings = useCallback(() => {
    navigation.navigate('Settings', { screen: 'Services' });
  }, [navigation]);

  const renderItem = useCallback(({ item }) => (
      <MemoizedMail email={item} />
  ), []);

  const keyExtractor = useCallback((item) => item.id, []);

  if (!isAuthenticated) {
    return (
        <NotAuthenticated
            colors={colors}
            onNavigateToSettings={handleNavigateToSettings}
        />
    );
  }

  return (
      <View style={[styles.containerMails, { backgroundColor: colors.background }]}>
        <View style={styles.contentMails}>
          <View style={styles.descriptionMails}>
            <Text style={[styles.textDescriptionMails, { color: colors.regular800 }]}>
              Accès à toutes les fonctionnalités sur{" "}
            </Text>
            <TouchableOpacity onPress={() => Linking.openURL(ZIMBRA_URL)}>
              <Text style={[styles.linkDescriptionMails, { color: colors.regular800 }]}>
                Zimbra
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.listMails}>
            {messages && <NoMessages message={messages} colors={colors} />}
            {loading ? (
                <ActivityIndicator size="large" color={colors.primary} />
            ) : (
                <FlatList
                    data={emails}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                      <RefreshControl refreshing={loading} onRefresh={fetchEmails} />
                    }
                    removeClippedSubviews={true}
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                    windowSize={5}
                />
            )}
          </View>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  notAuthContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 16,
  },
  notAuthTitle: {
    fontFamily: "Ubuntu_700Bold",
    fontSize: 24,
    letterSpacing: -0.5,
    marginTop: 16,
  },
  notAuthDescription: {
    fontFamily: "Ubuntu_400Regular",
    fontSize: 16,
    letterSpacing: -0.3,
    textAlign: "center",
    marginBottom: 16,
  },
  settingsButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  settingsButtonText: {
    color: "#FFFFFF",
    fontFamily: "Ubuntu_500Medium",
    fontSize: 16,
  },
  containerMails: {
    flex: 1,
  },
  contentMails: {
    width: "90%",
    alignSelf: "center",
    paddingTop: 20,
    gap: 15,
  },
  descriptionMails: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textDescriptionMails: {
    fontFamily: "Ubuntu_400Regular",
    letterSpacing: -0.4,
    fontSize: 14,
  },
  linkDescriptionMails: {
    fontFamily: "Ubuntu_400Regular",
    letterSpacing: -0.4,
    fontSize: 14,
    textDecorationLine: "underline",
  },
  listMails: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 65,
  },
  noMessageContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  noMailText: {
    fontFamily: "Ubuntu_400Regular",
    letterSpacing: -0.4,
    fontSize: 15,
    textAlign: "center",
  },
});

export default memo(Mails);