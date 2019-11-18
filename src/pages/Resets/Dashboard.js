import React, { Component } from 'react';
import Axios from "axios";
import Grafico from './Grafico/Grafico';
import '../../assets/css/GeralT.css';
import Url from '../../services/api';
import MenuNav from '../../components/Menu/MenuNavegacao';
import MenuNavComum from '../../components/Menu/MenuNavegacaoComum';
import { parseJwt } from '../../services/auth';


import CardSimples from '../../components/Cards/CardSimples';
import { Card, Table, Row, DropdownButton, Dropdown, Col, Container, CardDeck, Form, FormGroup, Button, Nav } from 'react-bootstrap';

export default class CadastroPlaca extends Component {
    constructor(event) {
        super(event);

        this.state = {
            id: '',
            placaId: '',
            enderecoId: '',
            dataEntrada: '',
            tempoDesligado: '',
            tempoEntreTestes: '',
            tempoVoltarTestes: '',
            quantidadePings: '',
            ipEndereco: '',
            //listas para exibição
            listaPlacasEnderecos: [],
            listaPlacas: [],
            listaEnderecos: []
        }
    }

    componentDidMount() {
        this.listarPlacaEnderecos()
        this.listarPlacas()
        this.listarEnderecos()

    }

    listarEnderecos() {
        Axios.get(Url + "Enderecos", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('Cerberus-chave-autenticacao'),
                'Content-Type': 'application/json'
            }
        })
            .then(data => {
                console.log(data.data)
            })
    }
    listarPlacas() {
        Axios.get(Url + "Placas", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('Cerberus-chave-autenticacao'),
                'Content-Type': 'application/json'
            }
        })
            .then(data => {
                console.log(data.data)
            })
    }

    listarPlacaEnderecos() {
        Axios.get(Url + "PlacaEndereco", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('Cerberus-chave-autenticacao'),
                'Content-Type': 'application/json'
            }
        })
            .then(data => {
                console.log(data.data)
            })
    }

    render() {
        return (
            <Container fluid={true}>
                <Row>
                    <Col xs="3" lg="2" className="p-0">
                        {/* if (parseJwt().Role === "Administrador") { */}
                            <MenuNav></MenuNav>
                        {/* }else{
                            <MenuNavComum></MenuNavComum>
                        } */}

                    </Col>

                    <Col xs="9" lg="10" className="p-3 ">
                        <Row>
                            <Card.Body>
                                <CardDeck className="bdt-linx">
                                    <CardSimples title="Total Resets" />
                                    <CardSimples title="Ultimo Resets" />
                                    <CardSimples title="Alertas" />
                                </CardDeck>
                            </Card.Body>
                        </Row>
                        <Row className="p-0">

                            <Col xs="7" lg="8">
                                <Card className="bdm-linx b-r-linx f-linx">
                                    <Card.Header className="bg-linx bt-r-linx">
                                        Resets
                                    </Card.Header>
                                    <Card.Body>
                                        <Grafico />
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs="5" lg="4">
                                <Card className="bdm-linx b-r-linx f-linx">
                                    <Card.Header className="bg-linx bt-r-linx">
                                        Ultimos Resets
                                    </Card.Header>
                                    <Card.Body>
                                        <Table responsive>
                                            <thead>
                                                <tr>
                                                    <th>Local</th>
                                                    <th>Codigo</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.listaPlacasEnderecos.map(function (placaEndereco) {
                                                        return (
                                                            <tr key={placaEndereco.id}>
                                                                <td>{placaEndereco.placaId.codigo}</td>
                                                                <td>{placaEndereco.enderecoId.logradouro}</td>
                                                            </tr>
                                                        );
                                                    })
                                                }
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                        <Row className="mt-4 p-0">
                            <Col xs="12" lg="12">
                                <Card className="f-linx b-r-linx">
                                    <Card.Header className="bg-linx bt-r-linx d-flex justify-content-between">

                                        <div className="" >Resets</div>

                                        <Nav className="j-c-e" activeKey="/home">
                                            <Nav.Item>
                                                <Form inline>
                                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0 justify-content-end bg-linx">
                                                        <DropdownButton id="dropdown-basic-button" title="Estado" className="bg-linx">

                                                        </DropdownButton>
                                                    </FormGroup>
                                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0 bg-linx">
                                                        <DropdownButton id="dropdown-basic-button" title="Cidade" className="bg-linx">

                                                        </DropdownButton>
                                                    </FormGroup>
                                                </Form>
                                            </Nav.Item>

                                        </Nav>
                                    </Card.Header>
                                    <Card.Body>
                                        <Table responsive>
                                            <thead>
                                                <tr>
                                                    <th>Codigo</th>
                                                    <th>Local</th>
                                                    <th>Ultimo Reset</th>
                                                    <th>Quantidade de Resets</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tbody>
                                                    {
                                                        this.state.listaPlacasEnderecos.map(function (placaEndereco) {
                                                            return (
                                                                <tr key={placaEndereco.id}>
                                                                    <td>{placaEndereco.placaId.codigo}</td>
                                                                    <td>{placaEndereco.enderecoId.logradouro}</td>
                                                                </tr>
                                                            );
                                                        })
                                                    }
                                                </tbody>
                                            </tbody>
                                        </Table>

                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}