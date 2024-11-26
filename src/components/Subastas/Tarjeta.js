import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from 'react-native';
import LazyCarousel from './LazyCarousel';
import Temporizador from './Temporizador';
import { get } from '../../api/httpService';

const screenWidth = Dimensions.get('window').width;

const Tarjeta = ({
  idSubasta,
  tituloSubasta,
  pujaMinima,
  imagenUrl,
  imagenUrl2,
  imagenUrl3,
  imagenUrl4,
  imagenUrl5,
  fechaFin,
  descripcion,
}) => {
  const [esTiempoCritico, setTiempoCritico] = useState(false);
  const [esFavorito, setEsFavorito] = useState(false);
  const [maxPuja, setMaxPuja] = useState(0);
  const [dataPujas, setDataPujas] = useState([]);

  useEffect(() => {
    const obtenerPujas = async () => {
      try {
        const data = await get('puja/Obtener');
        if (data.status) {
          setDataPujas(data.data.pujas);
        }
      } catch (error) {
        console.error('Error al obtener las pujas:', error);
      }
    };

    obtenerPujas();
  }, []);

  useEffect(() => {
    const pujas = dataPujas.filter((puja) => puja.idSubasta === idSubasta);
    if (pujas.length > 0) {
      const maxValor = Math.max(...pujas.map((puja) => parseFloat(puja.valor)));
      setMaxPuja(maxValor);
    } else {
      setMaxPuja(pujaMinima);
    }
  }, [dataPujas, idSubasta, pujaMinima]);

  const toggleFavorito = () => {
    setEsFavorito(!esFavorito);
  };

  return (
    <View style={styles.card}>
      <LazyCarousel
        imgs={[
          imagenUrl,
          imagenUrl2,
          imagenUrl3,
          imagenUrl4,
          imagenUrl5,
        ].filter((img) => img !== null)}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{tituloSubasta}</Text>
        <Text style={styles.description}>{descripcion}</Text>
        <View
          style={[
            styles.badge,
            { backgroundColor: esTiempoCritico ? '#ff0000' : '#007bff' },
          ]}
        >
          <Text style={styles.badgeText}>
            Cierra en{' '}
            <Temporizador
              fechaFin={fechaFin}
              onTiempoCritico={() => setTiempoCritico(true)}
              minutosCriticos={5}
            />
          </Text>
        </View>

        <View style={styles.details}>
          <View style={styles.location}>
            <Text style={styles.locationText}>Colombia</Text>
            <TouchableOpacity onPress={toggleFavorito}>
              <Text style={styles.favIcon}>{esFavorito ? '★' : '☆'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.participants}>
            <Text style={styles.participantsText}>
              {Math.floor(Math.random() * 30 + 1)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.auctionDetails}>
        <Text style={styles.auctionText}>Puja más alta:</Text>
        <Text style={styles.maxBid}>
          {maxPuja
            ? `COP ${maxPuja.toLocaleString('es-CO', {
                minimumFractionDigits: 0,
              })}`
            : '0'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    margin: 10,
    width: screenWidth > 600 ? screenWidth / 2 - 30 : screenWidth - 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
      default: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
      },
    }),
  },
  content: {
    padding: 12,
    flexDirection: 'column',
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
    marginBottom: 10,
  },
  badge: {
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  badgeText: {
    color: '#fff',
    fontSize: 14,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  favIcon: {
    fontSize: 24,
    marginLeft: 10,
  },
  auctionDetails: {
    marginTop: 12,
  },
  auctionText: {
    fontSize: 14,
    color: '#999',
  },
  maxBid: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default Tarjeta;
