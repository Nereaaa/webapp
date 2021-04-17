import React from 'react';
import {Button, Container, Form, InputGroup} from 'react-bootstrap'
import {Redirect} from "react-router-dom";
import {FaAt, FaKey, FaUser} from 'react-icons/fa';
import axios from 'axios';
import './SignUp.css'


const INITIAL_STATE = {
    nombreusuario: '',
    email: '',
    password: '',
    repeatPassword: '',
    error: null,
    enviado: false
};

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE}
    }

    handleSubmit = (event) => {
        const authData = {
            nombreusuario: this.state.nombreusuario,
            email: this.state.email,
            password: this.state.password,
            returnSecureToken: true
        };
        event.preventDefault();
        console.log(authData);
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBdlZ8cKDwmgRSyVg7gKg_iUdV1pPd0fQM', authData)
            .then(response => {
                console.log(response)
                localStorage.setItem('token', JSON.stringify(response.data));
                this.props.setAuthentication(true, response.data);
                this.setState({ enviado: true})
            })
            .catch(err => {
                console.log(err);
                this.props.setAuthentication(false, {});
                alert('¿Quizás la contraseña es demasiado corta? Minimo 6 cáracteres.¿Quizás ya se ha registrado anteriormente con este correo?')
            });
            
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    };

    render() {
        const {
            nombreusuario,
            email,
            password,
            repeatPassword,
            error
        } = this.state;

        let redirect = null;
        if (this.state.enviado || this.props.autenticado) {
            redirect = <Redirect to='/productos' />;
        }

        const isInvalid =
            password !== repeatPassword ||
            password === '' ||
            email === '' ||
            nombreusuario === '';

        return (
            <Container className='signUpContainer_signup'>
                {redirect}
                <div className="d-flex justify-content-center h-100 pt-100">
                    <div className="signup_user_card_signup">
                        <div className="d-flex justify-content-center">
                            <div className="brand_logo_container_signup">
                                <img
                                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTVu1c5flyQ0WwCwR62FrCcohUpqZ6C3PGig&usqp=CAU'
                                    className="brand_logo_signup" alt="Logo" />
                            </div>
                        </div>
                        <div className='d-flex justify-content-center form_container_signup'>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="formBasicUserName" style={{padding: 10, color:'#ffffff'}}>
                                    <Form.Label className='inputLabels_signup'>Nombre Usuario</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend className='inputPrepend_signup'>
                                            <FaUser className='fa_signup' size={30}/>
                                        </InputGroup.Prepend>
                                        <Form.Control type="text" name="nombreusuario" value={nombreusuario} placeholder="Introduce nombre de usuario" onChange={this.handleChange} />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail" style={{padding: 10, color:'#ffffff'}}>
                                    <Form.Label className='inputLabels_signup'>Email</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend className='inputPrepend_signup'>
                                            <FaAt className='fa_signup' size={30}/>
                                        </InputGroup.Prepend>
                                        <Form.Control type="email" name="email" value={email} placeholder="Introduce un correo electrónico" onChange={this.handleChange} />
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword" style={{padding: 10, color:'#ffffff'}}>
                                    <Form.Label className='inputLabels_signup'>Contraseña</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend className='inputPrepend_signup'>
                                            <FaKey className='fa_signup' size={30}/>
                                        </InputGroup.Prepend>
                                        <Form.Control type="password" name="password" value={password} placeholder="Introduce su contraseña" onChange={this.handleChange}  />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword2" style={{padding: 10, color:'#ffffff'}}>
                                    <Form.Label className='inputLabels_signup'>Repita la contraseña</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend className='inputPrepend_signup'>
                                            <FaKey className='fa_signup' size={30}/>
                                        </InputGroup.Prepend>
                                        <Form.Control type="password" name="repeatPassword" value={repeatPassword} placeholder="Repita la contraseña" onChange={this.handleChange}  />
                                    </InputGroup>
                                </Form.Group>
                                <Button variant="danger" type="submit" disabled={isInvalid} >
                                    Registrarse
                                </Button>
                                {error && <p>{error.message}</p>}
                            </Form>
                        </div>
                    </div>
                </div>
            </Container>
        );
    }
}

export default SignUp;
