<!----停复机状态列表---->
<template>
  <div>
    <div>
      <Row :gutter="16">
        <Col span="2">
          <b class='fontSize'>账户总数：</b>
          <b class="bigFont1">{{accountTotal}}</b>
        </Col>
        <Col span="3">
          <b class='fontSize'>设备状态异常账户：</b>
          <b class="bigFont2">{{unusual}}</b>
        </Col>
        <Col span="3" style="padding-top:8px">
          <Checkbox v-model="single" @on-change="changePage(1)">只显示停机状态账户</Checkbox>
        </Col>
      </Row>
      <div class='mt20'>
        <Form :model="formInline" :rules="ruleInline" ref="formInline" label-position="left" :label-width="84">
          <Row :gutter="32">
            <Col span="5">
              <FormItem prop="accName" label="户号：">
                <Input type="text" v-model="formInline.accName"></Input>
              </FormItem>
            </Col>
            <Col span="5">
              <FormItem prop="companyName" label="公司名称/户主名字：" :label-width='126'>
                <Input type="text" v-model="formInline.companyName"></Input>
              </FormItem>
            </Col>
            <Col span="5">
              <FormItem prop="contactor" label="联系人：">
                <Input type="text" v-model="formInline.contactor"></Input>
              </FormItem>
            </Col>
            <Col span="5">
              <FormItem prop="phoneNum" label="联系人电话：">
                <Input type="text" v-model="formInline.phoneNum"></Input>
              </FormItem>
            </Col>
            <Col span="2" :offset="2">
              <imgButton type="按钮" name="查询" @click.native='searchBtn'></imgButton>
            </Col>
          </Row>
          <Row :gutter="32">
            <Col span="5" v-show="tab">
              <FormItem prop="itemCode" label="设备编码：">
                <Input type="text" v-model="formInline.itemCode"></Input>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>

      <div style="margin-top:20px">
        <Tabs type="card"  @on-click="changeTab">
          <TabPane v-for="tab in tabs" :key="" :label="tab.label">
            <Table :columns="tab.columns" class="common-tabTable" :data="accountData" no-data-text="暂无数据" style="marginTop:0" border></Table>
            <Row class="page-bottom">
              <Col span="12" class="page-text">当前显示<span class="pageColor">{{pageSize}}</span>条记录,共<span class="pageColor">{{dataCount}}</span>条记录</Col>
              <Col span="8" :offset="4"> 
                <Page :total="dataCount" :page-size="pageSize"  @on-change="changePage"  show-elevator :current="currentPage" class="common-page-style"/>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </div>
    </div>

  </div>
</template>
<script>
import checkout from '../../../api/checkout'
import shutdownManage from '../../../api/request/shutdownManage'
import filter from '../../../api/filter'
export default {
  data () {
    return {
      pageSize: 10,
      dataCount: 100,
      currentPage: 1,
      single: true,
      startTime: '',
      endTime: '',
      accountTotal: '',
      unusual: '',
      tab: '',
      startTimeOption: {},
      endTimeOption: {},
      formInline: {
        accName: '',
        companyName: '',
        passPeople: '',
        contactor: '',
        phoneNum: '',
        itemCode: ''
      },
      highSearch: false,
      ruleInline: {
        accName: [
          { max: 10, type: 'string', message: '最多输入10个字符', trigger: 'blur' },
          { validator: checkout.checkAccName, trigger: 'blur' }
        ],
        companyName: [
          { max: 20, type: 'string', message: '最多输入20个字符', trigger: 'blur' }
        ],
        contactor: [
          { max: 20, type: 'string', message: '最多输入20个字符', trigger: 'blur' },
        ],
        phoneNum: [
          { validator: checkout.checkTelephone, trigger: 'blur' }
        ]
      },
      accountData: [
      ],
      tabs:[
      ],
      columns1:[
        {
          title: "序号",
          type: "index",
          align: "center"
        },
        {
          title: "户号",
          key: "account",
          align: "center"
        },
        {
          title: "公司名称/户主名字",
          key: "companyName",        
          align: "center"
        },
        {
          title: "地址",
          key: "address",
          align: "center"
        },
        {
          title: "停/复机状态",
          key: "serviceType",
          align: "center",
          render: (h, params) => {
            let accountStatusId = params.row.accountStatus
            let serviceType
            accountStatusId === 0 ?  serviceType = '未激活' : accountStatusId === 1 ? serviceType = '正常' :  
            accountStatusId === 2 ? serviceType = '检修中' : accountStatusId === 3 ? serviceType = '自动停机' :
            accountStatusId === 4 ? serviceType = '主动停机' : serviceType = '销户'
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
          title: "停/复机日期",
          key: "updateTime",
          align: "center",
          width: 200,
          render: (h, params) =>{
            const updateTime = params.row.updateTime
            return h(
              'div',[updateTime,
                h(
                  'imgButton',
                  {
                    props: {
                      type: '小查看'
                    },
                    style:{
                      marginLeft:'4px'
                    },
                    nativeOn: {
                      click: () => {
                        this.$router.push({path: '/historyList',query:{accountId: params.row.id,account:params.row.account,serviceType:params.row.serviceType}})
                      }
                    }
                  }
                )
              ]
            )
          }
        },
        {
          title: "包含设备总数",
          key: "itemAmount",
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
          title: "当前余额",
          key: "balance",
          align: "center"
        }
      ],
      columns2:[
        {
          title: "序号",
          type: "index",
          align: "center"
        },
        {
          title: "设备编号",
          key: "code",
          align: "center"
        },
        {
          title: "所属账号",
          key: "account",        
          align: "center"
        },
        {
          title: "地址",
          key: "address",
          align: "center"
        },
        {
          title: "停/复机状态",
          key: "serviceType",
          align: "center",
          render: (h, params) => {
            let accountStatusId = params.row.accountStatus
            let serviceType
            accountStatusId === 0 ?  serviceType = '未激活' : accountStatusId === 1 ? serviceType = '正常' :  
            accountStatusId === 2 ? serviceType = '检修中' : accountStatusId === 3 ? serviceType = '自动停机' :
            accountStatusId === 4 ? serviceType = '主动停机' : serviceType = '销户'
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
          title: "停/复机开始日期",
          key: "updateTime",
          align: "center"
        },
        {
          title: "使用联系人",
          key: "contactPerson",
          align: "center"
        },{
          title: "联系电话",
          key: "contactPersonPhone",
          align: "center"
        },{
          title: "账户余额(元)",
          key: "balance",
          align: "center"
        }
      ],
    }
  },
  created () {
    this.searchAccountAmount(0)
    this.searchAccountAmount(1)
    this.changePage(1)
  },
  methods: {
    //查询内容设置2
    changePage (page) {
      this.currentPage = page
      this.changeTab(this.tab)

    },
     //开始时间
    startTimeChange(startTime) {
			this.startTime = startTime
			this.endTimeOption = {  
					disabledDate(endTime) {  
						return endTime  && (endTime < new Date(startTime) || endTime > Date.now() ) 
					}
			}  
    },
		//结束时间
    endTimeChange(endTime) {
			this.endTime = endTime
			this.startTimeOption = {  
					disabledDate(startTime) {  
						return startTime && (startTime > new Date(endTime) || startTime > Date.now())
					}  
			}  
    },

    //切换tab
    changeTab (data) {
      this.tab = data
      if(data !== 1) {
        this.searchAccountList()
      } else {
        this.searchItemList()
      }
      this.currentPage = 1
    },

    //查询
    searchBtn () {
      this.changePage(1)
    },

    //高级筛选
    submitSearchBtn (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.changePage(1)
        }
      })
    },

    //重置
    resetBtn (name) {
      this.$refs[name].resetFields()
    },
    //查询账户数量
    searchAccountAmount (data) {
      shutdownManage.searchAccountAmount({
        serviceType: data ? '' : 0
      })
        .then((res) => {
          data ?
          this.accountTotal = res.data
          :
          this.unusual = res.data
        })
          .catch((err) => {
            this.$Message.error('查询设备总数失败')
          })
    },
    //按账户统计
    searchAccountList () {
      shutdownManage.searchAccountList({
        serviceType: this.single ? 0 : '',
        beginTime: this.startTime,
        endTime: this.endTime,
        account: this.formInline.accName,
        companyName: this.formInline.companyName,
        contactPerson: this.formInline.contactor,
        phone: this.formInline.phoneNum,
        currentPage: this.currentPage,
        pageSize: 10
      })
        .then((res) => {
          this.accountData = res.dataList
          this.dataCount = res.total
        })
          .catch((err) => {
            this.$Message.error('按账户统计查询失败')
          })
    },
    //按设备统计
    searchItemList () {
      shutdownManage.searchItemList({
        itemStatus: this.single ? 0 : "",
        beginTime: this.startTime,
        endTime: this.endTime,
        account: this.formInline.accName,
        companyName: this.formInline.companyName,
        contactPerson: this.formInline.contactor,
        phone: this.formInline.phoneNum,
        itemCode: this.formInline.itemCode,
        currentPage: this.currentPage,
        pageSize: 10
      })
        .then((res) => {
          this.accountData = res.dataList
          this.dataCount = res.total
        })
          .catch((err) => {
            this.$Message.error('按设备统计查询失败')
          })
    },
  },
  mounted () {
    this.tabs = [
      {
        columns: this.columns1,
        label: (h) => {
          return h('div', [
            h('span', '按账户统计'),
            h('Badge', {
              props: {
                // count: 3,
                type: 'warning',
              },
              style: {
                position:'relative',
                top:'-6px',
                left:'13px'
              }
            })
          ])
        }
      },
      {
        columns: this.columns2,
        label: (h) => {
          return h('div', [
            h('span', '按设备统计'),
            h('Badge', {
              props: {
                // count: 100,
                type: 'warning'
              },
              style: {
                position:'relative',
                top:'-6px',
                left:'13px'
              }
            })
          ])
        }
      },
    ]
  }
}
</script>
<style>
</style>