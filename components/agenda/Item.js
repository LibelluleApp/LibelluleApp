import React, { Suspense, lazy, useContext } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import moment from "moment";
import { ThemeContext } from "../../utils/themeContext";

// Composants à charger dynamiquement
const EvalHome = lazy(() => import("./items/Eval"));
const TaskHome = lazy(() => import("./items/Task"));

const Item = ({
  item,
  currentDate,
  onTaskCheck,
  onTaskUncheck,
  slide,
  component,
  bouncyBox,
}) => {
  const { colors } = useContext(ThemeContext); // Accéder au thème

  const styles = StyleSheet.create({
    noItemContainer: {
      width: "100%",
    },
    noItemText: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      color: colors.blue800,
    },
  });

  let ComponentToRender = null;

  const slideDay = moment(currentDate).format("YYYY-MM-DD");
  const itemDay = moment(item?.date_fin).format("YYYY-MM-DD");

  if (itemDay === slideDay || slide === false) {
    if (item?.type === "eval") {
      ComponentToRender = EvalHome;
    } else if (item?.type === "devoir") {
      ComponentToRender = TaskHome;
    }
    // Pas de composant pour le type 'none'
  }

  return ComponentToRender ? (
    <View>
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
          component={component}
          bouncyBox={bouncyBox}
        />
      </Suspense>
    </View>
  ) : null;
};

export default Item;
