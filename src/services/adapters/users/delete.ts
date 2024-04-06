import axios from '../axiosConfiguration'

const deleteUserAxios = (id: string) => {
    const url = `/user/${id}`
    const res = axios.del(url)
    return res
}

export default deleteUserAxios
