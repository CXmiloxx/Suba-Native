import {View, StyleSheet} from 'react-native'
import Layout from '../layout'
import Subastas from '../Subastas'

export default function Home() {
  return (
    <View style={styles.container}>
        <Layout/>
        <Subastas/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
