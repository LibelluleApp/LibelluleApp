import React, { useEffect, useState, useContext, memo } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
  Platform,
} from "react-native";
import {
  ChevronRight,
  NotepadText,
  Landmark,
  LogOut,
  Palette,
  Bell,
  Link,
  Envelope,
  Wrench,
} from "../assets/icons/Icons";
import Constants from "expo-constants";
import { useSession } from "../context/AuthContext";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { ThemeContext } from "../utils/themeContext";
import { getAlternant, getUserData } from "../utils/storage";
import TouchableScale from "react-native-touchable-scale";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Séparation des styles dans un fichier distinct
const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    sectionPageContainer: {
      marginTop: 15,
      width: "90%",
      marginHorizontal: "auto",
      gap: 20,
    },
    sectionPageItem: {
      gap: 10,
    },
    sectionTitle: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 15,
      color: colors.grey,
    },
    pageSeparation: {
      height: 0.5,
      width: "85%",
      backgroundColor: colors.grey,
      alignSelf: "flex-end",
    },
    pageContainer: {
      backgroundColor: colors.white_background,
      borderRadius: 10,
    },
    pageItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 15,
    },
    profilPicture: {
      width: 50,
      height: 50,
      borderRadius: 50,
    },
    pageProfilContainer: {
      flexDirection: "row",
      gap: 15,
    },
    pageProfilContent: {
      flexDirection: "column",
      gap: 3,
    },
    pageProfilTitle: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    profilName: {
      fontFamily: "Ubuntu_500Medium",
      letterSpacing: -0.4,
      fontSize: 15,
      color: colors.regular950,
    },
    profilGroupContent: {
      backgroundColor: colors.regular200_2,
      paddingHorizontal: 10,
      paddingVertical: 3,
      borderRadius: 5,
    },
    profilGroupTitle: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 13,
      color: colors.regular900_2,
    },
    profilEmail: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 13,
      color: colors.grey,
    },
    pageContent: {
      flexDirection: "row",
      gap: 12,
      alignItems: "center",
    },
    pageTitle: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 15,
      color: colors.regular900,
    },
    pageSubtitle: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 13,
      color: colors.grey,
    },
    pageIcon: {
      backgroundColor: colors.regular900,
      borderRadius: 8,
      padding: 8,
      justifyContent: "center",
      alignItems: "center",
    },
    footerContainer: {
      width: "90%",
      marginHorizontal: "auto",
      alignItems: "center",
    },
    footerTitle: {
      fontFamily: "Ubuntu_500Medium",
      letterSpacing: -0.4,
      fontSize: 13,
      color: colors.grey,
    },
    footerSubtitle: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 11,
      color: colors.grey,
    },
  });

// Composant Profile memoïsé
const ProfileSection = memo(({ userData, colors, navigation, styles }) => (
  <TouchableScale
    friction={6}
    activeScale={0.94}
    onPress={() => navigation.navigate("Profile")}
  >
    <View style={styles.sectionPageItem}>
      <View style={styles.pageContainer}>
        <View style={styles.pageItem}>
          <View style={styles.pageProfilContainer}>
            <Image
              source={{ uri: userData.lien_photo_profil }}
              style={styles.profilPicture}
            />
            <View style={styles.pageProfilContent}>
              <View style={styles.pageProfilTitle}>
                <Text style={styles.profilName}>
                  {userData.prenom} {userData.nom}
                </Text>
                <View style={styles.profilGroupContent}>
                  <Text style={styles.profilGroupTitle}>
                    {userData.groupe_id}
                  </Text>
                </View>
              </View>
              <Text style={styles.profilEmail}>{userData.email_edu}</Text>
            </View>
          </View>
          <ChevronRight
            stroke={colors.regular700}
            strokeWidth={1.75}
            width={18}
            height={18}
          />
        </View>
      </View>
    </View>
  </TouchableScale>
));

// Composant MenuItem réutilisable
const MenuItem = memo(
  ({
    icon: Icon,
    title,
    subtitle,
    onPress,
    colors,
    styles,
    iconColor = colors.regular100,
    rightIconColor = colors.regular700,
  }) => (
    <TouchableOpacity style={styles.pageItem} onPress={onPress}>
      <View style={styles.pageContent}>
        <View
          style={[
            styles.pageIcon,
            iconColor !== colors.regular100 && { backgroundColor: iconColor },
          ]}
        >
          <Icon
            stroke={
              title === "Se déconnecter" ? colors.red100 : colors.regular100
            }
            strokeWidth={1.75}
            width={18}
            height={18}
          />
        </View>
        <View>
          <Text
            style={[
              styles.pageTitle,
              iconColor !== colors.regular100 && { color: iconColor },
            ]}
          >
            {title}
          </Text>
          {subtitle && <Text style={styles.pageSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <ChevronRight
        stroke={rightIconColor}
        strokeWidth={1.75}
        width={18}
        height={18}
      />
    </TouchableOpacity>
  )
);

// Composant Footer memoïsé
const Footer = memo(({ styles }) => (
  <View style={styles.footerContainer}>
    <Text style={styles.footerTitle}>Version 1.0.0</Text>
    <Text style={styles.footerSubtitle}>
      Créée avec ❤️ par Raphaël Tiphonet et Arnaud Graciet
    </Text>
  </View>
));

function Settings() {
  const { isDarkMode, toggleTheme, colors } = useContext(ThemeContext);
  const [isAlternant, setIsAlternant] = useState(false);
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { signOut } = useSession();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const styles = createStyles(colors);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [profileData, alternantData] = await Promise.all([
          getUserData(),
          getAlternant(),
        ]);
        setUserData(profileData);
        setIsAlternant(alternantData === "true");
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setIsLoading(false);
      }
    };

    if (isFocused) {
      loadData();
    }
  }, [isFocused]);

  const handleConfirmLogout = () => {
    Alert.alert("Déconnexion", "Êtes-vous sûr de vouloir vous déconnecter ?", [
      { text: "Annuler", style: "cancel" },
      { text: "Se déconnecter", onPress: signOut },
    ]);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  const menuItems = [
    {
      section: "Personnalisation",
      items: [
        {
          icon: Palette,
          title: "Couleurs",
          onPress: () => navigation.navigate("Colors"),
        },
      ],
    },
    {
      section: "Autre",
      items: [
        {
          icon: Link,
          title: "Liens externes",
          onPress: () => navigation.navigate("liensExterne"),
        },
        {
          icon: Wrench,
          title: "Gestion des services",
          onPress: () => navigation.navigate("Services"),
        },
        {
          icon: NotepadText,
          title: "Journal des mises à jour",
          onPress: () => Linking.openURL("https://libellule.app/patchnotes"),
        },
        {
          icon: Envelope,
          title: "Nous contacter",
          onPress: () => Linking.openURL("https://libellule.app/contact"),
        },
        {
          icon: Landmark,
          title: "CGU",
          subtitle: "Conditions générales d'utilisation",
          onPress: () => Linking.openURL("https://libellule.app/cgu"),
        },
      ],
    },
  ];

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <View style={styles.sectionPageContainer}>
          <ProfileSection
            userData={userData}
            colors={colors}
            navigation={navigation}
            styles={styles}
          />

          {menuItems.map((section, sectionIndex) => (
            <View
              key={`section-${sectionIndex}`}
              style={styles.sectionPageItem}
            >
              <Text style={styles.sectionTitle}>{section.section}</Text>
              <View style={styles.pageContainer}>
                {section.items.map((item, itemIndex) => (
                  <React.Fragment key={`item-${itemIndex}`}>
                    <MenuItem {...item} colors={colors} styles={styles} />
                    {itemIndex < section.items.length - 1 && (
                      <View style={styles.pageSeparation} />
                    )}
                  </React.Fragment>
                ))}
              </View>
            </View>
          ))}

          <View style={styles.sectionPageItem}>
            <View style={styles.pageContainer}>
              <MenuItem
                icon={LogOut}
                title="Se déconnecter"
                onPress={handleConfirmLogout}
                colors={colors}
                styles={styles}
                iconColor={colors.red800}
                rightIconColor={colors.red700}
              />
            </View>
          </View>

          <Footer styles={styles} />
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

export default memo(Settings);
