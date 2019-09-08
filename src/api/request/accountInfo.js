import http from '../request'
export default {
  //账户列表查询
  searchIbsAccountInfoBypage (params) {
    return new Promise((resolve, reject) => {
      http.post('/customer_service/account_query/searchIbsAccountInfoBypage', params)
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
  //用冷及费用
  searchIbsEnergyFeeByPage (params) {
    return new Promise((resolve, reject) => {
      http.post('/customer_service/account_query/searchIbsEnergyFeeByPage', params)
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

  //充值记录
  searchSpotCostByPage (params) {
    return new Promise((resolve, reject) => {
      http.post('/customer_service/account_query/searchSpotCostByPage', params)
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
  //分户/并户记录
  searchAccountChangeRecordByPage (params) {
    return new Promise((resolve, reject) => {
      http.post('/customer_service/account_query/searchAccountChangeRecordByPage', params)
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
    //电子发票
    searchSpotInvoiceByPage (params) {
    return new Promise((resolve, reject) => {
      http.post('/customer_service/account_query/searchSpotInvoiceByPage', params)
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
  //申报记录
  searchIbsApplyByPage (params) {
    return new Promise((resolve, reject) => {
      http.post('/customer_service/account_query/searchIbsApplyByPage', params)
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