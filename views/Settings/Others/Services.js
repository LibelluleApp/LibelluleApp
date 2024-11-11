import React, { memo, useContext } from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Linking, Image} from "react-native";

import { ChevronRight, Envelope, Lock } from "../../../assets/icons/Icons";
import {ThemeContext} from "../../../utils/themeContext";

const MenuItem = memo(({ icon: Icon, title, subtitle, onPress, colors }) => (
    <TouchableOpacity
        style={styles.menuItem}
        onPress={onPress}
    >
        <View style={styles.menuItemContent}>
            <View style={styles.menuItemLeft}>
                <View style={[styles.iconContainer, { backgroundColor: colors.secondary }]}>
                    <Image source={Icon} style={styles.icon} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={[styles.menuItemTitle, { color: colors.regular950 }]}>
                        {title}
                    </Text>
                    {subtitle && (
                        <Text style={[styles.menuItemSubtitle, { color: colors.regular800 }]}>
                            {subtitle}
                        </Text>
                    )}
                </View>
            </View>
            <ChevronRight stroke={colors.regular800} width={20} height={20} />
        </View>
    </TouchableOpacity>
));

const Services = () => {
    const { colors } = useContext(ThemeContext);

    const menuItems = [
        {
            section: "Services universitaires",
            items: [
                {
                    icon: "https://www.utbm.fr/wp-content/uploads/2016/09/zimbra-logo.png",
                    title: "Zimbra",
                    subtitle: "Accédez à votre messagerie universitaire",
                    onPress: () => Linking.openURL('https://webmail.univ-poitiers.fr/'),
                },
                {
                    icon: Lock,
                    title: "Authentification",
                    subtitle: "Gérez vos identifiants universitaires",
                    onPress: () => {/* Action */},
                }
            ]
        },
    ];

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {menuItems.map((section, sectionIndex) => (
                <View key={`section-${sectionIndex}`} style={styles.sectionContainer}>
                    <Text style={[styles.sectionTitle, { color: colors.regular800 }]}>
                        {section.section}
                    </Text>
                    <View style={[styles.sectionContent, { backgroundColor: colors.white_background }]}>
                        {section.items.map((item, itemIndex) => (
                            <React.Fragment key={`item-${itemIndex}`}>
                                <MenuItem {...item} colors={colors} />
                                {itemIndex < section.items.length - 1 && (
                                    <View style={[styles.separator, { backgroundColor: colors.border }]} />
                                )}
                            </React.Fragment>
                        ))}
                    </View>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sectionContainer: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontFamily: 'Ubuntu_500Medium',
        fontSize: 14,
        letterSpacing: -0.3,
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    sectionContent: {
        borderRadius: 12,
        marginHorizontal: 20,
        overflow: 'hidden',
    },
    menuItem: {
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    menuItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
    menuItemTitle: {
        fontFamily: 'Ubuntu_500Medium',
        fontSize: 16,
        letterSpacing: -0.3,
        marginBottom: 2,
    },
    menuItemSubtitle: {
        fontFamily: 'Ubuntu_400Regular',
        fontSize: 14,
        letterSpacing: -0.3,
    },
    separator: {
        height: 1,
        marginHorizontal: 16,
    },
    icon:{
        width: 100,
        height: 100
    }
});

export default memo(Services);