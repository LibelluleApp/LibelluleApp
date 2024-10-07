const IS_DEV = process.env.APP_VARIANT === "development";

export default {
  name: IS_DEV ? "Libellule Dev" : "Libellule",
  slug: "libellule",
  version: IS_DEV ? "1.0.1" : "1.0.8",
  orientation: "portrait",
  scheme: "libellule",
  icon: IS_DEV ? "./assets/dev-icon.png" : "./assets/ios/logo@3x.png",
  userInterfaceStyle: "automatic",
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
    buildNumber: "1.15",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: IS_DEV
        ? "./assets/dev-icon.png"
        : "./assets/adaptive-icon.png",
      backgroundColor: "#0760FB",
      monochromeImage: "./assets/monochrome.png",
    },
    googleServicesFile: IS_DEV
      ? "./google-services-dev.json"
      : "./google-services.json",
    package: IS_DEV ? "com.libellule.libellule.dev" : "com.libellule.libellule",
    splash: {
      backgroundColor: "#0760FB",
      image: "./assets/splash.png",
    },
    versionCode: 18,
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
    [
      "expo-location",
      {
        locationAlwaysAndWhenInUsePermission: "Allow $(PRODUCT_NAME) to use your location.",
        isAndroidBackgroundLocationEnabled: true
      }
    ],
  ],
  extra: {
    eas: {
      projectId: "142931be-af91-443d-9e7d-57ecd13da335",
    },
  },
};
