import React, { useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import {} from "react-native-gesture-handler";

function Profile() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Switch
        trackColor={{ false: "#7A797C", true: "#0760FB" }}
        thumbColor={isEnabled ? "#FFFFFF" : "#FFFFFF"}
        ios_backgroundColor="#7A797C"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F9",
  },
});

export default Profile;
