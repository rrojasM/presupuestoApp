import React, { useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import globalStyle from '../styles'
import { Picker } from '@react-native-picker/picker'
const Filtro = ({ setFiltro, filtro, gastos, setGastosFiltrados }) => {

    useEffect(() => {
        if (filtro === '') {
            setGastosFiltrados([])
        } else {
            const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro);
            setGastosFiltrados(gastosFiltrados);
        }
    }, [filtro])

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Filtrar Gastos</Text>

            <Picker
                selectedValue={filtro}
                onValueChange={(value) => {
                    setFiltro(value)
                }}
                style={styles.picker}
            >
                <Picker.Item label='-- SELECIONE UNA OPCIÓN --' value="" />
                <Picker.Item label='Ahorro' value="ahorro" />
                <Picker.Item label='Comida' value="comida" />
                <Picker.Item label='Casa' value="Casa" />
                <Picker.Item label='Gastos Varios' value="gastos" />
                <Picker.Item label='Ocio' value="ocio" />
                <Picker.Item label='Salud' value="salud" />
                <Picker.Item label='suscripciones' value="suscripciones" />
            </Picker>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        ...globalStyle.container,
        transform: [{ translateY: 0 }],
        marginTop: 80
    },
    label: {
        fontSize: 22,
        fontWeight: '900',
        color: '#64748b',
    },
    picker: {
        color: '#64748b',
        fontWeight:'bold'
    },
})

export default Filtro