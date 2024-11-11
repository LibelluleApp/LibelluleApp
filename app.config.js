const IS_DEV = process.env.APP_VARIANT === 'development';

export default {
    name: IS_DEV ? "Libellule Dev" : "Libellule",
    slug: "libellule",
    version: "1.0.11",
    orientation: "portrait",
    icon: "./assets/ios/logo@3x.png",
    userInterfaceStyle: "automatic",
    owner: "libellule",
    assetBundlePatterns: ["**/*"],
    splash: {
        image: "./assets/splash.png",
        resizeMode: "contain",
        backgroundColor: "#0760FB",
        logoWidth: "700"
    },
    ios: {
        supportsTablet: false,
        config: {
            usesNonExemptEncryption: false
        },
        googleServicesFile: "./GoogleService-Info.plist",
        bundleIdentifier: IS_DEV
            ? "com.libellule.libelluledev"
            : "com.libellule.libellule",
        entitlements: {
            "aps-environment": "production"
        },
        buildNumber: "1.24"
    },
    android: {
        adaptiveIcon: {
            foregroundImage: "./assets/adaptive-icon.png",
            backgroundColor: "#0760FB",
            monochromeImage: "./assets/monochrome.png",
        },
        googleServicesFile: IS_DEV
            ? "./google-services-dev.json"
            : "./google-services.json",
        package: IS_DEV
            ? "com.libellule.libellule.dev"
            : "com.libellule.libellule",
        versionCode: 21
    },
    web: {
        favicon: "./assets/favicon.png"
    },
    newArchEnabled: false,
    plugins: [
        "expo-font",
        "expo-secure-store",
        "@react-native-firebase/app",
        [
            "expo-build-properties",
            {
                ios: {
                    useFrameworks: "static"
                }
            }
        ],
        [
            "expo-location",
            {
                locationAlwaysAndWhenInUsePermission: "Autoriser $(PRODUCT_NAME) à voir votre localisation",
                isAndroidBackgroundLocationEnabled: true
            }
        ],
        [
            "expo-image-picker",
            {
                photosPermission: "Autorise à piocher la meilleure photo dans ta galerie",
                cameraPermission: "Autorise à prendre la meilleure photo de toi"
            }
        ]
    ],
    extra: {
        eas: {
            projectId: "142931be-af91-443d-9e7d-57ecd13da335"
        }
    }
};