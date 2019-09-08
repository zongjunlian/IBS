<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 269px;
    height: 46px;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 600px;
    margin:0 auto;
}
.layout-user {
    text-align: right;
    width:50px;
    margin: 0 auto;
    margin-right: 20px;
}
.ivu-layout-header{
  padding:0;
  background: none;
  height: 76px;
  line-height: 76px
}
.ivu-layout {
  width:100%;
  background: rgb(244, 244, 244)
}
.ivu-menu-dark {
  background: none;
  background-image: url('../assets/images/top.png')
}
.ivu-menu-horizontal{
  height: 76px;
  line-height: 76px
}
.layout-nav img {
  width:76%;
  margin-top:15px
}
.backList{
  position:absolute;
  top:15px;
  right:0;
  cursor:pointer
}
.imgBack {
  width:20px;
  position:relative;
  top:5px
}

.accountList {
  position: relative;
  width:20px;
  /* float: left; */
  /* text-align: center; */
  display: block;
  color:#00ffff;
  margin-bottom: 2px;
}
.accountList::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: -1;
  /* background: #2175BC; */
  -moz-transform: skewY(-15deg);
  -ms-transform: skewY(-15deg);
  -webkit-transform: skewY(-15deg);
  transform: skewY(-15deg);
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.accountInfo::after{
  background:#3b7d92
}
.accountDel::after{
  background:#528b9e
}
.shutdown::after{
  background:#699bab
}
.announce::after{
  background:#80a9b7
}
.scene::after{
  background:#98b8c3
}
.accountManage {
  position: relative;
  width:20px;
  display: block;
  color:#00ffff;
  margin-bottom: 2px;
}
.accountManage::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: -1;
  background:#0d5f7a;
  padding:14px 30px 14px 38px;
  -moz-transform: perspective(1.26em) rotateY(4deg);
  -ms-transform: perspective(1.26em) rotateY(4deg);
  -webkit-transform: perspective(1.26em) rotateY(4deg);
  transform: perspective(1.26em) rotateY(4deg);
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.accountManage1 {
  position: relative;
  width:20px;
  display: block;
  color:#00ffff;
  margin-bottom: 3px;
}
.accountManage1::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: -1;
  background:#0d5f7a;
  padding:14px 45px 14px 30px;
  -moz-transform: perspective(0.46em) rotateY(4deg);
  -ms-transform: perspective(0.46em) rotateY(4deg);
  -webkit-transform: perspective(0.46em) rotateY(4deg);
  transform: perspective(0.46em) rotateY(4deg);
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.accountManage:hover::after{
  background:#0d5f7a;
}
.accountList:hover::after {
  /* background: #2586D7; */
}
.ivu-menu-vertical .ivu-menu-item:hover, .ivu-menu-vertical .ivu-menu-submenu-title:hover{
  color:#00ffff
}
.ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title{
  padding:14px 45px 14px 20px
}
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu){
  color:#40b0a4;
  background: none
}
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):after{
  display: none;
}
.sonList{
  width:30px;
  position:absolute!important;
  padding:8px !important;
}
.sonList:hover{
  color:#40b0a4!important;
}
.sonList1{
  left:80px;
  top:0px
}
.sonList2{
  left:110px;
  top:0px
}
.sonList3{
  left:140px;
  top:0px
}
.ivu-menu-light{
  background:rgb(244, 244, 244);
}
.ivu-menu-vertical.ivu-menu-light:after{
  background: none;
}
</style>
<template>
    <div class="layout">
        <Layout :style="{minHeight: '100vh'}">
            <Header :style="{background: 'transparnt',position:'fixed',zIndex:'2',width:'100%'}">
                <Menu mode="horizontal" theme="dark" active-name="1" @on-select="changeOneMenu">
                    <div class="layout-logo">
                      <img src="../assets/images/logo1.png" style="width:55%">
                    </div>
                    <div class="layout-nav">
                        <MenuItem name="home">
                            <img src="../assets/images/oneNav/home1.png" v-if="menuName === 'home'">
                            <img src="../assets/images/oneNav/home.png" v-else>
                        </MenuItem>
                        <MenuItem name="alarm">
                            <img src="../assets/images/oneNav/alarm1.png" v-if="menuName === 'alarm'">
                            <img src="../assets/images/oneNav/alarm.png" v-else>
                        </MenuItem>
                        <MenuItem name="report"> 
                            <img src="../assets/images/oneNav/report1.png" v-if="menuName === 'report'">
                            <img src="../assets/images/oneNav/report.png" v-else>
                        </MenuItem>
                        <MenuItem name="daily">
                            <img src="../assets/images/oneNav/daily1.png" v-if="menuName === 'daily'">
                            <img src="../assets/images/oneNav/daily.png" v-else>
                        </MenuItem>
                        <MenuItem name="accountList">
                            <img src="../assets/images/oneNav/user1.png" v-if="menuName === 'accountList'">
                            <img src="../assets/images/oneNav/user.png" v-else>
                        </MenuItem>
                        <MenuItem name="collector">
                            <img src="../assets/images/oneNav/device1.png" v-if="menuName === 'collector'">
                            <img src="../assets/images/oneNav/device.png" v-else>
                        </MenuItem>
                        <MenuItem name="tactics">
                            <img src="../assets/images/oneNav/tactics1.png" v-if="menuName === 'tactics'">
                            <img src="../assets/images/oneNav/tactics.png" v-else>
                        </MenuItem>
                    </div>
                    <div class="layout-user">
                      <Dropdown style="text-align: left;" @on-click="getMenuName">
                        <a href="javascript:void(0)">
                          <Icon type="md-person" size="22"/>
                        </a>
                        <!-- <DropdownMenu slot="list">
                          <DropdownItem >退出</DropdownItem>
                        </DropdownMenu> -->
                      </Dropdown>
                    </div>
                </Menu>
            </Header>
            <Layout  v-if="menuName === 'home'" >
              <Content>
                <div><router-view/></div>
              </Content>
            </Layout>
            <Layout v-else>
                <Sider :style="{minHeight: '100vh',position:'fixed',zIndex:'1',background:'rgb(244, 244, 244)',width:'180px',minWidth:'180px'}">
                  <Menu ref="leadMenu"  theme="light" width="auto" style="position:relative;top:75px" v-if="menuName === 'alarm'">
                    <MenuItem name="alarm">报警</MenuItem>
                  </Menu>
                  <Menu ref="leadMenu"  theme="light" width="auto" style="position:relative;top:75px" v-else-if="menuName === 'report'">
                    <MenuItem name="report">报表</MenuItem>
                  </Menu>
                  <Menu ref="leadMenu"  theme="light" width="auto" style="position:relative;top:75px" v-else-if="menuName === 'daily'">
                    <MenuItem name="daily">日志</MenuItem>
                  </Menu>
                  <Menu ref="leadMenu"  theme="light" width="auto" style="position:relative;top:75px" @on-select="changeMenu" v-else-if="menuName === 'accountList'">
                    
                    <MenuItem name="accountList" class='accountManage' v-show='$route.name==="accountList"||$route.name==="reviewAccount"||$route.name==="editAccount"||$route.name==="openAccount"||$router.name==="accountINF"'><img src='../assets/images/leftNav/account/accountManage1.png' width='25px' style='position:relative;right:4px'><span>账户管理</span></MenuItem>
                    <MenuItem name="accountList" class='accountManage1' v-show='$route.name!=="accountList"&&$route.name!=="reviewAccount"&&$route.name!=="editAccount"&&$route.name!=="openAccount"&&$router.name!=="accountINF"'><img src='../assets/images/leftNav/account/accountManage.png' width='25px' style='position:relative;right:4px'></MenuItem>

                    <MenuItem name="accountInfoList" class='accountList accountInfo' v-show='$route.name==="accountInfoList" || $route.name==="accountInfo"'><img src='../assets/images/leftNav/account/accountInfo1.png' width='20px'><span>账户信息查询</span></MenuItem>
                    <MenuItem name="accountInfoList" class='accountList accountInfo' v-show='$route.name!=="accountInfoList" && $route.name!=="accountInfo"'><img src='../assets/images/leftNav/account/accountInfo.png' width='20px'></MenuItem>

                    <MenuItem name="declarationManage" class='accountList accountDel' v-show='$route.name==="declarationManage"'><img src='../assets/images/leftNav/account/accountDel1.png' width='20px'><span>账户申报管理</span></MenuItem>
                    <MenuItem name="declarationManage" class='accountList accountDel' v-show='$route.name!=="declarationManage"'><img src='../assets/images/leftNav/account/accountDel.png' width='20px'></MenuItem>

                    <MenuItem name="shutdownManage" class='accountList shutdown' v-show='$route.name==="shutdownManage"||$route.name==="historyList"||$route.name==="orderShutdown"||$route.name==="arrearsStandard"'><img src='../assets/images/leftNav/account/shutdown1.png' width='20px'><span>停复机管理</span></MenuItem>
                    <MenuItem name="shutdownManage" class='sonList sonList1' v-show='$route.name==="shutdownManage"||$route.name==="historyList"||$route.name==="orderShutdown"||$route.name==="arrearsStandard"'><Icon type="ios-arrow-down" /><span>停复机状态监管</span></MenuItem>
                    <MenuItem name="orderShutdown" class='sonList sonList2' v-show='$route.name==="shutdownManage"||$route.name==="historyList"||$route.name==="orderShutdown"||$route.name==="arrearsStandard"'><Icon type="ios-arrow-down" /><span>预约停复机</span></MenuItem>
                    <MenuItem name="arrearsStandard" class='sonList sonList3' v-show='$route.name==="shutdownManage"||$route.name==="historyList"||$route.name==="orderShutdown"||$route.name==="arrearsStandard"'><Icon type="ios-arrow-down" /><span>欠费标准</span></MenuItem>
                    <MenuItem name="shutdownManage" class='accountList shutdown' v-show='$route.name!=="shutdownManage"&&$route.name!=="historyList"&&$route.name!=="orderShutdown"&&$route.name!=="arrearsStandard"'><img src='../assets/images/leftNav/account/shutdown.png' width='20px'></MenuItem>

                    <MenuItem name="announcementPush" class='accountList announce' v-show='$route.name==="announcementPush"'><img src='../assets/images/leftNav/account/announcePush1.png' width='20px'><span>公告信息推送</span></MenuItem>
                    <MenuItem name="announcementPush" class='accountList announce' v-show='$route.name!=="announcementPush"'><img src='../assets/images/leftNav/account/announcePush.png' width='20px'></MenuItem>

                    <MenuItem name="sceneManage" class='accountList scene' v-show='$route.name==="sceneManage"'><img src='../assets/images/leftNav/account/scene1.png' width='20px'><span>现场办理</span></MenuItem>
                    <MenuItem name="sceneManage" class='accountList scene' v-show='$route.name!=="sceneManage"'><img src='../assets/images/leftNav/account/scene.png' width='20px'></MenuItem>

                    <MenuItem name="publicAccount" class='accountList scene' v-show='$route.name==="publicAccount"'><img src='../assets/images/leftNav/account/scene1.png' width='20px'><span>公众号平台</span></MenuItem>
                    <MenuItem name="publicAccount" class='accountList scene' v-show='$route.name!=="publicAccount"'><img src='../assets/images/leftNav/account/scene.png' width='20px'></MenuItem>
                  </Menu>
                  
                  <Menu ref="leadMenu"  theme="light" width="auto" style="position:relative;top:75px" @on-select="changeMenu" v-else-if="menuName === 'collector'">

                    <MenuItem name="collector" class='accountManage' v-show='$route.name==="collector"||$route.name==="metering"||$route.name==="terminal"||$route.name==="setTerminal"'><img src='../assets/images/leftNav/device/devManage1.png' width='25px' style='position:relative;right:4px'><span>设备管理</span></MenuItem>
                    <MenuItem name="collector" class='sonList sonList1' v-show='$route.name==="collector"||$route.name==="metering"||$route.name==="terminal"||$route.name==="setTerminal"'><Icon type="ios-arrow-down" /><span>采集器管理</span></MenuItem>
                    <MenuItem name="metering" class='sonList sonList2' v-show='$route.name==="collector"||$route.name==="metering"||$route.name==="terminal"||$route.name==="setTerminal"'><Icon type="ios-arrow-down" /><span>仪表管理</span></MenuItem>
                    <MenuItem name="terminal" class='sonList sonList3' v-show='$route.name==="collector"||$route.name==="metering"||$route.name==="terminal"||$route.name==="setTerminal"'><Icon type="ios-arrow-down" /><span>末端设备管理</span></MenuItem>
                    <MenuItem name="collector" class='accountManage1' v-show='$route.name!=="collector"&&$route.name!=="metering"&&$route.name!=="terminal"&&$route.name!=="setTerminal"'><img src='../assets/images/leftNav/device/devManage.png' width='25px' style='position:relative;right:4px'></MenuItem>

                    <MenuItem name="accountInfoList" class='accountList accountInfo' v-show='$route.name==="accountInfoList" || $route.name==="accountInfo"'><img src='../assets/images/leftNav/device/energy1.png' width='20px'><span>用能分析</span></MenuItem>
                    <MenuItem name="accountInfoList" class='accountList accountInfo' v-show='$route.name!=="accountInfoList" && $route.name!=="accountInfo"'><img src='../assets/images/leftNav/device/energy.png' width='20px'></MenuItem>

                    <MenuItem :name="item.val" v-for='item in devReport' class='accountList accountDel' v-if='$route.name===item.val'><img src='../assets/images/leftNav/device/report1.png' width='20px'><span>统计报表</span></MenuItem>
                    <div v-for='item in devReport' v-if='$route.name===item.val'>
                      <MenuItem :name="item.id" :class='item.id==="equipmentList"?"sonList sonList1":item.id==="meterList"?"sonList sonList2":"sonList sonList3"' v-for='item in devReport'><Icon type="ios-arrow-down" /><span>{{item.name}}</span></MenuItem>
                    </div>
                    <MenuItem name="equipmentList" class='accountList accountDel' v-show='$route.name!=="equipmentList"&&$route.name!=="equipmentReport"&&$route.name!=="equipmentTemplate"&&$route.name!=="meterTemplate"
                    &&$route.name!=="meterList"&&$route.name!=="meterReport"&&$route.name!=="terminalTemplate"&&$route.name!=="terminalReport"&&$route.name!=="terminalList"'><img src='../assets/images/leftNav/device/report.png' width='20px'></MenuItem>

                  </Menu>
                  
                  <Menu ref="leadMenu"  theme="light" width="auto" style="position:relative;top:75px"  :open-names="['1']" v-else>
                    <MenuItem name="tactics">策略</MenuItem>
                  </Menu>
                </Sider>
                <Layout :style="{padding: '45px  0 0 180px',width: '98.8%'}">
                    <Content :style="{padding: '16px', background: '#f4f4f4', marginTop:'24px'}">
                      <div class="title">
                        <imgButton type="标题" :name=$route.meta.title></imgButton>
                        <div class="lineBar"></div>
                        <div class="backList" @click="backBtn(item)" v-for='item in backRouter' v-if="$route.name === item"><img src="../assets/images/img-button/back.png" class="imgBack">【返回列表】</div>
                      </div>
                        <div><router-view/></div>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
export default {
  data () {
    return {
      menuName: 'accountList',
      backRouter:[
        'historyList','accountInfo','setTerminal','equipmentTemplate','equipmentReport',
        'meterTemplate','meterReport','terminalTemplate','terminalReport'
      ],
      devReport:[
        { 
          id:'equipmentList',
          val:'equipmentList',
          name:'设备统计报表'
        },
        {
          id:'equipmentList',
          val:'equipmentReport',
          name:''
        },
        {
          id:'equipmentList',
          val:'equipmentTemplate',
          name:''
        },
        {
          id:'meterList',
          val:'meterList',
          name:'仪表监测数据统计报表'
        },
        {
          id:'meterList',
          val:'meterReport',
          name:''
        },
        {
          id:'meterList',
          val:'meterTemplate',
          name:''
        },
        {
          id:'terminalList',
          val:'terminalList',
          name:'末端设备用能统计报表'
        },
        {
          id:'terminalList',
          val:'terminalReport',
          name:''
        },
        {
          id:'terminalList',
          val:'terminalTemplate',
          name:''
        }
        ]
    }
  },
  computed: {
  },
  mounted () {
    let menu = sessionStorage.getItem('menu')
    if(menu){
      this.menuName = menu
    }
    this.judge(menu)
  },
  methods: {
    getMenuName (name) {
    },
    //左侧导航切换
    changeMenu (routerName) {
      this.$router.push({ name: routerName })
      this.$nextTick(()=> {
        this.twoMenuChange(routerName)
      })
    },
    //返回列表
    backBtn (item) {
      let name
      item === 'historyList'? name='shutdownManage':item === 'accountInfo'? name='accountInfoList':item === 'setTerminal'?name='terminal':
      item === 'equipmentTemplate'|| item === 'equipmentReport'? name='equipmentList':item === 'meterTemplate'|| item==='meterReport' ? name='meterList'
      :item === 'terminalTemplate'||item==='terminalReport'? name='terminalList':''
      this.$router.push({name:name})
    },
    //一级导航切换
    changeOneMenu (routerName) {
      this.menuName = routerName
      sessionStorage.setItem('menu',routerName)
      this.judge(routerName)
      this.$router.push({ name: routerName })
      this.$nextTick(()=> {
        this.twoMenuChange(routerName)
      })
    },
    //左侧子导航
    twoMenuChange(routerName) {
      let array = document.getElementsByClassName('accountList')
      for(const val of array){
        val.classList.remove('ivu-menu-item-active','ivu-menu-item-selected')
      }
      let array1 = document.getElementsByClassName('accountManage')
      for(const val of array1){
        val.classList.remove('ivu-menu-item-active','ivu-menu-item-selected')
      }
      let array2 = document.getElementsByClassName('sonList1')
      for(const val of array2){
        if(routerName === 'shutdownManage' || routerName === 'collector' || routerName === 'equipmentList'){
          val.classList.add('ivu-menu-item-active')
        } else {
          val.classList.remove('ivu-menu-item-active')
        }
      }
    },
    //home页面
    judge (routerName) {
      if(routerName === 'home') {
        document.getElementsByClassName('ivu-menu-dark')[0].style.background = 'none'
      } else {
        document.getElementsByClassName('ivu-menu-dark')[0].style.background =  ''
      }
    },
    mouseover (data) {
      conmsole.log('ddd')
      console.log(data)
    }
  }
}
</script>
