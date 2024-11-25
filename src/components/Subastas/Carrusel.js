import React, { useEffect, useRef } from "react";
import { View, Image, StyleSheet, ScrollView, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const Carrusel = ({ images, currentIndex }) => {
  const scrollViewRef = useRef(null);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: currentIndex * width, animated: true });
    }
  }, [currentIndex]); 

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={{ flexGrow: 1 }}
        ref={scrollViewRef}
      >
        {images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.image} resizeMode="cover" />
        ))}
      </ScrollView>

      <View style={styles.indicators}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentIndex === index && styles.activeIndicator,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 250,
    position: "relative",
  },
  scrollView: {
    width: "100%",
    height: "100%",
  },
  image: {
    width: width,
    height: "100%",
  },
  indicators: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "gray",
    margin: 4,
  },
  activeIndicator: {
    backgroundColor: "white",
  },
});

export default Carrusel;
