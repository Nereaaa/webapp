import React from 'react'
import PropTypes from 'prop-types'
import Producto from '../Producto/Producto'
import '../Producto/Producto.css'
class ListaProductos extends React.Component {

    static propTypes = {
        productos: PropTypes.array.isRequired,
        cantidadProducto: PropTypes.array.isRequired,
        clickAnadir: PropTypes.func.isRequired,
        clickQuitar: PropTypes.func.isRequired
    }

    render() {
        
        const {productos, cantidadProducto, clickAnadir, clickQuitar} = this.props

        return(
            <ul className="item-row" style={{padding: 20}}>
                {productos.map(producto => {
                    return (
                        <li key={producto.idb} className="item-product">
                            <Producto
                            key={producto.idb}
                            cantidadProducto={cantidadProducto[producto.idb]}
                            imagen={producto.imagen}
                            nombre={producto.nombre}
                            precio={producto.precio}
                            clickAnadir={() => clickAnadir(producto.idb)}
                            clickQuitar={() => clickQuitar(producto.idb)}
                            />
                        </li>
                        );
                })}
            </ul>
        )
    }
}

export default ListaProductos