import React, { Component } from 'react';
import { ApiWebUrl, usuarioLocal } from '../utils';
import Swal from 'sweetalert2';

export default class Iniciosesion extends Component {
    constructor(props){
        super(props)
        this.state = {
            usuario:'',
            clave:''
        }
    }
    componentDidMount(){
        if(usuarioLocal() !== null) this.props.history.push('/catalogo')
    }
    iniciarsesion =() => {
        if(this.state.usuario === "") return alert("Ingrese el usuario")
        if(this.state.clave === "") return alert("Ingrese la contraseña")

        const rutaServicio = ApiWebUrl + "iniciarsesion.php";

        var formData = new FormData();
        formData.append("usuario",     this.state.usuario) 
        formData.append("clave",this.state.clave)  
        //Asi se agregan todos los parámetros que el servicio requiera (nombre del parámetro , valor que se envía)  

        fetch(rutaServicio,{
            method: 'POST',
            body: formData
        })
        .then(  
            res => res.json()
        )
        .then(
            (result) => {
                console.log(result); 
                this.evaluarInicioSesion(result)               
            }
        )
    }
    evaluarInicioSesion = (result) => {
        if(result === -1){
            return alert("El usuario no existe")
        }else if(result === -2){
            return alert("La contraseña es incorrecta")
        }

        localStorage.setItem("DatosUsuario",JSON.stringify(result[0]))

        Swal.fire({
            title: `Bienvenido: ${result[0].nombres}`,
            text: 'Ahora puede acceder a su información',
            timer: 2000,
            timerProgressBar: true,
          }).then((result) => {
            window.location.reload(false)      
          })
    }


    render(){
        return(
            <section id="inicioSesion" className="padded">
                <div className="container">
                    <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <h2>Iniciar sesión</h2>
                        <form>
                            <div className="form-group">
                                <input type="text" className="form-control"
                                    value={this.state.usuario}
                                    onChange={(e) => this.setState({usuario: e.target.value})}
                                />
                            </div>        
                            <div className="form-group">
                                <input type="text" className="form-control"
                                    value={this.state.clave}
                                    onChange={(e) => this.setState({clave: e.target.value})}
                                />
                            </div>
                            <button type="button" className="btn btn-dark" onClick={this.iniciarsesion}>
                                Iniciar sesión</button>
                        </form>
                    </div>
                    <div className="col-md-4"></div>
                </div>
                </div>
            </section>
        )
    }
}