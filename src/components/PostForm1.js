import React, { Component, useState } from 'react'
import axios from 'axios';
import iconAjout from '../icon/icons8-ajouter-24.png';
import iconClose from '../icon/icons8-effacer-30.png';
class PostForm1 extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       design:'',
       prix:0,
       quantite:0
    }
      
  }
  
  changeHandler = (e) =>{
      this.setState({
          [e.target.name]: e.target.value
      })
  }
 
  submitHandler = (e) =>{
      e.preventDefault()
      console.log(this.state)

      const headers = {
        'Content-Type': 'application/json' // Adjust based on your data format
      };
  
      const config = {
        headers,
        'X-Requested-With': 'XMLHttpRequest' // Optional CORS hint
      };
  
      axios.post('http://localhost:8080/VenteFarany/VenteServlet', this.state, config)
      .then(response=> {
        console.log(response)
        window.location.reload();
      } )
      .catch(error => {
        console.log(error)
      } )
      
  }

  close=()=>{
    var addform=document.getElementById('addform');
    addform.style.display="none";
  }
  open=()=>{
    var addform=document.getElementById('addform');
    addform.style.display="block";
  }
     
    render() {
      const {design, prix, quantite} = this.state
      return (
        <div>
           <img className='boutonAjout'src={iconAjout} alt="ajout" onClick={this.open}/>
           <div  className='addform' id='addform'>
           <img id="closeIcon" src={iconClose} alt='close' onClick={this.close}/>
          <form onSubmit={this.submitHandler}>
              <div>
                 Designation: <input type="text" name="design" value={design} onChange={this.changeHandler}/>
              </div>
              <div>
                  Prix:<input type="text" name="prix" value={prix} onChange={this.changeHandler}/>
              </div>
              <div>
                  Quantite:<input type="text" name="quantite" value={quantite} onChange={this.changeHandler}/>
              </div>
              <button type='submit' className='buttonSubmit' onClick={this.close}>Ajouter</button>
          </form>
          </div>
        </div>
      )
    }
}

export default PostForm1
