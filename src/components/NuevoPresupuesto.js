import React from 'react'
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalStyle from '../styles'

const NuevoPresupuesto = ({ handleNuevoPresupuesto, presupuesto, setPresupuesto }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Definir Presupuesto</Text>
            <TextInput
                keyboardType='numeric'
                placeholder='Presupuesto Mensual!'
                placeholderTextColor="#64748b"
                style={styles.input}
                value={() => { presupuesto.toString() }}
                onChangeText={setPresupuesto}
            />

            <Pressable style={styles.boton}
                onPress={() => handleNuevoPresupuesto(presupuesto)}
            >
                <Text style={styles.botonText}>Agregar Presupuesto</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        ...globalStyle.container
    },
    label: {
        textAlign: 'center',
        fontSize: 24,
        color: '#3b82f6',
        textTransform: 'uppercase'
    },
    input: {
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 10,
        textAlign: 'center',
        marginTop: 30,
        color: '#000'
    },
    boton: {
        marginTop: 30,
        backgroundColor: '#1048a4',
        padding: 10,
        borderRadius: 10
    },
    botonText: {
        textAlign: 'center',
        color: '#fff',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }

});

export default NuevoPresupuesto