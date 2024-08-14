import React, { useContext } from "react";
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { ThemeContext } from "./../utils/themeContext";

function Notifications() {
  const { colors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    modalBackground: {
      backgroundColor: colors.background,
      flex: 1,
    },
    scrollView: {
      backgroundColor: colors.background,
      flex: 1,
    },
  });

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    ></ScrollView>
  );
}

export default Notifications;
