import { useState } from 'react'
import React, {Component} from 'react';
import './App.css'
import axios from 'axios'
import api from './services/api'

class App extends Component { //importar componente

  state = {
    usuarios: [],
  }

  async componentDidMount() {
    const response = await axios.get('')
    this.setState({ usuarios: response.data }) //setando valores
    console.log(response.data) //teste pra ver se deu certo
    console.log(this.state.busca)
  }

  leUsuario = e => {
    this.setState({ busca: e.target.value });
  };

 //listagem de elementos
 render() {
  const { usuarios } = this.state
  //a funcao map vai percorrer os dados
  return (
    <div>
      <nav className = "navigation">
        <a href="https://www.labtime.ufg.br/site/#/">
          <img id ='logo' src="img\marca_labtime.png" alt="imagem"/>
        </a>
        <h1 id='titulo'>Buscar Cadastros de filme</h1>
        <a href=""><li>Cadastros de Usuários</li></a>
        <a href="#contatos"><li>Contato</li></a>
        
      </nav>

      <div className="search-box">
        <input 
          id='barra-pesquisa' 
          value = {this.state.busca}
          type="text" 
          placeholder='Pesquisar'
          onChange={this.leUsuario}
        />
          <button type='submit'><a href="img/lupa.png"></a></button>          
      </div>
  
      <section>
      
      <div className="categorias">
          <strong>Código: </strong>
          <strong>Nome: </strong>
          <strong>Data de Nascimento: </strong>
          <strong>Sexo: </strong>
          <strong>Email: </strong>
          <strong>Acessos: </strong>
          <strong>Situação: </strong>
      </div>
      
      {usuarios.map((usuario) => (
        <p key={usuario.codigo}>
          <li>{usuario.codigo} {usuario.nomeCompleto} {usuario.dataDeNascimento} {usuario.sexo} {usuario.email} {usuario.numeroDeAcessos} {usuario.situacao}</li>
        </p>
      ))}
    </section>
    <footer id="contatos">Contato telefone 666666</footer>
    </div> 
  )
}
}
export default App