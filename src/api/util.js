/**
 * 深拷贝
 * @param {*} arr 
 */
export const copyArray = (arr) => {
  return JSON.parse(JSON.stringify(arr))
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
