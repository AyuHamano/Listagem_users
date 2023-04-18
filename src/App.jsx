import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import axios from 'axios'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'


function App () { //importar componente
  const [loading, setLoading] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchType, setSearchType] = useState("");
  const [columnDefs, setColumnDefs] = useState([
    {field: 'codigo'},
    {field: 'nomeCompleto'},
    {field: 'nomeSocial'},
    {field: 'dataDeNascimento'},
    {field: 'sexo'},
    {field: 'numeroDeAcessos'},
    {field: 'estado'},
    {field: 'municipio'},
    {field: 'dataDeVinculo'},
    {field: 'email'},
    {field: 'situacao'}
]);


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
  
  
  const pushMeClicked = useCallback(e => gridRef.current.api.deselectAll(), []);





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
            
              <option>Filtrar</option>
              <option value="nomeCompleto">Nome Completo</option>
              <option value="nomeSocial">Nome Social</option>
              <option value="email">Email</option>

          
        </select>
        {console.log(searchType)} 
      </form>


     <div className='ag-theme-alpine' style={{height: 500, width: 1280, marginTop: 200}}>
            <button onClick={pushMeClicked}>Push Me</button>
            <AgGridReact
                //ref={gridRef}
                columnDefs={columnDefs}
                rowData={resultado}
                defaultColDef={defaultColDef}
                animateRows={true}
                rowSelection='multiple'
            />
        </div>

    </div>    
  )
}
export default App