export default {
  name: "Libellule",
  slug: "libellule",
  version: "0.0.2",
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
    googleServicesFile: "./GoogleService-Info.plist",
    bundleIdentifier: "com.libellule.libellule",
    splash: {
      backgroundColor: "#0760FB",
      image: "./assets/splash.png",
    },
    entitlements: {
      "aps-environment": "production",
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#0760FB",
    },
    googleServicesFile: "./google-services.json",
    package: "com.libellule.libellule",
    splash: {
      backgroundColor: "#0760FB",
      image: "./assets/splash.png",
    },
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  plugins: [
    "expo-font",
    "expo-secure-store",
    "@react-native-firebase/app",
    [
      "expo-build-properties",
      {
        ios: {
          useFrameworks: "static",
        },
      },
    ],
  ],
  extra: {
    eas: {
      projectId: "142931be-af91-443d-9e7d-57ecd13da335",
    },
  },
};
