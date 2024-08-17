import React, { PureComponent, Suspense, lazy } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import moment from "moment";

// Composants à charger dynamiquement
const EvalHome = lazy(() => import("./items/Eval"));
const TaskHome = lazy(() => import("./items/Task"));

class Item extends PureComponent {
  render() {
    const { item, currentDay, onTaskCheck, onTaskUncheck } = this.props;
    console.log(item);

    let ComponentToRender = null;

    const slideDay = moment(currentDay).format("YYYY-MM-DD");
    const itemDay = moment(item?.date_fin).format("YYYY-MM-DD");

    if (itemDay === slideDay) {
      if (item?.type === "eval") {
        ComponentToRender = EvalHome;
      } else if (item?.type === "devoir") {
        ComponentToRender = TaskHome;
      }
      // Pas de composant pour le type 'none'
    }

    return ComponentToRender ? (
      <View style={styles.itemContainer}>
        <Suspense fallback={<ActivityIndicator size="large" color="#0000ff" />}>
          <ComponentToRender
            item={item}
            titre={item.titre}
            agenda_id={item.agenda_id}
            date={item.date_fin}
            matiere={item.Ressource?.nom_ressource}
            checked={item.estFait}
            onTaskCheck={onTaskCheck} // Passer le callback ici
            onTaskUncheck={onTaskUncheck} // Passer le callback ici
          />
        </Suspense>
      </View>
    ) : (
      <View style={styles.noItemContainer}>
        <Text style={styles.textNone}>
          Aucun élément à afficher pour cette journée
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    padding: 10,
  },
  noItemContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  textNone: {
    textAlign: "center",
    color: "black",
  },
});

export default Item;
