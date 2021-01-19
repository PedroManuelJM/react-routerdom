import React , { Component } from 'react';
import { ColaboradesData } from './../dataLocal';

import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";

const $  =require('jquery')
$.DataTable = require('datatables.net-dt')
export default class Colaboradores extends Component {

  constructor(props){
      super(props)
      this.state = {
          listaColaboradores:[],
          colaboradorSeleccionado : "",
          ganadorSorteo : ""
      }
  }
 
  componentDidMount(){  
    $(document).ready(function () {
      $('#myTable').DataTable();
   });
     let aleatorio = Math.floor(Math.random()*ColaboradesData.length)
     this.setState({
        listaColaboradores: ColaboradesData,
        ganadorSorteo: ColaboradesData[aleatorio]
    })
    console.log(ColaboradesData)
   
  
  }

  dibujarTabla(datosTabla){
      return(
          <table id="example" className="table table-striped table-bordered " >
              <thead>
                  <tr>
                    <th>Cod</th>
                    <th>Nombres</th>
                    <th>Cargo</th>
                  </tr>
              </thead>
              <tbody>
                  
                  {datosTabla.map(itemColaborador=>
                      <tr key={itemColaborador.id} id={"tr-colaborador-"+itemColaborador.id}
                        onClick={() => this.seleccionarColaborador(itemColaborador)}>
                        <td>{itemColaborador.id}</td>
                        <td>{itemColaborador.nombres}</td>
                        <td>{itemColaborador.cargo}</td>
                      </tr>
                  )}
              </tbody>
          </table>
          )
  }

  seleccionarColaborador(itemColaborador){
    //Solo la primera ver colaboradorSeleccionado es ""
    
    //Se verifica que colaboradorSeleccionado tenga un valor
    if(this.state.colaboradorSeleccionado !== ""){
      document.getElementById("tr-colaborador-" + this.state.colaboradorSeleccionado.id).classList.remove("fila-seleccionada")
    }  
    
    this.setState({ colaboradorSeleccionado : itemColaborador })
    document.getElementById("tr-colaborador-" + itemColaborador.id).classList.add("fila-seleccionada")

    //Con classList.add se añade una clase a la lista de clases del objeto (tr)
    //Con classList.add se elimina una clase a la lista de clases del objeto (tr)
  }

  mostrarColaborador(){
    var colaborador = this.state.colaboradorSeleccionado
    return(
        <div>
            <h3>Colaborador Seleccionado</h3>
            <h4>{colaborador.nombres}</h4>
            <img src={require('./../' + colaborador.foto)} className="img-fluid" alt={colaborador.nombres}/>
            <p>{colaborador.cargo}</p>
            <p>{colaborador.ciudad}</p>
         </div>
    )
  }
  
  render(){
    let contenidoTabla = this.dibujarTabla(this.state.listaColaboradores);
    let contenidoColaborador = this.state.colaboradorSeleccionado !== "" 
        ? this.mostrarColaborador()
        :null

      return (
          <section id="colaboradores" className="padded-40">
              <div className="container">
                <h2>Colaboradores</h2>
                    <div className="row">
                        <div className="col-md-7">
                            {contenidoTabla}
                            <h3>Ganador de sorteo</h3>
                            <p>{this.state.ganadorSorteo.nombres}</p>
                            <p>{this.state.ganadorSorteo.cargo}</p>
                        </div>
                        <div className="col-md-5">
                            { contenidoColaborador  }
                        </div>                
                </div>
              </div>
          </section>
      );
  }
}
      
