const IS_DEV = process.env.APP_VARIANT === "development";

export default {
  name: IS_DEV ? "Libellule Dev" : "Libellule",
  slug: "libellule",
  version: IS_DEV ? "1.0.1" : "1.0.1",
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
    bundleIdentifier: IS_DEV
      ? "com.libellule.libellule.dev"
      : "com.libellule.libellule",
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
    package: IS_DEV ? "com.libellule.libellule.dev" : "com.libellule.libellule",
    splash: {
      backgroundColor: "#0760FB",
      image: "./assets/splash.png",
    },
    versionCode: 2,
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
