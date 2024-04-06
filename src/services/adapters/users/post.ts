import axios from '../axiosConfiguration'

const postUserAxios = (newUser: { firstName: string, email: string, lastName: string, title: string }) => {
    const url = `/user/create`
    const res = axios.post(url, newUser)
    return res
}

export default postUserAxios
