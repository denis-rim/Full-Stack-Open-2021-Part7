import axios from 'axios'
export const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const getBlogById = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then((response) => response.data)
}

const create = async (newObject, token) => {
  const tokeWithBearer = `bearer ${token}`
  const config = {
    headers: { Authorization: tokeWithBearer },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const like = async (id, likedBlog) => {
  const request = axios.put(`${baseUrl}/${id}`, likedBlog)
  return request.then((response) => response.data)
}

const remove = async (id, token) => {
  const tokeWithBearer = `bearer ${token}`
  const config = {
    headers: { Authorization: tokeWithBearer },
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const addComment = async (blogId, content) => {
  const request = axios.post(`${baseUrl}/${blogId}/comments`, content)
  return request.then((response) => response.data)
}

export default { getAll, getBlogById, create, like, remove, addComment }
