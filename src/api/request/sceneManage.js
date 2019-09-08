import http from '../request.js'

export default {
  //根据户号查询账户信息
  searchAccountByName (params) {
    return new Promise((resolve, reject) => {
      http.post('/customer_service/apply_scene/searchAccountByName', params)
        .then((res) => {
          if (res.status === 'success') {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
    })
  },
  //现场维修申报
  addIbsApply (params) {
    return new Promise((resolve, reject) => {
      http.post('/customer_service/apply_scene/addIbsApply', params)
        .then((res) => {
          if (res.status === 'success') {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
    })
  },
  //现场停复机添加
  addOnOffApply (params) {
    return new Promise((resolve, reject) => {
      http.post('/customer_service/switch_on_off/addOnOffApply', params)
        .then((res) => {
          if (res.status === 'success') {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
    })
  },
}