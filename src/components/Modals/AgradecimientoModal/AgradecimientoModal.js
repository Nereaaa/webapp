import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button} from 'react-bootstrap'



class AgradecimientoModal extends React.Component {


    static propTypes = {
        Agradecimiento_Modal: PropTypes.bool.isRequired,
        OcultarAgradecimiento_Modal: PropTypes.func.isRequired,
    }

    render() {

        return(
            <Modal show={this.props.Agradecimiento_Modal} onHide={this.props.OcultarConfirmarPedido_Modal}>
                <Modal.Header closeButton>
                    <Modal.Title>Pedido realizado con éxito</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Beauty Up le agradece su confianza. Recibirá un correo con los detalles de su pedido. ¡¡Muchas gracias!!
                    </p>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={this.props.OcultarAgradecimiento_Modal}>
                    Realizar un nuevo pedido
                </Button>
                </Modal.Footer>
            </Modal>
        )
    }

}

export default AgradecimientoModal