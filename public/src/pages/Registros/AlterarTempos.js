import React, { Component } from 'react';
import Axios from 'axios';
import Url from '../../services/api';

import MenuNav from '../../components/Menu/MenuNavegacao';
import CardSimples from '../../components/Cards/CardSimples';
import Mapa from '../../components/Mapa/mapa';
import ButtonSimples from '../../components/Button/ButtonSimples';


import {
    Container,
    Card,
    Col,
    CardDeck,
    Row,
    InputGroup,
    FormControl,
    Button,
    Form,
} from 'react-bootstrap';

export default class CadastroPlaca extends Component {
    constructor() {
        super()

        this.state = {
            id: ''
            , tempoDesligado: 0
            , tempoEntreTestes: 0
            , tempoVoltarTestes: 0
            , quantidadePings: 0
            , listaPlacasEnderecos: []
            , listaPlacas: []
            , listaEnderecos: []
        }
    }

    componentDidMount() {
        this.atualizaListaPlacas();
        this.atualizaListaEnderecos();
        this.atualizaListaPlacasEnderecos();
    }

    atualizaTempoDesligado(event) {
        this.setState({ tempoDesligado: event.target.value })
    }

    atualizaTempoEntreTestes(event) {
        this.setState({ tempoEntreTestes: event.target.value })
    }

    atualizaTempoVoltarTestes(event) {
        this.setState({ tempoVoltarTestes: event.target.value })
    }

    atualizaQuantidadePings(event) {
        this.setState({ quantidadePings: event.target.value })
    }

    atualizaId(event) {
        this.setState({ id: event.target.value })
    }

    atualizaListaPlacas() {
        Axios.get(Url + "placas")
            .then(data => {
                this.setState({ listaPlacas: data.data })
                console.log(this.state.listaPlacas)
            })
            .catch(error => {
                console.log("erro placa" + error)
            })
    }

    atualizaListaEnderecos() {
        Axios.get(Url + "enderecos")
            .then(data => {
                this.setState({ listaEnderecos: data.data })
                console.log(this.state.listaEnderecos)
            })
            .catch(error => {
                console.log('erro de endereco' + error)
            })
    }

    atualizaListaPlacasEnderecos() {
        Axios.get(Url + "PlacaEndereco")
            .then(data => {
                this.setState({ listaPlacasEnderecos: data.data })
                console.log(this.state.listaPlacasEnderecos)
            })
            .catch(error => {
                console.log('erro de Registros' + error)
            })
    }

    efetuarAlteracao(event) {
        event.preventDefault();

        let cronometro = {
            id: this.state.id
            , tempoDesligado: parseInt(this.state.tempoDesligado)
            , tempoEntreTestes: parseInt(this.state.tempoEntreTestes)
            , tempoVoltarTestes: parseInt(this.state.tempoVoltarTestes)
            , quantidadePings: parseInt(this.state.quantidadePings)
        }

        console.log(cronometro);

        Axios.put(Url + 'cronometro', cronometro, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('Cerberus-chave-autenticacao'),
                'Content-Type': 'application/json'
            }
        })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        return (
            <Container fluid={true}>
                <Row>
                    <Col xs="3" lg="2">
                        <MenuNav></MenuNav>
                    </Col>

                    <Col xs="9" lg="10">
                        <Row>
                            <Card.Body>
                                <CardDeck >

                                    <CardSimples title="Placa" texto="XPTO-JHCS-234" />
                                    <CardSimples title="Condição" texto="Funcionando" />
                                    <CardSimples title="Status" texto="Ok" />
                                    <CardSimples title="Resets" texto="10" />

                                </CardDeck>
                            </Card.Body>
                        </Row>

                        <Row>
                            <Col xs="3" lg="4">

                                <Card className="f-linx b-r-linx ">
                                    <Card.Header className="bg-linx bt-r-linx d-flex justify-content-between">
                                        Cronômetro
                                    </Card.Header>
                                    <Card.Body className="text-dark">
                                        <Card.Text>
                                            UpTime - 10:10:10
                                        </Card.Text>
                                        <Card.Text>
                                            Ultima alteração - 10:10:10
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Body>
                                        <Form>
                                            <Form.Group as={Col} className="">
                                                <Form.Label className="text-dark">Tempo Desligado</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    onChange={this.atualizaTempoDesligado.bind(this)}
                                                    value={this.state.tempoDesligado}
                                                    name="tempoDesligado"
                                                    className="cadastro__input"
                                                    placeholder="insira o tempo de Desligamento()" />
                                            </Form.Group>
                                            <Form.Group as={Col} className="">
                                                <Form.Label className="text-dark">Tempo de Religamento</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    onChange={this.atualizaTempoVoltarTestes.bind(this)}
                                                    value={this.state.tempoVoltarTestes}
                                                    name="TempoVoltarTestes"
                                                    className="cadastro__input"
                                                    placeholder="insira o tempo de Religamento(Minutos)" />
                                            </Form.Group>
                                            <Form.Group as={Col} className="">
                                                <Form.Label className="text-dark">Tempo entre Testes</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    onChange={this.atualizaTempoEntreTestes.bind(this)}
                                                    value={this.state.tempoEntreTestes}
                                                    name="tempoEntreTestes"
                                                    className="cadastro__input"
                                                    placeholder="insira o tempo de Tempo voltar a Testa(Minutos)" />
                                            </Form.Group>
                                            <Form.Group as={Col} className="">
                                                <Form.Label className="text-dark">Quantidade Pings</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    onChange={this.atualizaQuantidadePings.bind(this)}
                                                    value={this.state.quantidadePings}
                                                    name="quantidadePings"
                                                    className="cadastro__input"
                                                    placeholder="insira a Quantidade de Pings(Unidade)" />
                                            </Form.Group>
                                            <Button variant="warning" className="b-linx m-3 text-light">Alterar</Button>
                                        </Form>

                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col xs="6" lg="8">
                                <Card className="f-linx b-r-linx">
                                    <Card.Header className="bg-linx bt-r-linx d-flex justify-content-between">
                                        Localização da placa
                                    </Card.Header>
                                    <Card.Body className="h-linx d-inline-block">
                                        <Row className="d-flex">
                                            <Card.Body className="d-contents text-dark">
                                                <Card.Text>
                                                    Logradouro
                                                </Card.Text>
                                                <Card.Text>
                                                    Empresa
                                                </Card.Text>
                                                <Card.Text>
                                                    Data Entrada
                                                </Card.Text>
                                                <Card.Text>
                                                    Data Saida
                                                </Card.Text>
                                            </Card.Body>

                                            <Card.Body className="map-linx p-3 pb-5  ">
                                                {/* Mapa Componentizado Localizando onde esta a placa */}
                                                <Mapa />
                                            </Card.Body>

                                        </Row>
                                    </Card.Body>

                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                {/* <Card.Footer className="text-muted" fluid>2 days ago</Card.Footer> */}
            </Container>

        )
    }
}