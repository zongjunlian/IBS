<template>
  <div class="login">
    <Row>
      <Col span='1' :offset="23" style="opacity:0.3" class='smallBlocks'>
      </Col>
    </Row>
    <Row>
      <Col span='1' :offset="22" style="opacity:0.2" class='smallBlocks'>
      </Col>
    </Row>
    <Row>
      <Col span='1' :offset="20" style="opacity:0.4" class='smallBlocks'>
      </Col>
    </Row>
    <Row>
      <Col span='1' :offset="21" style="opacity:0.3" class='smallBlocks'>
      </Col>
    </Row>
    <Row>
      <Col span='1' :offset="15" style="opacity:0.5" class='smallBlocks'>
      </Col>
      <Col span='1' :offset="1" style="opacity:0.5" class='smallBlocks'>
      </Col>
    </Row>
    <Row>
      <Col span="13">
        <div  style="background:rgba(0,84,132,.7);" class='filterDiv'></div>
        <div style="height:220px;">
          <Row>
            <Col span='5' :offset="2" style="margin-top:40px">
              <img src="../../assets/loginLogo.png">
            </Col>
          </Row>
          <Row>
            <Col offset='7' span='17'>
              <Row>
                <Col span='1'>
                  <div class='icon'></div>
                </Col>
                <Col offset='1' span='22'> 
                  <div class='xiantao'>重庆仙桃数据谷能源管理服务平台</div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Col>
      <Col span='1' :offset="3" class='smallBlock'>
      </Col>
      <Col span='1' :offset="7" class='smallBlock'>
      </Col>
    </Row>
    <Row>
      <Col span='8' :offset='13'>
        <div  style="background:rgba(0,84,132,.8);" class='filterDiv'></div>
        <div style="height:220px;padding:55px 70px">
          <Form :model="formInline" label-position="left" :label-width="100">
            <FormItem>
              <label class='ivu-form-item-label loginLabel'>用户名</label>
              <Input v-model="username"></Input>
            </FormItem>
            <FormItem>
              <label class='ivu-form-item-label loginLabel'>密码</label>
              <Input v-model="password" type='password' @keyup.enter.native="login"></Input>
            </FormItem>
          </Form>
        </div>
      </Col>
      <Col span='3'>
        <div class='divLogin' @click='login'></div>
        <div style="height:220px;" class='fatherLogin'>
          <div class='loginBtn' @click='login'>登录</div>
        </div>
      </Col>
    </Row>
    <Row>
      <div style="font-size:44px" class='currentTime'>{{currentTime}}</div>
    </Row>
    <Row>
      <div class='currentTime' style='top:25px'>{{week}}</div>
    </Row>
    <Row>
      <div class='currentTime' style='top:60px'>{{currentDate}}</div>
    </Row>
  </div>
</template>

<script>
import loginApi from '@/api/request/login'
import login from '../../css/login.less'
export default {
  data () {
    return {
      formInline:{},
      username: '',
      password: '',
      currentDate: '',
      week: '',
      currentTime: '',
      timer: ''
    }
  },

  methods: {
    login() {
      loginApi.login({
        username: this.username,
        password: this.password
      }).then((res) => {
        if(res.status === 'success') {
          this.$store.dispatch('updateUserName', res.data.loginName)
          this.$router.push({path: '/accountList'})
          sessionStorage.clear()
        }
      }).catch((err) => {
        this.$Message.error('账号或密码错误，请重新输入！')
      })
    },
    clockTime () {
      var myDate = new Date()
      this.currentDate = myDate.toLocaleDateString()
      this.currentTime = myDate.toLocaleTimeString('chinese', { hour12: false })
      this.week = myDate.getDay()
      this.week === 1 ? this.week = '星期一' : this.week === 2 ? this.week = '星期二' : this.week === 3 ?
      this.week = '星期三' : this.week === 4 ? this.week = '星期四' : this.week === 5 ? this.week = '星期五' :
      this.week === 6 ? this.week = '星期六' : this.week = '星期日'
      return this.currentTime
    }
  },
  created () {
    this.clockTime()
  },
  mounted () {
    this.timer = setInterval(()=>{
      this.currentTime = this.clockTime()
    },1000)
  },
  beforeDestroy() {
   //在vue实例销毁前，清除定时器
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
}
</script>

