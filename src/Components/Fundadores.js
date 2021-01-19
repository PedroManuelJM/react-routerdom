import React from 'react';
import foto1 from '../assets/fotos/foto1.jpg';
import foto2 from '../assets/fotos/foto2.jpg';
import foto3 from '../assets/fotos/foto3.jpg';
import foto4 from '../assets/fotos/foto4.jpg';

function Fundadores() {
    let bienvenida = <h5>Aquí conocerás a nuestros fundadores</h5>  
    let losfundadores = <div className="row">
    <figure className="col-md-3 col-sm-6">
      <img src={foto1} alt="" className="img-fluid"/>
      <figcaption>Luisa Lane</figcaption>
    </figure>
    <figure className="col-md-3 col-sm-6">
      <img src={foto2} alt="" className="img-fluid"/>
      <figcaption>Peper Potts</figcaption>
    </figure>
    <figure className="col-md-3 col-sm-6">
      <img src={foto3} alt="" className="img-fluid"/>
      <figcaption>Diana Prince</figcaption>
    </figure>
    <figure className="col-md-3 col-sm-6">
      <img src={foto4} alt="" className="img-fluid"/>
      <figcaption>Peter Parker</figcaption>
    </figure>
</div>    
  return (
    <section id="fundadores" className="padded">
        <div className="container">
            <h2>Fundadores</h2>
            {bienvenida}
            {losfundadores}
        </div>
    </section>
  );
}

export default Fundadores;