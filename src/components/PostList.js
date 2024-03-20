import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom';
import axios from 'axios';
import iconDelete from '../icon/icons8-supprimer-24.png';
import iconUpdate from '../icon/icons8-stylo-au-carré-32.png';
import iconClose from '../icon/icons8-effacer-30.png';

class PostList extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         ventes:[],
         errorMessage:'',
         selectedVente:null
    }
  }
    
    componentDidMount(){
        axios.get('http://localhost:8080/VenteFarany/VenteServlet')
        .then(response=>{
            console.log(response);

            this.setState({
              ventes: response.data
            });
        })
        .catch(error=>{
           console.log(error)
           this.setState({errorMessage:'Error retrieving data'})
        })
    }
    changeHandler = (e) =>{
      const { selectedVente } = this.state;
      const updatedVente = { ...selectedVente, [e.target.name]: e.target.value };
  
      console.log('Input changed:', e.target.name, e.target.value);
      this.setState({
       selectedVente: updatedVente,
  });
  }

    DeleteVente=(numProduit)=>{
        // Envoyer la requête Axios avec numProduit
        axios.delete(`http://localhost:8080/VenteFarany/VenteServlet?numProduit=${numProduit}`)
          .then((response) => {
            console.log(response)
            window.location.reload();
          })
          .catch((error) => {
            console.error('Une erreur est survenue:', error);
          });
      };

    UpdateVente=(vente)=>{
    const divUpdate= document.getElementById('modiform');
    divUpdate.style.display="block";

      this.setState({ selectedVente: vente });

      // Accéder aux éléments du formulaire par leur ID ou nom
      const numProduitInput=document.getElementById('numProduit');
      const designInput = document.getElementById('design');
      const prixInput = document.getElementById('prix');
      const quantiteInput = document.getElementById('quantite');
    
      // Modifier le placeholder et la valeur
      numProduitInput.placeholder=vente.numProduit;
      numProduitInput.value=vente.numProduit;
      designInput.placeholder = vente.design;
      designInput.value = vente.design;
      prixInput.placeholder = vente.prix;
      prixInput.value = vente.prix;
      quantiteInput.placeholder = vente.quantite;
      quantiteInput.value = vente.quantite;
    };

    close=()=>{
      var modiform=document.getElementById('modiform');
      modiform.style.display="none";
    }

    submitHandler = (e) =>{
      e.preventDefault()
      console.log(this.state.selectedVente)


      const headers = {
        'Content-Type': 'application/json' // Adjust based on your data format
      };
  
      const config = {
        headers,
        'X-Requested-With': 'XMLHttpRequest' // Optional CORS hint
      };
  
      axios.put('http://localhost:8080/VenteFarany/VenteServlet', this.state.selectedVente, config)
      .then(response=> {
        console.log(response)
        window.location.reload();
      } )
      .catch(error => {
        console.log(error)
      } )
      
  }
     

  render() {
    const {ventes, errorMessage, selectedVente}= this.state
    return (
      <div className='main'>
        <div className='tabListe'>
        <table>
            <tr>
                <td>Numero Produit</td>
                <td>Design</td>
                <td>Prix</td>
                <td>Quantite</td>
                <td>Montant</td>
                <td>Action</td>
            </tr>
            {
                ventes.length?
                ventes.map(vente => 
            <tr>
                <td>{vente.numProduit} </td>
                <td>{vente.design} </td>
                <td>{vente.prix} </td>
                <td>{vente.quantite}</td>
                <td>{vente.prix*vente.quantite}</td>
                <td>
                <img src={iconUpdate} alt="modifier" onClick={()=>this.UpdateVente(vente)}/>
                <img className="deleteButton" src={iconDelete} alt='supprimer'  onClick={()=>this.DeleteVente(vente.numProduit)}/>
                </td>
            </tr>
             ):null}
        </table>

        {errorMessage?<div>{errorMessage}</div>:null} 
        </div>
        <div className='modiform' id='modiform'>
        <img id="closeIcon" src={iconClose} alt='close' onClick={this.close}/>
        <form onSubmit={this.submitHandler}>
              <div>
                <input type='hidden' name='numProduit' value={this.state.numProduit} id='numProduit' />
              </div>
              <div>
                 Designation: <input type="text" name="design" value={this.state.design} onChange={this.changeHandler} id='design'/>
              </div>
              <div>
                  Prix:<input type="text" name="prix" value={this.state.prix} onChange={this.changeHandler} id='prix'/>
              </div>
              <div>
                  Quantite:<input type="text" name="quantite" value={this.state.quantite} onChange={this.changeHandler} id='quantite'/>
              </div>
              <button type='submit' className='buttonSubmit' onClick={this.close}>Enregistrer</button>
          </form>
        </div>
      </div>
    )
  }
}

export default PostList
