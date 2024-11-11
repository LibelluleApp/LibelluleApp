import React, { useContext, useMemo } from "react";
import { View, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeContext } from "./../utils/themeContext";

// Views import optimization
const VIEWS_CONFIG = {
  TabsStack: require("./TabsStack").default,
  liensExterne: require("../views/Settings/Others/liensExterne").default,
  Restauration: require("../components/home/modal/Restauration").default,
  Scolarite: require("../views/Scolarite").default,
  Notifications: require("../views/NotificationsViews").default,
  MailDetail: require("../components/mails/MailDetail").default,
  addAgenda: require("../components/agenda/modal/add").default,
  viewAgenda: require("../components/agenda/modal/view").default,
  CustomColor: require("../views/Settings/CustomColor").default,
  ChangePassword: require("../views/Settings/ChangePassword").default,
  TutorialAgenda: require("../views/Tutorial/Agenda").default,
  DetailEvent: require("../views/Timetable/DetailEvent").default,
  editAgenda: require("../components/agenda/modal/edit").default,
  DeleteAccount: require("../views/Settings/DeleteAccount").default,
  TransferRole: require("../views/Settings/TransferRole").default,
  Offline: require("../views/Offline/Offline").default,
  Profile: require("../views/Settings/Profile/Profile").default,
  Colors: require("../views/Settings/Customization/Colors").default,
  TimetableSettings: require("../views/Settings/Settings/Timetable").default,
  Settings: require("../views/Settings").default,
  Services: require("../views/Settings/Others/Services").default,
};

const Stack = createNativeStackNavigator();

const COMMON_HEADER_STYLES = {
  fontFamily: "Ubuntu_400Regular",
  letterSpacing: -0.4,
  fontSize: 16,
};

const COMMON_MODAL_OPTIONS = {
  presentation: "modal",
  headerShadowVisible: false,
};

const AppStack = () => {
  const { colors } = useContext(ThemeContext);

  const screenOptions = useMemo(
    () => ({
      headerStyle: {
        backgroundColor: colors.background,
        shadowColor: "transparent",
        elevation: 0,
        shadowOffset: { width: 0, height: 0 },
      },
      headerTintColor: colors.regular950,
      headerTitleStyle: {
        ...COMMON_HEADER_STYLES,
        fontFamily: "Ubuntu_500Medium",
        fontSize: 18,
        color: colors.regular950,
      },
      headerBackTitle: "Retour",
      headerBackTitleStyle: COMMON_HEADER_STYLES,
    }),
    [colors]
  );

  const views = useMemo(
    () => [
      {
        name: "TabsStack",
        component: VIEWS_CONFIG.TabsStack,
        options: { headerShown: false },
      },
      {
        name: "liensExterne",
        component: VIEWS_CONFIG.liensExterne,
        options: { ...COMMON_MODAL_OPTIONS, title: "Liens Externes" },
      },
      {
        name: "Restauration",
        component: VIEWS_CONFIG.Restauration,
        options: { ...COMMON_MODAL_OPTIONS, title: "Restauration" },
      },
      {
        name: "Scolarite",
        component: VIEWS_CONFIG.Scolarite,
        options: {
          title: "Scolarité",
          headerBackTitle: "Retour",
          headerShadowVisible: false,
          headerBackTitleStyle: COMMON_HEADER_STYLES,
          headerStyle: {
            backgroundColor: colors.background,
            shadowColor: "transparent",
            elevation: 0,
          },
        },
      },
      {
        name: "Notifications",
        component: VIEWS_CONFIG.Notifications,
        options: { title: "Notifications", headerShadowVisible: false },
      },
      {
        name: "MailDetail",
        component: VIEWS_CONFIG.MailDetail,
        options: { title: "Détails du mail", headerShadowVisible: false },
      },
      {
        name: "addAgenda",
        component: VIEWS_CONFIG.addAgenda,
        options: { title: "Ajouter une tâche", headerShadowVisible: false },
      },
      {
        name: "viewAgenda",
        component: VIEWS_CONFIG.viewAgenda,
        options: { ...COMMON_MODAL_OPTIONS, title: "Détails d'une tâche" },
      },
      {
        name: "CustomColor",
        component: VIEWS_CONFIG.CustomColor,
        options: { ...COMMON_MODAL_OPTIONS, title: "Modifiers les couleurs" },
      },
      {
        name: "ChangePassword",
        component: VIEWS_CONFIG.ChangePassword,
        options: {
          title: "Changer de mot de passe",
          headerShadowVisible: false,
        },
      },
      {
        name: "TutorialAgenda",
        component: VIEWS_CONFIG.TutorialAgenda,
        options: { headerShown: false },
      },
      {
        name: "DetailEvent",
        component: VIEWS_CONFIG.DetailEvent,
        options: { ...COMMON_MODAL_OPTIONS, title: "Détails de l'événement" },
      },
      {
        name: "editAgenda",
        component: VIEWS_CONFIG.editAgenda,
        options: { title: "Modifier une tâche", headerShadowVisible: false },
      },
      {
        name: "DeleteAccount",
        component: VIEWS_CONFIG.DeleteAccount,
        options: { title: "Supprimer le compte", headerShadowVisible: false },
      },
      {
        name: "TransferRole",
        component: VIEWS_CONFIG.TransferRole,
        options: { title: "Transférer mon rôle", headerShadowVisible: false },
      },
      {
        name: "Offline",
        component: VIEWS_CONFIG.Offline,
        options: { title: "Hors ligne", headerShown: false },
      },
      {
        name: "Profile",
        component: VIEWS_CONFIG.Profile,
        options: { title: "Profil", headerShadowVisible: false },
      },
      {
        name: "Colors",
        component: VIEWS_CONFIG.Colors,
        options: { title: "Couleurs", headerShadowVisible: false },
      },
      {
        name: "TimetableSettings",
        component: VIEWS_CONFIG.TimetableSettings,
        options: { title: "Paramètres", headerShadowVisible: false },
      },
      {
        name: "Settings",
        component: VIEWS_CONFIG.Settings,
        options: { title: "Paramètres", headerShadowVisible: false },
      },
      {
        name: "Services",
        component: VIEWS_CONFIG.Services,
        options: { title: "Gestion des services", headerShadowVisible: false },
      },
    ],
    [colors]
  );

  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator screenOptions={screenOptions} id="app">
        {views.map(({ name, component, options }) => (
          <Stack.Screen
            key={name}
            name={name}
            component={component}
            options={options}
          />
        ))}
      </Stack.Navigator>
    </View>
  );
};

export default React.memo(AppStack);
