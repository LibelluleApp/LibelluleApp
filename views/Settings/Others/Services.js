import React, { memo, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  Image,
} from "react-native";

import { ChevronRight, Envelope, Lock } from "../../../assets/icons/Icons";
import { ThemeContext } from "../../../utils/themeContext";
import { useNavigation } from "@react-navigation/native";

function Services() {
  const { colors } = useContext(ThemeContext);
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    sectionContainer: {
      marginTop: 12,
      width: "90%",
      marginHorizontal: "auto",
      gap: 10,
    },
    sectionTitle: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 15,
      color: colors.grey,
    },
    pageSeparation: {
      height: 0.5,
      width: "85%",
      backgroundColor: colors.grey,
      alignSelf: "flex-end",
    },
    sectionContent: {
      borderRadius: 12,
      overflow: "hidden",
    },
    menuItem: {
      paddingHorizontal: 16,
      paddingVertical: 16,
    },
    menuItemContent: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    menuItemLeft: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
      gap: 12,
    },
    iconContainer: {
      backgroundColor: colors.regular900,
      borderRadius: 8,
      padding: 8,
      justifyContent: "center",
      alignItems: "center",
    },
    textContainer: {
      flex: 1,
    },
    menuItemTitle: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 15,
      color: colors.regular900,
    },
    menuItemSubtitle: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 13,
      color: colors.grey,
    },
    separator: {
      height: 1,
      marginHorizontal: 16,
    },
    icon: {
      width: 30,
      height: 30,
    },
  });

  const MenuItem = memo(
    ({
      icon: Icon,
      title,
      subtitle,
      onPress,
      colors,
      iconColor = colors.regular100,
    }) => (
      <TouchableOpacity style={styles.menuItem} onPress={onPress}>
        <View style={styles.menuItemContent}>
          <View style={styles.menuItemLeft}>
            <View style={[styles.iconContainer]}>
              <Icon
                stroke={colors.regular100}
                strokeWidth={1.75}
                width={18}
                height={18}
              />
            </View>
            <View style={styles.textContainer}>
              <Text
                style={[styles.menuItemTitle, { color: colors.regular900 }]}
              >
                {title}
              </Text>
              {subtitle && (
                <Text style={[styles.menuItemSubtitle, { color: colors.grey }]}>
                  {subtitle}
                </Text>
              )}
            </View>
          </View>
          <ChevronRight stroke={colors.regular700} width={20} height={20} />
        </View>
      </TouchableOpacity>
    )
  );

  const menuItems = [
    {
      section: "Services universitaires",
      items: [
        {
          icon: Envelope,
          icon: Envelope,
          title: "Zimbra",
          subtitle: "Accédez à votre messagerie universitaire",
          onPress: () => navigation.navigate("ZimbraConnect"),
        },
      ],
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {menuItems.map((section, sectionIndex) => (
        <View key={`section-${sectionIndex}`} style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: colors.grey }]}>
            {section.section}
          </Text>
          <View
            style={[
              styles.sectionContent,
              { backgroundColor: colors.white_background },
            ]}
          >
            {section.items.map((item, itemIndex) => (
              <React.Fragment key={`item-${itemIndex}`}>
                <MenuItem {...item} colors={colors} />
                {itemIndex < section.items.length - 1 && (
                  <View style={styles.pageSeparation} />
                )}
              </React.Fragment>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

export default memo(Services);
