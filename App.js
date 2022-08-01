import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Alert
} from 'react-native';
import ControlPresupuesto from './src/components/ControlPresupuesto';
import Header from './src/components/Header';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';

const App = () => {
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [presupuesto, setPresupuesto] = useState(0);
  const [gastos, setGastado] = useState([]);

  const handleNuevoPresupuesto = (presupuesto) => {
    if (Number(presupuesto) > 0) {
      console.log('El presupuesto es:', presupuesto);
      setIsValidPresupuesto(true);
    } else {
      Alert.alert('ERROR', 'El Presupuesto no puede ser 0 o un valor menor!')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />

        {
          isValidPresupuesto ? (
            <ControlPresupuesto
              gastos={gastos}
              presupuesto={presupuesto}
            />
          ) : (
            <NuevoPresupuesto
              presupuesto={presupuesto}
              setPresupuesto={setPresupuesto}
              handleNuevoPresupuesto={handleNuevoPresupuesto}

            />
          )}

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
  header: {
    backgroundColor: '#3B82F6',
    minHeight: 400
  },
});

export default App;
