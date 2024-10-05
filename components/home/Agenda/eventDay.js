import React, {
  useState,
  useRef,
  useEffect,
  PureComponent,
  Suspense,
  useContext,
} from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import moment from "moment";
import { useIsFocused } from "@react-navigation/native";
import { ThemeContext } from "./../../../utils/themeContext";
import fetchAgenda from "../../../api/Agenda/fetch";
import EvalHome from "./../../agenda/items/Eval";
import TaskHome from "./../../agenda/items/Task";

function EventDay({ date }) {
  const { colors } = useContext(ThemeContext);
  const isFocused = useIsFocused();
  const [agenda, setAgenda] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const styles = StyleSheet.create({
    container: {
      width: "90%",
      alignSelf: "center",
      flexDirection: "column",
      gap: 10,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    noItemContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
    textNone: {
      color: colors.grey_variable,
      fontSize: 15,
      textAlign: "center",
    },
    items: {},
  });

  class Item extends PureComponent {
    render() {
      const { item } = this.props;
      let ComponentToRender = null;

      if (item?.type === "eval") {
        ComponentToRender = EvalHome;
      } else if (item?.type === "devoir") {
        ComponentToRender = TaskHome;
      }

      return ComponentToRender ? (
        <View style={styles.items}>
          <Suspense
            fallback={<ActivityIndicator size="large" color="#0000ff" />}
          >
            <ComponentToRender
              item={item}
              titre={item.titre}
              agenda_id={item.agenda_id}
              date={item.date_fin}
              matiere={item.Ressource?.nom_ressource}
              checked={item.estFait}
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

  const fetchData = async () => {
    try {
      // Appel de l'API avec la date de demain
      const data = await fetchAgenda();

      // Filtrer les événements pour la date de demain (qui est déjà dans 'date')
      const eventsForTomorrow = data.filter((item) =>
        moment(item.date_fin).isSame(date, "day")
      );

      // Si aucun événement, ajouter un événement par défaut
      if (eventsForTomorrow.length === 0) {
        eventsForTomorrow.push({
          agenda_id: 0,
          date_fin: date, // Utiliser directement la date passée en paramètre
          titre: "Aucun élément à afficher",
          type: "none",
          Ressource: { nom_ressource: "Aucune matière" },
        });
      }

      // Mettre à jour l'état avec les événements de demain
      setAgenda(eventsForTomorrow);
      setIsLoading(false);
    } catch (error) {
      console.error("Erreur lors du chargement de l'agenda.", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {agenda.map((agendaItem) => (
        <Item key={agendaItem.agenda_id} item={agendaItem} />
      ))}
    </View>
  );
}

export default EventDay;
