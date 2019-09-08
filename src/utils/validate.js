//==================================================================表单验证================================================================
/**
 * 输入为纯数字
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export const validateNumber = function(rule, value, callback) {
  if(!value) {
    return callback(new Error("此处不能为空"))
  }else if(!/^[0-9]*$/.test(value)) {
    return callback(new Error("请正确输入内容,限正整数"))
  }else{
    callback()
  }
}

/**
 * 正浮点数
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export const validateDecimal = function(rule, value, callback) {
  if(!value) {
    return callback(new Error("此处不能为空"))
  }else if(!/^\d+(\.\d+)?$/.test(value)) {
    return callback(new Error("请输入正确格式的内容"))
  }else{
    callback()
  }
}

/**
 * 登录名
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export const validateLoginName = function(rule, value, callback) {
  if(!value) {
    return callback(new Error("此处不能为空"))
  }
}

/**
 * 非空判断
 * @param {} rule 
 * @param {*} Object 
 * @param {*} callback 
 */
export const noEmpty = function(rule, value, callback) {
  if(!value) {
    return callback(new Error("此处不能为空"))
  }
}



export function formatTime(time, option) {
  time = +time * 1000;
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

// 格式化时间
export function getQueryObject(url) {
  url = url == null ? window.location.href : url;
  const search = url.substring(url.lastIndexOf('?') + 1);
  const obj = {};
  const reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1);
    let val = decodeURIComponent($2);
    val = String(val);
    obj[name] = val;
    return rs;
  });
  return obj;
}


/**
 *get getByteLen
 * @param {Sting} val input value
 * @returns {number} output value
 */
export function getByteLen(val) {
  let len = 0;
  for (let i = 0; i < val.length; i++) {
    if (val[i].match(/[^\x00-\xff]/ig) != null) {
      len += 1;
    } else {
      len += 0.5;
    }
  }
  return Math.floor(len);
}

export function cleanArray(actual) {
  const newArray = [];
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}

export function param(json) {
  if (!json) return '';
  return cleanArray(Object.keys(json).map(key => {
    if (json[key] === undefined) return '';
    return encodeURIComponent(key) + '=' +
      encodeURIComponent(json[key]);
  })).join('&');
}

export function param2Obj(url) {
  const search = url.split('?')[1];
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
}

export function html2Text(val) {
  const div = document.createElement('div');
  div.innerHTML = val;
  return div.textContent || div.innerText;
}

export function objectMerge(target, source) {
  /* Merges two  objects,
   giving the last one precedence */

  if (typeof target !== 'object') {
    target = {};
  }
  if (Array.isArray(source)) {
    return source.slice();
  }
  for (const property in source) {
    if (source.hasOwnProperty(property)) {
      const sourceProperty = source[property];
      if (typeof sourceProperty === 'object') {
        target[property] = objectMerge(target[property], sourceProperty);
        continue;
      }
      target[property] = sourceProperty;
    }
  }
  return target;
}


export function scrollTo(element, to, duration) {
  if (duration <= 0) return;
  const difference = to - element.scrollTop;
  const perTick = difference / duration * 10;
  setTimeout(() => {
    element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop === to) return;
    scrollTo(element, to, duration - 10);
  }, 10);
}

export function toggleClass(element, className) {
  if (!element || !className) {
    return;
  }
  let classString = element.className;
  const nameIndex = classString.indexOf(className);
  if (nameIndex === -1) {
    classString += '' + className;
  } else {
    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length);
  }
  element.className = classString;
}

//将某一个中国标准时间转化成加'0'的日期格式
export function FormatDate(date) {
  date = new Date(date);
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  let h = date.getHours();
  let m1 = date.getMinutes();
  let s = date.getSeconds();
  m = m < 10 ? ("0" + m) : m;
  d = d < 10 ? ("0" + d) : d;
  h = h < 10 ? ("0" + h) : h;
  m1 = m1 < 10 ? ("0" + m1) : m1;
  s = s < 10 ? ("0" + s) : s;
  return y + "-" + m + "-" + d + " " + h + ":" + m1 + ":" + s;
}


//当前时间转化至秒
export function GetNowDateStr() {
  let date = new Date();
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  let h = date.getHours();
  let m1 = date.getMinutes();
  let s = date.getSeconds();
  m = m < 10 ? ("0" + m) : m;
  d = d < 10 ? ("0" + d) : d;
  h = h < 10 ? ("0" + h) : h;
  m1 = m1 < 10 ? ("0" + m1) : m1;
  s = s < 10 ? ("0" + s) : s;
  return y + "-" + m + "-" + d + " " + h + ":" + m1 + ":" + s;
}

/**
 * 时间转换至年
 */
export function dateToStringByY(param) {
  let date = new Date(param);
  let Y = date.getFullYear()
  return Y;
}
/**
 * 时间转换至月
 */
export function dateToStringByM(param) {
  let date = new Date(param);
  let Y = date.getFullYear() + '-';
  let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  return Y + M;
}
/**
 * 时间转换至日
 */
export function dateToStringByD(time) {
  let date = new Date(time);
  let Y = date.getFullYear() + '-';
  let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
  let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  return Y + M + D;
}
/**
 * 转换时的开始和结束
 */
export function dateToStringByH(time, hours) {
  let f = [];
  f[0] = time.substr(0, 10) + ' ' + hours[0].substr(0, 2);
  f[1] = time.substr(0, 10) + ' ' + hours[1].substr(0, 2);
  return f;
}

/**
 * 时间转换至日,中间无-号
 * @param {} time 
 */
export function dateToStringByDay(time) {
  let date = new Date(time);
  let Y = date.getFullYear();
  let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  return Y + M + D;
}