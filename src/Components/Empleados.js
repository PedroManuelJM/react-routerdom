import React, { Component } from 'react';
import preloader from '../assets/preloader.gif';
import { ApiWebUrl, usuarioLocal } from '../utils';

export default class Empleados extends Component {

    constructor(props){
        super(props)
        this.state = {
            listaEmpleados:[],
            cargando:true
        }
    }

    componentDidMount(){

        const usuarioL = usuarioLocal();
        if(usuarioL === null ){
            alert("No tiene acceso a esta página")
            this.props.history.push('/iniciosesion')
        }



        const rutaServicio = ApiWebUrl + "servicioempleados.php";

        var myHeaders = new Headers();

        myHeaders.set('Cache-Control', 'no-cache, must-revalidate');
        myHeaders.set('Expires', '0');
        fetch(rutaServicio, {
            method: 'GET',
            headers: myHeaders
        })
        .then(
            res => res.json()
        )
        .then(
            (result) => {
                console.log(result);
                this.setState({
                    listaEmpleados:result,
                    cargando:false
                })
            }
        )
    }

    static dibujarEmpleados(datosTablaEmpleados){
        return(
            <div className="row row-cols-1 row-cols-md-3">

            {datosTablaEmpleados.map(itemEmpleado=>
                <div className="col mb-4" key={itemEmpleado.idempleado}>
                    <div className="card">
                    <img src={ApiWebUrl + "fotos/" + itemEmpleado.foto} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{itemEmpleado.nombres} {itemEmpleado.apellidos}</h5>
                        <p className="card-text">{itemEmpleado.cargo}</p>
                    </div>
                    </div>
                </div>
            )}   


            </div>
        )
    }

    render(){ 
        let contenidoEmpleados = this.state.cargando ?
        <div className="preloader">
            <img src={preloader} alt=""/>
        </div>
        : Empleados.dibujarEmpleados(this.state.listaEmpleados);
        return (
            <section id="empleados" className="padded">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <h2>Empleados</h2>
                        </div>
                        <div className="col-md-8">
                            {contenidoEmpleados}
                        </div>
                    </div>
                </div>
            </section>
            );
  }
}