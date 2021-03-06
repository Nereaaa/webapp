import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Modal, Button, Form} from 'react-bootstrap'
import axios from 'axios';



class FormularioModal extends React.Component {

    state = {
        validado: false,
        nombre: '',
        apellidos: '',
        direccion: ''
    }
    

    static propTypes = {
        productos: PropTypes.array.isRequired,
        cantidadProducto: PropTypes.array.isRequired,
        Formulario_Modal: PropTypes.bool.isRequired,
        MostrarAgradecimiento_Modal: PropTypes.func.isRequired,
        OcultarFormulario_Modal: PropTypes.func.isRequired,
        totalPagar: PropTypes.number.isRequired,
        userId: PropTypes.string
    }

    

    handleSubmit = async(event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        this.setState({
            validado: true
        })
        if(this.state.nombre !== '' && 
            this.state.apellidos !== '' &&
            this.state.direccion !== ''){
                const data = {
                    nombre: this.state.nombre,
                    apellidos: this.state.apellidos,
                    direccion: this.state.direccion,
                    fecha: new Date(),
                    precio: this.props.totalPagar,
                    nombreProducto:
                    this.props.productos.map((producto,id) => {
                        if(this.props.cantidadProducto[id] !== 0){
                            return(producto.nombre);}}),
                    cantidadProducto:this.props.productos.map((producto,id) => {
                        if(this.props.cantidadProducto[id] !== 0){
                            return(this.props.cantidadProducto[id]);}}),
                  
                   
                }
                axios.post(`https://webapp-4e0f2-default-rtdb.firebaseio.com/pedidos/${this.props.userId}.json`, data).then(() => {
                        this.props.MostrarAgradecimiento_Modal()
                    }
                )
                
        }
    };

    render() {

        return(
            <Modal show={this.props.Formulario_Modal} onHide={this.props.OcultarFormulario_Modal}>
                <Modal.Header closeButton>
                    <Modal.Title>Informaci??n adicional del pedido</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form noValidate validated={this.state.validado} onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Nombre y apellidos </Form.Label>
                        <Row>
                            <Col>
                            <Form.Control required type="text" placeholder="Nombre" onChange={(event) => this.setState({nombre: event.target.value})}/>
                            </Col>
                            <Col>
                            <Form.Control required type="text" placeholder="Apellidos" onChange={(event) => this.setState({apellidos: event.target.value})}/>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group controlId="formBasicAddress">
                        <Form.Label>Direcci??n</Form.Label>
                        <Form.Control type="text" required placeholder="Introduce tu direcci??n" onChange={(event) => this.setState({direccion: event.target.value})}/>
                        <Form.Text className="text-muted">
                            El env??o se realizar?? a esta direcci??n.
                        </Form.Text>
                    </Form.Group>
                </Form>
                <Button variant="secondary" className="mr-3" onClick={this.props.OcultarFormulario_Modal}>
                    Cancelar
                    </Button>
                    <Button variant="primary" onClick={this.handleSubmit}>
                        Finalizar Pedido
                    </Button>
                </Modal.Body>
            </Modal>
        )
    }

}

export default FormularioModal