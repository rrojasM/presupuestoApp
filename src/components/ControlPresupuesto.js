import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import globalStyle from '../styles'
import { formaterCantidad } from '../helpers'
import CircularProgress from 'react-native-circular-progress-indicator'

const ControlPresupuesto = ({ presupuesto, gastos }) => {

    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);
    const [porcentaje, setPorcentaje] = useState(0);

    useEffect(() => {

        //se hace el calculo de lo que se ha castado
        const totalGastado = gastos.reduce((total, gasto) => Number(gasto.cantidad) + total, 0);
        const totalDisponible = presupuesto - totalGastado;

        const nuevoPorcentaje = (
            ((presupuesto - totalDisponible) / presupuesto) * 100
        )

        console.log('NUEVO PORCENTAJE =====>', nuevoPorcentaje);
        console.log('TOTAL GASTADO =====>', totalGastado);
        console.log('TOTAL DISPONIBLE =====>', totalDisponible);


        setPorcentaje(nuevoPorcentaje)
        setGastado(totalGastado)
        setDisponible(totalDisponible);

    }, [gastos])


    return (
        <View style={styles.container}>
            <View style={styles.centerGrafica}>
                <CircularProgress
                    value={porcentaje}
                    duration={1000}
                    radius={80}
                    valueSuffix={'%'}
                    title='Gastado'
                    inActiveStrokeColor='#F5F5F5'
                    inActiveStrokeWidth={10}
                    activeStrokeColor='#3B82F6'
                    activeStrokeWidth={10}
                    titleStyle={{ fontWeight: 'bold' }}
                />
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