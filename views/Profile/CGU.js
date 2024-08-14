import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { ThemeContext } from "./../../utils/themeContext";

const CGU = () => {
  const { colors } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    background: {
      backgroundColor: colors.background,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      width: "90%",
      padding: 16,
      backgroundColor: colors.white_background,
      borderRadius: 10,
    },
    section: {
      marginBottom: 24,
    },
    date: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 12,
      color: colors.grey,
    },
    subtitle: {
      fontFamily: "Ubuntu_500Medium",
      color: colors.black,
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 8,
    },
    paragraph: {
      fontFamily: "Ubuntu_400Regular",
      color: colors.black,
      fontSize: 12,
      marginBottom: 5,
    },
    link: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 12,
      color: colors.blue400,
      textDecorationLine: "underline",
    },
    infoContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    infoBlock: {
      flex: 1,
      marginRight: 8,
    },
    infoText: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 12,
      color: colors.black,
    },
    listItem: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 12,
      color: colors.black,
      marginBottom: 4,
      marginLeft: 16,
    },
  });
  return (
    <View style={styles.background}>
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.date}>En vigueur au 02/09/2024</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Préambule</Text>
          <Text style={styles.paragraph}>
            Les présentes Conditions Générales d'Utilisation (ci-après dénommées
            "CGU") encadrent l'utilisation de l'application Libellule,
            développée par Arnaud Graciet et Raphaël Tiphonet. Elles définissent
            les conditions d'accès et d'utilisation des services proposés par
            l'application par l'utilisateur. Ces CGU sont accessibles sur le
            site à la rubrique "CGU".
          </Text>
          <Text style={styles.paragraph}>
            L'inscription ou l'utilisation de l'application implique
            l'acceptation sans réserve des CGU par l'utilisateur.{" "}
            <TouchableOpacity
              onPress={() => handleLinkPress("https://libellule.app/")}
            >
              <Text style={styles.link}>https://libellule.app</Text>
            </TouchableOpacity>{" "}
            se réserve le droit de modifier unilatéralement le contenu des CGU à
            tout moment.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Article 1 : Mentions Légales</Text>
          <Text style={styles.paragraph}>
            L'édition et la direction de la publication de l'application
            Libellule sont assurées par :
          </Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoBlock}>
              <Text style={styles.infoText}>TIPHONET Raphaël</Text>
              <Text style={styles.infoText}>5 ALL DES VIGNES</Text>
              <Text style={styles.infoText}>16730 TROIS-PALIS</Text>
              <Text style={styles.infoText}>07 71 18 59 89</Text>
              <TouchableOpacity
                onPress={() => handleLinkPress("mailto:rtiphonet@gmail.com")}
              >
                <Text style={styles.link}>rtiphonet@gmail.com</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.infoBlock}>
              <Text style={styles.infoText}>GRACIET Arnaud</Text>
              <Text style={styles.infoText}>32 R DU PORT THUREAU</Text>
              <Text style={styles.infoText}>16000 ANGOULEME</Text>
              <Text style={styles.infoText}>06 52 55 15 18</Text>
              <TouchableOpacity
                onPress={() => handleLinkPress("mailto:contact@arnaudgct.fr")}
              >
                <Text style={styles.link}>contact@arnaudgct.fr</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.paragraph}>
            Libellule est hébergé sur le sol français et par la société
            française :
          </Text>
          <View style={styles.infoBlock}>
            <Text style={styles.infoText}>O2SWITCH</Text>
            <Text style={styles.infoText}>CHE DES PARDIAUX</Text>
            <Text style={styles.infoText}>63000 CLERMONT-FERRAND</Text>
            <Text style={styles.infoText}>04 44 44 60 40</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Article 2 : Accès à l'application</Text>
          <Text style={styles.paragraph}>
            L'application Libellule offre un accès gratuit à ses services,
            regroupant divers outils universitaires tels que l'emploi du temps,
            l'agenda, les mails, le relevé de notes ainsi que les absences (pour
            les étudiants en MMI), dans le but de simplifier la vie des
            étudiants. Cet accès est gratuit pour tout utilisateur disposant
            d'une connexion Internet, et tous les frais associés à cette
            connexion sont à la charge de l'utilisateur.
          </Text>
          <Text style={styles.paragraph}>
            Pour bénéficier des services de l'application, les utilisateurs
            non-membres doivent s'inscrire en remplissant le formulaire avec des
            informations sincères et exactes. L'accès aux fonctionnalités
            requiert une identification via un identifiant et un mot de passe,
            qui sont communiqués après l'inscription. Tout utilisateur a la
            possibilité de demander sa désinscription à tout moment en envoyant
            un mail à{" "}
            <TouchableOpacity
              onPress={() => handleLinkPress("mailto:support@libellule.app")}
            >
              <Text style={styles.link}>support@libellule.app</Text>
            </TouchableOpacity>
            .
          </Text>
          <Text style={styles.paragraph}>
            Il est important de noter que l'accès à l'application est
            exclusivement réservé aux étudiants, aux professeurs et au personnel
            appartenant ou intervenant à l'IUT d'Angoulême.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Article 3 : Collecte des données</Text>
          <Text style={styles.paragraph}>
            L'application assure la collecte et le traitement des informations
            personnelles dans le plus strict respect de la vie privée, en
            conformité avec la loi n°78-17 du 6 janvier 1978. Les données
            collectées englobent les éléments suivants :
          </Text>
          <Text style={styles.listItem}>- Le nom</Text>
          <Text style={styles.listItem}>- Le prénom</Text>
          <Text style={styles.listItem}>- L’adresse e-mail étudiante</Text>
          <Text style={styles.listItem}>
            - L’emploi du temps universitaire via l’application ADE
          </Text>
          <Text style={styles.listItem}>
            - Les moyennes des 5 compétences, ainsi que le rang dans la
            promotion (seulement pour les étudiants en MMI)
          </Text>
          <Text style={styles.listItem}>
            - Les absences des étudiants (seulement pour les étudiants en MMI)
          </Text>
          <Text style={styles.paragraph}>
            L'utilisateur peut ajouter d'autres informations personnelles
            visibles par les autres utilisateurs :
          </Text>
          <Text style={styles.listItem}>- Sa date de naissance</Text>
          <Text style={styles.listItem}>- Son numéro de téléphone</Text>
          <Text style={styles.listItem}>- Son site internet</Text>
          <Text style={styles.listItem}>
            - Ses comptes Instagram, Discord, Snapchat, TikTok
          </Text>
          <Text style={styles.paragraph}>
            Ces données sont conservées pendant une période de 3 ans avant leur
            suppression. En ce qui concerne les absences et le relevé des notes,
            l'application Libellule n'y accède pas et n'enregistre pas ces
            données. Seul l'utilisateur peut y accéder. L’utilisation des
            données n'est pas à des fins commerciales.
          </Text>
          <Text style={styles.paragraph}>
            L'utilisateur dispose du droit d'accès, de rectification, de
            suppression et d'opposition sur ses données personnelles, droits
            qu'il peut exercer par mail à l'adresse{" "}
            <TouchableOpacity
              onPress={() => handleLinkPress("mailto:rgpd@libellule.app")}
            >
              <Text style={styles.link}>rgpd@libellule.app</Text>
            </TouchableOpacity>
            , via un formulaire de contact, ou directement depuis son espace
            personnel. La prise en charge de cette demande sera effectuée dans
            un délai maximal de 48 heures ouvrées.
          </Text>
          <Text style={styles.paragraph}>
            En acceptant ces conditions, vous autorisez la collecte des données
            d’absences et de notes par le secrétariat et les professeurs de la
            formation via l’intermédiaire du site :{" "}
            <TouchableOpacity
              onPress={() =>
                handleLinkPress(
                  "https://mmi-angouleme-dashboard.alwaysdata.net/"
                )
              }
            >
              <Text style={styles.link}>
                https://mmi-angouleme-dashboard.alwaysdata.net/
              </Text>
            </TouchableOpacity>{" "}
            sous l’autorité de M. LOUET François, site hébergé chez :
          </Text>
          <View style={styles.infoBlock}>
            <Text style={styles.infoText}>ALWAYSDATA</Text>
            <Text style={styles.infoText}>91 RUE DU FAUBOURG SAINT HONORE</Text>
            <Text style={styles.infoText}>75008 PARIS 8</Text>
            <Text style={styles.infoText}>01 84 16 23 40</Text>
          </View>
        </View>

        {/* Les autres articles (4 à 9) suivent la même structure que ci-dessus. */}
      </ScrollView>
    </View>
  );
};

export default CGU;
