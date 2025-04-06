import React, {useContext, useEffect, useState} from "react";
import {Alert, Image, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View,} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  BriefcaseBusiness,
  ChevronRight,
  IdCard,
  Lock,
  RectangleEllipsis,
  UserRoundPen,
  UsersRound,
  UserX,
} from "../../../assets/icons/Icons";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import {ThemeContext} from "../../../utils/themeContext";
import {getAlternant, getUserData, setAlternant, setUserData} from "../../../utils/storage";
import handleUpload from "../../../api/User/profilePicture";

async function getProfileData() {
  try {
    return getUserData();
  } catch (e) {
    console.error(e);
  }
}
async function getIsAlternant() {
  try {
    return getAlternant();
  } catch (e) {
    console.error(e);
  }
}

function Profile() {
  const { colors } = useContext(ThemeContext);
  const [isAlternant, setIsAlternant] = useState(false);
  const [userData, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const handleProfilePhotoUpdate = async () => {
    const options = ['Prendre une photo', 'Choisir depuis la galerie', 'Annuler'];

    Alert.alert(
        'Modifier la photo de profil',
        'Choisissez une option',
        options.map((option, index) => ({
          text: option,
          onPress: async () => {
            if (index === 2) return;

            let result;
            let permissionResult;

            try {
              if (index === 0) {
                permissionResult = await ImagePicker.requestCameraPermissionsAsync();
                if (permissionResult.granted === false) {
                  Alert.alert("Permission refusée", "L'accès à la caméra est nécessaire pour cette fonctionnalité.");
                  return;
                }
                result = await ImagePicker.launchCameraAsync({
                  allowsEditing: true,
                  aspect: [1, 1],
                  quality: 0.8,
                });
              } else {
                permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (permissionResult.granted === false) {
                  Alert.alert("Permission refusée", "L'accès à la galerie est nécessaire pour cette fonctionnalité.");
                  return;
                }
                result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: 'images',
                  allowsEditing: true,
                  aspect: [1, 1],
                  quality: 0.8,
                });
              }

              if (!result.canceled) {
                setIsLoading(true);
                const photoUri = result.assets[0].uri;

                const uploadResult = await handleUpload(photoUri);

                if (typeof uploadResult === 'string' && uploadResult.includes('Erreur')) {
                  throw new Error(uploadResult);
                }

                const updatedUserData = {
                  ...userData,
                  lien_photo_profil: uploadResult.photo_url || photoUri
                };

                setUser(updatedUserData);

                setUserData(JSON.stringify(updatedUserData));

                Alert.alert("Succès", "Photo de profil mise à jour avec succès!");
              }
            } catch (error) {
              console.error('Erreur lors de la mise à jour de la photo:', error);
              Alert.alert(
                  "Erreur",
                  typeof error === 'string' ? error : "Impossible de mettre à jour la photo de profil. Veuillez réessayer."
              );
            } finally {
              setIsLoading(false);
            }
          },
          style: index === 2 ? 'cancel' : 'default',
        }))
    );
  };

  useEffect(() => {
    getProfileData().then((data) => {
      setUser(data);

    });
    getIsAlternant().then((data) => {
      setIsAlternant(data);
    });
  }, []);

  useEffect(() => {
    if (isFocused) {
      getProfileData().then((data) => {
        setUser(data);
      });
      getIsAlternant().then((data) => {
        setIsAlternant(data);
      });
    }
  }, [isFocused]);

  const handleAlternant = () => {
    const newAlternantStatus = !isAlternant;
    setIsAlternant(newAlternantStatus);
    try {
      setAlternant(newAlternantStatus);
    } catch (error) {
      console.error("Error setting alternant mode:", error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      flex: 1,
    },
    sectionPageContainer: {
      marginTop: 15,
      width: "90%",
      marginHorizontal: "auto",
      gap: 20,
    },
    sectionTitle: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 15,
      color: colors.grey,
    },
    sectionPageItem: {
      gap: 10,
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
      width: 35,
      height: 35,
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
  });

  return (
      <ScrollView style={styles.container} bounces={false}>
        <View style={styles.sectionPageContainer}>
          <View style={styles.sectionPageItem}>
            <Text style={styles.sectionTitle}>Photo de profil</Text>
            <View style={styles.pageContainer}>
              <TouchableOpacity
                  style={styles.pageItem}
                  onPress={handleProfilePhotoUpdate}
              >
                <View style={styles.pageContent}>
                  <Image
                      source={{
                        uri: "https://api.libellule.app/user/profile-photo/" + userData.lien_photo_profil || 'https://via.placeholder.com/150'
                      }}
                      style={styles.profilPicture}
                  />
                  <Text style={styles.pageTitle}>
                    Modifier la photo de profil
                  </Text>
                </View>
                <ChevronRight
                    stroke={colors.regular700}
                    strokeWidth={1.75}
                    width={18}
                    height={18}
                />
              </TouchableOpacity>
            </View>
          </View>
        <View style={styles.sectionPageItem}>
          <Text style={styles.sectionTitle}>Informations</Text>
          <View style={styles.pageContainer}>
            <View
              style={styles.pageItem}
              // onPress={() => navigation.navigate("Colors")}
            >
              <View style={styles.pageContent}>
                <IdCard
                  stroke={colors.regular800}
                  strokeWidth={1.75}
                  width={22}
                  height={22}
                />
                <View>
                  <Text style={styles.pageSubtitle}>Prénom et nom</Text>
                  <Text style={styles.pageTitle}>
                    {userData.prenom} {userData.nom}
                  </Text>
                </View>
              </View>
              <Lock
                stroke={colors.grey}
                strokeWidth={1.75}
                width={16}
                height={16}
              />
            </View>
            <View style={styles.pageSeparation} />
            <TouchableOpacity
                style={styles.pageItem}
                onPress={() => navigation.navigate("ChangeGroupe")}
            >
              <View style={styles.pageContent}>
                <UsersRound
                    stroke={colors.regular800}
                    strokeWidth={1.75}
                    width={22}
                    height={22}
                />
                <View>
                  <Text style={styles.pageSubtitle}>Groupe de classe</Text>
                  <Text style={styles.pageTitle}>{userData.groupe_id}</Text>
                </View>
              </View>
              <ChevronRight
                  stroke={colors.regular700}
                  strokeWidth={1.75}
                  width={18}
                  height={18}
              />
            </TouchableOpacity>
            <View style={styles.pageSeparation} />
            <TouchableOpacity
              style={styles.pageItem}
              onPress={() => navigation.navigate("ChangePassword")}
            >
              <View style={styles.pageContent}>
                <RectangleEllipsis
                  stroke={colors.regular800}
                  strokeWidth={1.75}
                  width={22}
                  height={22}
                />
                <View>
                  <Text style={styles.pageSubtitle}>Mot de passe</Text>
                  <Text style={styles.pageTitle}>********</Text>
                </View>
              </View>
              <ChevronRight
                stroke={colors.regular700}
                strokeWidth={1.75}
                width={18}
                height={18}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.pageContainer}>
            <View
              style={styles.pageItem}
              // onPress={() => navigation.navigate("Colors")}
            >
              <View style={styles.pageContent}>
                <BriefcaseBusiness
                  stroke={colors.regular800}
                  strokeWidth={1.75}
                  width={22}
                  height={22}
                />
                <Text style={styles.pageTitle}>En alternance</Text>
              </View>
              <Switch
                trackColor={{
                  false: colors.grey,
                  true: colors.regular700,
                }}
                thumbColor={isAlternant ? colors.white : colors.white}
                onValueChange={handleAlternant}
                value={isAlternant}
              />
            </View>
          </View>
        </View>
        {userData.role === "Chef" && (
          <View style={styles.sectionPageItem}>
            <Text style={styles.sectionTitle}>Responsable des devoirs</Text>
            <View style={styles.pageContainer}>
              <TouchableOpacity
                style={styles.pageItem}
                onPress={() => navigation.navigate("TransferRole")}
              >
                <View style={styles.pageContent}>
                  <View style={styles.pageIcon}>
                    <UserRoundPen
                      stroke={colors.regular100}
                      strokeWidth={1.75}
                      width={18}
                      height={18}
                    />
                  </View>
                  <Text style={styles.pageTitle}>Transmettre mon rôle</Text>
                </View>
                <ChevronRight
                  stroke={colors.regular700}
                  strokeWidth={1.75}
                  width={18}
                  height={18}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        <View style={styles.sectionPageItem}>
          <Text style={styles.sectionTitle}>Zone sensible</Text>
          <View style={styles.pageContainer}>
            <TouchableOpacity
              style={styles.pageItem}
              onPress={() => {
                navigation.navigate("DeleteAccount");
              }}
            >
              <View style={styles.pageContent}>
                <View
                  style={[styles.pageIcon, { backgroundColor: colors.red800 }]}
                >
                  <UserX
                    stroke={colors.red100}
                    strokeWidth={1.75}
                    width={18}
                    height={18}
                  />
                </View>
                <Text style={[styles.pageTitle, { color: colors.red800 }]}>
                  Supprimer mon compte
                </Text>
              </View>
              <ChevronRight
                stroke={colors.red700}
                strokeWidth={1.75}
                width={18}
                height={18}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default Profile;
