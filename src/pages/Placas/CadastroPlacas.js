import React, { Component } from 'react';
import Axios from 'axios';
import Url from '../../services/api';
import MenuNav from '../../components/Menu/MenuNavegacao';
import '../../assets/css/GeralT.css';

import {
    Card,
    Table,
    Row,
    Col,
    Container,
    Form,
    Button
} from 'react-bootstrap';

export default class CadastroPlaca extends Component {
    constructor(event) {
        super(event)

        this.state = {
            id: '',
            codigo: '',
            situacao: '',
            listaPlacas: []
        }
    }

    componentDidMount() {
        this.atualizaListaPlacas();
    }

    atualizaListaPlacas() {
        Axios.get(Url + "Placas")
            .then(data => {
                this.setState({ listaPlacas: data.data })
                console.log(this.state.listaPlacas)
            })
            .catch(error => {
                console.log(error)
            })
    }

    cadastrarPlaca(event) {
        event.preventDefault();

        let list = {
            Codigo: this.state.codigo,
            Situacao: this.state.situacao
        }

        Axios.post(Url + "Placas", list, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('Cerberus-chave-autenticacao'),
                'Content-Type': 'application/json'
            }
        })
            .then(data => {
                console.log(data.data);
                alert("Placa Cadastrada");
            })
            .catch(erro => {
                console.log(erro);
                alert("Placa não cadastrada");
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

                                        Cadastrar Usuario
                                    </Card.Header>
                                    <Card.Body>
                                        <Form onSubmit={this.cadastrarPlaca.bind(this)}>
                                            <Row className="d-flex justify-content-around mr-2 ml-2 text-left" >
                                                <Form.Group as={Col} className="">
                                                    <Form.Label className="text-dark">Codigo</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        onChange={this.atualizaEstado.bind(this)}
                                                        value={this.state.codigo}
                                                        name="codigo"
                                                        className="cadastro__input"
                                                        placeholder="insira o codigo da placa" />
                                                </Form.Group>
                                                <Form.Group as={Col} className="">
                                                    <Form.Label className="text-dark">Situação</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        onChange={this.atualizaEstado.bind(this)}
                                                        value={this.state.situacao}
                                                        name="situacao"
                                                        className="cadastro__input"
                                                        placeholder="insira o estado da placa" />
                                                </Form.Group>
                                            </Row>
                                            <Row className="d-flex flex-row-reverse">
                                                <Button
                                                    variant="primary" 
                                                    className="b-linx m-3"
                                                    onClick={this.cadastrarPlaca}
                                                >Castrar</Button>
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
                                                    <th>Codigo</th>
                                                    <th>Situação</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.listaPlacas.map(function (element) {
                                                        return (
                                                            <tr key={element.id}>
                                                                <td>{element.codigo}</td>
                                                                <td>{element.situacao}</td>
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
            // <div>
            //     <form onSubmit={this.cadastrarPlaca.bind(this)}>
            //     <input type="text"
            //         onChange={this.atualizaEstado.bind(this)}
            //         value={this.state.codigo}
            //         name="codigo"
            //         className="cadastro__input"
            //         placeholder="insira o codigo da placa" />

            //     <br />
            //     <input type="text"
            //         onChange={this.atualizaEstado.bind(this)}
            //         value={this.state.situacao}
            //         name="situacao"
            //         className="cadastro__input"
            //         placeholder="insira o estado da placa" />

            //     <br />
            //     <button className="cadastro__btnCadastro">Cadastrar</button>
            //     </form>
            // </div>
        )
    }
}