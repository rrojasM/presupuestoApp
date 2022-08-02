import React, { useState, useEffect } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import ControlPresupuesto from './src/components/ControlPresupuesto';
import Header from './src/components/Header';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';
import FormularioGasto from './src/components/FormularioGasto';
import ListadoGastos from './src/components/ListadoGastos';
import { generarId } from './src/helpers';
import Filtro from './src/components/Filtro';

const App = () => {
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [presupuesto, setPresupuesto] = useState(0);
  const [gastos, setGastos] = useState([]);
  const [modal, setModal] = useState(false);
  const [gasto, setGasto] = useState({});
  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);



  useEffect(() => {

    const obtenerPresupuestoS = async () => {
      try {
        const presupuestoS = await AsyncStorage.getItem('planificador_presupuesto') ?? 0;
        console.log('PRESUPUESTO ASYNC STORAGE', presupuestoS);

        if (presupuestoS > 0) {
          setPresupuesto(presupuesto);
          setIsValidPresupuesto(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
    obtenerPresupuestoS();
  }, [])


  useEffect(() => {
    if (isValidPresupuesto) {
      const guardarPresupuestoS = async () => {
        try {
          await AsyncStorage.setItem('planificador_presupuesto', presupuesto);
        } catch (error) {
          console.log(error)
        }
      }
      guardarPresupuestoS();
    }

  }, [isValidPresupuesto]);

  useEffect(() => {
    const obtenerGastosS = async () => {
      try {
        const gastosS = await AsyncStorage.getItem('planificador_gastos') ?? [];
        console.log(gastosS);
        setGastos(gastosS ? JSON.parse(gastosS) : []);
      } catch (error) {
        console.log(error);
      }
    }
    obtenerGastosS();
  }, [])


  useEffect(() => {

    const guardarGastosS = async () => {
      try {
        await AsyncStorage.setItem('planificador_gastos', JSON.stringify(gastos))
      } catch (error) {
        console.log(error);
      }
    }

    guardarGastosS();
  }, [gastos])



  const handleNuevoPresupuesto = (presupuesto) => {
    if (Number(presupuesto) > 0) {
      console.log('El presupuesto es:', presupuesto);
      setIsValidPresupuesto(true);
    } else {
      Alert.alert('ERROR', 'El Presupuesto no puede ser 0 o un valor menor!')
    }
  }
  const handleGasto = gasto => {

    if ([gasto.nombre, gasto.categoria, gasto.cantidad].includes('')) {
      console.log('HAY AL MENOS UN CAMPO VACIO');
      Alert.alert('¡Errorr!', "Todos los campos son obligatorios.");
      return;
    }

    if (gasto.id) {
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState);
      setGastos(gastosActualizados);
    } else {
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }

    setModal(!modal);

  }

  const eliminarGasto = id => {
    Alert.alert('¿Deseas eliminar este Gasto?', `Se eliminara gasto con id: ${id}`, [
      { text: 'No', style: 'cancel' },
      {
        text: 'Si, Eliminar', onPress: () => {
          const gastosActualizados = gastos.filter(gastoState => gastoState.id !== id)
          setGastos(gastosActualizados);
          setModal(!modal);
          setGasto({});
        }
      }
    ])
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Header />
          {isValidPresupuesto ? (
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
          <>
            <Filtro
              filtro={filtro}
              setFiltro={setFiltro}
              gastos={gastos}
              setGastosFiltrados={setGastosFiltrados}
            />

            <ListadoGastos
              gastos={gastos}
              setModal={setModal}
              setGasto={setGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />

          </>
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
            gasto={gasto}
            setGasto={setGasto}
            eliminarGasto={eliminarGasto}
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
    minHeight: 400,
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
