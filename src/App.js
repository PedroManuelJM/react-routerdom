import React from 'react';

import './App.css';
import Banner from './Inicio/Banner';
import Mensaje from './Inicio/Mensaje';
import Fundadores from './Components/Fundadores';
import Oficinas from './Components/Oficinas';
import Envios from './Components/Envios';

import "react-flexy-table/dist/index.css";

function App() {
  return (
    <div>
      <Banner/>
      <Mensaje/>
      <Fundadores/>
      <Oficinas/>
      <Envios/>
    </div>
  );
}

export default App;
