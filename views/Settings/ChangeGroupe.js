import React, {useContext, useMemo, useState, useCallback, useEffect} from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "../../utils/themeContext";
import {getLastChangeGroupeDate, getUserData, setLastChangeGroupeDate} from "../../utils/storage";
import ButtonAuth from "../../components/auth/buttonAuth";
import changeGroupe from "../../api/User/changeGroup";
import {showMessage} from "react-native-flash-message";
import {useNavigation} from "@react-navigation/native";

const OPTION_GROUPS = {
    but: [
        { label: "TC", value: "CL" },
        { label: "GMP", value: "GM" },
        { label: "QLIO", value: "QL" },
        { label: "GEII", value: "GI" },
        { label: "MMI", value: "UI" },
    ],
    annee: [
        { label: "1e année", value: "Y1" },
        { label: "2e année", value: "Y2" },
        { label: "3e année", value: "Y3" },
    ],
    tp: {
        default: [
            { label: "TP1", value: "TP1" },
            { label: "TP2", value: "TP2" },
            { label: "TP3", value: "TP3" },
            { label: "TP4", value: "TP4" },
            { label: "TP5", value: "TP5" },
            { label: "TP6", value: "TP6" },
        ],
        gmp: [
            { label: "TPS1 TPA1", value: "TPS1_TPA1" },
            { label: "TPS1 TPA2", value: "TPS1_TPA2" },
            { label: "TPS2 TPA2", value: "TPS2_TPA2" },
            { label: "TPS2 TPA3", value: "TPS2_TPA3" },
            { label: "TPS3 TPA4", value: "TPS3_TPA4" },
            { label: "TPS3 TPA5", value: "TPS3_TPA5" },
            { label: "TPS4 TPA5", value: "TPS4_TPA5" },
            { label: "TPS4 TPA6", value: "TPS4_TPA6" },
        ],
        gmpY3: [
            { label: "TPS1 TPA1", value: "TPS1_TPA1" },
            { label: "TPS2 TPA2", value: "TPS2_TPA2" },
            { label: "TPS3 TPA3", value: "TPS3_TPA3" },
            { label: "TPS3 TPA4", value: "TPS3_TPA4" },
        ],
    },
    parcours: [
        { label: "BI", value: "BI" },
        { label: "BDMRC", value: "BDMRC" },
        { label: "SME", value: "SME" },
    ],
};

const OptionGroup = ({ title, options, value, onSelect, style, disabled }) => (
    <View style={style?.container}>
        <Text style={style?.title}>{title}</Text>
        <ScrollView horizontal bounces={false} style={style?.scrollView}>
            {options.map((option) => (
                <Pressable
                    key={option.value}
                    onPress={disabled ? () => {} : () => onSelect(option.value)}
                    style={[style?.option, value === option.value && style?.selectedOption]}
                >
                    <Text style={[style?.optionText, value === option.value && style?.selectedOptionText]}>
                        {option.label}
                    </Text>
                </Pressable>
            ))}
        </ScrollView>
    </View>
);

const ChangeGroupe = () => {
    const [canChangeGroup, setCanChangeGroup] = useState(true);
    const user_data = getUserData();
    const actualGroup = user_data.groupe_id;
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    // Extraire les informations du groupe actuel
    const extractGroupInfo = (groupId) => {
        // Format pour les groupes avec parcours: Y2CL-TP2.BI
        const matchWithParcours = groupId.match(/^(Y\d+)([A-Z]+)-TP(\d+)\.([A-Z]+)$/);
        if (matchWithParcours) {
            return {
                anneeBut: matchWithParcours[1],
                but: matchWithParcours[2],
                groupeTP: `TP${matchWithParcours[3]}`,
                parcours: matchWithParcours[4]
            };
        }

        // Format sans parcours: Y3UI-TP1
        const matchNoParcours = groupId.match(/^(Y\d+)([A-Z]+)-TP(\d+)$/);
        if (matchNoParcours) {
            return {
                anneeBut: matchNoParcours[1],
                but: matchNoParcours[2],
                groupeTP: `TP${matchNoParcours[3]}`,
                parcours: null
            };
        }

        // Format spécial pour GMP
        const matchGMP = groupId.match(/^(Y\d+)([A-Z]+)-TPS(\d+)_TPA(\d+)$/);
        if (matchGMP) {
            return {
                anneeBut: matchGMP[1],
                but: matchGMP[2],
                groupeTP: `TPS${matchGMP[3]}_TPA${matchGMP[4]}`,
                parcours: OPTION_GROUPS.parcours[0].value
            };
        }

        // Valeurs par défaut si le format ne correspond pas
        return {
            but: OPTION_GROUPS.but[0].value,
            anneeBut: OPTION_GROUPS.annee[0].value,
            groupeTP: OPTION_GROUPS.tp.default[0].value,
            parcours: null
        };
    };

    const groupInfo = extractGroupInfo(actualGroup);

    const { colors } = useContext(ThemeContext);
    const [formData, setFormData] = useState({
        but: groupInfo.but,
        anneeBut: groupInfo.anneeBut,
        groupeTP: groupInfo.groupeTP,
        parcours: groupInfo.parcours,
    });

    const filteredGroupeTPOptions = useMemo(() => {
        const { but, anneeBut } = formData;
        if (but === "UI") {
            // Pour UI, afficher seulement 4 groupes de TP
            return OPTION_GROUPS.tp.default.slice(0, 4);
        }
        if (but === "CL") {
            if (anneeBut === "Y2") {
                return [...OPTION_GROUPS.tp.default.slice(0, 4), { label: "TPA", value: "TPA" }];
            }
            return anneeBut === "Y3" ? OPTION_GROUPS.tp.default.slice(0, 5) : OPTION_GROUPS.tp.default;
        }
        if (but === "QL") return OPTION_GROUPS.tp.default.slice(0, 2);
        if (but === "GM") {
            if (anneeBut === "Y2") {
                return OPTION_GROUPS.tp.gmp.filter((_, i) => i !== 5 && i !== OPTION_GROUPS.tp.gmp.length - 1);
            }
            return anneeBut === "Y3" ? OPTION_GROUPS.tp.gmpY3 : OPTION_GROUPS.tp.gmp;
        }
        return OPTION_GROUPS.tp.default.slice(0, 4);
    }, [formData.but, formData.anneeBut]);

    const handleInputChange = useCallback((field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    }, []);

    const styles = useStyles(colors);
    const groupStyle = {
        container: styles.itemInputContainer,
        title: styles.titleItemInputContainer,
        scrollView: styles.inputScrollView,
        option: styles.inputList,
        selectedOption: styles.inputListSelected,
        optionText: styles.inputListTitle,
        selectedOptionText: styles.inputListTitleSelected,
    };

    // Styles pour les champs désactivés
    const disabledGroupStyle = {
        ...groupStyle,
        container: [styles.itemInputContainer, { opacity: 0.7 }],
        option: [styles.inputList, { backgroundColor: colors.disabledBackground || '#CCCCCC' }],
        optionText: [styles.inputListTitle, { color: colors.disabledText || '#888888' }]
    };

    useEffect(() => {
        const checkDate = () => {
            const lastChange = getLastChangeGroupeDate();
            if (!lastChange) return;

            const lastDate = new Date(lastChange);
            const now = new Date();

            const diffInDays = (now - lastDate) / (1000 * 60 * 60 * 24);
            if (diffInDays < 30) {
                setCanChangeGroup(false);
            }
        };

        checkDate();
    }, []);

    const handleChangeGroupe = async () => {
        let groupe_id = `${formData.anneeBut}${formData.but}-${formData.groupeTP}`;
        let parcours_id = null;

        if (formData.parcours) {
            groupe_id = `${formData.anneeBut}${formData.but}-${formData.groupeTP}.${formData.parcours}`;
        }
        try{
            const response = await changeGroupe(groupe_id);
            showMessage({
                message: "Votre groupe à bien été changé ! Pour appliquer le changement, veuillez redémarrer l'application.",
                type: "success",
                titleStyle: { fontFamily: "Ubuntu_400Regular" },
            });
            setLastChangeGroupeDate(new Date().toISOString());
            navigation.goBack();
        }catch(error){
            showMessage({
                message: error.message,
                type: "danger",
                titleStyle: { fontFamily: "Ubuntu_400Regular" },
            });
        }
    }

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    {/* Champs BUT et année de BUT en lecture seule */}
                    <OptionGroup
                        title="BUT"
                        options={OPTION_GROUPS.but}
                        value={formData.but}
                        onSelect={() => {}}
                        style={disabledGroupStyle}
                        disabled={true}
                    />
                    <OptionGroup
                        title="Année de BUT"
                        options={OPTION_GROUPS.annee}
                        value={formData.anneeBut}
                        onSelect={() => {}}
                        style={disabledGroupStyle}
                        disabled={true}
                    />

                    {/* Champs modifiables */}
                    <OptionGroup
                        title="Groupe de TP"
                        options={filteredGroupeTPOptions}
                        value={formData.groupeTP}
                        onSelect={(value) => handleInputChange("groupeTP", value)}
                        style={groupStyle}
                    />
                    {formData.but === "CL" && formData.anneeBut === "Y2" && formData.groupeTP !== "TPA" && (
                        <OptionGroup
                            title="Parcours"
                            options={OPTION_GROUPS.parcours}
                            value={formData.parcours}
                            onSelect={(value) => handleInputChange("parcours", value)}
                            style={groupStyle}
                        />
                    )}
                </View>
                <View style={styles.buttonContent}>
                    <ButtonAuth
                        title={canChangeGroup ? "Modifier son groupe" : "Changement disponible dans moins de 30 jours"}
                        onPress={handleChangeGroupe}
                        loading={loading}
                        disabled={!canChangeGroup}
                    />
                </View>
            </View>
        </View>
    );
};

const useStyles = (colors) => StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background,
    },
    container: {
        width: "90%",
        paddingTop: 15,
        paddingBottom: 5,
        flex: 1,
        flexDirection: "column",
        gap: 30,
        justifyContent: "center",
    },
    inputContainer: {
        justifyContent: "center",
        flexDirection: "column",
        gap: 20,
    },
    itemInputContainer: {
        justifyContent: "center",
    },
    titleItemInputContainer: {
        fontFamily: "Ubuntu_500Medium",
        letterSpacing: -0.4,
        fontSize: 15,
        color: colors.regular950,
    },
    inputScrollView: {
        paddingVertical: 15,
    },
    inputList: {
        backgroundColor: colors.white_background,
        paddingVertical: 11,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginRight: 15,
    },
    inputListSelected: {
        backgroundColor: colors.regular100,
        paddingVertical: 11,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginRight: 15,
    },
    inputListTitle: {
        fontFamily: "Ubuntu_400Regular",
        letterSpacing: -0.4,
        fontSize: 15,
        color: colors.regular950,
    },
    inputListTitleSelected: {
        fontFamily: "Ubuntu_400Regular",
        letterSpacing: -0.4,
        fontSize: 15,
        color: colors.regular700,
    },
    buttonContent: {
        paddingBottom: 75,
    },
});

export default ChangeGroupe;