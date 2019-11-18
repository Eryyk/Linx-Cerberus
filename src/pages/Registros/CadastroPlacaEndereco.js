import React, { Component } from 'react';
import Axios from 'axios';
import Url from '../../services/api';
import {
    Card,
    Table,
    Row,
    InputGroup,
    DropdownButton,
    Col,
    Container,
    FormGroup,
    Form,
    Button

} from 'react-bootstrap';
import MenuNav from '../../components/Menu/MenuNavegacao';
import ButtonSimples from '../../components/Button/ButtonSimples';

export default class CadastroPlaca extends Component {
    constructor(event) {
        super(event)

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
            listaPlacasEnderecos: [],
            listaPlacas: [],
            listaEnderecos: []
        }
    }

    componentDidMount() {
        this.atualizaListaPlacas();
        this.atualizaListaEnderecos();
        this.atualizaListaPlacasEnderecos();
    }

    atualizaListaPlacas() {
        Axios.get(Url + "placas")
            .then(data => {
                this.setState({ listaPlacas: data.data })
                // console.log(this.state.listaPlacas)
            })
            .catch(error => {
                console.log("erro placa" + error)
            })
    }

    atualizaListaEnderecos() {
        Axios.get(Url + "enderecos")
            .then(data => {
                this.setState({ listaEnderecos: data.data })
                // console.log(this.state.listaEnderecos)
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

    cadastrarPlacaEndereco = () =>{
        let list = {
            placaId: this.state.placaId,
            enderecoId: this.state.enderecoId,
            dataEntrada: this.state.dataEntrada,
            tempoDesligado: Number(this.state.tempoDesligado),
            tempoEntreTestes: Number(this.state.tempoEntreTestes),
            tempoVoltarTestes: Number(this.state.tempoVoltarTestes),
            quantidadePings: Number(this.state.quantidadePings),
            ipEndereco: this.state.ipEndereco,
        }
        console.log()
        Axios.post(Url + "PlacaEndereco", list, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('Cerberus-chave-autenticacao'),
                'Content-Type': 'application/json'
            }
        })
            .then(data => {
                console.log(data.data);
                alert("Placa registrada");
            })
            .catch(erro => {
                console.log(erro);
                alert("Placa não registrada");
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
                                        Registrar Placas
                                    </Card.Header>
                                    <Card.Body>
                                        <Form onSubmit={this.cadastrarPlacaEndereco.bind(this)}>
                                            <Row className="d-flex text-left" >
                                                <Form.Group controlId="formBasicEmail" as={Col} className="p-0">
                                                    <Form.Group as={Col} controlId="formGridState" className="">
                                                        <Form.Label className="text-dark">Placa</Form.Label>
                                                        <Form.Control as="select" className="cadastro__select" onChange={this.atualizaEstado.bind(this)} name="placaId">
                                                            <option value={this.state.placaId}> Selecione a placa</option>
                                                            {
                                                                this.state.listaPlacas.map(element => (
                                                                    <option key={element.id} value={element.id}>{element.codigo}</option>
                                                                ))
                                                            }
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Form.Group>

                                                <Form.Group controlId="formBasicPassword" as={Col} className="p-0">
                                                    <Form.Group as={Col} controlId="formGridState" className="">
                                                        <Form.Label className="text-dark">Local Placa</Form.Label>
                                                        <Form.Control as="select" className="cadastro__select" onChange={this.atualizaEstado.bind(this)} name="enderecoId">
                                                            <option value={this.enderecoId}>Selecione o endereço</option>
                                                            {
                                                                this.state.listaEnderecos.map(element => (
                                                                    <option key={element.id} value={element.id}>{element.logradouro}</option>
                                                                ))
                                                            }
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Form.Group>

                                                <Form.Group controlId="formBasicEmail" as={Col} className="">
                                                    <Form.Label className="text-dark">Tempo Desligado</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        onChange={this.atualizaEstado.bind(this)}
                                                        value={this.state.tempoDesligado}
                                                        name="tempoDesligado"
                                                        className="cadastro__input"
                                                        placeholder="insira o Tempo" />
                                                </Form.Group>
                                            </Row>
                                            <Row className="d-flex">
                                                <Form.Group controlId="formBasicPassword" as={Col} className="">
                                                    <Form.Label className="text-dark">Tempo de Religamento</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        onChange={this.atualizaEstado.bind(this)}
                                                        value={this.state.tempoVoltarTestes}
                                                        name="tempoVoltarTestes"
                                                        className="cadastro__input"
                                                        placeholder="insira o Tempo" />
                                                </Form.Group>

                                                <Form.Group controlId="formBasicEmail" as={Col} className="">
                                                    <Form.Label className="text-dark">Tempo de entre Testes</Form.Label>
                                                    <Form.Control type="text"
                                                        onChange={this.atualizaEstado.bind(this)}
                                                        value={this.state.tempoEntreTestes}
                                                        name="tempoEntreTestes"
                                                        className="cadastro__input"
                                                        placeholder="insira o Tempo" />
                                                </Form.Group>

                                                <Form.Group controlId="formBasicPassword" as={Col} className="">
                                                    <Form.Label className="text-dark">Quantidade de Pings por teste</Form.Label>
                                                    <Form.Control type="text"
                                                        onChange={this.atualizaEstado.bind(this)}
                                                        value={this.state.quantidadePings}
                                                        name="quantidadePings"
                                                        className="cadastro__input"
                                                        placeholder="insira a Quantidade" />
                                                </Form.Group>
                                            </Row>
                                            <Row className="d-flex">
                                                <Form.Group controlId="formBasicPassword" className="col-4">
                                                    <Form.Label className="text-dark">Ip do Endereco</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        onChange={this.atualizaEstado.bind(this)}
                                                        value={this.state.ipEndereco}
                                                        name="ipEndereco"
                                                        className="cadastro__input"
                                                        placeholder="insira o Ip do Endereço" />
                                                </Form.Group>

                                                <Form.Group controlId="formBasicEmail" className="col-4">
                                                    <Form.Label className="text-dark">dataEntrada</Form.Label>
                                                    <Form.Control     
                                                        type="date"
                                                        onChange={this.atualizaEstado.bind(this)}
                                                        value={this.state.dataEntrada}
                                                        name="dataEntrada"
                                                        className="cadastro__input"
                                                        placeholder="insira a data de entrada " />
                                                </Form.Group>
                                            </Row>

                                            <Row className="d-flex flex-row-reverse">
                                                <Button
                                                    variant="primary"
                                                    className="b-linx m-3"
                                                    onClick={this.cadastrarPlacaEndereco}
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

                                        Placas Registradas
                                    </Card.Header>
                                    <Card.Body>
                                        <Table responsive>
                                            <thead>
                                                <tr>
                                                    <th>Placa</th>
                                                    <th>Local</th>
                                                    <th>Tempo Desligado</th>
                                                    <th>Tempo de Religamento</th>
                                                    <th>Tempo de entre Testes</th>
                                                    <th>Quantidade de Pings por teste</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.listaPlacasEnderecos.map(function (element) {
                                                        return (
                                                            <tr key={element.id}>
                                                                <th>{element.placaId.codigo}</th>
                                                                <th>{element.enderecoId.logradouro}</th>
                                                                <th>{element.tempoDesligado}</th>
                                                                <th>{element.tempoVoltarTestes}</th>
                                                                <th>{element.tempoEntreTestes}</th>
                                                                <th>{element.quantidadePings}</th>
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