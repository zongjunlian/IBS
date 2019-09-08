import http from '../request'
export default {
  //分页查询所有采集器
  getAllIbsCollectorDTOByConditon (params) {
    return new Promise((resolve, reject) => {
      http.post('/energy_manager/collertor_manager/getAllIbsCollectorDTOByConditon', params)
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
  //根据id查单个采集器
  getIbsCollectorDTOById (params) {
    return new Promise((resolve, reject) => {
      http.post('/energy_manager/collertor_manager/getIbsCollectorDTOById', params)
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
  //查询所有品牌
  getAllBrandList (params) {
    return new Promise((resolve, reject) => {
      http.post('/energy_manager/collertor_manager/getAllBrandList', params)
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
  //保存采集器
  saveIbsCollector (params) {
    return new Promise((resolve, reject) => {
      http.post('/energy_manager/collertor_manager/saveIbsCollector', params)
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
  //查询建筑
  getAllIbsBuildingIdAndNameList (params) {
    return new Promise((resolve, reject) => {
      http.post('/building_manager/building/getAllIbsBuildingIdAndNameList', params)
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
  //更新采集器
  updateIbsCollector (params) {
    return new Promise((resolve, reject) => {
      http.post('/energy_manager/collertor_manager/updateIbsCollector', params)
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
  //统计采集器总数
  countCollectorNum (params) {
    return new Promise((resolve, reject) => {
      http.post('/energy_manager/collertor_manager/countCollectorNum', params)
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
  //采集器编号查询是否重复
  checkCollectorCode (params) {
    return new Promise((resolve, reject) => {
      http.post('/energy_manager/collertor_manager/checkCollectorCode', params)
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

  //采集器编号查询是否重复
  deleteIbsCollectorById (params) {
    return new Promise((resolve, reject) => {
      http.post('/energy_manager/collertor_manager/deleteIbsCollectorById', params)
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

  //根据id获取所有仪表
  searchIbsMeterList (params) {
    return new Promise((resolve, reject) => {
      http.post('/energy_manager/collertor_manager/searchIbsMeterList', params)
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

  //根据id获取已关联仪表
  searchIbsMeterByCollectorId (params) {
    return new Promise((resolve, reject) => {
      http.post('/energy_manager/collertor_manager/searchIbsMeterByCollectorId', params)
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

  //更新当前采集器仪表
  updateIbsMeterCollectorIdById (params) {
    return new Promise((resolve, reject) => {
      http.post('/energy_manager/collertor_manager/updateIbsMeterCollectorIdById', params)
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