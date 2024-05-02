import React from "react";
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";

function Notifications() {
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

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: "#F4F5F9",
    flex: 1,
  },
  scrollView: {
    backgroundColor: "#F4F5F9",
    flex: 1,
  },
});

export default Notifications;
