import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Url from '../../services/api';
import MenuNav from '../../components/Menu/MenuNavegacao';
import useForm from "react-hook-form";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    Card,
    Table,
    Row,
    Col,
    Container,
    Form,
    Button
} from 'react-bootstrap';

const CadastroEndereco = () => {

    const { handleSubmit, register, errors } = useForm();

    const [id, setId] = useState(0);
    const [cep, setCep] = useState('');
    const [estado, setEstado] = useState('');
    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [observacao, setObservacao] = useState('');
    const [empresaId, setEmpresaId] = useState(0);

    const [empresas, setEmpresas] = useState([]);
    const [enderecos, setEnderecos] = useState([]);
    const [uf, setUF] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        listaEnderecos();
        listaEmpresas();
        UFs();
    }, [])

    const listaEmpresas = () => {
        Axios.get(Url + "empresas")
            .then(data => {
                this.setState({ listaEmpresa: data.data })
            })
            .catch(error => {
                console.log(error)
            })
    }

    const listaEnderecos = () => {
        Axios.get(Url + "Enderecos")
            .then(data => {
                this.setState({ listaEnderecos: data.data })
            })
            .catch(error => {
                console.log("ERRO: listagem de endereços " + error)
            })
    }

    const onSubmit = event => {

        let Endereco = {
            logradouro: logradouro,
            cep: cep,
            numero: numero,
            complemento: complemento,
            observacao: observacao,
            bairro: bairro,
            cidade: cidade,
            estado: estado,
            empresaId: empresaId

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
                listaEnderecos();
                toast.success('Endereco Cadastrado');
            })
            .catch(erro => {
                toast.error("Endereço não cadastrada");
            })
            .finally(() => { setLoading(false) })
    }


    const UFs = () => {
        Axios.get("http://servicodados.ibge.gov.br/api/v1/localidades/estados")
            .then(data => (
                this.setState({ listaUF: data.data }),
                console.log(this.state.listaUf)
            ))
            .catch(erro => console.log(erro))
    }

    return (
        <Container fluid={true}>
            <ToastContainer position="top-right" autoClose={3000}></ToastContainer>

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
                                    <Form onSubmit={handleSubmit(onSubmit)}>
                                        <Row className="d-flex justify-content-around mr-2 ml-2 text-left" >

                                            <Form.Group controlId="formBasicPassword" as={Col} className="">
                                                <Form.Label className="text-dark">Cep</Form.Label>
                                                {/* <Form.Control
                                                    type="text"
                                                    onChange={this.atualizaEstado.bind(this)}
                                                    value={this.state.cep}
                                                    name="cep"
                                                    className="cadastro__input"
                                                    placeholder="insira o cep" /> */}
                                                <input
                                                    type="text"
                                                    onChange={e => {
                                                        setCep(e.target.value);
                                                    }
                                                    }
                                                    value={cep || ''}
                                                    id="cep"
                                                    name="cep"
                                                    className="form-control"
                                                    placeholder="Informe o CEP do Local"
                                                    ref={register({
                                                        required: 'CEP Local necessário'
                                                    })} />
                                                {errors.cep && <span className="error">{errors.cep.message}</span>}
                                            </Form.Group>

                                            <Form.Group controlId="formBasicPassword" as={Col} className="" >
                                                <Form.Label className="text-dark">Estado</Form.Label>
                                                {/* <Form.Control as="select" className="cadastro__select" onChange={this.atualizaEstado.bind(this)} name="estado">
                                                    <option value="null">Selecione o estado</option>
                                                    {
                                                        listaUF.map(element => (
                                                            <option key={element.id} value={element.nome}>{element.nome}</option>
                                                        ))
                                                    }
                                                </Form.Control> */}
                                                <select className="form-control"
                                                    onChange={e => {
                                                        setEstado(e.target.value);
                                                    }
                                                    }
                                                    value={uf || ''}
                                                    id="estado"
                                                    name="estado"
                                                    ref={register({
                                                        required: 'Estado do Local obrigatório'
                                                    })}>
                                                    <option value="null">Selecione o estado</option>
                                                    {
                                                        uf.map(element => (
                                                            <option key={element.id} value={element.nome}>{element.nome}</option>
                                                        ))
                                                    }
                                                </select>
                                                {errors.uf && <span className="error">{errors.uf.message}</span>}
                                            </Form.Group>

                                            <Form.Group controlId="formBasicPassword" as={Col} className="">
                                                <Form.Label className="text-dark">Cidade</Form.Label>
                                                {/* <Form.Control type="text"
                                                    onChange={this.atualizaEstado.bind(this)}
                                                    value={this.state.cidade}
                                                    name="cidade"
                                                    className="cadastro__input"
                                                    placeholder="insira a cidade">
                                                </Form.Control> */}
                                                <input
                                                    type="text"
                                                    onChange={e => {
                                                        setCidade(e.target.value);
                                                    }
                                                    }
                                                    value={cidade || ''}
                                                    id="cidade"
                                                    name="cidade"
                                                    className="form-control"
                                                    placeholder="Informe a cidade do Local"
                                                    ref={register({
                                                        required: 'Cidade do Local necessário'
                                                    })} />
                                                {errors.cidade && <span className="error">{errors.cidade.message}</span>}
                                            </Form.Group>

                                        </Row>
                                        <Row className="d-flex justify-content-around mr-2 ml-2 text-left">
                                            <Form.Group controlId="formBasicPassword" as={Col} className="">
                                                <Form.Label className="text-dark">Bairro</Form.Label>
                                                {/* <Form.Control type="text"
                                                    onChange={this.atualizaEstado.bind(this)}
                                                    value={this.state.bairro}
                                                    name="bairro"
                                                    className="cadastro__input"
                                                    placeholder="insira o bairro">
                                                </Form.Control> */}
                                                <input
                                                    type="text"
                                                    onChange={e => {
                                                        setBairro(e.target.value);
                                                    }
                                                    }
                                                    value={cidade || ''}
                                                    id="bairro"
                                                    name="bairro"
                                                    className="form-control"
                                                    placeholder="Informe o bairro do Local"
                                                    ref={register({
                                                        required: 'Bairro do Local necessário'
                                                    })} />
                                                {errors.bairro && <span className="error">{errors.bairro.message}</span>}
                                            </Form.Group>
                                            <Form.Group controlId="formBasicEmail" as={Col} className="">
                                                <Form.Label className="text-dark">Logradouro</Form.Label>
                                                {/* <Form.Control
                                                    type="text"
                                                    onChange={this.atualizaEstado.bind(this)}
                                                    value={this.state.logradouro}
                                                    name="logradouro"
                                                    className="cadastro__input"
                                                    placeholder="insira o nome logradouro" /> */}
                                                <input
                                                    type="text"
                                                    onChange={e => {
                                                        setLogradouro(e.target.value);
                                                    }
                                                    }
                                                    value={logradouro || ''}
                                                    id="logradouro"
                                                    name="logradouro"
                                                    className="form-control"
                                                    placeholder="Informe o logradouro do Local"
                                                    ref={register({
                                                        required: 'Logradouro do Local necessário'
                                                    })} />
                                                {errors.bairro && <span className="error">{errors.bairro.message}</span>}
                                            </Form.Group>
                                            <Form.Group controlId="formBasicEmail" as={Col} className="">
                                                <Form.Label className="text-dark">Numero</Form.Label>
                                                {/* <Form.Control
                                                    type="text"
                                                    onChange={this.atualizaEstado.bind(this)}
                                                    value={this.state.numero}
                                                    name="numero"
                                                    className="cadastro__input"
                                                    placeholder="insira o numero" /> */}
                                                <input
                                                    type="text"
                                                    onChange={e => {
                                                        setNumero(e.target.value);
                                                    }
                                                    }
                                                    value={numero || ''}
                                                    id="numero"
                                                    name="numero"
                                                    className="form-control"
                                                    placeholder="Informe o Numero do Local"
                                                    ref={register({
                                                        required: 'Numero do Local necessário'
                                                    })} />
                                                {errors.numero && <span className="error">{errors.numero.message}</span>}
                                            </Form.Group>
                                        </Row>

                                        <Row className="d-flex justify-content-around mr-2 ml-2 text-left">
                                            <Form.Group as={Col} controlId="formGridState" className="">
                                                <Form.Label className="text-dark">Complemento</Form.Label>
                                                {/* <Form.Control type="text"
                                                    onChange={this.atualizaEstado.bind(this)}
                                                    value={this.state.complemento}
                                                    name="complemento"
                                                    className="cadastro__input"
                                                    placeholder="insira o complemento">
                                                </Form.Control> */}
                                                <input
                                                    type="text"
                                                    onChange={e => {
                                                        setComplemento(e.target.value);
                                                    }
                                                    }
                                                    value={numero || ''}
                                                    id="complemento"
                                                    name="complemento"
                                                    className="form-control"
                                                    placeholder="Informe o complemento do Local"
                                                />
                                                {errors.complemento && <span className="error">{errors.complemento.message}</span>}
                                            </Form.Group>

                                            <Form.Group controlId="formBasicPassword" as={Col} className="">
                                                <Form.Label className="text-dark">Observação</Form.Label>
                                                {/* <Form.Control type="text"
                                                    onChange={this.atualizaEstado.bind(this)}
                                                    value={this.state.observacao}
                                                    name="observacao"
                                                    className="cadastro__input"
                                                    placeholder="insira uma observacao">
                                                </Form.Control> */}
                                                <input
                                                    type="text"
                                                    onChange={e => {
                                                        setObservacao(e.target.value);
                                                    }
                                                    }
                                                    value={numero || ''}
                                                    id="observacao"
                                                    name="observacao"
                                                    className="form-control"
                                                    placeholder="Informe o observacao do Local"
                                                />
                                                {errors.observacao && <span className="error">{errors.observacao.message}</span>}
                                            </Form.Group>

                                            <Form.Group controlId="formBasicEmail" as={Col} className="">
                                                <Form.Label className="text-dark">Empresa</Form.Label>
                                                {/* <Form.Control as="select" className="cadastro__select" onChange={this.atualizaEstado.bind(this)} name="empresaId">
                                                    <option value="null">Selecione a empresa</option>
                                                    {
                                                        this.state.listaEmpresa.map(element => (
                                                            <option key={element.id} value={element.id}>{element.nomeFantasia}</option>
                                                        ))
                                                    }
                                                </Form.Control> */}
                                                <select className="form-control"
                                                    onChange={e => {
                                                        setEmpresaId(e.target.value);
                                                    }
                                                    }
                                                    value={setEmpresaId || ''}
                                                    id="empresaId"
                                                    name="empresaId"
                                                    ref={register({
                                                        required: 'Empresa do Local obrigatório'
                                                    })}>
                                                    <option value="null">Selecione a empresa</option>
                                                    {
                                                        empresas.map(element => (
                                                            <option key={element.id} value={element.id}>{element.nomeFantasia}</option>
                                                        ))
                                                    }
                                                </select>
                                                {errors.tipoUsuario && <span className="error">{errors.tipoUsuario.message}</span>}
                                            </Form.Group>
                                        </Row>
                                        <Row className="d-flex flex-row-reverse">
                                        <button type="submit" className="b-linx m-2 text-light" disabled={!loading ? '' : 'none'}>{loading ? "Salvando..." : "Salvar"}</button>

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
                                                enderecos.map(function (element) {
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
    );
}

export default CadastroEndereco