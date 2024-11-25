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
            placeholderTextColor="#555"
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
        flex: 0.5,
        right: 110,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#E5E4E270",
        height: 32,
        borderRadius: 50,
        paddingHorizontal: 10,
        width: width * 0.60,
        maxWidth: 400,
        marginHorizontal: 10,
    },
    input: {
        flex: 1,
        height: "100%",
        paddingLeft: 15,
        fontSize: 16,
        backgroundColor: "transparent",
    },
    searchButton: {
        padding: 'auto',
    },
    });
