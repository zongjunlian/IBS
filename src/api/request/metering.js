import http from '../request'
export default {
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
  //查询当前仪表类型
  searchIbsMeterType (params) {
    return new Promise((resolve, reject) => {
      http.post('/energy_manager/meter_manager/searchIbsMeterType', params)
        .then((res) => {
          
          if (res.status === 'success') {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
    })
  },
  //2：分项查询（根据code条件）
	searchIbsSubentry (params) {
	  return new Promise((resolve, reject) => {
	    http.post('/energy_manager/meter_manager/searchIbsSubentry', params)
	      .then((res) => {
	        
	        if (res.status === 'success') {
	          resolve(res.data)
	        } else {
	          reject(res)
	        }
	      })
	  })
	},
	//3：获取仪表品牌列表
		searchBrandList (params) {
	  return new Promise((resolve, reject) => {
	    http.post('/energy_manager/meter_manager/searchBrandList', params)
	      .then((res) => {
	        
	        if (res.status === 'success') {
	          resolve(res.data)
	        } else {
	          reject(res)
	        }
	      })
	  })
	},
	//4：获取建筑列表
		searchBuildingList (params) {
	  return new Promise((resolve, reject) => {
	    http.post('/energy_manager/meter_manager/searchBuildingList', params)
	      .then((res) => {
	        
	        if (res.status === 'success') {
	          resolve(res.data)
	        } else {
	          reject(res)
	        }
	      })
	  })
	},
	//5：根据建筑id获取建筑区域列表---旧的
	// searchBuildingAreaList (params) {
	//   return new Promise((resolve, reject) => {
	//     http.post('/energy_manager/meter_manager/searchBuildingAreaList', params)
	//       .then((res) => {
	//         
	//         if (res.status === 'success') {
	//           resolve(res.data)
	//         } else {
	//           reject(res)
	//         }
	//       })
	//   })
	// },
	//5：根据建筑id获取建筑区域列表---最新
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
	//6：添加仪表
	addIbsMeter (params) {
	  return new Promise((resolve, reject) => {
	    http.post('/energy_manager/meter_manager/addIbsMeter', params)
	      .then((res) => {
	        
	        if (res.status === 'success') {
	          resolve(res)
	        } else {
	          reject(res)
	        }
	      })
	  })
	},
	//7：分页查询仪表信息
	searchIbsMeterListByPage (params) {
	  return new Promise((resolve, reject) => {
	    http.post('/energy_manager/meter_manager/searchIbsMeterListByPage', params)
	      .then((res) => {
	        
	        if (res.status === 'success') {
	          resolve(res.data)
	        } else {
	          reject(res)
	        }
	      })
	  })
	},
	//8：根据主键查询当前仪表信息
	searchIbsMeterById (params) {
	  return new Promise((resolve, reject) => {
	    http.post('/energy_manager/meter_manager/searchIbsMeterById', params)
	      .then((res) => {
	        
	        if (res.status === 'success') {
	          resolve(res.data)
	        } else {
	          reject(res)
	        }
	      })
	  })
	},
	//9：根据主键删除仪表及相关联的信息
	removeIbsMeter (params) {
	  return new Promise((resolve, reject) => {
	    http.post('/energy_manager/meter_manager/removeIbsMeter', params)
	      .then((res) => {
	        
	        if (res.status === 'success') {
	          resolve(res)
	        } else {
	          reject(res)
	        }
	      })
	  })
	},
	//10：修改仪表信息
	updateIbsMeter (params) {
	  return new Promise((resolve, reject) => {
	    http.post('/energy_manager/meter_manager/updateIbsMeter', params)
	      .then((res) => {
	        
	        if (res.status === 'success') {
	          resolve(res.data)
	        } else {
	          reject(res)
	        }
	      })
	  })
	},
	//11：根据仪表id查询当前虚拟表的信息
	searchIbsMeterVirtual (params) {
	  return new Promise((resolve, reject) => {
	    http.post('/energy_manager/meter_manager/searchIbsMeterVirtual', params)
	      .then((res) => {
	        if (res.status === 'success') {
	          resolve(res)
	        } else {
	          reject(res)
	        }
	      })
	  })
	},
	//12：根据仪表id查询当前仪表标定时间历史纪录
	searchIbsMeterConventionHistory (params) {
	  return new Promise((resolve, reject) => {
	    http.post('/energy_manager/meter_manager/searchIbsMeterConventionHistory', params)
	      .then((res) => {
	        
	        if (res.status === 'success') {
	          resolve(res.data)
	        } else {
	          reject(res)
	        }
	      })
	  })
	},
	//13：查询采集器编号
	searchCollectorList (params) {
	  return new Promise((resolve, reject) => {
	    http.post('/energy_manager/meter_manager/searchCollectorList', params)
	      .then((res) => {
	        
	        if (res.status === 'success') {
	          resolve(res.data)
	        } else {
	          reject(res)
	        }
	      })
	  })
	},
	//14.虚拟仪表
	searchIbsMeterTree (params) {
	  return new Promise((resolve, reject) => {
	    http.post('/energy_manager/meter_manager/searchIbsMeterTree', params)
	      .then((res) => {
	        
	        if (res.status === 'success') {
	          resolve(res.data)
	        } else {
	          reject(res)
	        }
	      })
	  })
	},
	//15.数量
	searchIbsMeterCount (params) {
	  return new Promise((resolve, reject) => {
	    http.post('/energy_manager/meter_manager/searchIbsMeterCount', params)
	      .then((res) => {
	        
	        if (res.status === 'success') {
	          resolve(res.data)
	        } else {
	          reject(res)
	        }
	      })
	  })
	},
	//16.计量区域回显
	searchBuildAreaList (params) {
	  return new Promise((resolve, reject) => {
	    http.post('/energy_manager/meter_manager/searchBuildAreaList', params)
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