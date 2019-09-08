import http from '../request.js'

export default {
  //打印
  printIbsAccount (params) {
    return new Promise((resolve, reject) => {
      http.post('/customer_service/account_management/printIbsAccount', params)
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

  //户号校验
  searchIbsAccountName (params) {
    return new Promise((resolve, reject) => {
      http.post('/customer_service/account_management/searchIbsAccountName', params)
        .then((res) => {
          console.log(res)
          if (res.status === 'success') {
            resolve(res)
          } else {
            reject(res)
          }
        })
    })
  },
  //账户列表分页查询
  searchIbsAccountBypage (params) {
    return new Promise((resolve, reject) => {
      http.post('/customer_service/account_management/searchIbsAccountBypage', params)
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
  
  //查询标红条数
  searchTheUserAudit (params) {
    return new Promise((resolve, reject) => {
      http.post('/customer_service/account_management/searchTheUserAudit', params)
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
  
  //添加用户-开户
  addIbsAccount (params) {
    return new Promise((resolve, reject) => {
      http.post_file('/customer_service/account_management/addIbsAccount', params)
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
  
  //添加用户-绑定设备
  addIbsAccountItem (params) {
    return new Promise((resolve, reject) => {
      http.post('/customer_service/account_management/addIbsAccountItem', params)
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
  
  //未绑定设备显示
  searchIbsItemNotConnect (params) {
    return new Promise((resolve, reject) => {
      http.post('/customer_service/account_management/searchIbsItemNotConnect', params)
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

  //查询当前账户所有设备
  searchIbsItemConnectAndAll (params) {
    return new Promise((resolve, reject) => {
      http.post('/customer_service/account_management/searchIbsItemConnectAndAll', params)
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
  
  //根据当前单号查询账户信息
  getIbsAccountByApplyNum (params) {
    return new Promise((resolve, reject) => {
      http.post('/customer_service/account_management/getIbsAccountByApplyNum', params)
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
  
  
  //根据id修改当前账户信息
  updateIbsAccount (params) {
    return new Promise((resolve, reject) => {
      http.post_file('/customer_service/account_management/updateIbsAccount', params)
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
  
  //设备回显-根据用户id
  searchIbsItemConnect (params) {
    return new Promise((resolve, reject) => {
      http.post('/customer_service/account_management/searchIbsItemConnect', params)
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
  
  //绑定设备修改
  updateIbsAccountItem (params) {
    return new Promise((resolve, reject) => {
      http.post('/customer_service/account_management/updateIbsAccountItem', params)
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
  
  //获取服务单编号
  getApplyNum (params) {
    return new Promise((resolve, reject) => {
      http.post('/customer_service/account_management/getApplyNum', params)
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
  
  //账户申请变更信息查询
  searchTheUserAuditByAccountId (params) {
    return new Promise((resolve, reject) => {
      http.post('/customer_service/account_management/searchTheUserAuditByAccountId', params)
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
  
  //审核通过
  updateIbsAccountByAudit (params) {
    return new Promise((resolve, reject) => {
      http.post('/customer_service/account_management/updateIbsAccountByAudit', params)
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
  
  //审核驳回
  updateTheUserAuditById (params) {
    return new Promise((resolve, reject) => {
      http.post('/customer_service/account_management/updateTheUserAuditById', params)
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
  
  //销户
  deleteIbsAccount (params) {
    return new Promise((resolve, reject) => {
      http.post('/customer_service/account_management/deleteIbsAccount', params)
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
}