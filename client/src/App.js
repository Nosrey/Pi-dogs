import React from "react";
import './App.css';
import { Route } from 'react-router-dom';
import Home from './components/Contenedores/Home/Home.jsx'
import Main from './components/Contenedores/Main/Main.jsx'
import DogsId from './components/VerRazas/DogsId/DogsId.jsx'
import CreateBreed from './components/Contenedores/CreateBreed/CreateBreed'


function App() {
  return (
    <React.Fragment>
      <div className='App'>
        <Route exact path='/'><Home /></Route>
        <Route exact path='/main'><Main /></Route>
        <Route exact path='/main/:DogsId'><DogsId/></Route>
        <Route exact path='/others/CreateBreed'><CreateBreed/></Route>
      </div>
    </React.Fragment>
  );
}

export default App;
