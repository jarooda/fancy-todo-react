import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3001'
  // baseURL: 'https://jarooda-fancy-todo.herokuapp.com'
});

export default instance