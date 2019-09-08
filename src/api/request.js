import axios from 'axios'
import { Promise } from 'es6-promise'
import { getString } from './paramsFilter'
import { path } from './path'

//axios配置
axios.defaults.timeout = 5000
axios.defaults.baseURL = cfg.baseURL

const handleStatus = (res) => {
  return res.data
}
const handleError = (err) => {
  return err
}

//http request拦截器
axios.interceptors.request.use(
  config => {  
    config.headers = {
      'Content-Type':'application/x-www-form-urlencoded',
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

//http response拦截器
axios.interceptors.response.use(
  response => {
    if(response.data.status === 'error' && response.data.description === '您没有登录，请先登录'){
      window.location.href = '/login'
      return
    }else{
      return response
    }
  },
  err => {
    if(err && err.response){
      switch (err.response.status) {
        case 400:
          err.message = '错误请求'
          break;
        case 401:
          err.message = '未授权，请重新登录'
          break;
        case 403:
          err.message = '拒绝访问'
          break;
        case 404:
          err.message = '请求错误,未找到该资源'
          break;
        case 405:
          err.message = '请求方法未允许'
          break;
        case 408:
          err.message = '请求超时'
          break;
        case 500:
          err.message = '服务器端出错'
          break;
        case 501:
          err.message = '网络未实现'
          break;
        case 502:
          err.message = '网络错误'
          break;
        case 503:
          err.message = '服务不可用'
          break;
        case 504:
          err.message = '网络超时'
          break;
        case 505:
          err.message = 'http版本不支持该请求'
          break;
        default:
          err.message = `连接错误${err.response.status}`
      }
    }else{
      err.message = "连接服务器失败"
    }
    return Promise.reject(err.response.data)
  }
)


export default {
  get (url, params) {
    let queryString = []
    if (params) {
      Object.keys(params).forEach((key) => params[key] && queryString.push(`${key}=${params[key]}`))
    }
    if (queryString.length > 0) {
      queryString = queryString.join('&')
      url += `?${queryString}`
    }
    return axios
      .get(url)
      .then(handleStatus)
      .catch(handleError) 
  },
  post (url, params) {
    return axios
      .post(path + url, getString(params))
      .then(handleStatus)
      .catch(handleError)
  },
  post_file (url, params) {
    return axios
      .post(path + url, params)
      .then(handleStatus)
      .catch(handleError)
  },
  put (url, params) {
    return axios
      .put(url, params)
      .then(handleStatus)
      .catch(handleError)
  },
  delete (url, params) {
    return axios
      .delete(url, params)
      .then(handleStatus)
      .catch(handleError)
  },
  down (url, params) {
    return axios({
      method: 'post',
      responseType: 'arraybuffer',
      url: path + url,
      data: getString(params)
    })
      .then(handleStatus)
      .catch(handleError)
  }
}
