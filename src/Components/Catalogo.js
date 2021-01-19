import React, { Component } from 'react';
import { ApiWebUrl } from '../utils';
import Productos from './Productos';

export default class Catalogo extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            listaCategorias:[],
            categoriaSeleccionada : ""
        }
    }

    componentDidMount(){
        const rutaServicio = ApiWebUrl + "serviciocategorias.php";
        fetch(rutaServicio)
        .then(
            res => res.json()
        )
        .then(
            (result) => {
                console.log(result);
                this.setState({
                    listaCategorias:result
                })
            }
        )
    }

    dibujarCategorias = (datosTablaCategorias) => {
        return(
            <ul className="list-group">
                <li className="list-group-item">Todo</li>
            {datosTablaCategorias.map(itemCategoria=>
                <li className="list-group-item" 
                    id={"tr-categoria-"+itemCategoria.idcategoria}
                    key={itemCategoria.idcategoria}
                    onClick={() => this.seleccionarCategoria(itemCategoria)}>
                        <h5>{itemCategoria.nombre}</h5>
                        <small>{itemCategoria.descripcion}</small>
                </li>
            )}   
            </ul>
        )
    }
    seleccionarCategoria = (itemCategoria) => {

        if(this.state.categoriaSeleccionada !== ""){
            document.getElementById("tr-categoria-" + this.state.categoriaSeleccionada.idcategoria).classList.remove("fila-seleccionada")
          }  

        this.setState({ categoriaSeleccionada : itemCategoria })

        document.getElementById("tr-categoria-" + itemCategoria.idcategoria).classList.add("fila-seleccionada")
    }


    render(){ 
        let contenidoCategorias = this.dibujarCategorias(this.state.listaCategorias);
        let dibujarComponenteProductos = <Productos categoriaProducto={this.state.categoriaSeleccionada}/>
        return (
            <section id="catalogo" className="padded">
                <div className="container">
                    <h2>Catálogo</h2>
                    <div className="row">
                        <div className="col-md-3">
                            {contenidoCategorias}
                        </div>
                        <div className="col-md-9">
                            <h3>{this.state.categoriaSeleccionada.nombre}</h3>
                            <small>{this.state.categoriaSeleccionada.descripcion}</small>
                            {dibujarComponenteProductos}
                        </div>
                    </div>
                </div>
            </section>
            );
  }
}