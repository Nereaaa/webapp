import React from 'react';
import {NavLink, withRouter}  from 'react-router-dom'
import {Navbar, Container, Dropdown} from 'react-bootstrap'
import {FaUserCircle, BiWon, CgPlayListCheck} from 'react-icons/all';

class Header extends React.Component {
    render() {
        const {autenticado, logout, email} = this.props
        return (
            <Container>
                <Navbar collapseOnSelect expand="sm"  variant="dark" style={{paddingRight: 45, background:'#353232'}}>
                    <Navbar.Brand href="/productos" style={{color:'#e412f9'}}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTVu1c5flyQ0WwCwR62FrCcohUpqZ6C3PGig&usqp=CAU" alt='...' height="100" width='170' style={{marginRight: 10}}/>{' '}
                        <b> Beauty Up</b>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{marginRight: 20}}/>
                    <Navbar.Collapse id="responsive-navbar-nav"  className='justify-content-center'>
                            <ul className="navbar-nav">
                                <li style={{paddingLeft: 20}}>
                                    <NavLink to='/productos' style={{color: '#f912c2'}}><BiWon size={20}/> Productos</NavLink>
                                </li>
                                {autenticado &&
                                <li style={{paddingLeft: 20}}>
                                    <NavLink to='/pedidos' style={{color:'#f912c2' }}> <CgPlayListCheck size={25} /> Mis Pedidos</NavLink>
                                </li>
                                }
                           
                            </ul>
                            <Dropdown className='ml-auto'>
                                <Dropdown.Toggle style={{color:'#000000'}} variant="secondary btn-sm"  >
                                    {!autenticado &&
                                       <FaUserCircle size={20} style={{color:'#000000'}} />  
                                    } 
                                    {email}                               
                                </Dropdown.Toggle>
                                <Dropdown.Menu > 
                                    {autenticado &&
                                        <Dropdown.Item >
                                            <li onClick={logout} >Cerrar Sesión</li>
                                        </Dropdown.Item>
                                    }
                                    {!autenticado &&
                                    <Dropdown.Item >
                                        <NavLink to='/login'> Iniciar Sesión</NavLink>
                                    </Dropdown.Item>
                                    }
                                    {!autenticado &&
                                    <Dropdown.Item>
                                        <NavLink to='/registro'> Registrarse </NavLink>
                                    </Dropdown.Item>
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                            
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        )
    }
}
Header = withRouter(Header);

export default Header;