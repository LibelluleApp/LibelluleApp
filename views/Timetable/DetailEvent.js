import React, { useContext } from "react";
import {
  Calendar,
  DoorOpen,
  UserRound,
  Hourglass,
  Clock2,
  Clock8,
  UsersRound,
} from "./../../assets/icons/Icons";
import { View, Text, StyleSheet } from "react-native";
import { ThemeContext } from "../../utils/themeContext";
import moment from "moment";

const DetailEvent = ({ route }) => {
  const { colors } = useContext(ThemeContext);

  let event = route.params.data || route.params.event;

  const updatedEvent = {
    ...event,
    description: event.description?.includes("\\n") ? "N/C" : event.description,
  };

  const startHour = moment(updatedEvent.startHour, "HH:mm").format("HH:mm");
  const endHour = moment(updatedEvent.endHour, "HH:mm").format("HH:mm");

  const duration = moment
    .utc(moment(endHour, "HH:mm").diff(moment(startHour, "HH:mm")))
    .format("HH:mm");

  const date = moment(updatedEvent.start.dateTime).format("DD/MM/YYYY");

  const styles = StyleSheet.create({
    background: {
      flex: 1,
      alignItems: "center",
      backgroundColor: colors.background,
    },
    container: {
      flexDirection: "column",
      gap: 20,
      width: "90%",
      marginTop: 20,
    },
    titleText: {
      fontFamily: "Ubuntu_500Medium",
      letterSpacing: -0.4,
      fontSize: 17,
      color: colors.regular950,
      alignSelf: "center",
    },
    containerItems: {
      flexDirection: "column",
      gap: 20,
    },
    eventInfo: {
      flexDirection: "column",
      padding: 20,
      backgroundColor: colors.white_background,
      borderRadius: 10,
      gap: 20,
    },
    eventInfoContent: {
      flexDirection: "row",
      alignItems: "center",
      gap: 15,
    },
    eventContent: {
      padding: 20,
      backgroundColor: colors.white_background,
      borderRadius: 10,
      gap: 10,
    },
    eventInfoTitle: {
      fontFamily: "Ubuntu_500Medium",
      letterSpacing: -0.4,
      fontSize: 15,
      color: colors.regular950,
    },
    eventInfoDesc: {
      fontFamily: "Ubuntu_400Regular",
      letterSpacing: -0.4,
      fontSize: 15,
      color: colors.regular950,
    },
  });

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.titleText}>{updatedEvent.title}</Text>
        <View style={styles.containerItems}>
          <View style={styles.eventInfo}>
            <View style={styles.eventInfoContent}>
              <DoorOpen
                stroke={colors.regular950}
                strokeWidth={1.75}
                width={20}
                height={20}
              />
              <View>
                <Text style={styles.eventInfoTitle}>Salle de cours</Text>
                <Text style={styles.eventInfoDesc}>
                  {updatedEvent.location || updatedEvent.lieu || "N/C"}
                </Text>
              </View>
            </View>
            <View style={styles.eventInfoContent}>
              <UserRound
                stroke={colors.regular950}
                strokeWidth={1.75}
                width={20}
                height={20}
              />
              <View>
                <Text style={styles.eventInfoTitle}>Enseignant</Text>
                <Text style={styles.eventInfoDesc}>
                  {updatedEvent.professor || updatedEvent.description || "N/C"}
                </Text>
              </View>
            </View>
            <View style={styles.eventInfoContent}>
              <UsersRound
                stroke={colors.regular950}
                strokeWidth={1.75}
                width={20}
                height={20}
              />
              <View>
                <Text style={styles.eventInfoTitle}>Groupe</Text>
                <Text style={styles.eventInfoDesc}>
                  {updatedEvent.groupe || "N/C"}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.eventInfo}>
            <View style={styles.eventInfoContent}>
              <Calendar
                stroke={colors.regular950}
                strokeWidth={1.75}
                width={20}
                height={20}
              />
              <View>
                <Text style={styles.eventInfoTitle}>Date du cours</Text>
                <Text style={styles.eventInfoDesc}>{date}</Text>
              </View>
            </View>
            <View style={styles.eventInfoContent}>
              <Hourglass
                stroke={colors.regular950}
                strokeWidth={1.75}
                width={20}
                height={20}
              />
              <View>
                <Text style={styles.eventInfoTitle}>Durée du cours</Text>
                <Text style={styles.eventInfoDesc}>{duration}</Text>
              </View>
            </View>
            <View style={styles.eventInfoContent}>
              <Clock2
                stroke={colors.regular950}
                strokeWidth={1.75}
                width={20}
                height={20}
              />
              <View>
                <Text style={styles.eventInfoTitle}>Début du cours</Text>
                <Text style={styles.eventInfoDesc}>{startHour}</Text>
              </View>
            </View>
            <View style={styles.eventInfoContent}>
              <Clock8
                stroke={colors.regular950}
                strokeWidth={1.75}
                width={20}
                height={20}
              />
              <View>
                <Text style={styles.eventInfoTitle}>Fin du cours</Text>
                <Text style={styles.eventInfoDesc}>{endHour}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DetailEvent;
