import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  useWindowDimensions,
  Image,
  ScrollView,
} from "react-native";
import MenuIcon from "./icons/menu.svg";
import CloseIcon from "./icons/close.svg";
import SideMenu from "./SideMenu";
import Buscador from "./Buscador";
import NavButtons from "./NavButtons";

const Layout = () => {
  const { width } = useWindowDimensions();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isLargeScreen = width >= 768;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={
            isLargeScreen
              ? require("../../../assets/subastock_logo.png")
              : require("../../../assets/subastock_logo_crop.png")
          }
          style={isLargeScreen ? styles.logoLarge : styles.logoSmall}
          resizeMode="contain"
        />
        <Buscador />
        {isLargeScreen ? (
          <View style={styles.navButtons}>
            <NavButtons />
          </View>
        ) : (
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <CloseIcon width={25} height={25} fill="#007bff" />
            ) : (
              <MenuIcon width={25} height={25} fill="#007bff" />
            )}
          </TouchableOpacity>
        )}
      </View>

      {!isLargeScreen && isMenuOpen && (
        <TouchableOpacity
          style={styles.backdrop}
          onPress={() => setIsMenuOpen(false)}
        />
      )}

      {!isLargeScreen && isMenuOpen && (
        <Animated.View style={[styles.sideMenu, { height: '100%' }]}>
          <ScrollView contentContainerStyle={styles.menuContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsMenuOpen(false)}
            >
              <CloseIcon width={20} height={20} fill="#000" />
            </TouchableOpacity>
            <SideMenu onOptionClick={() => setIsMenuOpen(false)} />
          </ScrollView>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#ffffff",
    height: 70,
    elevation: 3,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  logoLarge: {
    width: 150,
    height: 50,
  },
  logoSmall: {
    width: 120,
    height: 40,
    right: 50,
  },
  navButtons: {
    flexDirection: "row",
    gap: 15,
  },
  menuButton: {
    borderWidth: 0,
    backgroundColor: "transparent",
  },
  backdrop: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semitransparente al abrir el menú
    zIndex: 998,
  },
  sideMenu: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "70%", // Menú más compacto para pantallas pequeñas
    maxWidth: 300, // Límite máximo en pantallas grandes
    backgroundColor: "#ffffff",
    elevation: 5,
    zIndex: 999,
    borderLeftWidth: 1,
    borderLeftColor: "#e0e0e0",
  },
  menuContent: {
    flexGrow: 1,
    padding: 15,
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
});

export default Layout;