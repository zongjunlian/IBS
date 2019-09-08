import http from '../request.js'

export default {
  //查询建筑
  searchBuildingList (params) {
    return new Promise((resolve, reject) => {
      http.post('/energy_manager/item_manager/searchBuildingList', params)
        .then((res) => {
          if (res.status === 'success') {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
    })
  },
  //查询建筑区域
  searchBuildingAreaList (params) {
    return new Promise((resolve, reject) => {
      http.post('/energy_manager/item_manager/searchBuildingAreaList', params)
        .then((res) => {
          if (res.status === 'success') {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
    })
  },
  //查询采集器
  searchCollectorList (params) {
    return new Promise((resolve, reject) => {
      http.post('/energy_manager/item_manager/searchCollectorList', params)
        .then((res) => {
          if (res.status === 'success') {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
    })
  },
  //查询仪表列表
  searchMeterList (params) {
    return new Promise((resolve, reject) => {
      http.post('/energy_manager/item_manager/searchMeterList', params)
        .then((res) => {
          if (res.status === 'success') {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
    })
  },
  //查询品牌
  searchBrandList (params) {
    return new Promise((resolve, reject) => {
      http.post('/energy_manager/item_manager/searchBrandList', params)
        .then((res) => {
          if (res.status === 'success') {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
    })
  },
  //查询设备基础信息
  searchItemById (params) {
    return new Promise((resolve, reject) => {
      http.post('/energy_manager/item_manager/searchItemById', params)
        .then((res) => {
          if (res.status === 'success') {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
    })
  },
  //添加/修改设备
  addOrUpdateItem (params) {
    return new Promise((resolve, reject) => {
      http.post('/energy_manager/item_manager/addOrUpdateItem', params)
        .then((res) => {
          if (res.status === 'success') {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
    })
  },
  //查询风机盘管数量
  searchItemAmount (params) {
    return new Promise((resolve, reject) => {
      http.post('/energy_manager/item_manager/searchItemAmount', params)
        .then((res) => {
          if (res.status === 'success') {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
    })
  },
  //查询风机盘管列表
  searchItemList (params) {
    return new Promise((resolve, reject) => {
      http.post('/energy_manager/item_manager/searchItemList', params)
        .then((res) => {
          if (res.status === 'success') {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
    })
  },
  //查询设备是否关联账户
  searchAssociationAccount (params) {
    return new Promise((resolve, reject) => {
      http.post('/energy_manager/item_manager/searchAssociationAccount', params)
        .then((res) => {
          if (res.status === 'success') {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
    })
  },
  //删除设备
  deleteItemById (params) {
    return new Promise((resolve, reject) => {
      http.post('/energy_manager/item_manager/deleteItemById', params)
        .then((res) => {
          if (res.status === 'success') {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
    })
  },
  //添加/修改属性
  addOrUpdateItemProperty (params) {
    return new Promise((resolve, reject) => {
      http.post('/energy_manager/item_manager/addOrUpdateItemProperty', params)
        .then((res) => {
          if (res.status === 'success') {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
    })
  },
  //删除属性
  deleteItemProperty (params) {
    return new Promise((resolve, reject) => {
      http.post('/energy_manager/item_manager/deleteItemProperty', params)
        .then((res) => {
          if (res.status === 'success') {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
    })
  },
  //查询属性数量
  searchItemPropertyAmount (params) {
    return new Promise((resolve, reject) => {
      http.post('/energy_manager/item_manager/searchItemPropertyAmount', params)
        .then((res) => {
          if (res.status === 'success') {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
    })
  },
  //查询属性列表
  searchItemPropertyList (params) {
    return new Promise((resolve, reject) => {
      http.post('/energy_manager/item_manager/searchItemPropertyList', params)
        .then((res) => {
          if (res.status === 'success') {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
    })
  },
  //为单个设备配置属性
  addOrUpdateItemParameter (params) {
    return new Promise((resolve, reject) => {
      http.post('/energy_manager/item_manager/addOrUpdateItemParameter', params)
        .then((res) => {
          if (res.status === 'success') {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
    })
  },
  //删除单个设备属性
  deleteItemParameter (params) {
    return new Promise((resolve, reject) => {
      http.post('/energy_manager/item_manager/deleteItemParameter', params)
        .then((res) => {
          if (res.status === 'success') {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
    })
  },
  //查询单个设备的已配置属性
  searchItemParameterList (params) {
    return new Promise((resolve, reject) => {
      http.post('/energy_manager/item_manager/searchItemParameterList', params)
        .then((res) => {
          if (res.status === 'success') {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
    })
  },
  //查询单个设备未配置属性
  searchParameterTypeList (params) {
    return new Promise((resolve, reject) => {
      http.post('/energy_manager/item_manager/searchParameterTypeList', params)
        .then((res) => {
          if (res.status === 'success') {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
    })
  },
  //查询单个设备指定属性详情
  searchItemParameterInfo (params) {
    return new Promise((resolve, reject) => {
      http.post('/energy_manager/item_manager/searchItemParameterInfo', params)
        .then((res) => {
          if (res.status === 'success') {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
    })
  },
  //获取风机盘管型号
  searchTypeByItemType (params) {
    return new Promise((resolve, reject) => {
      http.post('/energy_manager/item_manager/searchTypeByItemType', params)
        .then((res) => {
          if (res.status === 'success') {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
    })
  },
  //查询
  searchPropertyRelation (params) {
    return new Promise((resolve, reject) => {
      http.post('/energy_manager/item_manager/searchPropertyRelation', params)
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