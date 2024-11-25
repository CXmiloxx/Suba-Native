import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import Tarjeta from "./Tarjeta";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Subastas = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://apisubastock.cleverapps.io/subasta/Obtener")
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const subastas = data.subastas || [];

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (subastas.length === 0) {
    return (
      <View style={styles.noDataContainer}>
        <Text>No hay subastas disponibles.</Text>
      </View>
    );
  }

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={subastas}
        keyExtractor={(item) => item.idSubasta.toString()}
        renderItem={({ item }) => (
          <Tarjeta
            idSubasta={item.idSubasta}
            tituloSubasta={item.tituloSubasta}
            descripcion={item.descripcion}
            imagenUrl={item.imagenUrl}
            imagenUrl2={item.imagenUrl2}
            imagenUrl3={item.imagenUrl3}
            imagenUrl4={item.imagenUrl4}
            imagenUrl5={item.imagenUrl5}
            fechaFin={item.fechaFin}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: screenHeight,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  listContainer: {
    flex: 1,
    padding: 10,
  },
});

export default Subastas;
