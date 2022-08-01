import React from 'react'
import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import { formaterCantidad } from '../helpers';
import globalStyle from '../styles';


const diccionarioIconos = {
    ahorro: require('../img/icono_ahorro.png'),
    comida: require('../img/icono_comida.png'),
    casa: require('../img/icono_casa.png'),
    gastos: require('../img/icono_gastos.png'),
    ocio: require('../img/icono_ocio.png'),
    salud: require('../img/icono_salud.png'),
    suscripciones: require('../img/icono_suscripciones.png'),

}
const Gasto = ({ gasto }) => {

    const { nombre, categoria, cantidad, id } = gasto;
    return (
        <View style={styles.container}>
            <View style={styles.contenido}>
                <View style={styles.contenedorImagen}>
                    <Image
                        style={styles.imagen}
                        source={diccionarioIconos[categoria]}
                    />
                    <View style={styles.contenedorTexto}>
                        <Text style={styles.categoria}>{categoria}</Text>
                        <Text style={styles.nombre}>{nombre}</Text>
                    </View>
                </View>
                <Text style={styles.cantidad}>{formaterCantidad(cantidad)}</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        ...globalStyle.container,
        marginBottom: 10
    },
    contenido: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    contenedorImagen: {
        flexDirection:'row',
        alignItems:'center',
        marginRight:20,
        flex:1
    },
    imagen: {
        width: 80,
        height: 80
    },
    contenedorTexto: {
        flex:1,
    },
    categoria: {
        color:'#94a3b8',
        fontSize: 18,
        fontWeight:'bold',
        textTransform:'uppercase',
        marginBottom:5,
        left:10
    },
    nombre: {
        fontSize:22,
        color:'#64748b',
        marginBottom:5,
        left:10
    },
    cantidad:{
        fontSize:20,
        fontWeight:'700',
        color:'#64748b',
    }

});

export default Gasto