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

const FETCHBYID = (payload) => {
  const promise = new Promise((res, rej) => {
    axios({
      method: 'get',
      url: '/todos/' + payload.id,
      headers: {
        access_token: payload.access_token
      }
    }).then(({data}) => {
      res(data)
    }).catch(err => {
      rej(err)
    })
  })
  return promise
}

const DELETEDATA = (payload) => {
  const promise = new Promise((res, rej) => {
    axios({
      method: 'delete',
      url: '/todos/' + payload.id,
      headers: {
        access_token: payload.access_token 
      }
    }).then(({data}) => {
      res(data)
    }).catch(err => {
      rej(err)
    })
  })
  return promise
}

const ADDDATA = (payload) => {
  const promise = new Promise((res, rej) => {
    axios({
      method: 'post',
      url: '/todos',
      headers: {
        access_token: payload.access_token
      },
      data: {
        title: payload.title,
        description: payload.description,
        due_date: payload.due_date
      }
    }).then(({data}) => {
      res(data)
    }).catch(err => {
      rej(err)
    })
  })
  return promise
}

const PUTDATA = (payload) => {
  const promise = new Promise((res, rej) => {
    axios({
      method: 'put',
      url: '/todos/' + payload.id,
      headers: {
        access_token: payload.access_token
      },
      data: {
        title: payload.title,
        description: payload.description,
        due_date: payload.due_date,
        status: payload.status
      }
    }).then(({data}) => {
      res(data)
    }).catch(err => {
      rej(err)
    })
  })
  return promise
}

const PATCHDATA = (payload) => {
  const promise = new Promise((res, rej) => {
    axios({
      method: 'patch',
      url: '/todos/' + payload.id,
      headers: {
        access_token: payload.access_token
      },
      data: {
        status: payload.status
      }
    }).then(({data}) => {
      res(data)
    }).catch(err => {
      rej(err)
    })
  })
  return promise
}

const GETWEATHER = (payload) => {
  const promise = new Promise((res, rej) => {
    axios({
      method: 'get',
      url: '/weathers',
      headers: {
        access_token: payload.access_token,
        latitude: payload.latitude,
        longitude: payload.longitude
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
  FETCHDATA,
  FETCHBYID,
  DELETEDATA,
  ADDDATA,
  PUTDATA,
  PATCHDATA,
  GETWEATHER
}

export default API