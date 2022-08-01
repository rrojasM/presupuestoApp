import React from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import globalStyle from '../styles'
import { formaterCantidad } from '../helpers'

const ControlPresupuesto = ({ presupuesto }) => {
    return (
        <View style={styles.container}>
            <View style={styles.centerGrafica}>
                <Image style={styles.image} source={require('../img/grafico.jpg')} />
            </View>
            <View style={styles.contenedorText}>
                <Text style={styles.valorText}>
                    <Text style={styles.label}>Presupuesto:</Text>
                    {formaterCantidad(presupuesto)}
                </Text>
                <Text style={styles.valorText}>
                    <Text style={styles.label}>Disponible:</Text>
                    {formaterCantidad(presupuesto)}
                </Text>
                <Text style={styles.valorText}>
                    <Text style={styles.label}>Gastado:</Text>
                    {formaterCantidad(presupuesto)}
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