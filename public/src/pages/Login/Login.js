import React, { Component } from 'react';
import Axios from 'axios';
import Logo from '../../assets/imagens/logo.png';
import Url from '../../services/api';
import '../../assets/css/GeralT.css';
import { parseJwt } from '../../services/auth';


import { Col, Row, Image, Container, Card, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Login extends Component {
    constructor() {
        super()

        this.state = {
            email: ''
            , senha: ''
        }
    }

    efetuarLogin = (event) => {
        event.preventDefault();



        localStorage.removeItem("Cerberus-chave-autenticacao");

        Axios.post(Url + 'Login', {
            email: this.state.email
            , senha: this.state.senha
        })
        .then(data => {
            // console.log(data.data);
            if (data.status === 200) {
                console.log(data.data);
                localStorage.setItem("Cerberus-chave-autenticacao", data.data.token);
                //Verifica o tipo de usuário e redireciona para a página default
                console.log(parseJwt().Role);
                if (parseJwt().Role === "Administrador") {
                    this.props.history.push("/Dashboard");
                } else {
                    this.props.history.push("/Dashboard");
                }
            }
        })
        .catch(erro => {
            this.setState({ erroMensagem: 'Email ou senha inválido' });
        })
    }

    atualizaEstadoEmail(event) {
        this.setState({ email: event.target.value })
    }

    atualizaEstadoSenha(event) {
        this.setState({ senha: event.target.value })
    }

    render() {
        return (
            <Container className="bg-linx t-w-h " fluid={true}>
                <Row >
                    <Col className="bg-linx " xs="12" lg="12">
                        <Row className="d-flex justify-content-around al-linx t-w-h">
                            <Image col="7" src={Logo} alt="Linx logotipo" id="imgLogin" className="d-flex hw-a" />
                            <Card col="5" className=" b-r-linx f-login" style={{ width: '18rem' }}>
                                <Card.Body className="d-flex  flex-column"  >
                                    <Card.Title className="f-s mb-auto">Login</Card.Title>
                                    <Form onSubmit={this.efetuarLogin.bind(this)} className="" >
                                        <Form.Group as={Col} className="brd a-l mb-2">
                                            <Form.Control
                                                type="email"
                                                className="inputLogin brd-i "
                                                placeholder="E-mail"
                                                onChange={this.atualizaEstadoEmail.bind(this)} />
                                            </Form.Group>
                                            <Form.Group as={Col} className="brd ">
                                            <Form.Control
                                                type="password"
                                                className="inputLogin brd-i "
                                                placeholder="Senha"
                                                onChange={this.atualizaEstadoSenha.bind(this)} />
                                            </Form.Group>
                                        <Button
                                            value="Login"
                                            variant="outline-success"
                                            className="bt-block b-linx m-3 text-light w-25 "
                                            onClick={this.efetuarLogin}
                                        >Login</Button>

                                    </Form>
                                </Card.Body>
                            </Card>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Login;