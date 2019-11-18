import React, { Component } from 'react';
import Axios from "axios"
import Url from '../../services/api'
import MenuNav from '../../components/Menu/MenuNavegacao';
import ButtonSimples from '../../components/Button/ButtonSimples';

import {
    Card,
    Table,
    Row,
    Col,
    Container,
    Form,

} from 'react-bootstrap';

export default class CadastroPlaca extends Component {
    constructor(event) {
        super(event);

        this.state = {
            listaUsuarios: [],
            nome: ""
            ,email: ""
            ,senha: ""
            ,tipoUsuario: ""
        }
    }

    componentDidMount() {
        this.listarUsuarios()
    }

    listarUsuarios() {
        Axios.get(Url+ "usuarios", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('Cerberus-chave-autenticacao'),
                'Content-Type': 'application/json'
            }
        })
            .then(data => {
                this.setState({ listaUsuarios: data.data })
            })
            .catch(erro => console.log(erro))
    }

    efetuarCadastroUsuario(event) {
        event.preventDefault();

        let usuario = {
            Nome: this.state.nome
            , Email: this.state.email
            , Senha: this.state.senha
            , TipoUsuario: this.state.tipoUsuario
        }

        Axios.post(Url + "usuarios", usuario,
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('Cerberus-chave-autenticacao'),
                    'Content-Type': 'application/json'
                }
            })
            .then(data => {
                console.log("Usuario Cadastrado " + data.Nome);
            })
            .catch(erro => { console.log(erro);})
    }

    atualizaEstado(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        return (
            <Container fluid={true}>
                <Row>
                    <Col xs="3" lg="2">
                        <MenuNav></MenuNav>
                    </Col>
                    <Col xs="9" lg="10">
                        <Row className="mt-4">
                            <Col xs="12" lg="12">
                                <Card className="f-linx b-r-linx">
                                    <Card.Header className="bg-linx bt-r-linx d-flex justify-content-between">

                                        Cadastrar Usuario
                                    </Card.Header>
                                    <Card.Body>
                                        <Form className="cadastro__form" onSubmit={this.efetuarCadastroUsuario.bind(this)}>
                                            <Row className="d-flex justify-content-around mr-2 ml-2 text-left" >
                                                <Form.Group controlId="formBasicEmail" as={Col} className="">
                                                    <Form.Label className="text-dark">Nome do Usuario</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        onChange={this.atualizaEstado.bind(this)}
                                                        value={this.state.nome}
                                                        name="nome"
                                                        className="cadastro__input"
                                                        placeholder="insira o nome do usuario" />
                                                </Form.Group>
                                                <Form.Group controlId="formBasicPassword" as={Col} className="">
                                                    <Form.Label className="text-dark">E-mail do Usuario</Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        onChange={this.atualizaEstado.bind(this)}
                                                        value={this.state.email}
                                                        name="email"
                                                        className="cadastro__input"
                                                        placeholder="insira o email do usuario" />
                                                </Form.Group>
                                            </Row>
                                            <Row className="d-flex justify-content-around mr-2 ml-2">


                                                <Form.Group controlId="formBasicEmail" as={Col} className="">
                                                    <Form.Label className="text-dark">Senha do Usuario</Form.Label>
                                                    <Form.Control
                                                        type="password"
                                                        onChange={this.atualizaEstado.bind(this)}
                                                        value={this.state.senha}
                                                        name="senha"
                                                        className="cadastro__input"
                                                        placeholder="insira a senha do usuario" />
                                                </Form.Group>
                                                <Form.Group controlId="formBasicPassword" as={Col} className="p-0">
                                                    <Form.Group as={Col} controlId="formGridState" className="p-0">
                                                        <Form.Label className="text-dark">Tipo Usuario</Form.Label>
                                                        <Form.Control as="select" className="cadastro__select" onChange={this.atualizaEstado.bind(this)} name="tipoUsuario">
                                                            <option value="null">Selecione um tipo</option>
                                                            <option value="Administrador">Administrador</option>
                                                            <option value="Comum">Comum</option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Form.Group>
                                            </Row>

                                            <Row className="d-flex flex-row-reverse">
                                                <ButtonSimples />
                                            </Row>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col xs="12" lg="12">
                                <Card className="f-linx b-r-linx">
                                    <Card.Header className="bg-linx bt-r-linx d-flex justify-content-between">

                                        Usuarios
                                    </Card.Header>
                                    <Card.Body>
                                        <Table responsive>
                                            <thead>
                                                <tr>
                                                    <th>Nome</th>
                                                    <th>Email</th>
                                                    <th>Tipo Usuario</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.listaUsuarios.map(function (element) {
                                                        return (
                                                            <tr key={element.id}>
                                                                <th>{element.nome}</th>
                                                                <th>{element.email}</th>
                                                                <th>{element.tipoUsuario}</th>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </Table>

                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            // <div className="cadastro__body">
            //     <a href="/">inicio</a>

            //     <h1>Cadastro de Usuario</h1>

            //     <div className="cadastro__main">
            //         <form className="cadastro__form"
            //             onSubmit={this.efetuarCadastroUsuario.bind(this)}>

            //             <input type="text"
            //                 onChange={this.atualizaEstado.bind(this)}
            //                 value={this.state.nome}
            //                 name="nome"
            //                 className="cadastro__input"
            //                 placeholder="insira o nome do usuario" />

            //             <input type="email"
            //                 onChange={this.atualizaEstado.bind(this)}
            //                 value={this.state.email}
            //                 name="email"
            //                 className="cadastro__input"
            //                 placeholder="insira o email do usuario" />

            //             <input type="password"
            //                 onChange={this.atualizaEstado.bind(this)}
            //                 value={this.state.senha}
            //                 name="senha"
            //                 className="cadastro__input"
            //                 placeholder="insira a senha do usuario" />

            //             <select className="cadastro__select" onChange={this.atualizaEstado.bind(this)} name="TipoUsuario">
            //                 <option value="null">Selecione um tipo</option>
            //                 <option value="Administrador">Administrador</option>
            //                 <option value="Comum">Comum</option>
            //             </select>

            //             <button className="cadastro__btnCadastro">Cadastrar</button>
            //         </form>
            //     </div>
            // </div>
        );
    }
}