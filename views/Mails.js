import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  memo,
} from "react";
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
import { MailSearch, Settings, Wrench } from "./../assets/icons/Icons";
import TouchableScale from "react-native-touchable-scale";

// Components
import Mail from "../components/mails/Mail";

// API
import fetchMailFromZimbra from "../api/Mail/fetchMail";

// Constants
const ZIMBRA_URL = "https://webmail.univ-poitiers.fr/";

// Memoized components
const MemoizedMail = memo(Mail);

function Mails() {
  const navigation = useNavigation();
  const { colors } = useContext(ThemeContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emails, setEmails] = useState([]);
  const [messages, setMessages] = useState("");

  const styles = StyleSheet.create({
    notAuthContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "start",
      padding: 20,
      gap: 25,
      backgroundColor: colors.background,
    },
    noAuthServiceTextContent: {
      flexDirection: "column",
      gap: 5,
    },
    noAuthServiceTitleContent: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "start",
      gap: 10,
    },
    noAuthServiceTitle: {
      fontFamily: "Ubuntu_700Bold",
      alignSelf: "flex-start",
      fontSize: 27,
      letterSpacing: -1,
      color: colors.regular950,
    },
    notAuthDescription: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 16,
      letterSpacing: -0.4,
    },
    btnOutline: {
      color: colors.regular700,
      fontSize: 16,
      paddingHorizontal: 20,
      paddingVertical: 7,
      borderRadius: 50,
      borderWidth: 0.5,
      borderColor: colors.regular700,
      textAlign: "center",
      width: 200,
      justifyContent: "center",
      alignItems: "center",
    },
    btnOutlineText: {
      color: colors.regular700,
      fontSize: 15,
      fontFamily: "Ubuntu_500Medium",
      letterSpacing: -0.4,
    },
    containerMails: {
      flex: 1,
      backgroundColor: colors.background,
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

  const NoMessages = memo(({ message, colors }) => (
    <View style={styles.noMessageContainer}>
      <MailSearch
        stroke={colors.regular950}
        strokeWidth={1.75}
        width={18}
        height={18}
      />
      <Text style={[styles.noMailText, { color: colors.regular950 }]}>
        {message}
      </Text>
    </View>
  ));

  const NotAuthenticated = memo(({ colors, onNavigateToSettings }) => (
    <View style={styles.notAuthContainer}>
      <View style={styles.noAuthServiceTextContent}>
        <View style={styles.noAuthServiceTitleContent}>
          <Wrench
            stroke={colors.regular950}
            strokeWidth={1.75}
            width={24}
            height={24}
          />
          <Text
            style={[styles.noAuthServiceTitle, { color: colors.regular950 }]}
          >
            Service non activé
          </Text>
        </View>
        <Text style={[styles.notAuthDescription, { color: colors.regular800 }]}>
          Pour accéder à vos mails universitaires, vous devez d'abord activer le
          service dans les paramètres.
        </Text>
      </View>
      <TouchableScale
        friction={6}
        activeScale={0.95}
        onPress={onNavigateToSettings}
      >
        <View style={styles.btnOutline}>
          <Text style={styles.btnOutlineText}>Activer le service</Text>
        </View>
      </TouchableScale>
      {/* <TouchableOpacity
        style={[styles.settingsButton, { backgroundColor: colors.primary }]}
        onPress={onNavigateToSettings}
      >
        <Text style={styles.settingsButtonText}>Aller aux paramètres</Text>
      </TouchableOpacity> */}
    </View>
  ));

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
    navigation.navigate("Settings", { screen: "Services" });
  }, [navigation]);

  const renderItem = useCallback(
    ({ item }) => <MemoizedMail email={item} />,
    []
  );

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
    <View
      style={[styles.containerMails, { backgroundColor: colors.background }]}
    >
      <View style={styles.contentMails}>
        <View style={styles.descriptionMails}>
          <Text
            style={[styles.textDescriptionMails, { color: colors.regular800 }]}
          >
            Accès à toutes les fonctionnalités sur{" "}
          </Text>
          <TouchableOpacity onPress={() => Linking.openURL(ZIMBRA_URL)}>
            <Text
              style={[
                styles.linkDescriptionMails,
                { color: colors.regular800 },
              ]}
            >
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

export default memo(Mails);
