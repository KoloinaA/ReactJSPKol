import React, { Component } from 'react'
import axios from 'axios'

export class Data extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         minPrix:0,
         maxPrix:0,
         montantTotal:0
      }
    }
    componentDidMount(){
        axios.get('http://localhost:8080/VenteFarany/VenteServ')
        .then(response=>{
            console.log(response);

            this.setState({
              minPrix:response.data.minPrix,
              maxPrix:response.data.maxPrix,
              montantTotal:response.data.montantTotal
            });
        })
        .catch(error=>{
           console.log(error)
           this.setState({errorMessage:'Error retrieving data'})
        })
    }
  render() {
    return (
      <div className='DataList'>
           <div className='box A'>
            <div className='prixLegende'>Prix Minimal:</div> 
            <div className='prix'>{this.state.minPrix} Ariary</div>
            </div>
           <div className='box B'>
            <div className='prixLegende'>Prix Maximal: </div>
            <div className='prix'>{this.state.maxPrix} Ariary</div>
            </div>
           <div className='box C'>
            <div className='prixLegende'>Montant Total:</div>
            <div className='prix'>{this.state.montantTotal} Ariary</div>
            </div>
      </div>
    )
  }
}

export default Data
