import React, { Component } from 'react';
import trujillo from '../assets/ciudades/trujillo.jpg';
import arequipa from '../assets/ciudades/arequipa.jpg';
import iquitos from '../assets/ciudades/iquitos.jpg';

export default class Oficinas extends Component {

  static dibujarOficinas(){
      return(
        <div className="row">
            <figure className="col-md-4">
                <img src={trujillo} alt="" className="img-fluid"/>
                <figcaption>Trujillo</figcaption>
            </figure>
            <figure className="col-md-4">
                <img src={arequipa} alt="" className="img-fluid"/>
                <figcaption>Arequipa</figcaption>
            </figure>
            <figure className="col-md-4">
                <img src={iquitos} alt="" className="img-fluid"/>
                <figcaption>Iquitos</figcaption>
            </figure>
        </div>
      )
  } 



  render(){  
    let bienvenida = <h5>Estamos llegando a todo el Perú</h5>  
    let contenidoOficinas = Oficinas.dibujarOficinas()  
    return (
        <section id="oficinas" className="padded">
        <div className="container">
            <h2>Oficinas</h2>
            {bienvenida}
            {contenidoOficinas}
        </div>
        </section>
    );
  }
}