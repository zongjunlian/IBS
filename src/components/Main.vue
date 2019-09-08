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
    width: 1000px;
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
  margin-bottom: 1px;
}
.accountList::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: -1;
  margin-bottom: 1px;
  /* background: #2175BC; */
  -moz-transform: skewY(-15deg);
  -ms-transform: skewY(-15deg);
  -webkit-transform: skewY(-15deg);
  transform: skewY(-15deg);
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.accountInfo::after{
  background:#3b7d92;
}
.accountDel::after{
  background:#528b9e;
}
.shutdown::after{
  background:#699bab;
}
.announce::after{
  background:#80a9b7;
}
.scene::after{
  background:#98b8c3
}
.accountManage {
  position: relative;
  width:20px;
  display: block;
  color:#00ffff;
  margin-bottom: 1px;
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
  margin-bottom: 1px;
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
  -moz-transform: perspective(0.5em) rotateY(4deg);
  -ms-transform: perspective(0.5em) rotateY(4deg);
  -webkit-transform: perspective(0.5em) rotateY(4deg);
  transform: perspective(0.5em) rotateY(4deg);
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
.menu img{
  width:20px;
  height:20px;
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
                      <MenuItem :name="item.name" v-for='item in oneNav'>
                        <img :src='"@/assets/images/oneNav/"+item.name+"1.png"' v-if="menuName === item.name" style='position:relative;top:-8px'>
                        <img :src='"@/assets/images/oneNav/"+item.name+".png"' v-else>
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
                  
                  <Menu ref="leadMenu"  theme="light" width="auto" style="position:relative;top:75px" @on-select="changeMenu" v-for='item in oneNav' v-if="menuName === item.name" class='menu'>
                    <!---梯形导航展开----->
                    <MenuItem :name="list.name" v-for='(list,index) in item.children' class='accountManage' v-if='$route.meta.fromTitle===list.name&&index===0'><img :src='"@/assets/images/leftNav/"+list.name+"1.png"' width='20px'><span>{{list.label}}</span></MenuItem>
                    <div v-for='list in item.children'>  
                      <div v-for='(sonItem,i) in list.children' v-if='$route.meta.twoTitle===sonItem.name'>
                        <MenuItem :name="sonItem.name" :class='i===0?"sonList sonList1":i===1?"sonList sonList2":"sonList sonList3"' v-for='(sonItem,i) in list.children'><Icon type="ios-arrow-down" /><span :id='sonItem.name'>{{sonItem.label}}</span></MenuItem>
                      </div>
                    </div>
                    <!--梯形导航关闭--->
                    <MenuItem :name="list.name" v-for='(list,index) in item.children' class='accountManage1' v-show='$route.meta.fromTitle!==list.name&&index===0'><img :src='"@/assets/images/leftNav/"+list.name+".png"' width='20px'></MenuItem>
                    <!--当前点击前面得平行四边形关闭--->
                    <MenuItem :name="list.name" v-for='(list,index) in array1' :class='index+1===1?"accountList accountInfo":index+1===2?"accountList accountDel":index+1===3?
                    "accountList shutdown":index+1===4?"accountList announce":"accountList scene"' v-show='$route.meta.fromTitle!==list.name&&lftNav'><img :src='"@/assets/images/leftNav/"+list.name+".png"' width='20px'></MenuItem>
                    <!--当前点击得平行四边形展开-->
                    <MenuItem :name="list.name" v-for='(list,index) in item.children' :class='index===1?"accountList accountInfo":index===2?"accountList accountDel":index===3?
                    "accountList shutdown":index===4?"accountList announce":"accountList scene"' v-if='$route.meta.fromTitle===list.name&&index!==0'><img :src='"@/assets/images/leftNav/"+list.name+"1.png"' width='20px'><span>{{list.label}}</span></MenuItem>
                    <div v-for='list in item.children'>
                      <div v-for='(sonItem,i) in list.children' v-if='$route.meta.twoTitle===sonItem.name'>
                        <MenuItem :name="sonItem.name" :class='i===0&&sonItem.name!==$route.name?"sonList sonList1":i===1&&sonItem.name!==$route.name?"sonList sonList2":i===2&&sonItem.name===$route.name?"sonList sonList3 ivu-menu-item-active":i===0&&sonItem.name===$route.name?"sonList sonList1 ivu-menu-item-active":i===1&&sonItem.name===$route.name?"sonList sonList2 ivu-menu-item-active":"sonList sonList3"' v-for='(sonItem,i) in list.children'><Icon type="ios-arrow-down" /><span :id='sonItem.name'>{{sonItem.label}}</span></MenuItem>
                      </div>
                    </div>
                    <!--当前点击后面得平行四边形关闭-->
                    <MenuItem :name="list.name" v-for='(list,index) in array2' :class='index+parseInt(order)===1?"accountList accountInfo":index+parseInt(order)===2?"accountList accountDel":index+parseInt(order)===3?
                    "accountList shutdown":index+parseInt(order)===4?"accountList announce":"accountList scene"' v-show='$route.meta.fromTitle!==list.name&&lftNav'><img :src='"@/assets/images/leftNav/"+list.name+".png"' width='20px'></MenuItem>
                    <!--所有平行四边形关闭--->
                    <MenuItem :name="list.name" v-for='(list,index) in item.children' :class='index===1?"accountList accountInfo":index===2?"accountList accountDel":index===3?
                    "accountList shutdown":index===4?"accountList announce":"accountList scene"' v-show='$route.meta.fromTitle!==list.name&&index!==0&&!lftNav'><img :src='"@/assets/images/leftNav/"+list.name+".png"' width='20px'></MenuItem>
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
import { copyArray } from '@/api/util'
export default {
  inject: ['reload'],
  data () {
    return {
      fromTitle: '',
      lftNav: false,
      order: 0,
      changeOne: false,
      menuName: 'accountList',
      array1:[],
      array2:[],
      backRouter:[
        'historyList','accountInfo','setTerminal','tempTerminal','equipmentTemplate','equipmentReport',
        'meterTemplate','meterReport','terminalTemplate','terminalReport'
      ],
      oneNav:[
        {
          name: 'home',
          children: [],
        },
        {
          name: 'eneryRun',
          children: [],
        },
        {
          name: 'analysis',
          children: [],
        },
        {
          name: 'energy',
          children: [
            {
              name:'energy',
              label:'设备管理',
              children:[
                {
                  name:'energy',
                  label:'采集器管理',
                },
                {
                  name:'meterManage',
                  label:'仪表管理'
                }
              ]
            },
            {
              name:'energyMonitor',
              label:'能源站用能监测',
            },
            {
              name:'equipmentList',
              label:'能源站用能报表',
              children:[
                {
                  name:'equipmentList',
                  label:'设备统计报表',
                },
                {
                  name:'meterList',
                  label:'仪表监测数据统计报表'
                },
              ]
            },
          ],
        },
        {
          name: 'collector',
          children: [
            {
              name:'collector',
              label:'设备管理',
              children:[
                {
                  name:'collector',
                  label:'采集器管理',
                },
                {
                  name:'metering',
                  label:'仪表管理'
                },
                {
                  name:'terminal',
                  label:'风机盘管管理'
                }
              ]
            },
            {
              name:'terminalRun',
              label:'末端运行控制'
            },
            {
              name:'coldMonitor',
              label:'末端用能监测',
              children:[
                {
                  name:'coldMonitor',
                  label:'用冷量监测',
                },
                {
                  name:'hotMonitor',
                  label:'用热量监测'
                }
              ]
            },
            {
              name:'terminalList',
              label:'末端费用报表'
            }
          ],
        },
        {
          name: 'operation',
          children: [],
        },
        {
          name: 'accountList',
          children: [
            {
              name:'accountList',
              label:'账户管理',
            },
            {
              name:'accountInfoList',
              label:'账户信息查询'
            },
            {
              name:'declarationManage',
              label:'账户申报管理'
            },
            {
              name:'shutdownManage',
              label:'停复机管理',
              children:[
                {
                  name:'shutdownManage',
                  label:'停复机状态监管',
                },
                {
                  name:'orderShutdown',
                  label:'预约停复机'
                },
                // {
                //   name:'arrearsStandard',
                //   label:'欠费标准'
                // }
              ]
            },
            {
              name:'announcementPush',
              label:'公告信息推送'
            },
            {
              name:'sceneManage',
              label:'现场业务',
              children:[
                {
                  name:'sceneManage',
                  label:'现场办理',
                },
                {
                  name:'sceneShutdown',
                  label:'现场停复机'
                },
              ]
            },
            {
              name:'publicAccount',
              label:'公众号平台'
            }
          ],
        },
        {
          name: 'alarm',
          children: [],
        },
        {
          name: 'tactics',
          children: [],
        }
      ],
    }
  },
  computed: {
  },
  watch: {
  '$route' (to,from) {
    this.fromTitle = to.meta.fromTitle
    // console.log(this.fromTitle,2)
    // this.twoMenuChange(to.name)
  }
  },
  mounted () {
    this.changeOne = sessionStorage.getItem('changeOne')
    if(this.changeOne==='false'){
      this.sessionStorage()
    }
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
      sessionStorage.setItem('changeOne','false')
      let index
      this.array1=[]
      this.array2=[]
      for(const val of this.oneNav){
        if(val.name === this.menuName){
          for(const x in val.children){
            // console.log(val.children[x].name,routerName)
            if(val.children[x].name === routerName){
              index = parseInt(x)
              this.order = index
              sessionStorage.setItem('Sindex',index)
            } else {
              let children = val.children[x].children
              if(children){
                for(const item of children){
                if(item.name === routerName){
                  index = parseInt(x)
                  this.order = index
                  sessionStorage.setItem('Sindex',index)
                }
              }
              }
            }
          }
          if(index !==0){
            for(var i=1 ;i<index;i++){
              this.array1.push(val.children[i])
            }
            for(var i=index ;i<val.children.length;i++){
              this.array2.push(val.children[i])
            }
          }
        }
      }
      if(index!==0){
        this.lftNav = true
      }else{
        this.lftNav = false
      }
      let arr1 = JSON.stringify(this.array1)
      let arr2 = JSON.stringify(this.array2)
      sessionStorage.setItem('mary1',arr1)
      sessionStorage.setItem('mary2',arr2)
      sessionStorage.setItem('lft',this.lftNav)
      this.$router.push({ name: routerName })
			console.log('this.$router',this.$router)
      this.$nextTick(()=> {
        this.twoMenuChange(routerName)
      })
    },
    //返回列表
    backBtn (item) {
      this.$router.go(-1)
    },
    //一级导航切换
    changeOneMenu (routerName) { 
      sessionStorage.setItem('changeOne','true')
      this.reload()
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
        if(routerName === this.fromTitle){
          val.classList.add('ivu-menu-item-active')
        } else {
          val.classList.remove('ivu-menu-item-active')
        }
      }
    },
    //sessionStroge
    sessionStorage () {
        let arr1 = []
        let arr2 = []
        let mary1 = sessionStorage.getItem('mary1')
        let mary2 = sessionStorage.getItem('mary2')
        arr1 = JSON.parse(mary1)
        arr2 = JSON.parse(mary2)
        if(arr1||arr2){
          if(arr1.length>0||arr2.length>0){
            this.array1 = arr1
            this.array2 = arr2
            this.lftNav = sessionStorage.getItem('lft')
            this.order = sessionStorage.getItem('Sindex')
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
    }
  }
}
</script>
