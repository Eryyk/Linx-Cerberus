import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

import { Jumbotron, Col } from 'react-bootstrap';

export class Mapa extends Component{
    constructor(props){
        super(props)

        this.state = {
            listaPontos: []
        }
    }

    render(){
        const styelMap = {
            width: '100%'
            ,height: '35Vh'
        }
        return(
            <Jumbotron as={Col} fluid className="p-0 m-0" >
            <script src="http://maps.google.com/maps/api/js?sensor=false" type="text/javascript"></script>
            <Map
                id="mapa__"
                google={this.props.google} zoom={11}
                style={styelMap}
                initialCenter={{
                    lat: -23.5489,
                    lng: -46.6388
                }}>

                {
                    this.state.listaPontos.map((points) => {
                        return (
                            <Marker
                                onClick={this.onMarkerClick}
                                name={'ACurrent location'}
                                position={{ lat: points.latitude, lng: points.longitude }}
                            />

                        )
                    }
                    )
                }
            </Map>
    </Jumbotron>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ("")
})(Mapa)