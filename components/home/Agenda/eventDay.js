import React, {
  useState,
  useRef,
  useEffect,
  PureComponent,
  Suspense,
  useContext,
} from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Touchable,
  TouchableOpacity,
} from "react-native";
import moment from "moment";
import { useIsFocused } from "@react-navigation/native";
import { ThemeContext } from "./../../../utils/themeContext";
import fetchAgenda from "../../../api/Agenda/fetch";
import EvalHome from "./../../agenda/items/Eval";
import TaskHome from "./../../agenda/items/Task";
import { CircleCheckBig } from "./../../../assets/icons/Icons";
import { useNavigation } from "@react-navigation/native";

function EventDay({ date, onAgendaContentChange }) {
  const { colors } = useContext(ThemeContext);
  const isFocused = useIsFocused();
  const [agenda, setAgenda] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    container: {
      width: "90%",
      alignSelf: "center",
    },
    containerAgenda: {
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
      gap: 20,
    },
    noItemContent: {
      justifyContent: "center",
      alignItems: "center",
      gap: 7,
      width: "100%",
    },
    textNone: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 15,
      textAlign: "center",
      color: colors.regular800,
      width: "50%",
    },
    btnOutline: {
      color: colors.regular700,
      fontSize: 16,
      paddingHorizontal: 20,
      paddingVertical: 7,
      borderRadius: 50,
      borderWidth: 0.5,
      borderColor: colors.regular700,
      textAlign: "center",
    },
    btnOutlineText: {
      color: colors.regular700,
      fontSize: 13,
      fontFamily: "Ubuntu_500Medium",
      letterSpacing: -0.4,
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

      // // Si aucun événement, ajouter un événement par défaut
      // if (eventsForTomorrow.length === 0) {
      //   eventsForTomorrow.push({
      //     agenda_id: 0,
      //     date_fin: date, // Utiliser directement la date passée en paramètre
      //     titre: "Aucun élément à afficher",
      //     type: "none",
      //     Ressource: { nom_ressource: "Aucune matière" },
      //   });
      // }

      // Mettre à jour l'état avec les événements de demain
      setAgenda(eventsForTomorrow);
      onAgendaContentChange(eventsForTomorrow.length !== 0);
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
      {agenda.length === 0 ? (
        <View style={styles.noItemContainer}>
          <View style={styles.noItemContent}>
            <CircleCheckBig
              stroke={colors.regular800}
              strokeWidth={1.75}
              width={30}
              height={30}
            />
            <Text style={styles.textNone}>
              Aucun élément à afficher pour cette journée
            </Text>
          </View>
          <TouchableOpacity
            style={styles.btnOutline}
            onPress={() => navigation.navigate("Agenda")}
          >
            <Text style={styles.btnOutlineText}>Voir tous les devoirs</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.containerAgenda}>
          {agenda.map((agendaItem) => (
            <Item key={agendaItem.agenda_id} item={agendaItem} />
          ))}
        </View>
      )}
    </View>
  );
}

export default EventDay;
