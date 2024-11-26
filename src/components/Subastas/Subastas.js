import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from 'react-native';
import Tarjeta from './Tarjeta';
import { get } from '../../api/httpService';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Subastas = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get('subasta/Obtener')
      .then((data) => {
        setData(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener las subastas:', error);
        setLoading(false);
      });
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
        numColumns={screenWidth > 600 ? 2 : 1}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: screenHeight,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  listContainer: {
    flex: 1,
    padding: 10,
  },
  separator: {
    height: 10,
  },
});

export default Subastas;
