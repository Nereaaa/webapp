import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button} from 'react-bootstrap'



class ConfirmacionBorrarPedidoModal extends React.Component {


    static propTypes = {
        deleteId: PropTypes.string,
        deleteIndex: PropTypes.number,
        ConfirmarBorrarPedido_Modal: PropTypes.bool.isRequired,
        OcultarConfirmarBorrarPedido_Modal: PropTypes.func.isRequired,
        borrar: PropTypes.func.isRequired
    };

    render() {

        const {deleteId, deleteIndex, ConfirmarBorrarPedido_Modal, OcultarConfirmarBorrarPedido_Modal, borrar} = this.props
        return(
            <Modal show={ConfirmarBorrarPedido_Modal} onHide={OcultarConfirmarBorrarPedido_Modal}>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar Pedido</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3> ¿Está seguro de que desea eliminar el pedido? </h3>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={OcultarConfirmarBorrarPedido_Modal}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={() => borrar(deleteId,deleteIndex)}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

}

export default ConfirmacionBorrarPedidoModal