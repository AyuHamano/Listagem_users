import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid';


function App () { //importar componente
  const [loading, setLoading] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchType, setSearchType] = useState("");
  const [result, setResult] = useState("");


  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      const response = await axios.get(
        "https://dev.labtime.ufg.br/selecao-2023/usuarios"
      );
      setUsuarios(response.data);
      setLoading(false);
    };

    loadUsers();
  }, []);


  const resultado = (usuarios.filter((value) => {
          if (searchTitle === "" || searchType === "") {
            return value;
          }

          else if (
            value[searchType].toLowerCase().includes(searchTitle.toLowerCase())
          )
          {
            return value;
          }
          console.log(value[searchType])
        }))

  return (
    <div className="w-3 container">

      <nav className='navigation'>
        <a href="https://www.labtime.ufg.br/site">
          <img id='logo' src="img/marca_labtime.png" alt="logo"/>
        </a>
      </nav>

      <form className='busca'>
        <label id='titulo' htmlFor="search">Cadastros de usuários</label>
        <input type="search" placeholder='Pesquisar' id='search-board' onChange={(e) => setSearchTitle(e.target.value)}/>

        <select name ='filtro' id="filtro" onChange={(e) => setSearchType(e.target.value)}>
            
              <option value="nomeCompleto">Nome Completo</option>
              <option value="nomeSocial">Nome Social</option>
              <option value="email">Email</option>

          
        </select>
        {console.log(searchType)}
      </form>

      <p id='line'></p>
      <tr className="categorias">
        <tr>
          <th>Código</th>
          <th>Nome</th>
          <th>Nome Social</th>
          <th>Nascimento</th>
          <th>Sexo</th>
          <th>Acessos</th>
          <th>Estado</th>
          <th>Município</th>
          <th>Vínculo</th>
          <th>Email</th>
          <th>Situação</th>
          </tr>

      
      
      {loading ? (
      <h4>Loading page ...</h4>
    ) : (
        resultado.map((item) => 
          <tr key={item.codigo}>
          <th>{item.codigo}</th>
          <th>{item.nomeCompleto}</th>
          <th>{item.nomeSocial}</th>
          <th>{item.dataDeNascimento}</th>
          <th>{item.sexo}</th>
          <th>{item.numeroDeAcessos}</th>
          <th>{item.estado}</th>
          <th>{item.municipio}</th>
          <th>{item.dataDeVinculo}</th>
          <th>{item.email}</th>
          <th>{item.situacao}</th>
          </tr>)
    )}
     </tr>
    </div>    
  )
}
export default App