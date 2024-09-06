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
import { View, Text, Button, StyleSheet } from "react-native";
import { ThemeContext } from "../../utils/themeContext";
import moment from "moment";

const DetailEvent = ({ route }) => {
  const { colors } = useContext(ThemeContext);

  const event = route.params.data || route.params.event;
  if (event.description?.includes("\\n")) {
    event.description = "N/C";
  }

  console.log(event);

  const startHour = moment(event.start).format("HH:mm");
  const endHour = moment(event.end).format("HH:mm");
  const duration = moment
    .utc(moment(endHour, "HH:mm").diff(moment(startHour, "HH:mm")))
    .format("HH:mm");
  const date = moment(event.start).format("DD/MM/YYYY");
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
      fontSize: 17,
      color: colors.black,
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
      fontSize: 15,
      color: colors.black,
    },
    eventInfoDesc: {
      fontFamily: "Ubuntu_400Regular",
      fontSize: 15,
      color: colors.black,
    },
  });
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.titleText}>{event.title}</Text>
        <View style={styles.containerItems}>
          <View style={styles.eventInfo}>
            <View style={styles.eventInfoContent}>
              <DoorOpen
                stroke={colors.black}
                strokeWidth={1.75}
                width={20}
                height={20}
              />
              <View>
                <Text style={styles.eventInfoTitle}>Salle de cours</Text>
                <Text style={styles.eventInfoDesc}>
                  {event.location || event.lieu || "N/C"}
                </Text>
              </View>
            </View>
            <View style={styles.eventInfoContent}>
              <UserRound
                stroke={colors.black}
                strokeWidth={1.75}
                width={20}
                height={20}
              />
              <View>
                <Text style={styles.eventInfoTitle}>Enseignant</Text>
                <Text style={styles.eventInfoDesc}>
                  {event.professor || event.description || "N/C"}
                </Text>
              </View>
            </View>
            <View style={styles.eventInfoContent}>
              <UsersRound
                stroke={colors.black}
                strokeWidth={1.75}
                width={20}
                height={20}
              />
              <View>
                <Text style={styles.eventInfoTitle}>Groupe</Text>
                <Text style={styles.eventInfoDesc}>
                  {event.groupe || "N/C"}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.eventInfo}>
            <View style={styles.eventInfoContent}>
              <Calendar
                stroke={colors.black}
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
                stroke={colors.black}
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
                stroke={colors.black}
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
                stroke={colors.black}
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
