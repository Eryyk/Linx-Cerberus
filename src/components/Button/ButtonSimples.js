import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class ButtonSimples extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
            <Button variant="primary"
            className="b-linx m-3"
            >
                Cadastrar
            </Button>
        )
    }
}