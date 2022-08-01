export const formaterCantidad = cantidad => {
    return Number(cantidad).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    })
}


export const generarId = () => {
    //Generar Id aleatorios
    const random = Math.random().toString(36).substring(2, 11);
    const fecha = Date.now().toString(36);
    console.log({ random, fecha });

    return random + fecha;
}


export const formatearFecha = fecha => {
    const fechaNueva = new Date(fecha);

    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }

    return fechaNueva.toLocaleDateString('es-ES', opciones)
}