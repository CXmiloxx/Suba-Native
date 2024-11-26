import { View, StyleSheet } from "react-native";
import Layout from "../layout";
import Subastas from "../subastas";

export default function Home() {
  return (
    <View style={styles.container}>
      <Layout />
      <View style={styles.content}>
        <Subastas />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginTop: 70,
  },
});
