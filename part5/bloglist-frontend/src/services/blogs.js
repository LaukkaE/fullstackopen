import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
    token = newToken;
};

const getAll = async () => {
    const request = await axios.get(baseUrl);
    return request.data;
};

const createBlog = async (newBlog) => {
    const request = await axios.post(baseUrl, newBlog, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return request.data;
};

const updateBlog = async (id, newObject) => {
    const request = await axios.put(`${baseUrl}/${id}`, newObject);
    return request.data;
};
const deleteBlog = async (id) => {
    const request = await axios.delete(`${baseUrl}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return request.data;
};

export default { getAll, createBlog, updateBlog, setToken, deleteBlog };
