import http from '../request.js'

export default {
  //查询公告信息列表
  searchInformationList (params) {
    return new Promise((resolve, reject) => {
      http.post('/customer_service/notice_publish/searchInformationList', params)
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
  //添加或修改公告
  addOrUpdateInformation (params) {
    return new Promise((resolve, reject) => {
      http.post_file('/customer_service/notice_publish/addOrUpdateInformation', params)
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
  //查询公告数量
  searchInformationAmount (params) {
    return new Promise((resolve, reject) => {
      http.post('/customer_service/notice_publish/searchInformationAmount', params)
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
  //隐藏或恢复公告
  hideOrRecoverInformation (params) {
    return new Promise((resolve, reject) => {
      http.post('/customer_service/notice_publish/hideOrRecoverInformation', params)
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
  //查询公告内容
  searchInformationContent (params) {
    return new Promise((resolve, reject) => {
      http.post('/customer_service/notice_publish/searchInformationContent', params)
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
  //查询所有账户
   searchAllAccountIdAndName (params) {
    return new Promise((resolve, reject) => {
      http.post('/customer_service/notice_publish/searchAllAccountIdAndName', params)
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
  //修改回显
   searchInformationById (params) {
    return new Promise((resolve, reject) => {
      http.post('/customer_service/notice_publish/searchInformationById', params)
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