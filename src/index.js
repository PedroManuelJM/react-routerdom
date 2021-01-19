import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Mainbar from './Inicio/Mainbar';

import { HashRouter, Route, Switch } from "react-router-dom";
import Mainheader from './Inicio/Mainheader';
import Colaboradores from './Components/Colaboradores';
import MainFooter from './Inicio/MainFooter';
import Empleados from './Components/Empleados';
import Catalogo from './Components/Catalogo';
import Carrito from './Components/Carrito';
import Tablacategorias from './Components/tablas/Tablacategorias';
import Iniciosesion from './Components/Iniciosesion';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter  basename={process.env.PUBLIC_URL + "/"}>
      <Mainheader />
      <Mainbar />
      <Switch>
        <Route exact path="/" component={App}/>
        <Route exact path="/colaboradores" component={Colaboradores}/>
        <Route exact path="/empleados" component={Empleados}/>
        <Route exact path="/catalogo" component={Catalogo}/>
        <Route exact path="/tablacategorias" component={Tablacategorias}/>
        <Route exact path="/carrito" component={Carrito}/>
        <Route exact path="/carrito/:id" component={Carrito}/>
        <Route exact path="/iniciosesion" component={Iniciosesion}/>
      </Switch>
      <MainFooter />
    </HashRouter  >
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
/*
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Mainheader />
      <Mainbar />
      <main>
        <Route exact path="/" component={App}/>
        <Route exact path="/colaboradores" component={Colaboradores}/>
        <Route exact path="/empleados" component={Empleados}/>
        <Route exact path="/catalogo" component={Catalogo}/>
        <Route exact path="/tablacategorias" component={Tablacategorias}/>
        <Route exact path="/carrito" component={Carrito}/>
        <Route exact path="/carrito/:id" component={Carrito}/>
        <Route exact path="/iniciosesion" component={Iniciosesion}/>
      </main>
      <MainFooter />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


*/