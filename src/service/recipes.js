/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
const baseUrl = "/api/recipes";
const quotesUrl = "/api/quotes"

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const deleteRecipe = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const getAllQuotes = () => {
  const request = axios.get(quotesUrl);
  return request.then((response) => response.data);
}

export default {
  getAll,
  create,
  update,
  deleteRecipe,
  getAllQuotes,
  setToken 
};
