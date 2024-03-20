import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import PostForm1 from './components/PostForm1';
import PostList from './components/PostList';
import Data from './components/Data';
import BarDiagram from './components/ChartVente';
import iconAjout from './icon/icons8-ajouter-24.png';


function App() {
  const [barData, setBarData] = useState([]); // Initialisation à un tableau vide
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/VenteFarany/VenteServ')
      .then(response => {
        console.log(response);

        const newBarData = [
          response.data.minPrix,
          response.data.maxPrix,
          response.data.montantTotal,
        ];

        setBarData(newBarData);
      })
      .catch(error => {
        console.log(error);
        setErrorMessage('Error retrieving data');
      });
  }, []);

  return (
    <div className="App">
      <div className='titre'>Gestion Vente</div>
      <div className="AppMain">
        <div className='listeMain'>
        <div className='liste'><PostList /></div>
        </div>
        <div className='reste'>
        <div className='ajout'><PostForm1 /></div>
        <div className='data'><Data /></div>
        <div className='diagram'><BarDiagram data={barData}  labels={['Prix min', 'Prix max', 'Montant']}/></div>
        </div>
      </div>
      
    </div>
  );
}

export default App;
