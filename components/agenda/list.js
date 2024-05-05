import React, { useRef, useEffect } from "react";
import { View, Text, Pressable, Image, Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";

function ListAgenda({ currentIndex, setIndex, initialIndex }) {
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
    <View style={{ flex: 1 }}>
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
            style={{
              flex: 1,
              borderWidth: 1,
              justifyContent: "center",
              alignSelf: "center",
              backgroundColor: "#BB0000",
              width: "90%",
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 30 }}>{index}</Text>
          </View>
        )}
      />
    </View>
  );
}

export default ListAgenda;
