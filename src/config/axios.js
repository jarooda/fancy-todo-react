import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://jarooda-fancy-todo.herokuapp.com'
});

export default instance