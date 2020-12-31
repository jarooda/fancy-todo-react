import axios from '../config/axios'

const FETCHDATA = (access_token) => {
  const promise = new Promise((res, rej) => {
    axios({
      method: 'get',
      url: '/todos',
      headers: {
        access_token
      }
    }).then(({data}) => {
      res(data)
    }).catch(err => {
      rej(err)
    })
  })
  return promise
}

const API = {
  FETCHDATA
}

export default API