import React, { useRef, useEffect } from "react";
import { View, Text, Pressable, Image, Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import EvalHome from "../home/Agenda/Eval";
import TaskHome from "../home/Agenda/Task";

function ListAgenda({ currentIndex, setIndex, initialIndex, scrollX }) {
  const width = Dimensions.get("window").width;
  const carouselRef = useRef(null);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        index: currentIndex,
        animated: true,
        duration: 100,
      });
    }
  }, [currentIndex]);

  const handleSnapToItem = (index) => {
    if (index !== currentIndex) {
      setIndex(index);
    }
  };

  return (
    <View style={{ flex: 1, marginTop: 100 }}>
      <Carousel
        ref={carouselRef}
        width={width}
        height={width / 2}
        data={[...new Array(300).keys()]}
        scrollAnimationDuration={100}
        defaultIndex={initialIndex}
        onSnapToItem={handleSnapToItem}
        windowSize={3}
        renderItem={({ index }) => (
          <View
            style={{ flex: 1, justifyContent: "start", alignItems: "center" }}
          >
            <EvalHome />
            <TaskHome />
          </View>
        )}
        scrollX={scrollX} // Pass scrollX to the Carousel
      />
    </View>
  );
}

export default ListAgenda;
