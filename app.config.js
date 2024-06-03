export default {
  name: "Libellule",
  slug: "libellule",
  version: "0.0.1",
  orientation: "portrait",
  icon: "./assets/ios/logo@3x.png",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  androidStatusBar: {
    translucent: true,
  },
  androidNavigationBar: {
    visible: "immersive",
  },
  owner: "libellule",
  assetBundlePatterns: ["**/*"],
  splash: {
    image: "./assets/splash.png",
    resizeMode: "cover",
    backgroundColor: "#0760FB",
  },
  ios: {
    supportsTablet: false,
    config: {
      usesNonExemptEncryption: false,
    },
    bundleIdentifier: "com.libellule.libellule",
    googleServicesFile: process.env.GOOGLE_SERVICES_PLIST,
    splash: {
      backgroundColor: "#0760FB",
      image: "./assets/splash.png",
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#0760FB",
    },
    package: "com.libellule.libellule",
    googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
    splash: {
      backgroundColor: "#0760FB",
      image: "./assets/splash.png",
    },
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  plugins: ["expo-font", "expo-secure-store", "@react-native-firebase/app"],
  extra: {
    eas: {
      projectId: "142931be-af91-443d-9e7d-57ecd13da335",
    },
  },
};
