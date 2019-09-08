<template>
  <div class="account-list">
    <Row :gutter="16">
      <Col span="2">
      <b class="fontSize">账户总数：</b> <b class="bigFont1">{{dataCount}}</b>
      </Col>
      <Col span="2" style="padding-top:8px">
      <Checkbox v-model="single" @on-change="pageChange(1)">显示全部账户</Checkbox>
      </Col>
      <Col span="5" style="padding-top:8px">
      <a style="color:#ed4014;" v-if="disNum !== ''" @click="disCheck = !disCheck, pageChange(1)">有{{disNum}}条变更申请未处置</a>
      </Col>
      <Col span="2" style="padding-top:1px">
      <Input v-model="keyWord" style="display:inline-block"  placeholder="请输入关键词" clearable />
      </Col>
      <Col span="8">
      <span style="margin-right:20px">开户日期</span>
      <DatePicker type="date" style="display:inline-block" v-model="startTime" :editable="false" :options="startTimeOption" @on-change="startTimeChange"></DatePicker>
      <span style="margin:5px">—</span>
      <DatePicker type="date" style="display:inline-block" v-model="endTime" :editable="false" :options="endTimeOption" @on-change="endTimeChange"></DatePicker>
      </Col>
      <Col span="2">
      <imgButton type="按钮" name="查询" @click.native="pageChange(1)"></imgButton>
      </Col>
      <Col span="1" :offset="2">
      <img src="../../../assets/images/img-button/addUser.png" alt="" style="width: 33px;float: right;cursor: pointer;" @click="addUser">
      </Col>
    </Row>
    <!-- 列表：暂无数据 -->
    <Table :columns="columns" class="normal-table" :data="userList" no-data-text="暂无数据">
    </Table>
    <Row class="page-bottom">
      <Col span="12" class="page-text">
      当前显示<span class="pageColor">{{(userList && userList.length > 0) ? userList.length : 0}}</span>条记录,共<span class="pageColor">{{dataCount}}</span>条记录
      </Col>
      <Col span="8" :offset="4">
      <Page :total="dataCount" :page-size="pageSize"  @on-change="pageChange"  show-elevator :current="currentPage" class="common-page-style"/>
      </Col>
    </Row>

    <div v-if="noDel" class="del-info-modal">
      <Row :gutter="16" style="background:#e2e2e2;margin: 5px 10px 0 10px">
        <Col span="12" class="mod-title">销户操作</Col>
        <Col span="12"><Icon type="md-close" size="25" style="float:right"  @click="noDel = false"/></Col>
      </Row>
      <div class="mod-content">
        <p class="mod-content-title">操作失败！</p>
        <p class="mod-content-info">您所要销户的账户目前状态为：{{st}}。</p>
        <p class="mod-content-info">此状态下无法办理销户。</p>
      </div>
    </div>

    <div v-if="delMod" class="del-del-modal">
      <Row :gutter="16" style="background:#e2e2e2;margin: 5px 10px 0 10px">
        <Col span="12" class="mod-title">销户操作</Col>
        <Col span="12"><Icon type="md-close" size="25" style="float:right"  @click="delMod = false"/></Col>
      </Row>
      <div class="mod-content">
        <p class="mod-content-title">系统提示：</p>
        <p class="mod-content-info ft">本次操作将导致当前账户信息被删除且</p>
        <span>
          <p class="mod-content-info">不可恢复。</p>
          <p class="mod-content-info" style="float:right;margin-right:10px;margin-top:-40px;cursor:pointer;font-size: 17px" @click="destroy">【确认删除】</p>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import accountApi from '@/api/request/accountList'
import filter from '@/api/filter'
export default {
  data () {
    return {
      editAccountNum: '',

      noDel: false,
      delMod: false,
      destroyId: '',

      editMod: false,
            
      isabout: true,
      single: false,
      disNum: '', //未处置数量
      disCheck: false, 
      keyWord: '', //关键词
      startTime: '',
      startTimeOption: {},
      endTime: '',
      endTimeOption: {},

      dataCount: 0,
      pageSize: 10,
      currentPage: 1,
      st: '',

      columns: [
        {
          title: "序号",
          type: 'index',
          align: "center"
        },
        {
          title: "户号",
          key: "account",
          align: "center"
        },
        {
          title: "开通地址",
          key: "address",
          align: "center"
        },
        {
          title: "使用联系人",
          key: "contactPerson",
          align: "center"
        },
        {
          title: "联系电话",
          key: "contactPersonPhone",
          align: "center"
        },
        {
          title: "开通日期",
          key: "serviceDate",
          align: "center"
        },
        {
          title: "销户日期",
          key: "pinFamilyTime",
          align: "center"
        },
        {
          title: "账户状态",
          key: "serviceType",
          align: "center",
          render: (h, params) => {
            let accountStatusId = params.row.serviceType
            let serviceType
            if(accountStatusId === 0 ) {
              serviceType = '未激活'
            }else if(accountStatusId === 1) {
              serviceType = '正常'
            }else if(accountStatusId === 2) {
              serviceType = '检修中'
            }else if(accountStatusId === 3) {
              serviceType = '自动停机'
            }else if(accountStatusId === 4) {
              serviceType = '主动停机'
            }else if(accountStatusId === 5) {
              serviceType = '销户'
            }
            const type = filter.filterAccount(accountStatusId)
            const color = type.color
            return h('Tag', {
              props: {
                color: color,
              },
              nativeOn: {
                click: () => {
                }
              }
            },serviceType)
          }
        },
        {
          title: "管理操作",
          key: "operate",
          align: "center",
          render: (h, params) => {
            if(params.row.serviceType === 5) {
              return h('div',[
                h('a', {
                  style: {
                    color: '#000000'
                  },
                  on: {
                    click: () => {
                      this.checkAccount(params.row)
                    }
                  }
                },`[详情]`),
                h('a', {
                  style: {
                    color: 'gray',
                    marginLeft: '20px',
                    pointerEvents: 'none'
                  },
                },`[修改]`),
                h('a', {
                  style: {
                    color: 'gray',
                    marginLeft: '20px',
                    pointerEvents: 'none'
                  },
                },`[销户]`),
              ])
            }else{
              if(params.row.exsitData === 0) {//正常
                return h('div',[
                  h('a', {
                    style: {
                      color: '#000000'
                    },
                    on: {
                      click: () => {
                        this.checkAccount(params.row)
                      }
                    }
                  },`[详情]`),
                  h('a', {
                    style: {
                      color: '#000000',
                      marginLeft: '20px'
                    },
                    on: {
                      click: () => {
                        this.editUser(params.row)
                      }
                    }
                  },`[修改]`),
                  h('a', {
                    style: {
                      color: '#000000',
                      marginLeft: '20px'
                    },
                    on: {
                      click: () => {
                        this.st = ''
                        let id = params.row.serviceType
                        if(id === 2) {
                          this.st = '检修中'
                        }else if(id === 3) {
                          this.st = '欠费停机'
                        }
                        if(id === 0 || id === 1 || id === 4) {
                          this.destroyId = params.row.id
                          this.delMod = true
                        }else{
                          this.noDel = true
                        }
                      }
                    }
                  },`[销户]`),
                ])
              }else{//修改标红
                return h('div',[
                  h('a', {
                    style: {
                      color: '#000000'
                    },
                    on: {
                      click: () => {
                        this.checkAccount(params.row)
                      }
                    }
                  },`[详情]`),
                  h('a', {
                    style: {
                      color: '#000000',
                      marginLeft: '20px'
                    },
                    on: {
                      click: () => {
                        this.review(params.row)
                      }
                    }
                  },`[修改]`),
                  h('Badge', {
                    props: {
                      count: 1,
                      dot: true,
                      offset: [-8,0]
                    },
                  }),
                  h('a', {
                    style: {
                      color: '#000000',
                      marginLeft: '20px'
                    },
                    on: {
                      click: () => {
                        this.st = ''
                        let id = params.row.serviceType
                        if(id === 2) {
                          this.st = '检修中'
                        }else if(id === 3) {
                          this.st = '欠费停机'
                        }
                        if(id === 0 || id === 1 || id === 4) {
                          this.destroyId = params.row.id
                          this.delMod = true
                        }else{
                          this.noDel = true
                        }
                      }
                    }
                  },`[销户]`),
                ])
              }
            }
          }
        },
      ],
      userList: [],
    }
  },

  created () {
    this.searchTheUserAudit()
    this.pageChange(1)
  },

  methods: {
    searchTheUserAudit() {
      accountApi.searchTheUserAudit()
      .then((res) => {
        if(res.data && res.data !== '0'){
          this.disNum = res.data
        }else{
          this.disNum = ''
        }
      }).catch((err) => {})
    },

    pageChange(page) {     
      this.currentPage = page
      accountApi.searchIbsAccountBypage({
        pageCurrent: this.currentPage,
        pageSize: this.pageSize,
        keyWord: this.keyWord,
        exsitData: this.disCheck === false ? '' : '1',
        serviceType: this.single === true ? '' : '5',
        startDate: this.startTime,
        endDate: this.endTime,
      }).then((res) => {
        this.userList = res.data.records
        console.log(res.data.total);
        
        this.dataCount = res.data.total
      }).catch((err) => {})
    },

    startTimeChange(startTime) {
      this.startTime = startTime
			this.endTimeOption = {  
        disabledDate(endTime) {  
          return endTime  && (endTime < new Date(startTime) || endTime > Date.now() ) 
        }
			}  
    },

    endTimeChange(endTime) {
      this.endTime = endTime
			this.startTimeOption = {  
        disabledDate(startTime) {  
          return startTime && (startTime > new Date(endTime) || startTime > Date.now())
        }  
			} 
    },

    addUser() {
      this.$router.push({ path: '/openAccount'})
    },

    checkAccount(data) {
      this.$router.push({name: 'accountINF', params: {id: data.id,applyNum: data.applyNum,serviceType: `${data.serviceType}`}})
    },

    editUser(data) {
      this.$router.push({name: 'editAccount', params: {id: data.id,applyNum: data.applyNum,serviceType: `${data.serviceType}`}})
    },

    review(data) {
      this.$router.push({name: 'reviewAccount', params: {id: data.id, applyNum: data.applyNum}})
    },

    destroy() {
      accountApi.deleteIbsAccount({
        accountId: this.destroyId
      }).then((res) => {
        console.log(res);
        if(res.status === 'success') {
          this.delMod = false
          this.destroyId = ''
          this.pageChange(this.currentPage)
          this.$Message.success('销户成功')
        }else{
          this.$Message.error('销户失败')
        }
      }).catch((err) => {})
    }
  },

  watch: {
    noDel: function(newV, oldv) {
      if(newV) {
        this.delMod = false
      }
    },

    delMod: function(newV, oldv) {
      if(newV) {
        this.noDel = false
      }
    },
  }
}
</script>

<style lang="less">
.account-list {
  .normal-table {
    margin:20px 0 10px ;
    height: calc(100vh - 270px);
  }
  
  .ivu-table .ivu-table-row {
    height: calc((100vh - 310px) / 10);
  }

  .del-info-modal {
    position: fixed;
    top: 40%;
    left: 42%;
    width: 415px;
    height: 232px;
    background-image: url('../../../assets/images/accountManage/dError.png');
    z-index: 5000;
    .mod-title {
      font-size: 16px;
    }
    .mod-content {
      margin-left: 100px;
      margin-top: 25px;
      color: white;
      .mod-content-title {
        font-size: 25px;
        margin-bottom: 20px;
      }
      .mod-content-info {
        font-size: 16px;
        margin-bottom: 18px;
      }
    }
  }

  .ft {
    text-indent: 2em;
  }

  .del-del-modal {
    .del-info-modal;
    background-image: url('../../../assets/images/accountManage/dInfo.png');
  }
}
</style>

