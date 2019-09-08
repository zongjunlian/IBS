import http from '../request.js'

export default {
  //查询账户数量
  searchAccountAmount (params) {
    return new Promise((resolve, reject) => {
      http.post('/customer_service/switch_on_off/searchAccountAmount', params)
        .then((res) => {
          if (res.status === 'success') {
            resolve(res)
          } else {
            reject(res)
          }
        })
    })
  },
  //按账户统计
  searchAccountList (params) {
    return new Promise((resolve, reject) => {
      http.post('/customer_service/switch_on_off/searchAccountList', params)
        .then((res) => {
          if (res.status === 'success') {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
    })
  },

  //按设备统计
  searchItemList (params) {
    return new Promise((resolve, reject) => {
      http.post('/customer_service/switch_on_off/searchItemList', params)
        .then((res) => {
          if (res.status === 'success') {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
    })
  },

  //查询账户停复机历史
  searchOperationHistory (params) {
    return new Promise((resolve, reject) => {
      http.post('/customer_service/switch_on_off/searchOperationHistory', params)
        .then((res) => {
          if (res.status === 'success') {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
    })
  },

  //查询停复机预约
  searchOnOffList (params) {
    return new Promise((resolve, reject) => {
      http.post('/customer_service/switch_on_off/searchOnOffList', params)
        .then((res) => {
          if (res.status === 'success') {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
    })
  },
  //查询停复机预约申请数量
  searchOnOffAmount (params) {
    return new Promise((resolve, reject) => {
      http.post('/customer_service/switch_on_off/searchOnOffAmount', params)
        .then((res) => {
          if (res.status === 'success') {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
    })
  },
  //处置停复机预约
  updateOnOffStatus (params) {
    return new Promise((resolve, reject) => {
      http.post('/customer_service/switch_on_off/updateOnOffStatus', params)
        .then((res) => {
          if (res.status === 'success') {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
    })
  },
  //查询提醒规则
  searchNoticeRule (params) {
    return new Promise((resolve, reject) => {
      http.post('/customer_service/switch_on_off/searchNoticeRule', params)
        .then((res) => {
          if (res.status === 'success') {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
    })
  },
  //设置提醒规则
  addNoticeRule (params) {
    return new Promise((resolve, reject) => {
      http.post('/customer_service/switch_on_off/addNoticeRule', params)
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