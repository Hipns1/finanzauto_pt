import axios from '../axiosConfiguration'

const getIndividualUserAxios = (id: string) => {
    const url = `/user/${id}`
    const res = axios.get(url)
    return res
}

export default getIndividualUserAxios
