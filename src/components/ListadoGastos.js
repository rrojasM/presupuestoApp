import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Gasto from './Gasto'
const ListadoGastos = ({ gastos }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Gastos</Text>

            {gastos.length === 0 ? <Text style={styles.noGastos}>No hay Gastos</Text>
                : gastos.map(gasto => (
                    <Gasto
                        key={gasto.id} 
                        gasto={gasto}
                    />
                )
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 70,
        marginBottom:100
    },
    titulo: {
        color: '#64748b',
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '700',
        marginTop:20
    },
    noGastos:{
        marginTop:20,
        marginVertical:20,
        textAlign:'center',
        fontSize:20,
        color: '#64748b',
    }
})

export default ListadoGastos