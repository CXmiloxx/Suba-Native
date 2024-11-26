import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/components/home/Home';
import Registro from './src/components/registro';

export default function App() {
  return (
    <View style={styles.container}>
      <Registro/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
