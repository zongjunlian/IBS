import http from '../request'

export default {
  login (params) {
    return new Promise((resolve, reject) => {
      http.post('/login', params)
        .then((res) => {
          if (res.status === 'success') {
            resolve(res)
          } else {
            reject(res)
          }
        })
    })
  },
}