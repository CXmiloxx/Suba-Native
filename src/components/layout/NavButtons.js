import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import HomeIcon from "./icons/home.svg";
import UserIcon from "./icons/user.svg";
import ProfileIcon from "./icons/register.svg";

const NavButtons = () => {
  const navOptions = [
    { name: "Inicio", icon: <HomeIcon width={20} height={20} fill="#007bff" /> },
    { name: "Registrar", icon: <ProfileIcon width={20} height={20} fill="#007bff" /> },
    { name: "Iniciar Sesion", icon: <UserIcon width={20} height={20} fill="#007bff" /> },
  ];

  return (
    <View style={styles.navContainer}>
      {navOptions.map((option, index) => (
        <TouchableOpacity key={index} style={styles.navButton}>
          {option.icon}
          <Text style={styles.navText}>{option.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: "rgba(0, 123, 255, 0.1)",
  },
  navText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#007bff",
    fontWeight: "500",
  },
});

export default NavButtons;
