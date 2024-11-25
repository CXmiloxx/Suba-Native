import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import LazyCarousel from "./LazyCarousel";
import Temporizador from "./Temporizador";

const Tarjeta = ({idSubasta,tituloSubasta,pujaMinima,imagenUrl,imagenUrl2,imagenUrl3,imagenUrl4,imagenUrl5,fechaFin,descripcion}) => {
  const [esTiempoCritico, setTiempoCritico] = useState(false);
  const [esFavorito, setEsFavorito] = useState(false);
  const [maxPuja, setMaxPuja] = useState(0);


  useEffect(() => {
    const obtenerPujas = async () => {
      try {
        const response = await fetch(`https://apisubastock.cleverapps.io/puja/Obtener`);
        const data = await response.json();
        if (!data.status) {
          console.error("Error al obtener las pujas:", data.message);
          return;
        }

        const pujas = data.data.pujas.filter(puja => puja.idSubasta === idSubasta);
        if (pujas.length > 0) {
          const maxValor = Math.max(...pujas.map(puja => parseFloat(puja.valor)));
          setMaxPuja(maxValor);
        } else {
          setMaxPuja(pujaMinima);
        }
      } catch (error) {
        console.error("Error al obtener las pujas:", error);
      }
    };

    obtenerPujas();
  }, [idSubasta, pujaMinima]);

  const toggleFavorito = () => {
    setEsFavorito(!esFavorito);
  };

  return (
    <View style={styles.card}>
        <LazyCarousel
          imgs={[imagenUrl, imagenUrl2, imagenUrl3, imagenUrl4, imagenUrl5].filter((img) => img !== null)}
        />

      <View style={styles.content}>
          <Text style={styles.title}>{tituloSubasta}</Text>
          <Text style={styles.description}>{descripcion}</Text>
        <View style={[styles.badge, { backgroundColor: esTiempoCritico ? "#ff0000" : "#007bff" }]}>
          <Text style={styles.badgeText}>Cierra en <Temporizador fechaFin={fechaFin} onTiempoCritico={() => setTiempoCritico(true)} minutosCriticos={5} /></Text>
        </View>

        <View style={styles.details}>
          <View style={styles.location}>
            <Text style={styles.locationText}>Colombia</Text>
            <TouchableOpacity onPress={toggleFavorito}>
              <Text style={styles.favIcon}>{esFavorito ? "★" : "☆"}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.participants}>
            <Text style={styles.participantsText}>{Math.floor(Math.random() * 30 + 1)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.auctionDetails}>
        <Text style={styles.auctionText}>Puja más alta:</Text>
        <Text style={styles.maxBid}>
          {maxPuja ? `COP ${maxPuja.toLocaleString('es-CO', { minimumFractionDigits: 0 })}` : "0"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"

  },
  content: {
    padding: 12,
    flexDirection: "column",
    gap: 10,
  },
  title: {
    fontSize: 18, // Ajuste de tamaño relativo
    fontWeight: "bold",
    flexWrap: "wrap", // Asegura que el texto largo se ajuste
  },
  badge: {
    padding: 6,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  badgeText: {
    color: "#fff",
    fontSize: 14,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 14, // Reducción de tamaño de texto
    marginLeft: 5,
  },
  favIcon: {
    fontSize: 24,
    marginLeft: 10,
  },
  participants: {
    flexDirection: "row",
    alignItems: "center",
  },
  participantsText: {
    fontSize: 14, // Reducción de tamaño de texto
  },
  auctionDetails: {
    paddingHorizontal: 12,
    flexDirection: "column",
  },
  auctionText: {
    fontSize: 14,
    color: "#00000095",
  },
  maxBid: {
    fontSize: 16, // Ajuste de tamaño relativo
    fontWeight: "bold",
  },
  description: {
    fontSize: 14, // Reducción de tamaño de texto
    lineHeight: 20, // Ajuste de altura de línea
    marginBottom: 10,
  }
});


export default Tarjeta;
