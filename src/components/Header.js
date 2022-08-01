import React from 'react'
import { Text, SafeAreaView, StyleSheet } from 'react-native';
const Header = () => {
  return (
    <SafeAreaView>
      <Text style={styles.text}>Planificador de gastos</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#FFF',
    paddingVertical: 20,
  }
})

export default Header;