import React from 'react';
import './App.css';

import './lib/api';
import api from './lib/api';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      modalActivo: false,
      personajes: [],
      idPersonajeSeleccionado: []
    }
  }

  activivarModal(id) {
    api.getCharactersById(id)
    .then(personaje => {
      this.setState({
        modalActivo: true,
        personajeSeleccionado: personaje
      })
    })
  }

  desactivarModal(){
    this.setState({
      modalActivo: false
    })
  }

  componentDidMount(){
    api.getAllCharacters()
    .then(results => {
      this.setState({
        personajes: results
      })
    })
    .catch(e => console.error(e))
  }




  renderCards(p) {
    return (
      <div key={p.id} className="card" onClick={personaje => this.activivarModal(p.id)}>
        <div className="card-image">
          <figure>
            <img src={p.image} alt="" />
          </figure>
        </div>
        <div className="card-description">
          <div className="card-tittle">
            <div className="card-name">
              <h3>{p.name}</h3>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {

    const { modalActivo, personajes} = this.state
    const cards = personajes.map(p => this.renderCards(p))
    console.log(this.state.personajeSeleccionado);
    
    return (
      <div className="App">
        <div className="App-contenedor">
          <h1>Rick and Morty</h1>
          <div className="cards-container" >
            {cards}
          </div>
          {modalActivo ? (
            <div className="modal" onClick={e => this.desactivarModal()} >
              <div className="card-detalle">
                <div className="card-image">
                  <figure>
                    <img src={this.state.personajeSeleccionado.image} alt="" />
                  </figure>
                </div>
                <div className="card-detalle-description">
                  <div className="description">
                    <h3>{this.state.personajeSeleccionado.name}</h3>

                    <div className="caracteristica">
                      <p>Estatus:</p>
                      <p className="valor">{this.state.personajeSeleccionado.status}</p>
                    </div>
                  
                    <div className="caracteristica">
                      <p>Especie</p>
                      <p className="valor">{this.state.personajeSeleccionado.species}</p>
                    </div>

                    <div className="caracteristica">
                      <p>Genero</p>
                      <p className="valor">{this.state.personajeSeleccionado.gender}</p>
                    </div>

                    <div className="caracteristica">
                      <p>Origen</p>
                      <p className="valor">{this.state.personajeSeleccionado.origin.name}</p>
                    </div>

                    <div className="caracteristica">
                      <p>Last location:</p>
                      <p className="valor">{this.state.personajeSeleccionado.location.name}</p>
                    </div>
                  
                  
                  
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

      </div>
    );
  }
}



export default App;
