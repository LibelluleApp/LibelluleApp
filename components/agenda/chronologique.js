import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Item from "./Item"; // Assume que vous avez un composant Item pour afficher les éléments

const Chronologique = ({ tasks }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tâches chronologiques</Text>
      <ScrollView>
        {tasks.map((task) => (
          <Item key={task.agenda_id} item={task} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default Chronologique;
