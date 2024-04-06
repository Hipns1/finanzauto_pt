import axios from '../axiosConfiguration'

const putUserAxios = (id: string, userData) => {
    const url = `/user/${id}`
    const res = axios.put(url, userData)
    return res
}

export default putUserAxios
