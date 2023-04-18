import axios from 'axios'

const api = axios.create ({
    baseURL: 'https://dev.labtime.ufg.br/selecao-2023/usuarios' 
})

export default api