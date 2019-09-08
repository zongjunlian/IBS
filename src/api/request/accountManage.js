import http from '../request.js'

export default {
  //未处置申报, 处置中申报 ,已完成申报
  searchIbsApplyBypage (params) {
    return new Promise((resolve, reject) => {
      http.post('/customer_service/account_apply/searchIbsApplyBypage', params)
        .then((res) => {
          console.log(res.status)
          if (res.status === 'success') {
            resolve(res)
          } else {
            reject(res)
          }
        })
    })
  },

  //账户申报列表各个状态数量
  searchApplyNumByStatus (params) {
    return new Promise((resolve, reject) => {
      http.post('/customer_service/account_apply/searchApplyNumByStatus', params)
        .then((res) => {
          console.log(res.status)
          if (res.status === 'success') {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
    })
  },
}