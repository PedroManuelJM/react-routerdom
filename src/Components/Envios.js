import React, { Component } from 'react';
import { ApiWebUrl } from '../utils';

export default class Envios extends Component {

    constructor(props){
        super(props)
        this.state = {
            listaEnvios:[]
        }
    }

    componentDidMount(){
        const rutaServicio = ApiWebUrl + "servicioenvios.php";

        fetch(rutaServicio)
        .then(
            res => res.json()
        )
        .then(
            (result) => {
                console.log(result);
                this.setState({
                    listaEnvios:result
                })
            }
        )
    }

    static dibujarEnvios(datosTablaEnvios){
        return(
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th>Código</th>
                        <th>Empresa</th>
                        <th>Teléfono</th>
                    </tr>
                </thead>
                <tbody>
                {datosTablaEnvios.map(itemEnvio =>
                    <tr key={itemEnvio.idempresaenvio}>
                        <td>{itemEnvio.idempresaenvio}</td>
                        <td>{itemEnvio.nombre}</td>
                        <td>{itemEnvio.telefono}</td>
                    </tr>
                )}
                </tbody>         
            </table>
        )
    }

    render(){ 
        let contenidoEnvios = Envios.dibujarEnvios(this.state.listaEnvios);
        return (
            <section id="envios" className="padded">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <h2>Envíos</h2>
                        </div>
                        <div className="col-md-8">
                            {contenidoEnvios}
                        </div>
                    </div>
                </div>
            </section>
            );
  }
}