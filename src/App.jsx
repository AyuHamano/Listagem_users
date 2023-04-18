import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App () { //importar componente
  const [loading, setLoading] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchType, setSearchType] = useState("");


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


  const resultado_busca = (usuarios.filter((value) => {
          if (searchTitle === "") {
            return value;
          } else if (
            Object.values(value).some(value => value.toString().toLowerCase().includes(searchTitle.toLowerCase())
          )) 
          {
            return value;
          }
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

        <select name ='filtro' value = {searchType} id="filtro" onChange={(e) => setSearchType(e.target.value)}>
          <option value="Nome Completo">Nome Completo</option>
          <option value="Nome Social">Nome Social</option>
          <option value="Email">Email</option>
        </select>

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
        resultado_busca.map((item) => 
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