import React, { Component } from 'react';
import Axios from 'axios';
import Url from '../../services/api';
import MenuNav from '../../components/Menu/MenuNavegacao';
import ButtonSimples from '../../components/Button/ButtonSimples';
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

const url = "http://192.168.4.50:5000/api/Enderecos"

export default class CadastroPlaca extends Component {
    constructor(event) {
        super(event);

        this.state = {
            id: 0,
            logradouro: '',
            cep: '',
            numero: '',
            complemento: '',
            observacao: '',
            bairro: '',
            cidade: '',
            estado: '',
            empresaId: 0,
            listaEnderecos: [],
            listaEmpresa: [],
            listaUF: []
        }
    }

    componentDidMount() {
        this.atualizaListaEnderecos()
        this.atualizaListaEmpresas()
        this.atualizaUFs()
    }

    atualizaListaEmpresas() {
        Axios.get(Url + "empresas")
            .then(data => {
                this.setState({ listaEmpresa: data.data })
            })
            .catch(error => {
                console.log(error)
            })
    }

    atualizaListaEnderecos() {
        Axios.get(Url + "Enderecos")
            .then(data => {
                this.setState({ listaEnderecos: data.data })
            })
            .catch(error => {
                console.log("ERRO: listagem de endereços " + error)
            })
    }

    efetuarCadastroEndereco = (event) => {
        event.preventDefault()

        let Endereco = {
            logradouro: this.state.logradouro,
            cep: this.state.cep,
            numero: Number(this.state.numero),
            complemento: this.state.complemento,
            observacao: this.state.observacao,
            bairro: this.state.bairro,
            cidade: this.state.cidade,
            estado: this.state.estado,
            empresaId: Number(this.state.empresaId),

        }
        // console.log(Endereco);
        // console.log(Url+"Enderecos");
        Axios.post(Url + "Enderecos", Endereco, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('Cerberus-chave-autenticacao'),
                'Content-Type': 'application/json'
            }
        })
            .then(data => {
                console.log(data.data)
                alert("Endereço Cadastrado")
            })
            .catch(erro => {
                console.log(erro);
                alert("Endereço não cadastrada")
            });
    }

    atualizaEstado(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    atualizaUFs() {
        Axios.get("http://servicodados.ibge.gov.br/api/v1/localidades/estados")
            .then(data => (
                this.setState({ listaUF : data.data }),
                console.log(this.state.listaUf)
            ))
            .catch(erro => console.log(erro))
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

                                        Cadastrar Endereço
                                    </Card.Header>
                                    <Card.Body>
                                        <Form className="cadastro__form" onSubmit={this.efetuarCadastroEndereco.bind(this)}>
                                            <Row className="d-flex justify-content-around mr-2 ml-2 text-left" >

                                                <Form.Group controlId="formBasicPassword" as={Col} className="">
                                                    <Form.Label className="text-dark">Cep</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        onChange={this.atualizaEstado.bind(this)}
                                                        value={this.state.cep}
                                                        name="cep"
                                                        className="cadastro__input"
                                                        placeholder="insira o cep" />
                                                </Form.Group>

                                                <Form.Group controlId="formBasicPassword" as={Col} className="" >
                                                    <Form.Label className="text-dark">Estado</Form.Label>
                                                    <Form.Control as="select" className="cadastro__select" onChange={this.atualizaEstado.bind(this)} name="estado">
                                                        <option value="null">Selecione o estado</option>
                                                        {
                                                            this.state.listaUF.map(element => (
                                                                <option key={element.id} value={element.nome}>{element.nome}</option>
                                                            ))
                                                        }
                                                    </Form.Control>
                                                </Form.Group>

                                                <Form.Group controlId="formBasicPassword" as={Col} className="">
                                                    <Form.Label className="text-dark">Cidade</Form.Label>
                                                    <Form.Control type="text"
                                                        onChange={this.atualizaEstado.bind(this)}
                                                        value={this.state.cidade}
                                                        name="cidade"
                                                        className="cadastro__input"
                                                        placeholder="insira a cidade">
                                                    </Form.Control>
                                                </Form.Group>

                                            </Row>
                                            <Row className="d-flex justify-content-around mr-2 ml-2 text-left">
                                                <Form.Group controlId="formBasicPassword" as={Col} className="">
                                                    <Form.Label className="text-dark">Bairro</Form.Label>
                                                    <Form.Control type="text"
                                                        onChange={this.atualizaEstado.bind(this)}
                                                        value={this.state.bairro}
                                                        name="bairro"
                                                        className="cadastro__input"
                                                        placeholder="insira o bairro">
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group controlId="formBasicEmail" as={Col} className="">
                                                    <Form.Label className="text-dark">Logradouro</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        onChange={this.atualizaEstado.bind(this)}
                                                        value={this.state.logradouro}
                                                        name="logradouro"
                                                        className="cadastro__input"
                                                        placeholder="insira o nome logradouro" />
                                                </Form.Group>
                                                <Form.Group controlId="formBasicEmail" as={Col} className="">
                                                    <Form.Label className="text-dark">Numero</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        onChange={this.atualizaEstado.bind(this)}
                                                        value={this.state.numero}
                                                        name="numero"
                                                        className="cadastro__input"
                                                        placeholder="insira o numero" />
                                                </Form.Group>
                                            </Row>

                                            <Row className="d-flex justify-content-around mr-2 ml-2 text-left">
                                                <Form.Group as={Col} controlId="formGridState" className="">
                                                    <Form.Label className="text-dark">Complemento</Form.Label>
                                                    <Form.Control type="text"
                                                        onChange={this.atualizaEstado.bind(this)}
                                                        value={this.state.complemento}
                                                        name="complemento"
                                                        className="cadastro__input"
                                                        placeholder="insira o complemento">
                                                    </Form.Control>
                                                </Form.Group>

                                                <Form.Group controlId="formBasicPassword" as={Col} className="">
                                                    <Form.Label className="text-dark">Observação</Form.Label>
                                                    <Form.Control type="text"
                                                        onChange={this.atualizaEstado.bind(this)}
                                                        value={this.state.observacao}
                                                        name="observacao"
                                                        className="cadastro__input"
                                                        placeholder="insira uma observacao">
                                                    </Form.Control>
                                                </Form.Group>

                                                <Form.Group controlId="formBasicEmail" as={Col} className="">
                                                    <Form.Label className="text-dark">Empresa</Form.Label>
                                                    <Form.Control as="select" className="cadastro__select" onChange={this.atualizaEstado.bind(this)} name="empresaId">
                                                        <option value="null">Selecione a empresa</option>
                                                        {
                                                            this.state.listaEmpresa.map(element => (
                                                                <option key={element.id} value={element.id}>{element.nomeFantasia}</option>
                                                            ))
                                                        }
                                                    </Form.Control>
                                                </Form.Group>
                                            </Row>
                                            <Row className="d-flex flex-row-reverse">
                                            <Button
                                                    variant="primary" 
                                                    className="b-linx m-3"
                                                    onClick={this.efetuarCadastroEndereco}
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

                                        Endereços
                                    </Card.Header>
                                    <Card.Body>
                                        <Table responsive>
                                            <thead>
                                                <tr>
                                                    <th>Cep</th>
                                                    <th>Estado</th>
                                                    <th>Cidade</th>
                                                    <th>Bairro</th>
                                                    <th>Logradouro</th>
                                                    <th>Numero</th>
                                                    <th>Empresa</th>
                                                    <th>Complemento</th>
                                                    <th>Observação</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.listaEnderecos.map(function (element) {
                                                        return (
                                                            <tr key={element.id}>
                                                                <th>{element.cep}</th>
                                                                <th>{element.estado}</th>
                                                                <th>{element.cidade}</th>
                                                                <th>{element.bairro}</th>
                                                                <th>{element.logradouro}</th>
                                                                <th>{element.numero}</th>
                                                                <th>{element.empresaId}</th>
                                                                <th>{element.complemento}</th>
                                                                <th>{element.observacao}</th>
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