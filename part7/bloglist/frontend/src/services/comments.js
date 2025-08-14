import axios from 'axios'
import loginService from './login'
const baseUrl = (blogid) => `/api/blogs/${blogid}/comments`

const create = async (blogid, newObject) => {
  const config = {
    headers: { Authorization: loginService.getToken() },
  }
  const response = await axios.post(baseUrl(blogid), newObject, config)
  return response.data
}

export default { create }
