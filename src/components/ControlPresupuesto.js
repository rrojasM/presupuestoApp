import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import globalStyle from '../styles'
import { formaterCantidad } from '../helpers'

const ControlPresupuesto = ({ presupuesto, gastos }) => {

    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);

    useEffect(() => {

        //se hace el calculo de lo que se ha castado
        const totalGastado = gastos.reduce((total, gasto) => Number(gasto.cantidad) + total, 0);
        const totalDisponible = presupuesto - totalGastado;
        setGastado(totalGastado)
        setDisponible(totalDisponible);

    }, [gastos])


    return (
        <View style={styles.container}>
            <View style={styles.centerGrafica}>
                <Image style={styles.image} source={require('../img/grafico.jpg')} />
            </View>
            <View style={styles.contenedorText}>
                <Text style={styles.valorText}>
                    <Text style={styles.label}>Presupuesto: {''}</Text>
                    {formaterCantidad(presupuesto)}
                </Text>
                <Text style={styles.valorText}>
                    <Text style={styles.label}>Disponible: {''}</Text>
                    {formaterCantidad(disponible)}
                </Text>
                <Text style={styles.valorText}>
                    <Text style={styles.label}>Gastado: {''}</Text>
                    {formaterCantidad(gastado)}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        ...globalStyle.container
    },
    centerGrafica: {
        alignItems: 'center'
    },
    image: {
        width: 150,
        height: 150
    },
    contenedorText: {
        marginTop: 50
    },
    valorText: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 10,
        color: '#000'
    },
    label: {
        fontWeight: '700',
        color: '#3b82f6'
    }

})

export default ControlPresupuesto