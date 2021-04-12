import React from 'react';
import {Button, Container, Form, InputGroup} from 'react-bootstrap'
import {Link, Redirect} from "react-router-dom";

import './Login.css'
import {FaAt, FaKey} from 'react-icons/fa';


const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
    submitted: false
};

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE}
    }

    handleSubmit = (event) => {
        const authData = {
            email: this.state.email,
            password: this.state.password,
            returnSecureToken: true
        }
        event.preventDefault();

        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAojn4pWJv-oo2I24rmVYd8cgO8VxcO9rQ', authData)
            .then(response => {
                console.log(response)
                localStorage.setItem('token', JSON.stringify(response.data));
                this.props.setAuthentication(true, response.data);
                this.setState({ submitted: true})
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    error: err
                })
                alert('Usuario o contraseña incorrecto')
                this.props.setAuthentication(false, {});
            });
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    };

    render() {
        const {
            email,
            password,
        } = this.state;

        let redirect = null;
        if (this.state.submitted || this.props.autenticado) {
            redirect = <Redirect to='/productos' />;
        }

        const isInvalid =
            password === '' ||
            email === '';

        return (
            <Container className='loginContainer'>
                {redirect}
                <div className="d-flex justify-content-center h-100 pt-100">
                    <div className="user_card">
                        <div className="d-flex justify-content-center">
                            <div className="brand_logo_container">
                                <img
                                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTVu1c5flyQ0WwCwR62FrCcohUpqZ6C3PGig&usqp=CAU'
                                    className="brand_logo" alt="Logo" />
                            </div>
                        </div>
                        <div className='d-flex justify-content-center form_container'>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="formBasicEmail" style={{padding: 10, color:'#ffffff'}}>
                                    <Form.Label className='inputLabels'>Email</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend className='inputPrepend'>
                                            <FaAt className='fa' size={30}/>
                                        </InputGroup.Prepend>
                                        <Form.Control type="email" name="email" value={email} placeholder="Introduce un correo electrónico" onChange={this.handleChange} />
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword" style={{padding: 10, color:'#ffffff'}}>
                                    <Form.Label className='inputLabels'>Contraseña</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend className='inputPrepend'>
                                            <FaKey className='fa' size={30}/>
                                        </InputGroup.Prepend>
                                        <Form.Control type="password" name="password" value={password} placeholder="Introduce su contraseña" onChange={this.handleChange}/>
                                    </InputGroup>
                                </Form.Group>
                                <Button variant="danger" type="submit" disabled={isInvalid}>
                                    Iniciar Sesión
                                </Button>
                                <p style={{fontWeight: "bold", color:'#ffffff', padding: 20}}>
                                    No tienes una cuenta? <Link to='/registro' style={{color: '#ff3d3c'}}>Registrate</Link>
                                </p>
                            
                            </Form>
                        </div>
                    </div>
                </div>
            </Container>
        );
    }
}
export default Login;
