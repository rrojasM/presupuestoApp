import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Alert,
  Pressable,
  Image,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ControlPresupuesto from "./src/components/ControlPresupuesto";
import Header from "./src/components/Header";
import NuevoPresupuesto from "./src/components/NuevoPresupuesto";
import FormularioGasto from "./src/components/FormularioGasto";
import ListadoGastos from "./src/components/ListadoGastos";
import { generarId } from "./src/helpers";
import Filtro from "./src/components/Filtro";

const App = () => {
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [presupuesto, setPresupuesto] = useState(0);
  const [gastos, setGastos] = useState([]);
  const [modal, setModal] = useState(false);
  const [gasto, setGasto] = useState({});
  const [filtro, setFiltro] = useState("");
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect(() => {
    console.log('EJECUTANDO OBTENER PRESUPUESTO');
    const obtenerPresupuestoS = async () => {
      try {
        const presupuestoS = await AsyncStorage.getItem("planificador_presupuesto") ?? 0;
        console.log("PRESUPUESTO ASYNC STORAGE ===>", presupuestoS);

        if (presupuestoS > 0) {
          console.log('ENTRO A PRESUPUESTO =====>', presupuestoS);
          setPresupuesto(presupuestoS);
          setIsValidPresupuesto(true);
        }
      } catch (error) {
        console.log("ERROR AL OBTENER EL PRESUPUESTO", error);
      }
    };
    obtenerPresupuestoS();
  }, []);

  useEffect(() => {
    console.log('EJECUTANDO GUARDAR PRESUPUESTO...');
    if (isValidPresupuesto) {
      const guardarPresupuestoS = async () => {
        try {
          await AsyncStorage.setItem("planificador_presupuesto", presupuesto);
        } catch (error) {
          console.log("OCURRIO UN ERROR AL AGREGAR EL PRESUPUESTO", error);
        }
      };
      guardarPresupuestoS();
    }
  }, [isValidPresupuesto]);


  useEffect(() => {
    console.log('EJECUTANDO OBTENER GASTOS...');
    const obtenerGastosS = async () => {
      try {
        const gastosS = await AsyncStorage.getItem("planificador_gastos") ?? 0;
        console.log("OBTENER GASTOS ASYNC STORAGE", gastosS);
        setGastos(gastosS ? JSON.parse(gastosS) : []);
        console.log('GASTOS STORAGE ====>', gastosS);
        console.log('GASTOS STATE====>', gastos);
      } catch (error) {
        console.log('ERROR AL OBTENER GASTOS ASYNC', error);
      }
    };
    obtenerGastosS();
  }, []);

  useEffect(() => {
    console.log("EJECUTANDO GUARDAR GASTOS...");
    const guardarGastosS = async () => {
      try {
        await AsyncStorage.setItem("planificador_gastos", JSON.stringify(gastos));
      } catch (error) {
        console.log('ERROR EN GUARDAR GASTOS ASYNC', error);
      }
    };
    guardarGastosS();
  }, [gastos]);


  const handleNuevoPresupuesto = (presupuesto) => {
    if (Number(presupuesto) > 0) {
      console.log("EL PRESUPUESTO MENSUAL ES =====>", presupuesto);
      setIsValidPresupuesto(true);
    } else {
      Alert.alert("ERROR", "EL PRESUPUESTO NO PUEDE SER 0 O UN VALOR NEGATIVO!");
    }
  };

  const handleGasto = (gasto) => {
    if ([gasto.nombre, gasto.categoria, gasto.cantidad].includes("")) {
      console.log("HAY AL MENOS UN CAMPO VACIO");
      Alert.alert("ERROR", "TODOS LOS CAMPOS SON OBLIGATORIOS.");
      return;
    }

    if (gasto.id) {
      const gastosActualizados = gastos.map((gastoState) =>
        gastoState.id === gasto.id ? gasto : gastoState
      );
      setGastos(gastosActualizados);
    } else {
      //AÑADIR EL NUEVO GASTO AL STATE
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }

    setModal(!modal);
  };

  const eliminarGasto = (id) => {
    Alert.alert(
      "¿DESEA ELIMINAR ESTE GASTO?",
      'SE ELIMINARA EL GASTO',
      [
        { text: "NO", style: "cancel" },
        {
          text: "SI, ELIMINAR",
          onPress: () => {
            const gastosActualizados = gastos.filter(
              (gastoState) => gastoState.id !== id
            );
            setGastos(gastosActualizados);
            setModal(!modal);
            setGasto({});
          },
        },
      ]
    );
  };

  const clearAsyncStorage = () => {
    AsyncStorage.getAllKeys().then(keys => {
      console.log('KEYS ====>', keys);
      AsyncStorage.multiRemove(keys)
    }).then(() => console.log('SUCCESS DELETE KEYS'));
  }
  const resetApp = () => {
    Alert.alert(
      "DESEA REINICIAR EL PRESUPUESTO?",
      "ESTO ELIMINARA EL PRESUPUESTO AGREGADO JUNTO CON LOS GASTOS.",
      [
        { text: "NO", style: "cancel" },
        {
          text: "SI, ELIMINAR",
          onPress: async () => {
            try {
              clearAsyncStorage();
              setIsValidPresupuesto(false);
              setPresupuesto(0);
              setGastos([]);
            } catch (error) {
              console.log("ERROR AL REINICIAR EL PRESUPUESTO DE LA APP: ", error);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Header />
          {isValidPresupuesto ? (
            <ControlPresupuesto
              gastos={gastos}
              presupuesto={presupuesto}
              resetApp={resetApp}
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
          animationType="slide"
          visible={modal}
          onRequestClose={() => {
            setModal(!modal);
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
        <Pressable onPress={() => setModal(!modal)}>
          <Image
            style={styles.image}
            source={require("./src/img/nuevo-gasto.png")}
          />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    flex: 1,
  },
  header: {
    backgroundColor: "#3B82F6",
    minHeight: 400,
  },
  image: {
    width: 65,
    height: 65,
    position: "absolute",
    bottom: 160,
    right: 20.7,
  },
});

export default App;
