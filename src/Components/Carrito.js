import React, { Component } from 'react';
import { ApiWebUrl } from '../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export default class Carrito extends Component {
    constructor(props){
        super(props)
        this.state = {
            itemsCarrito:[],
            total:0.0
        }
    }
    componentDidMount(){
        if(this.props.match.params.id != null){
            console.log(this.props.match.params.id)
            this.obtenerProductoSolo(this.props.match.params.id)
        }
    }
    obtenerProductoSolo = (idproducto) => {
        const rutaServicio = ApiWebUrl + "productosolo.php";
        var formData = new FormData();
        formData.append("idproducto",idproducto)  
        fetch(rutaServicio,{
            method: 'POST',
            body: formData
        })
        .then(
            res => res.json()
        )
        .then(
            (producto) => {
                console.log(producto);
                this.agregarProductoCarrito(producto[0])
            }
        )
    }
    agregarProductoCarrito(producto){
        var itemCarrito = {
            productoCarrito: producto,
            cantidad: 1
        }
        let carrito = [];
        if(localStorage.getItem('carrito') === null){
            carrito.push(itemCarrito)
        }
        else{
            carrito = JSON.parse(localStorage.getItem('carrito'));
            let index = -1;
            for (var i=0; i< carrito.length; i++){
                if(carrito[i].productoCarrito.idproducto === producto.idproducto){
                    index = i;
                    break;
                }
            }
            if(index === -1){
                carrito.push(itemCarrito)
                
            }
            else{
                let item = carrito[index]
                item.cantidad++;
                carrito[index] = item
            }
        }
        localStorage.setItem('carrito',JSON.stringify(carrito));
        console.log("agregarcarrito")
        console.log(carrito)

        this.setState({
            itemsCarrito: carrito 
        })
        this.actualizarTotal()
    }
    dibujarCarrito(datosCarrito){
        console.log("datosCarrito")
        console.log(datosCarrito)
        return(
            <table className="table">
            <thead>
                <tr>
                  <th>Cod</th>
                  <th>Nombres</th>
                  <th className="text-right">Precio (S/.)</th>
                  <th>Cantidad</th>
                  <th className="text-right">Subtotal (S/.)</th>
                  <th></th>
                </tr>
            </thead>
            <tbody>
            {datosCarrito.map(itemProducto=>
                  <tr key={itemProducto.productoCarrito.idproducto} >
                    <td>{itemProducto.productoCarrito.idproducto}</td>
                    <td>{itemProducto.productoCarrito.nombre}</td>
                    <td className="text-right">{parseFloat(itemProducto.productoCarrito.precio).toFixed(2)}</td>
                    <td>{itemProducto.cantidad}</td>
                    <td className="text-right">{parseFloat(itemProducto.productoCarrito.precio * itemProducto.cantidad).toFixed(2)}</td>    
                    <td><FontAwesomeIcon className="fa-icon" icon={faTimes} onClick={() => this.eliminarItemCarrito(itemProducto)}  /></td>
                  </tr>
              )}
            </tbody>
            </table>
        )
    }

    eliminarItemCarrito(itemProducto){
        let carrito = [];
        carrito = JSON.parse(localStorage.getItem('carrito'));
        let index = -1;
        for (var i=0; i< carrito.length; i++){
            if(carrito[i].productoCarrito.idproducto === itemProducto.idproducto){
                index = i;
                break;
            }
        }
        carrito.splice(index,1)
        localStorage.setItem('carrito',JSON.stringify(carrito));
        this.setState({
            itemsCarrito: carrito 
        })
        this.actualizarTotal()
    }

    actualizarTotal(){
        let carrito = [];
        carrito = JSON.parse(localStorage.getItem('carrito'));
        var totalCarrito = 0
        for (var i=0; i< carrito.length; i++){
            var subtotal = 0.0
            subtotal = carrito[i].productoCarrito.precio * carrito[i].cantidad
            totalCarrito += subtotal 
        }
        this.setState({
            total: totalCarrito
        })
    }

    vaciarCarrito(){
        localStorage.removeItem("carrito")
        this.setState({
            itemsCarrito: [],
            total:0.0
        })
    }

    render(){ 
        let contenidoCarrito = this.dibujarCarrito(this.state.itemsCarrito);
        return (
            <section id="carrito" className="padded">
                <div className="container">
                    <h2>Carrito</h2>
                    <div className="row">
                        <div className="col-md-8">
                            {contenidoCarrito}
                        </div>
                        <div className="col-md-4">
                            <div class="total">
                                S/.{this.state.total.toFixed(2)}
                            </div>
                            <button type="button" className="btn btn-danger" onClick = {() => this.vaciarCarrito()}>
                                Vaciar carrito</button> 
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}