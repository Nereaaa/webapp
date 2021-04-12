import React from 'react'
import{Row, Col, Button} from 'react-bootstrap'
import PropTypes from 'prop-types'
import Collapsible from 'react-collapsible';
import '../Pedido/Pedido.css'
class Pedido extends React.Component {

    static propTypes = {
        idb: PropTypes.string.isRequired,
        nombreProducto: PropTypes.array.isRequired,
        cantidadProducto: PropTypes.array.isRequired,
        nombre: PropTypes.string.isRequired,
        apellidos: PropTypes.string.isRequired,
        precio: PropTypes.number.isRequired,
        email: PropTypes.string.isRequired,
        direccion: PropTypes.string.isRequired,
        fecha: PropTypes.string.isRequired,
        onDelete: PropTypes.func.isRequired
       

    };
    render() {
        const {nombre, idb, nombreProducto, cantidadProducto, apellidos, precio, email, direccion, fecha, onDelete} = this.props
        const formatoFecha = new Date(fecha).toLocaleString()
        let comprador = 'Pedido de: ' + nombre + ' ' + apellidos;
        let fechaPedido = ' Fecha: ' + formatoFecha;
        let pedido = comprador + ' ' + fechaPedido;
        
      
        return(           
            <Collapsible trigger={pedido} className="item-pedido">
                <Row>
                {'__'}Referencia del pedido : {idb} 
                </Row>
                <Row>
                {'__'}Productos comprados : {nombreProducto.join('-')} 
                </Row>
                <Row>
                {'__'}Unidades : {cantidadProducto.join('-')}
                </Row>
                <Row>
                {'__'}Total : {precio} €   
                </Row>
                <Row>
                {'__'}Email de contacto : {email} 
                </Row>
                <Row>
                {'__'}Dirección de entrega del pedido : {direccion}
                </Row>
                <Row>
                    <Col sm="8"/>
                    <Col sm="4">
                        <Button variant="secondary" onClick={onDelete} >Eliminar Pedido</Button>
                    </Col>
                </Row>
               
                
               
            </Collapsible>

        );
    }
}

export default Pedido




