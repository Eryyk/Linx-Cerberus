import React, { Component } from 'react';
import Axios from 'axios';
import Url from '../../services/api'
import {
    Card,
    Table,
    Row,
    Col,
    Container,
    Form,
    Button
} from 'react-bootstrap';
import MenuNav from '../../components/Menu/MenuNavegacao';
import '../../assets/css/GeralT.css';
import ButtonSimples from '../../components/Button/ButtonSimples';

export default class CadastroPlaca extends Component {
    constructor(event) {
        super(event);

        this.state = {
            listaEmpresa: [],
            id: '',
            nomeFantasia: '',
            telefone: '',
            email: '',
            responsavel: ''
        }
    }

    componentDidMount() {
        this.atualizaEmpresas()
    }

    atualizaEmpresas() {
        Axios.get(Url + "empresas")
            .then(data => {
                this.setState({ listaEmpresa: data.data })
            })
            .catch(error => {
                console.log(error)
            })
    }

    efetuarCadastroEmpresa(event) {
        event.preventDefault()

        let empresa = {
            nomeFantasia: this.state.nomeFantasia,
            telefone: this.state.telefone,
            email: this.state.email,
            responsavel: this.state.responsavel
        }

        Axios.post(Url + "empresas", empresa, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('Cerberus-chave-autenticacao'),
                'Content-Type': 'application/json'
            }
        })
            .then(data => {
                console.log(data.data)
            })
            .catch(erro => {
                console.log(erro);
                alert("Empresa não cadastrada")
            });
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
                                        Cadastrar Empresa
                                    </Card.Header>
                                    <Card.Body>
                                        <Form className="cadastro__form" onSubmit={this.efetuarCadastroEmpresa.bind(this)}>
                                            <Row className="d-flex justify-content-around mr-2 ml-2 text-left" >
                                                <Form.Group as={Col} className="">
                                                    <Form.Label className="text-dark">Nome fantasia empresa</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        onChange={this.atualizaEstado.bind(this)}
                                                        value={this.state.nomeFantasia}
                                                        name="nomeFantasia"
                                                        className="cadastro__input"
                                                        placeholder="insira o nome fantasia" />
                                                </Form.Group>
                                                <Form.Group as={Col} className="">
                                                    <Form.Label className="text-dark">Telefone de contato</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        onChange={this.atualizaEstado.bind(this)}
                                                        value={this.state.telefone}
                                                        name="telefone"
                                                        className="cadastro__input"
                                                        placeholder="insira o telefone" />
                                                </Form.Group>
                                                <Form.Group as={Col} className="">
                                                    <Form.Label className="text-dark">E-mail de contato</Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        onChange={this.atualizaEstado.bind(this)}
                                                        value={this.state.email}
                                                        name="email"
                                                        className="cadastro__input"
                                                        placeholder="insira o email" />
                                                </Form.Group>
                                            </Row>
                                            <Row className="d-flex justify-content-between mr-2 ml-2">
                                                <Form.Group className="col-4">
                                                    <Form.Label className="text-dark">Nome Responsavel</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        onChange={this.atualizaEstado.bind(this)}
                                                        value={this.state.responsavel}
                                                        name="responsavel"
                                                        className="cadastro__input"
                                                        placeholder="insira o responsavel" />
                                                </Form.Group>

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

                                        Empresas
                                    </Card.Header>
                                    <Card.Body>
                                        <Table responsive>
                                            <thead>
                                                <tr>
                                                    <th>Fantasia</th>
                                                    <th>Telefone</th>
                                                    <th>E-amil</th>
                                                    <th>Responsavel</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.listaEmpresa.map(function (element) {
                                                        return (
                                                            <tr key={element.id}>
                                                                <th>{element.nomeFantasia}</th>
                                                                <th>{element.telefone}</th>
                                                                <th>{element.email}</th>
                                                                <th>{element.responsavel}</th>
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


        )
    }
}