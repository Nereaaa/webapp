import React from 'react';
import {Container, Row, Col} from 'react-bootstrap'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';

import {TiShoppingCart} from 'react-icons/all';
import ListaProductos from '../components/ListaProductos/ListaProductos';
import ConfirmacionPedidoModal from '../components/Modals/ConfirmacionPedidoModal/ConfirmacionPedidoModal';
import FormularioModal from '../components/Modals/FormularioModal/FormularioModal';
import AgradecimientoModal from '../components/Modals/AgradecimientoModal/AgradecimientoModal';
import Header from "../components/Header/Header";
import {AppContext} from "../App";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const initialState = {
    productos: [],
    cantidadProducto: [],
    totalPagar: 0,
    AnadirProducto_Snackbar: false,
    QuitarProducto_Snackbar: false,
    NoHayProductos_Snackbar: false,
    VaciarCarrito_Snackbar: false,
    ConfirmarPedido_Modal: false,
    Formulario_Modal: false,
    Agradecimiento_Modal: false
};

class Productos extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState
    }
    
    anadirProducto = (id) => {
       
        let precioProducto = this.state.productos[id].precio;
        let anadirPago = this.state.totalPagar + precioProducto;

        let cantidadProducto = [...this.state.cantidadProducto];
        cantidadProducto[id] ++;
        this.setState({
            cantidadProducto: cantidadProducto,
            AnadirProducto_Snackbar: true,
            totalPagar: anadirPago
        });
        setTimeout(() => {
            this.setState({
                AnadirProducto_Snackbar: false
            })
        },2500)
    };

    quitarProducto = (id) => {
        let precioProducto = this.state.productos[id].precio;
        let anadirPago = this.state.totalPagar - precioProducto;
        let cantidadProducto = [...this.state.cantidadProducto];
        if (cantidadProducto[id] > 0) {
            cantidadProducto[id] --;
            this.setState({
                cantidadProducto: cantidadProducto,
                QuitarProducto_Snackbar: true,
                totalPagar: anadirPago
            });
            setTimeout(() => {
                this.setState({
                    QuitarProducto_Snackbar: false
                })
            },2500)
        }
    };

    vaciarCarrito = () => {
        const nuevoContador = new Array(this.state.cantidadProducto.length).fill(0)
        this.setState({
            totalPagar: 0,
            cantidadProducto: nuevoContador,
            VaciarCarrito_Snackbar: true
            
        });
        setTimeout(() => {
            this.setState({
                VaciarCarrito_Snackbar: false
            })
        }, 2500)
    }

    
    realizarPedido = () => {
        if (!this.props.autenticado){
            this.props.history.push('/login');
        }else{
            if (this.state.totalPagar === 0) {
                this.setState({
                    NoHayProductos_Snackbar: true
                });
                setTimeout(() => {
                    this.setState({
                        NoHayProductos_Snackbar: false
                    })
                }, 2500)
                
            }else{
                this.setState({
                    ConfirmarPedido_Modal: true
                });
            }
        }
        
    }

    OcultarConfirmarPedido_Modal = () => {
        this.setState({
            ConfirmarPedido_Modal: false
        })
    };

    MostrarFormulario_Modal = () => {
        this.setState({
            ConfirmarPedido_Modal: false,
            Formulario_Modal: true
            
        })
    };

    OcultarFormulario_Modal = () => {
        this.setState({
            Formulario_Modal: false
        })
    };

    MostrarAgradecimiento_Modal = () => {
        this.setState({
            Formulario_Modal: false,
            Agradecimiento_Modal: true
        })
    };

    OcultarAgradecimiento_Modal = async () => {
        await this.setState({
            Agradecimiento_Modal: false
        })

    };

    componentDidMount() {
            axios.get('https://webapp-4e0f2-default-rtdb.firebaseio.com/productos.json')
            .then(response => {
                let productos = [];
                let cantidadProducto = [];
                for (let key in response.data) {
                    productos.push({
                        ...response.data[key],
                        idb: key
                    });
                    cantidadProducto.push(0);
                }
                this.setState({ productos: productos, cantidadProducto: cantidadProducto });
            }).catch(error => {
                this.setState({ error: true });
            });
    }

    render() {

        return (
            <AppContext.Consumer>
                {({app}) => (
                <Container>
                    <Header autenticado={this.props.autenticado} logout={this.props.logout} email={this.props.email}/>
                    <Container style={{padding: 20}}>
                        <Row className="justify-content-center align-vertical-center">
                            <Col></Col>
                            <Col>
                                <button className="btn btn-danger" style={{color:'black', background:'pink'}} onClick={this.realizarPedido}> Realizar Pedido </button>
                                <button className="btn btn-danger" style={{marginLeft: 15, color:'black', background:'pink'}} onClick={this.vaciarCarrito}> Vaciar carrito</button> 
                                <TiShoppingCart size={50}/>
                                <a style={{paddingLeft:1, fontSize: 25}}> {this.state.totalPagar}€</a> 
                                <ConfirmacionPedidoModal
                                    productos={this.state.productos}
                                    cantidadProducto={this.state.cantidadProducto}
                                    ConfirmarPedido_Modal={this.state.ConfirmarPedido_Modal}
                                    MostrarFormulario_Modal={this.MostrarFormulario_Modal}
                                    OcultarConfirmarPedido_Modal={this.OcultarConfirmarPedido_Modal}
                                    totalPagar={this.state.totalPagar}
                                />
                                <FormularioModal
                                    productos={this.state.productos}
                                    cantidadProducto={this.state.cantidadProducto}
                                    Formulario_Modal={this.state.Formulario_Modal}
                                    MostrarAgradecimiento_Modal={this.MostrarAgradecimiento_Modal}
                                    OcultarFormulario_Modal={this.OcultarFormulario_Modal}
                                    totalPagar={this.state.totalPagar}
                                    userId={app.state.authData.localId}
                                />
                                <AgradecimientoModal
                                    Agradecimiento_Modal={this.state.Agradecimiento_Modal}
                                    OcultarAgradecimiento_Modal={this.OcultarAgradecimiento_Modal}
                                /> 
                            </Col>
                        
                        </Row>
                        <ListaProductos
                            productos={this.state.productos}
                            cantidadProducto={this.state.cantidadProducto}
                            clickAnadir={this.anadirProducto}
                            clickQuitar={this.quitarProducto}
                        />
                        <Snackbar open={this.state.VaciarCarrito_Snackbar} autoHideDuration={2500}>
                            <Alert severity="warning">
                                Vaciando carrito!
                            </Alert>
                        </Snackbar>
                        <Snackbar open={this.state.NoHayProductos_Snackbar} autoHideDuration={2500}>
                            <Alert severity="warning">
                                No hay productos en el carrito!
                            </Alert>
                        </Snackbar>
                        <Snackbar open={this.state.AnadirProducto_Snackbar} autoHideDuration={2500}>
                            <Alert severity="success">
                                Producto añadido al carrito!
                            </Alert>
                        </Snackbar>
                        <Snackbar open={this.state.QuitarProducto_Snackbar} autoHideDuration={2500}>
                            <Alert severity="error">
                                Producto eliminado del carrito!
                            </Alert>
                        </Snackbar>
                    </Container>
                </Container>
                    )}
            </AppContext.Consumer>
        );
    }
}

export default Productos;