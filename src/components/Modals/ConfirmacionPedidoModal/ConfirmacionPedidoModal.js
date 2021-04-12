import React from 'react';
import PropTypes from 'prop-types';
import { Row, Modal, Button, Col} from 'react-bootstrap'

import {FaMoneyBillWave} from 'react-icons/fa';


class ConfirmacionPedidoModal extends React.Component {


    static propTypes = {
        productos: PropTypes.array.isRequired,
        cantidadProducto: PropTypes.array.isRequired,
        ConfirmarPedido_Modal: PropTypes.bool.isRequired,
        OcultarConfirmarPedido_Modal: PropTypes.func.isRequired,
        MostrarFormulario_Modal: PropTypes.func.isRequired,
        totalPagar: PropTypes.number.isRequired
    }

    render() {

        return(
            <Modal show={this.props.ConfirmarPedido_Modal} onHide={this.props.OcultarConfirmarPedido_Modal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmación del pedido</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul className='list-group'>
                        {this.props.productos.map((producto,id) => {
                            if(this.props.cantidadProducto[id] !== 0){
                                return(
                                    <li className='list-group-item'>
                                        <Row className="p-2" key={id}>
                                            <Col sm="3">
                                                <img src={producto.imagen} alt={producto.nombre} width="100%"/>
                                            </Col>
                                            <Col sm="9">
                                                <Row style={{height: '50%', marginBottom: 10}} className='justify-center'>
                                                    {producto.nombre}
                                                </Row>
                                                <Row>
                                                    <Col sm="5"className='justify-center'>
                                                        <b>Unidades: {this.props.cantidadProducto[id]}</b>
                                                    </Col>
                                                    <Col>
                                                        <b> Coste: {this.props.cantidadProducto[id]}x{producto.precio}€<br></br>
                                                        {producto.precio * this.props.cantidadProducto[id]} € </b>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </li>
                                );
                            }
                        })}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Row className="text-center float-left p-2">
                        <FaMoneyBillWave size={24} style={{paddingRight: 5}} />
                        Importe total : {this.props.totalPagar}€
                    </Row>
                    <Button variant="secondary" onClick={this.props.OcultarConfirmarPedido_Modal}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={this.props.MostrarFormulario_Modal}>
                        Continuar
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

}

export default ConfirmacionPedidoModal