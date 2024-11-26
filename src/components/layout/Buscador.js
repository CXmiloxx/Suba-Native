import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
const { width } = Dimensions.get("window");

export default function Buscador() {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar animal..."
          placeholderTextColor="black"
        />
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={20} color="#237E0D" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E5E4E270",
    height: 40,
    borderRadius: 50,
    paddingHorizontal: 10,
    width: "100%", 
    maxWidth: 500,
    minWidth: 250,
  },
  input: {
    flex: 1,
    height: "100%",
    paddingLeft: 15,
    fontSize: 16,
    backgroundColor: "transparent",
  },
  searchButton: {
    padding: 8,
  },
});
