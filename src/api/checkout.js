
export default {
//状态说明
  checkStatusDes: (rule, value, callback) => {
    const description = /^([0-9a-zA-Z]:[\u4e00-\u9fa5a-zA-Z]+;)+([0-9a-zA-Z]:[\u4e00-\u9fa5a-zA-Z]+)$/
    if(value){
      if(description.test(value)){
        callback()
      } else {
        callback(new Error('请输入正确格式的状态说明'))
      }
    } else {
      callback()
    }
  },
  //账户名称
  checkAccName: (rule, value, callback) => {
    const accName = /^[0-9a-zA-Z]+$/
    if (value) {
      if (accName.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确户号'))
      }
    } else {
      callback()
    }
  },

  //身份证号
  checkIdNum: (rule, value, callback) => {
    const cardReg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/
    if (value === '') {
      callback(new Error('请输入身份证号码'))
    } else {
      if (cardReg.test(value)) {
        callback()
      } else {
        callback(new Error('身份证号码格式不正确'))
      }
    }
  },

  //联系电话
  checkTelephone: (rule, value, callback) => {
    const telephoneReg = /^0\d{2,3}-?\d{7,8}$/
    const phoneNumReg = /^1[34578][0-9]{9}$/
    if (telephoneReg.test(value) || phoneNumReg.test(value)) {
      callback()
    } else {
      callback(new Error('请输入正确的联系电话'))
    }
  },
  //邮箱
  checkEmail: (rule, value, callback) => {
    const emailReg =  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    if (emailReg.test(value)) {
      callback()
    } else {
      callback(new Error('请输入正确的邮箱'))
    }
  },

  //浮点数
  checkDecimal: function(rule, value, callback) {
    const reg = /^[0-9]*$/
    const reg1 = /^\d+(\.\d+)?$/
    if(reg.test(value) || reg1.test(value)) {
      callback()
    }else{
      callback(new Error("请输入数字"))
    }
  },

  //日期范围
  checkDateRange: function(rule, value, callback) {
    value.forEach(item => {
      if(item!=='') {
        callback()
      }else{
        callback(new Error("请选择统计日期"))
      }
    })
  },
}
