import axios, { AxiosInstance } from 'axios'
const axiosClient = new Map<String, AxiosInstance>()
/* Esta URL base, deberia estar en una variable de entorno .env*/
const baseUrl = 'https://dummyapi.io/data/v1/'

axiosClient.set(
  'finanzauto',
  axios.create({
    baseURL: baseUrl,
    headers: {
      "app-id": "6610f56919afa85a7d909db0"
    }
  }),
)

const get = async (url: string, headers = {}, params = {}) => {
  const response = await axiosClient.get('finanzauto').get(url, {
    headers,
    params,
  })
  return response.data
}
const del = async (url: string, headers = {}, params = {}) => {
  const response = await axiosClient.get('finanzauto').delete(url, {
    headers,
    params,
  });
  return response.data;
};

const post = async (url: string, body = {}, headers = {}) => {
  const response = await axiosClient.get('finanzauto').post(url, body, { headers })
  return response.data
}

const put = async (url: string, body = {}, headers = {}) => {
  const response = await axiosClient.get('finanzauto').put(url, body, {
    headers,
  })
  return response.data
}



const exportedObject = {
  get,
  post,
  put,
  del
};

export default exportedObject