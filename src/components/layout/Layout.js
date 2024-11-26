import React, { useState } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Buscador from "./Buscador";
import MenuIcon from "./icons/menu.svg";
import CloseIcon from "./icons/close.svg";
import NavButtons from "./NavButtons";
const { width } = Dimensions.get('window');

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLargeScreen = width >= 768;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
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
        <View style={styles.buscadorContainer}>
          <Buscador style={styles.buscador} />
        </View>
        {isLargeScreen ? (
          <View style={styles.navButtons}>
            <NavButtons />
          </View>
        ) : (
          <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
            {isMenuOpen ? (
              <CloseIcon width={25} height={25} fill="red" />
            ) : (
              <MenuIcon width={25} height={25} fill="black" />
            )}
          </TouchableOpacity>
        )}
      </View>

      {!isLargeScreen && isMenuOpen && (
        <>
          <TouchableOpacity
            style={styles.backdrop}
            onPress={() => setIsMenuOpen(false)}
          />
          <View style={styles.sideMenu}>
            <ScrollView contentContainerStyle={styles.menuContent}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsMenuOpen(false)}
              >
                <CloseIcon width={20} height={20} fill="#000" />
              </TouchableOpacity>
              <NavButtons onOptionClick={() => setIsMenuOpen(false)} />
            </ScrollView>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 10,
    elevation: 4,
    backgroundColor: "#ffffff",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  logoLarge: {
    width: 170,
    height: 70,
  },
  logoSmall: {
    width: 40,
    height: 50,
  },
  buscadorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  buscador: {
    width: "100%",
  },
  menuButton: {
    padding: 10,
  },
  navButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  sideMenu: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#f4f4f4",
    padding: 1,
    zIndex: 9,
    elevation: 8,
    width: 250,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 8,
  },
  closeButton: {
    marginBottom: 20,
  },
  menuContent: {
    paddingTop: 20,
  },
});

export default Layout;
