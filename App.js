import React, { useState } from 'react';
import {
  ScrollView,
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
import ListadoGastos from './src/components/ListadoGastos';
import { generarId } from './src/helpers';

const App = () => {
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [presupuesto, setPresupuesto] = useState(0);
  const [gastos, setGastos] = useState([]);
  const [modal, setModal] = useState(false);

  const handleNuevoPresupuesto = (presupuesto) => {
    if (Number(presupuesto) > 0) {
      console.log('El presupuesto es:', presupuesto);
      setIsValidPresupuesto(true);
    } else {
      Alert.alert('ERROR', 'El Presupuesto no puede ser 0 o un valor menor!')
    }
  }

  const handleGasto = gasto => {

    if (Object.values(gasto).includes('')) {
      console.log('HAY AL MENOS UN CAMPO VACIO');
      Alert.alert('¡Errorr!', "Todos los campos son obligatorios.");

      return;
    }

    gasto.id = generarId();
    setGastos([...gastos, gasto]);
    setModal(!modal);

    console.log({ gasto });

  }

  return (
    <View style={styles.container}>
      <ScrollView>
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

        {isValidPresupuesto && (
          <ListadoGastos
            gastos={gastos}
          />
        )}
      </ScrollView>
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
            handleGasto={handleGasto}
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
    bottom: 50,
    right: 15
  }
});

export default App;
