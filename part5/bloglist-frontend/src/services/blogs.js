import axios from 'axios'
const baseUrl = '/api/blogs'

// const config = {
//   headers: { Authorization: `Bearer ${token}` }
// };

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async (newBlog, token) => {
    const request = await axios.post(baseUrl, newBlog, {headers: {Authorization: `Bearer ${token}`}})
    return request.data

  }



export default { getAll, createBlog }