import http from '../request.js'

export default {
  //报表在线生成
  addIbsReports (params) {
    return new Promise((resolve, reject) => {
      http.post('/energy_manager/reports/addIbsReports', params)
        .then((res) => {
          if (res.status === 'success') {
            resolve(res)
          } else {
            reject(res)
          }
        })
    })
  },

  //报表分页查询
  searchIbsReportsByPage (params) {
    return new Promise((resolve, reject) => {
      http.post('/energy_manager/reports/searchIbsReportsByPage', params)
        .then((res) => {
          if (res.status === 'success') {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
    })
  },
  //根据报表id查询当前信息
  searchIbsReportsById (params) {
    return new Promise((resolve, reject) => {
      http.post('/energy_manager/reports/searchIbsReportsById', params)
        .then((res) => {
          if (res.status === 'success') {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
    })
  },
  //根据报表id删除报表信息
  deleteIbsReportsById (params) {
    return new Promise((resolve, reject) => {
      http.post('/energy_manager/reports/deleteIbsReportsById', params)
        .then((res) => {
          if (res.status === 'success') {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
    })
  },
  //根据id修改报表信息
  updateIbsReportsById (params) {
    return new Promise((resolve, reject) => {
      http.post('/energy_manager/reports/updateIbsReportsById', params)
        .then((res) => {
          if (res.status === 'success') {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
    })
  },
    //报表模板分页查询
  searchIbsReportsModelByPage (params) {
    return new Promise((resolve, reject) => {
      http.post('/energy_manager/reports_model/searchIbsReportsModelByPage', params)
        .then((res) => {
          if (res.status === 'success') {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
    })
  },

  //添加报表模板
  addIbsReportsModel (params) {
    return new Promise((resolve, reject) => {
      http.post('/energy_manager/reports_model/addIbsReportsModel', params)
        .then((res) => {
          if (res.status === 'success') {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
    })
  },

  //根据id查询报表模板信息
  searchModelsById (params) {
    return new Promise((resolve, reject) => {
      http.post('/energy_manager/reports_model/searchModelsById', params)
        .then((res) => {
          if (res.status === 'success') {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
    })
  },
  //根据id删除报表模板信息
  deleteIbsReportsModelById (params) {
    return new Promise((resolve, reject) => {
      http.post('/energy_manager/reports_model/deleteIbsReportsModelById', params)
        .then((res) => {
          if (res.status === 'success') {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
    })
  },
  //根据id修改报表模板信息
  updateIbsReportsModelById (params) {
    return new Promise((resolve, reject) => {
      http.post('/energy_manager/reports_model/updateIbsReportsModelById', params)
        .then((res) => {
          if (res.status === 'success') {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
    })
  },
  //获取统计范围
  searchAllBuildingArea (params) {
    return new Promise((resolve, reject) => {
      http.post('/building_manager/building/searchAllBuildingArea', params)
        .then((res) => {
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

}