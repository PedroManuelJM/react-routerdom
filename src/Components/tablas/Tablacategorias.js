import React, { Component } from 'react';
import { ApiWebUrl } from '../../utils';
import './Tablacategorias.css';
import $ from 'jquery/dist/jquery';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons'

export default class Tablacategorias extends Component {

    constructor(props){
        super(props)
        this.state = {
            listaCategorias: [],
            nombre: "",
            descripcion: "",

            categoriaSeleccionadaIdcategoria: "",
            categoriaSeleccionadaNombre: "",
            categoriaSeleccionadaDescripcion: "",
        }
    }

    componentDidMount(){
        this.obtenerCategorias();
    }
    obtenerCategorias(){
        const rutaServicio = ApiWebUrl + "serviciocategorias.php";
        var myheaders = new Headers();
        myheaders.set('Cache-Control','no-cache, must-revalidate');
        myheaders.set('Expires','0')
        fetch(rutaServicio,
            {
                method:'GET',
                headers:myheaders
            }
            )
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
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {datosTablaCategorias.map(itemCategoria =>
                    <tr key={itemCategoria.idcategoria}>
                        <td>{itemCategoria.idcategoria}</td>
                        <td>{itemCategoria.nombre}</td>
                        <td>{itemCategoria.descripcion}</td>
                        <td><FontAwesomeIcon className="fa-icon" icon={faPen} onClick={() => this.mostrarActualizar(itemCategoria)}/></td>
                        <td><FontAwesomeIcon className="fa-icon" icon={faTimes} onClick={() => this.categoriaEliminar(itemCategoria)} /></td>
                    </tr>
                )}
                </tbody> 
            </table>    
        )
    }
    categoriaEliminar(itemCategoria){
        var respuesta = window.confirm("¿Está seguro que desea eliminar la categoría " + itemCategoria.nombre + " ?");
        if(respuesta === true){
            const rutaServicio = ApiWebUrl + "categoriaseliminar.php";

            var formData = new FormData();
            formData.append("idcategoria",     itemCategoria.idcategoria) 
            
            fetch(rutaServicio,{
                method: 'POST',
                body: formData
            })
            
            .then(
                () => {
                    this.obtenerCategorias();
                    alert("Se eliminó la categoría " + itemCategoria.nombre);
                }
            )
        }

    }

    mostrarActualizar(itemCategoria){
        this.setState({
            categoriaSeleccionadaIdcategoria : itemCategoria.idcategoria,
            categoriaSeleccionadaNombre : itemCategoria.nombre,
            categoriaSeleccionadaDescripcion : itemCategoria.descripcion,
        })

        $("#modalActualizar").modal();
    }

    dibujarFormularioAgregar(){
        return(
            <div id="formulario-agregar">
                <form onSubmit={this.categoriasInsertar}>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Nombre"
                            onChange = { (e) => this.setState({ nombre : e.target.value }) }
                            required minLength="3"/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Descripción"
                            onChange = { (e) => this.setState({ descripcion : e.target.value }) }
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Guardar</button>
                        <button type="button" className="btn btn-primary" onClick={this.ocultarFormularioAgregar} >Cerrar</button>
                    </div>
                </form>
            </div>
        )
    }

    categoriasInsertar = (e) =>{
        e.preventDefault();
        const rutaServicio = ApiWebUrl + "registrarcategorias.php";

        var formData = new FormData();
        formData.append("nombre",     this.state.nombre) 
        formData.append("descripcion",this.state.descripcion)  
        //Asi se agregan todos los parámetros que el servicio requiera (nombre del parámetro , valor que se envía)  

        fetch(rutaServicio,{
            method: 'POST',
            body: formData
        })
        .then(
            res => res.text()
        )
        .then(
            (result) => {
                console.log(result);
                this.obtenerCategorias();
                this.ocultarFormularioAgregar();
                alert("Se agregó una nueva categoría con id " + result);
            }
        )
    }



    mostrarFormularioAgregar(){
        $("#formulario-agregar").slideDown("slow");
    }
    ocultarFormularioAgregar(){
        $("#formulario-agregar").slideUp("slow");
    }

    categoriasActualizar = (e) =>{
        const rutaServicio = ApiWebUrl + "categoriasactualizar.php";

        var formData = new FormData();
        formData.append("idcategoria",     this.state.categoriaSeleccionadaIdcategoria) 
        formData.append("nombre",     this.state.categoriaSeleccionadaNombre) 
        formData.append("descripcion",this.state.categoriaSeleccionadaDescripcion)  
        //Asi se agregan todos los parámetros que el servicio requiera (nombre del parámetro , valor que se envía)  

        fetch(rutaServicio,{
            method: 'POST',
            body: formData
        })
        
        .then(
            () => {
                this.obtenerCategorias();
                $("#modalActualizar").modal("toggle");
                alert("Se actualizo la categoría con id " +  this.state.categoriaSeleccionadaIdcategoria);
            }
        )
    }

    dibujarModal(){
        return(
            <div class="modal fade" id="modalActualizar" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Actualizar categoría</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form>
                        <div class="modal-body">
                            <div className="form-group">
                                <input type="text" className="form-control" value={this.state.categoriaSeleccionadaIdcategoria} disabled/> 
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Nombre" value={this.state.categoriaSeleccionadaNombre}
                                    onChange = { (e) => this.setState({categoriaSeleccionadaNombre: e.target.value})}/> 
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Descripción" value={this.state.categoriaSeleccionadaDescripcion}
                                    onChange = { (e) => this.setState({categoriaSeleccionadaDescripcion: e.target.value})}/> 
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                            <button type="button" class="btn btn-primary" onClick={() => this.categoriasActualizar()}>Actualizar</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        )
    }

    render(){ 
        let contenidoCategorias = this.dibujarCategorias(this.state.listaCategorias);
        let contenidoFormularioAgregar = this.dibujarFormularioAgregar();
        let contenidoModal = this.dibujarModal();
        return (
            <section id="tabla-categorias" className="padded">
                <div className="container">
                        <h2>Tabla Categorías</h2>
                        <div className="form-group">
                            <button type="button" className="btn btn-primary" onClick={this.mostrarFormularioAgregar}>
                                Nueva categoría</button>
                                
                        </div>    
                        {contenidoFormularioAgregar}
                        {contenidoCategorias}
                    
                </div>
                {contenidoModal}
            </section>
            );
  }
}