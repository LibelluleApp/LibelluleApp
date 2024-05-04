import React, { useRef, useState, useCallback } from "react";
import { View, Text, Pressable, Image } from "react-native";
import HeaderCarousel from "../components/agenda/header";

const Agenda = () => {
  return (
    <View style={{ flex: 1, width: "100%" }}>
      <HeaderCarousel />
    </View>
  );
};

export default Agenda;
