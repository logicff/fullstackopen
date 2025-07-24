import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries'

const getAll = () => {
  const getAllAPI = `${baseUrl}/api/all`
  const request = axios.get(getAllAPI)
  return request.then(response => response.data)
}

export default { 
  getAll: getAll
}