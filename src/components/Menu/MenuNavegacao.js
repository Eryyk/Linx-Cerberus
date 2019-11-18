import React, { Component } from 'react';
import Logo from '../../assets/imagens/logo.png';
import '../../assets/css/MenuNav.css';

export default class MenuNavegacao extends Component {
    render() {
        return (
            <div id="MenuNav_Principal">
                <div id="Bloco_imagem_MenuNav">
                    <img src={Logo} alt="Linx logotipo" id="imgNavegador" />
                </div>
                <div id="Ul_RotasMenu">
                    <p><a href="dashboard">Dashboard</a></p>
                    <p><a href="registrarPlaca">Registros</a></p>
                    <p><a href="usuarios">Usuarios</a></p>
                    <p><a href="empresas">Empresas</a></p>
                    <p><a href="enderecos">Endereços</a></p>
                    <p><a href="placas">Placas</a></p>
                </div>
                <p className="Btn_sair_MenuNav"><a href="#">sair</a></p>

            </div>
        )
    }
}