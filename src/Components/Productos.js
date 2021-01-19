import React , { Component } from 'react';
import nofoto from '../assets/nofoto.png';
import { ApiWebUrl } from '../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
 
export default class Productos extends Component {

  constructor(props){
      super(props)
      this.state = {
        categoriaElegida: props.categoriaProducto,
        listaProductos:[]
      }
      console.log("CONSTRUCTOR")
  }

  componentDidMount(){
    console.log("COMPONENTDIDMOUNT")
      console.log(this.state.categoriaElegida)
  }

  componentWillReceiveProps(props){
    console.log("COMPONENTRECEIVEPROPS")        
    console.log(props.categoriaProducto)
    this.obtenerProductosPorCategoria(props.categoriaProducto)
  }

  obtenerProductosPorCategoria = (itemCategoria) => {
    const rutaServicio = ApiWebUrl + "servicioproductos.php";

    var formData = new FormData();
    formData.append("caty",itemCategoria.idcategoria)  
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
            this.setState({
                listaProductos:result
            })
        }
    )
}

dibujarProductosTabla = (datosTablaProductos) => {
    return(
        <table className="table">
          <thead>
              <tr>
                <th>Cod</th>
                <th>Nombres</th>
                <th>Detalle</th>
                <th className="text-right">Precio (S/.)</th>
                <th></th>
              </tr>
          </thead>
          <tbody>
              
              {datosTablaProductos.map(itemProducto=>
                  <tr key={itemProducto.idproducto}>
                    <td>{itemProducto.idproducto}</td>
                    <td>{itemProducto.nombre}</td>
                    <td>{itemProducto.detalle}</td>
                    <td className="text-right">{parseFloat(itemProducto.precio).toFixed(2)}</td>
                    <td><Link to={"/carrito/" + itemProducto.idproducto}>
                            <FontAwesomeIcon className="fa-icon" icon={faShoppingCart} />
                        </Link></td>
                  </tr>
              )}
          </tbody>
      </table>
    )
}
dibujarProductosCuadricula = (datosTablaProductos) => {

    return(
        <div className="row row-cols-1 row-cols-md-3">

        {datosTablaProductos.map(itemProducto=>
            <div className="col mb-4" key={itemProducto.idproducto}>
                <div className="card">
                <img src={
                    itemProducto.imagengrande != null && itemProducto.imagengrande
                     !== undefined && itemProducto.imagengrande !== "" ? 
                    ApiWebUrl + itemProducto.imagengrande 
                    :nofoto
                    } className="card-img-top" alt="..."/>
                <div className={
                    itemProducto.enoferta === "0" ?
                    "producto-sin-oferta"
                    :"producto-con-oferta"
                }>Oferta</div>    
                <div className="card-body">
                    <h5 className="card-title">{itemProducto.nombre}</h5>
                    <p className="card-text">{itemProducto.detalle}</p>
                    <p className="card-text">S/. {parseFloat(itemProducto.precio).toFixed(2)}</p>
                </div>
                </div>
            </div>
        )}   
        </div>

    )
}

  render(){
    let contenidoProductosTabla = this.dibujarProductosTabla(this.state.listaProductos);
    let contenidoProductosCuadricula = this.dibujarProductosCuadricula(this.state.listaProductos);

      return (
          <>
            <h3>Productos</h3>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
  <li className="nav-item" role="presentation">
    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#tabla" role="tab" aria-controls="home" aria-selected="true">Tabla</a>
  </li>
  <li className="nav-item" role="presentation">
    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#cuadricula" role="tab" aria-controls="profile" aria-selected="false">Cuadrícula</a>
  </li>
</ul>
<div className="tab-content" id="myTabContent">
  <div className="tab-pane fade show active" id="tabla" role="tabpanel" aria-labelledby="home-tab">
      {contenidoProductosTabla}
  </div>
  <div className="tab-pane fade" id="cuadricula" role="tabpanel" aria-labelledby="profile-tab">
      {contenidoProductosCuadricula}
  </div>
</div>
          </>  
      );
  }
}
      
