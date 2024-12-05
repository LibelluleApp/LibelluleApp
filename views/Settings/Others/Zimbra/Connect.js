import React, {useContext, useEffect, useState} from "react";
import {KeyboardAvoidingView, Platform, View, StyleSheet, Text, Alert} from "react-native";
import {ThemeContext} from "../../../../utils/themeContext";
import ButtonAuth from "../../../../components/auth/buttonAuth";
import Input from "../../../../components/auth/input";
import {Envelope, Lock} from "../../../../assets/icons/Icons";
import connectZimbra from "../../../../api/Mail/connect";
import * as SecureStore from "expo-secure-store";

function Connect() {
    const {colors} = useContext(ThemeContext);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const checkAuthentication = async () => {
            const token = await SecureStore.getItemAsync("authToken");
            if (token) {
                setIsAuthenticated(true);
            }
        };
        checkAuthentication();
    }, []);

    const styles = StyleSheet.create({
        background: {
            position: "relative",
            justifyContent: "center",
            flex: 1,
            backgroundColor: colors.background,
        },
        containerLogin: {
            flex: 1,
            justifyContent: "center",
            backgroundColor: colors.background,
        },
        containerContentLogin: {
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 30,
            width: "90%",
            alignSelf: "center",
        },
        titleContentLogin: {
            alignItems: "center",
            alignSelf: "center",
            width: "100%",
            gap: 5,
        },
        textLogin: {
            width: "100%",
            alignSelf: "center",
            gap: 20,
        },
        titleLogin: {
            fontFamily: "Ubuntu_700Bold",
            alignSelf: "flex-start",
            fontSize: 27,
            letterSpacing: -1,
            color: colors.regular950,
        },
        titleDescriptionLogin: {
            fontFamily: "Ubuntu_400Regular",
            fontSize: 15,
            color: colors.grey,
            alignSelf: "flex-start",
        },
        titleWarningLogin: {
            fontFamily: "Ubuntu_400Regular",
            fontSize: 13,
            color: colors.grey,
            alignSelf: "flex-start",
        },
        buttonLogin: {
            width: "100%",
            alignSelf: "center",
        },
    });

    const handleLogin = async () => {
        setLoading(true);
        try {
            const token = await SecureStore.getItemAsync("authToken");
            if (token) {
                setIsAuthenticated(true);
            } else {
                const response = await connectZimbra(email, password);
                if (response) {
                    setIsAuthenticated(true);
                } else {
                    Alert.alert(
                        "Erreur de connexion",
                        "Veuillez vérifier vos identifiants."
                    );
                }
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
        setLoading(false);
    };

    const handleLogout = async () => {
        try {
            await SecureStore.deleteItemAsync("authToken");
            await SecureStore.deleteItemAsync("email_edu");
            await SecureStore.deleteItemAsync("mdpMail");
            setIsAuthenticated(false);
            setEmail("");
            setPassword("");
        } catch (error) {
            console.error("Error during logout:", error);
            Alert.alert(
                "Erreur de déconnexion",
                "Une erreur est survenue lors de la déconnexion."
            );
        }
    };

    if (isAuthenticated) {
        return (
            <View style={styles.containerLogin}>
                <View style={styles.containerContentLogin}>
                    <View style={styles.titleContentLogin}>
                        <Text style={styles.titleLogin}>Déjà connecté</Text>
                        <Text style={styles.titleDescriptionLogin}>
                            Vous êtes déjà connecté à Zimbra. Voulez-vous vous déconnecter ?
                        </Text>
                    </View>
                    <View style={styles.buttonLogin}>
                        <ButtonAuth
                            title="Se déconnecter"
                            onPress={handleLogout}
                        />
                    </View>
                </View>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        >
            <View style={styles.containerLogin}>
                <View style={styles.containerContentLogin}>
                    <View style={styles.titleContentLogin}>
                        <Text style={styles.titleLogin}>Se connecter</Text>
                        <Text style={styles.titleDescriptionLogin}>
                            Pour consulter les mails, il faut se connecter avec les
                            identifiants de l'ENT.
                        </Text>
                    </View>

                    <View style={styles.textLogin}>
                        <Input
                            label="Mail"
                            placeholder="Entrer l'adresse mail universitaire"
                            icon={Envelope}
                            placeholderTextColor={colors.text_placeholder}
                            autoComplete="email"
                            inputMode="email"
                            secureTextEntry={false}
                            keyboardType="email-address"
                            onChangeText={(text) => setEmail(text)}
                            autoCapitalize="none"
                        />
                        <Input
                            label="Mot de passe"
                            placeholder="Entrer le mot de passe de l'ENT"
                            icon={Lock}
                            placeholderTextColor={colors.text_placeholder}
                            autoComplete="password"
                            secureTextEntry={true}
                            onChangeText={(text) => setPassword(text)}
                        />
                    </View>

                    <View style={styles.buttonLogin}>
                        <ButtonAuth
                            title="Se connecter"
                            onPress={handleLogin}
                            loading={loading}
                        />
                    </View>
                    <View style={styles.titleContentLogin}>
                        <Text style={styles.titleWarningLogin}>
                            En vous connectant, vous autorisez la sauvegarde de vos
                            identifiants encrypté sur votre appareil. {"\n"}
                            {"\n"}Pour en savoir plus sur la sécurité des vos identifiants,
                            nous vous invitons à relire les CGU (Article 2.1).
                        </Text>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

export default Connect;