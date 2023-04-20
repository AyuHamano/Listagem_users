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
    {field: 'nomeSocial', width: 140},
    {field: 'dataDeNascimento', headerName: 'Nascimento', width: 140},
    {field: 'sexo', width: 85},
    {field: 'numeroDeAcessos', headerName: 'Acessos', width: 110},
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

  const gridRef = useRef();
  

  return (
    <div>

      <header>
          <div className ="container">
            <a href='https://www.labtime.ufg.br/site/#/'>
              <img src="img/marca_labtime.png" alt="logo"/>
            </a>
          </div>
      </header>
      

      <section className='hero'>

        <h1>Cadastros de Usuários</h1>
        <div className="container">

          

          <div className="busca">

            <select name ='filtro' id="busca-filtro" onChange={(e) => setSearchType(e.target.value)}>
              <option value= "">Filtros</option>
              <option value="nomeCompleto">Nome Completo</option>
              <option value="nomeSocial">Nome Social</option>
              <option value="email">Email</option>

            </select>

          </div>     

          <div className="input-busca">

            <input type="search" placeholder='Selecione um filtro' onChange={(e) =>   setSearchTitle(e.target.value)}/>

          </div>

        </div>

      </section>
          
          {console.log(searchType)} 
      

    <div className="container">
      <div id="myGrid" className='ag-theme-alpine' style={{height: 450, width: 1200, fontSize: 13}}>

            <AgGridReact
                ref={gridRef}
                onGridReady={params => (this.gridApi = params.api)}
                columnDefs={columnDefs}
                rowData={resultado} //o objeto ja vem filtrado para tabela de buscas
                defaultColDef={defaultColDef}
                animateRows={true}
                rowSelection='multiple'
                pagination={true} 
                paginationPageSize={tamanhoPagina}
                rowGroupPanelShow={'always'}
                pivotPanelShow={'always'}
                />

        </div>
        </div>
      </div>
  )
}
export default App