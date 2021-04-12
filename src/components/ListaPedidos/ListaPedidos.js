import React from 'react'
import PropTypes from 'prop-types'
import Pedido from '../Pedido/Pedido'
import {Accordion} from "react-bootstrap";

class ListaPedidos extends React.Component {

    static propTypes = {
        cantidadProducto: PropTypes.array.isRequired,
        nombreProducto: PropTypes.array.isRequired,
        precioUnidad: PropTypes.array.isRequired,
        pedidos: PropTypes.array.isRequired,
        email: PropTypes.string.isRequired,
        borrarPedidoModal: PropTypes.func.isRequired
    };

    render() {

        const {pedidos, cantidadProducto, email, borrarPedidoModal} = this.props

        return(

            <ul className='list-group' style={{padding: 20}}>
                
                {pedidos.length === 0 &&
                    <h2>Todavía no has realizado ningún pedido</h2>
                }
                {console.log(pedidos.length)}
                {pedidos.map((pedido, indx) => {
                    if(cantidadProducto[indx] !== 0){
                    return(
                        
                        <Accordion>
                          
                            <li key={pedido.idb} className='list-group-item'>
                                <Pedido
                                    id={indx}
                                    key={pedido.idb}
                                    nombre={pedido.nombre}
                                    apellidos={pedido.apellidos}
                                    precio={pedido.precio}
                                    email={email}
                                    idb={pedido.idb}
                                    nombreProducto={pedido.nombreProducto}
                                    cantidadProducto={pedido.cantidadProducto}
                                    direccion={pedido.direccion}
                                    fecha={pedido.fecha}
                                    onDelete={() => borrarPedidoModal(pedido.idb, indx)}
                                    />
                            </li>
                        </Accordion>
                    );
                    }
                })}
          
            </ul>
        )
    }
}

export default ListaPedidos