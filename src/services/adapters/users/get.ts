import axios from '../axiosConfiguration'

const getUsersDataAxios = (page: number, limit: number) => {
    /* Url de consulta */
    const url = `/user?page=${page}&limit=${limit}`
    /* Peticion GET a la API */
    const res = axios.get(url)
    return res
}

export default getUsersDataAxios
