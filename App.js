import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Alert,
  Pressable,
  Image,
  Modal
} from 'react-native';
import ControlPresupuesto from './src/components/ControlPresupuesto';
import Header from './src/components/Header';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';
import FormularioGasto from './src/components/FormularioGasto';

const App = () => {
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [presupuesto, setPresupuesto] = useState(0);
  const [gastos, setGastado] = useState([]);
  const [modal, setModal] = useState(false);

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
      {modal && (
        <Modal
          animationType='slide'
          visible={modal}
          onRequestClose={() => {
            setModal(!modal)
          }}
        >
          <FormularioGasto
            setModal={setModal}
          />
        </Modal>
      )}

      {isValidPresupuesto && (
        <Pressable
          onPress={() => setModal(!modal)}
        >
          <Image
            style={styles.image}
            source={require('./src/img/nuevo-gasto.png')}
          />
        </Pressable>
      )}
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
  image: {
    width: 65,
    height: 65,
    position: 'absolute',
    top: 19,
    right: 20
  }
});

export default App;
