import React, { useState, useEffect } from 'react'
import {
    Text, SafeAreaView, View,
    TextInput, StyleSheet, Pressable, Keyboard, TouchableHighlight
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import globalStyle from '../styles'

const FormularioGasto = ({ setModal, handleGasto, setGasto, gasto, eliminarGasto }) => {

    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');
    const [id, setId] = useState('');
    const [fecha, setFecha] = useState()


    useEffect(() => {
        if (gasto?.nombre) {
            setNombre(gasto.nombre);
            setCantidad(gasto.cantidad);
            setCategoria(gasto.categoria);
            setId(gasto.id);
            setFecha(gasto.fecha)
        }
    }, [gasto])


    return (
        <SafeAreaView style={styles.container}>


            <TouchableHighlight onPress={() => { Keyboard.dismiss() }}>
                <React.Fragment>
                    <View style={styles.contenedorBotones}>
                        <Pressable
                            onLongPress={() => {
                                setModal(false);
                                setGasto({});
                            }}
                            style={[styles.btn, styles.btnCancelar]}>
                            <Text style={styles.btnText}>Cancelar</Text>
                        </Pressable>

                        {
                            //si esta lleno estamos editando
                            !!id && (
                                <Pressable
                                    onLongPress={() => eliminarGasto(id)}
                                    style={[styles.btn, styles.btnEliminar]}
                                >
                                    <Text style={styles.btnText}>Eliminar</Text>
                                </Pressable>
                            )
                        }

                    </View>

                    <View style={styles.formulario}>
                        <Text style={styles.titulo}>
                            {gasto?.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}
                        </Text>
                        <View style={styles.campo}>
                            <Text style={styles.label}>Nombre Gasto</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='Nombre del Gasto. Ej. Comida'
                                placeholderTextColor='#C8C8C8'
                                value={nombre}
                                onChangeText={setNombre}
                            />
                        </View>
                        <View style={styles.campo}>
                            <Text style={styles.label}>Cantidad Gasto</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='Cantidad del Gasto. Ej. 300'
                                keyboardType='numeric'
                                placeholderTextColor='#C8C8C8'
                                value={cantidad}
                                onChangeText={setCantidad}

                            />
                        </View>

                        <View style={styles.campoPicker}>
                            <Text style={styles.label}>Categoria Gasto</Text>
                            <Picker
                                selectedValue={categoria}
                                onValueChange={(itemValue) => {
                                    setCategoria(itemValue)
                                }}
                                style={styles.picker}
                            >
                                <Picker.Item label='-- SELECIONE UNA OPCIÓN --' value="" />
                                <Picker.Item label='Ahorro' value="ahorro" />
                                <Picker.Item label='Comida' value="comida" />
                                <Picker.Item label='Casa' value="casa" />
                                <Picker.Item label='Gastos Varios' value="gastos" />
                                <Picker.Item label='Ocio' value="ocio" />
                                <Picker.Item label='Salud' value="salud" />
                                <Picker.Item label='suscripciones' value="suscripciones" />

                            </Picker>
                        </View>

                        <Pressable
                            onPress={() => handleGasto({ nombre, cantidad, categoria, id, fecha })}
                            style={styles.btnSubmit}>
                            <Text style={styles.btnText}>
                                {gasto?.nombre ? 'Guardar Cambios Gasto' : 'Agregar Gasto'}
                            </Text>
                        </Pressable>
                    </View>

                </React.Fragment>
            </TouchableHighlight>
        </SafeAreaView>




    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0E4476',
        flex: 1
    },
    formulario: {
        ...globalStyle.container
    },
    titulo: {
        textAlign: 'center',
        color: '#000',
        fontSize: 30,
        marginBottom: 30,
        color: '#64748b'
    },
    campo: {
        marginVertical: 10
    },
    campoPicker: {
        marginVertical: 10,
        alignContent: 'center'
    },
    label: {
        color: '#64748b',
        textTransform: 'uppercase',
        fontSize: 20,
        fontWeight: 'bold'
    },
    input: {
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        color: '#64748b'
    },
    picker: {
        color: '#64748b',
    },
    btnSubmit: {
        backgroundColor: '#2786FF',
        padding: 10,
        marginTop: 20,
        borderRadius: 5
    },
    btnText: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    btnCancelar: {
        backgroundColor: '#C80000',
        /*   padding: 10,
          marginTop: 30,
          marginHorizontal: 10, */

    },
    btnTextCancelar: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center'
    },
    btn: {
        padding: 10,
        marginTop: 30,
        marginHorizontal: 10,
        borderRadius: 5,
        flex: 1
    },
    btnEliminar: {
        backgroundColor: 'red'
    },
    btnText: {
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#FFF'

    },
    contenedorBotones: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default FormularioGasto