import React from 'react';
import {Container} from 'react-bootstrap'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import ListaPedidos from "../components/ListaPedidos/ListaPedidos";
import ConfirmacionBorrarPedidoModal from "../components/Modals/ConfirmacionBorrarPedidoModal/ConfirmacionBorrarPedidoModal";
import {Redirect} from "react-router-dom";
import Header from "../components/Header/Header";


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Pedidos extends React.Component {
    state = {
        productos: [],
        cantidadProducto: [],
        pedidos: [],
        QuitarProducto_Snackbar: false,
        ConfirmarBorrarPedido_Modal: false,
        deleteIndex: null,
        deleteId: null
    }

    borrarPedido = (id, index) => {
        axios.delete(`https://webapp-4e0f2-default-rtdb.firebaseio.com/pedidos/${this.props.userId}/${id}.json`).then(() => {
            this.setState({
                QuitarProducto_Snackbar: true
            });
            setTimeout(() => {
                let newPedidos = [...this.state.pedidos]
                newPedidos.splice(index,1)
                this.setState({
                    pedidos: newPedidos,
                    QuitarProducto_Snackbar: false,
                    ConfirmarBorrarPedido_Modal: false
                })
            },2000)
        })
    };

    MostrarConfirmarBorrarPedido_Modal = (id, index) => {
        this.setState({
            ConfirmarBorrarPedido_Modal: true,
            deleteIndex: index,
            deleteId: id
        })
    }

    OcultarConfirmarBorrarPedido_Modal = () => {
        this.setState({
            ConfirmarBorrarPedido_Modal: false
        })
    }

    componentDidMount() {
        axios.get(`https://webapp-4e0f2-default-rtdb.firebaseio.com/pedidos/${this.props.userId}.json`)
            .then(response => {
                let pedidos = [];
                for (let key in response.data) {
                    pedidos.push({
                        ...response.data[key],
                        idb: key
                    });
                }
                this.setState({ pedidos: pedidos });
            }).catch(error => {
            this.setState({ error: true });
        });
    }

    render() {  
        return (
          
            <Container>
                <Header autenticado={this.props.autenticado} email={this.props.email} logout={this.props.logout}/>               
                <Container style={{padding: 20}}>
                    {!this.props.autenticado &&
                    <Redirect to='/productos' />
                    }
                    <ListaPedidos
                        productos={this.state.productos}
                        cantidadProducto={this.state.cantidadProducto}
                        pedidos={this.state.pedidos}
                        email={this.props.email}
                        borrarPedidoModal={this.MostrarConfirmarBorrarPedido_Modal}
                    />
                    <Snackbar open={this.state.QuitarProducto_Snackbar} autoHideDuration={2000}>
                        <Alert severity="error">
                            El pedido ha sido eliminado!
                        </Alert>
                    </Snackbar>
                    <ConfirmacionBorrarPedidoModal
                        deleteIndex={this.state.deleteIndex}
                        deleteId={this.state.deleteId}
                        ConfirmarBorrarPedido_Modal={this.state.ConfirmarBorrarPedido_Modal}
                        OcultarConfirmarBorrarPedido_Modal={this.OcultarConfirmarBorrarPedido_Modal}
                        borrar={this.borrarPedido}
                    />
                </Container>
            </Container>
                
        );
    }
}

export default Pedidos;