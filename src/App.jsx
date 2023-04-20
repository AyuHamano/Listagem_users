import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import axios from 'axios'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

function App () { 
  const [loading, setLoading] = useState(false); 
  const [usuarios, setUsuarios] = useState([]); //const que recebe valores da api
  const [searchTitle, setSearchTitle] = useState(""); //recebe os valores digitados
  const [searchType, setSearchType] = useState(""); //recebe o valor selecionado na no select
  const [columnDefs, setColumnDefs] = useState([
    {field: 'codigo', headerName: 'id', width: 66},
    {field: 'nomeCompleto', headerName: 'Nome Completo', width: 200, resizable: true},
    {field: 'nomeSocial', width: 130},
    {field: 'dataDeNascimento', headerName: 'Nascimento', width: 150},
    {field: 'sexo', width: 82},
    {field: 'numeroDeAcessos', headerName: 'Acessos', width: 100},
    {field: 'estado', width: 130},
    {field: 'municipio', headerName: 'Cidade', width: 140},
    {field: 'dataDeVinculo', headerName: 'Vínculo', width: 120},
    {field: 'email', width: 150, resizable: true},
    {field: 'situacao', headerName: 'Status', width: 110}
]); //recebe o nome das colunas da tabela no ag grid


  //realiza conexão com a api e set os seus valores em "usuarios"
  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      const response = await axios.get("https://dev.labtime.ufg.br/selecao-2023/usuarios");
      setUsuarios(response.data);
      setLoading(false);
    };
    loadUsers()
    }, []);

  
  
  const resultado = (usuarios.filter((value) => {
          if (searchTitle === "" || searchType === "") {
            return value;
          }
          else if (value[searchType].toLowerCase().includes(searchTitle.toLowerCase())) {
            return value;
          }
          console.log(value[searchType])
  }))

  //teste ag grid
  const defaultColDef = useMemo(() => ({
    sortable: true, //ordenar
    filter: true 
  }), []);

  const tamanhoPagina = 8; //tamanho da página
  

  return (
    <div className="container">

      <nav className='navigation'>
          
          <div className ="nav-logo">
            <a href='https://www.labtime.ufg.br/site/#/'>
              <img id='logo' src="img/marca_labtime.png" alt="logo"/>
            </a>
          </div>
          <h1>Listas de Usuários</h1>
          <ul>
            <a href=""><li>Contato</li></a>
            <a href=""><li>Sobre</li></a>
            
          </ul>
        
      </nav>
      
      <div className="busca">
      <div className="busca-select">
          
          <select name ='filtro' id="busca-filtro" onChange={(e) => setSearchType(e.target.value)}>
            <option value= "Filtrar">Filtrar</option>
            <option value="nomeCompleto">Nome Completo</option>
            <option value="nomeSocial">Nome Social</option>
            <option value="email">Email</option>
          </select>

      </div>     

      <div className="input">
        <input type="search" placeholder='Pesquisar' id='busca-campo' onChange={(e) =>   setSearchTitle(e.target.value)}/>
      </div>

      

      </div>
          
          {console.log(searchType)} 
      


     <div id="myGrid" className='ag-theme-alpine' style={{height: 500, width: 1365.5, fontSize: 13}}>

            <AgGridReact
                //ref={gridRef}
                columnDefs={columnDefs}
                rowData={resultado} //o objeto ja vem filtrado para tabela de buscas
                defaultColDef={defaultColDef}
                animateRows={true}
                rowSelection='multiple'
                pagination={true} 
                paginationPageSize={tamanhoPagina}
                rowGroupPanelShow={'always'}
                pivotPanelShow={'always'}/>
        </div>

        <div className="sobre">
          <h1>Sobre o Projeto</h1>
          <p>Email: ddd@labtimw.ufg.br</p>
        </div>

        <div id="footer">
          <p>Email: ddd@labtimw.ufg.br</p>
          <p>telefone; 64 7888888</p>
        </div>

    </div>    
  )
}
export default App