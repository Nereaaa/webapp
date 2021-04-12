import React from 'react'
import{Row, Col} from 'react-bootstrap'
import PropTypes from 'prop-types'

import './Producto.css'

class Producto extends React.Component {

    static propTypes = {
        cantidadProducto: PropTypes.number.isRequired,
        imagen: PropTypes.string.isRequired,
        nombre: PropTypes.string.isRequired,
        clickAnadir: PropTypes.func.isRequired,
        precio: PropTypes.number.isRequired,
        clickQuitar: PropTypes.func.isRequired
    }

    render() {
        const {imagen, nombre, cantidadProducto, clickAnadir, clickQuitar, precio} = this.props
        return(
            <Row >
                <Col sm="4" className="list-group">
                    <Row style={{width: '100%'}}>
                        <ul className='item-info' style={{width: '100%'}}>   
                            <li className="item-nombre">
                                {nombre}
                            </li>
                            <li className='item-precio'> 
                                {precio}€
                            </li>
                           
                        </ul>
                    </Row>
                </Col>
                <Col sm="4" className="list-group">
                    <Row style={{width: '100%'}}>
                        <ul className='item-group' style={{width: '100%'}}>   
                            <img className="item-imagen" src={imagen}/>
                            <li className='item-buy'>
                                <Row className="justify-content-center">
                                    <button onClick={clickQuitar} className="item-button"  style={{margin:10, width:40, height:40}}> - </button>
                                    <button onClick={clickAnadir} className="item-button" style={{margin:10, width:40, height:40}}> + </button>
                                </Row>
                            </li>
                        </ul>
                    </Row>
                </Col>
                <Col sm="4" className="list-group">
                    <Row style={{width: '100%'}}>
                        <ul className='item-info' style={{width: '100%'}}>   
                        <li className='item-unidades'> 
                                Unidades: {cantidadProducto}
                            </li>
                         
                            <li className='item-buy'> 
                                Total: {precio * cantidadProducto}€
                            </li>

                        </ul>
                    </Row>
                </Col>


               
            </Row>
        )
    }
}

export default Producto