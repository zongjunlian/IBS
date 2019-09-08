<!-----账户信息查询----->
<template>
  <div>
      <Row :gutter='16'>
        <Col span="6">
          <Row :gutter='16'>
            <Col span="4">
              <img src="../../../assets/images/user.png" style="width:98%">
            </Col>
            <Col span="20">
              <Row :gutter='32'>
                <Col span="8">
                  <span class="bigFont1">{{this.$route.query.accountNum}}</span>
                </Col>
                <Col span="16" class="mt5">
                  <span class="normal">[{{this.$route.query.serviceType === 0 ? '未激活' : this.$route.query.serviceType === 1 ? '正常' : this.$route.query.serviceType === 2 ? '检修中' :
                    this.$route.query.serviceType === 3 ? '自动停机' :this.$route.query.serviceType === 4 ? '主动停机' : '销户'}}]</span>
                </Col>
              </Row>
              <Row>
                <span class="smallFont">{{this.$route.query.address}}</span>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span="3" :offset="12">
          <span>
            当前账户余额：<b class="bigFont2">{{this.$route.query.balance}}</b> 元
          </span>
        </Col>
        <Col span="3">
          <span>
            预计可使用：<b class="bigFont1">{{2}}</b> 天
          </span>
        </Col>
      </Row>
      <div style="margin-top:20px;position:relative">
        <Tabs type="card" @on-click="changeTab">
          <TabPane v-for="tab in tabs" :key="" :label="tab.label" :name="tab.label">
            <Table :columns="tab.columns" class="common-table" :data="accountData" no-data-text="暂无数据" style="marginTop:0" border></Table>
            <Row class="page-bottom">
              <Col span="12" class="page-text">当前显示<span class="pageColor">{{pageSize}}</span>条记录,共<span class="pageColor">{{dataCount}}</span>条记录</Col>
              <Col span="8" :offset="4"> 
                <Page :total="dataCount" :page-size="pageSize"  @on-change="changePage"  show-elevator :current="currentPage" class="common-page-style"/>
              </Col>
            </Row>
          </TabPane>
        </Tabs>

        <div style="position:absolute;right:0;top:0;width:50%">
            <Row>
              <Col span="14" :offset="5">
                <span style="margin-right:20px">日期</span>
                <DatePicker type="datetime" style="display:inline-block" v-model="startTime" :editable="false" :options="startTimeOption" @on-change="startTimeChange"></DatePicker>
                <span style="margin:5px">—</span>
                <DatePicker type="datetime" style="display:inline-block" v-model="endTime" :editable="false" :options="endTimeOption" @on-change="endTimeChange"></DatePicker>
              </Col>
              <Col span="3">
                <imgButton type="按钮" name="重新查询" @click.native='researchBtn'></imgButton>
              </Col>
              <Col span="2">
                <imgButton type="打印"></imgButton>
              </Col>
            </Row> 
          </div>
      </div>
  </div>
</template>
<script>
import accountInfo from '../../../api/request/accountInfo'
import filter from '../../../api/filter'
export default {
  data () {
    return {
      dataCount: 100,
      pageSize: 10,
      currentPage: 1,
      startTime: '',
      endTime: '',
      type: 0,
      accountId: '',
      accountNum: '',
      tabName: '',
      isStart: false,
      isEnd: false,
      startTimeOption:{},
      endTimeOption: {},
      tabs:[
      ],
      columns1:[
        {
          title: "序号",
          type: "index",
          align: "center"
        },
        {
          title: "日期",
          key: "dateTime",
          align: "center"
        },
        {
          title: "风机盘管数量",
          key: "itemCount",        
          align: "center"
        },
        {
          title: "风机盘管累计运行时间(h)",
          key: "runTime",
          align: "center"
        },
        {
          title: "累计用冷量(kWh/h)",
          key: "value",
          align: "center"
        },
        {
          title: "合计费用(元)",
          key: "rate",
          align: "center"
        }
      ],
      columns3:[
        {
          title: "序号",
          type: "index",
          align: "center"
        },
        {
          title: "日期",
          key: "createTime",
          align: "center"
        },
        {
          title: "金额",
          key: "changeBlace",        
          align: "center"
        },
        {
          title: "费用记录",
          key: "type",
          align: "center",
          render: (h, params) => {
            let accountTypeId = params.row.type
            let accountType
            accountTypeId === 1 ? accountType = '充值' : accountType = '扣费'
            const type = filter.filterAccount(accountTypeId)
            const color = type.color
            return h('Tag', {
              props: {
                color: color,
              },
              nativeOn: {
                click: () => {
                }
              }
            },accountType)
          }
        },
        {
          title: "账户余额(元)",
          key: "balance",
          align: "center"
        },
        {
          title: "缴费说明",
          key: "describe",
          align: "center"
        },
        {
          title: "经办人员",
          key: "remark",
          align: "center"
        }
      ],
      columns4:[
        {
          title: "序号",
          type: "index",
          align: "center"
        },
        {
          title: "日期",
          key: "dateTime",
          align: "center"
        },
        {
          title: "执行操作",
          key: "type",        
          align: "center",
          render: (h, params) => {
            let accountStatusId = params.row.type
            let serviceType
            accountStatusId === 0 ?  serviceType = '分户' : accountStatusId === 1 ? serviceType = '并户' : serviceType = '销户'
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
          title: "变更内容说明",
          key: "content",
          align: "center"
        },
        {
          title: "包含设备总数",
          key: "itemCount",
          align: "center"
        },
        {
          title: "经办人员",
          key: "staffName",
          align: "center"
        }
      ],
      columns5:[
        {
          title: "序号",
          type: "index",
          align: "center"
        },
        {
          title: "编码",
          key: "invoiceCode",
          align: "center"
        },
        {
          title: "开票时间",
          key: "createTime",
          align: "center"
        },
        {
          title: "收款方",
          key: "money",        
          align: "center",
          render: (h, params) =>{
            return h(
              'div',
          '重庆仙桃数据谷能源管理科技有限公司'
            )
          }
        },
        {
          title: "付款方",
          key: "companyName",
          align: "center"
        },
        {
          title: "开票金额(元)",
          key: "invoiceBlace",
          align: "center"
        },
        {
          title: "查看发票",
          key: "totalMoney",
          align: "center",
          render: (h, params) =>{
            const url = params.row.url
            return h(
              'div',[
                h(
                  'imgButton',
                  {
                    props: {
                      type: '打印'
                    },
                    nativeOn: {
                      click: () => {
                        window.open(url,'name','height=550,width=800,left=500,top=200');
                      }
                    }
                  }
                )
              ]
            )
          }
        }
      ],
      columns6:[
        {
          title: "序号",
          type: "index",
          align: "center"
        },
        {
          title: "申报时间",
          key: "applyDate",
          align: "center"
        },
        {
          title: "申报主题",
          key: "applyTitle",        
          align: "center"
        },
        {
          title: "业务类型",
          key: "applyType",
          align: "center"
        },
        {
          title: "处置进程",
          key: "processStatus",
          align: "center",
          render: (h, params) => {
            let processStatusId = params.row.processStatus
            let processStatus
            processStatusId === 0 ?  processStatus = '未处置' : processStatusId === 1 ? processStatus = '派单中' : processStatusId === 2 ? processStatus = '维修中' : processStatusId === 3 ? processStatus = '待缴费': processStatus = '已完成'
            const type = filter.filterAccount(processStatusId)
            const color = type.color
            return h('Tag', {
              props: {
                color: color,
              },
              nativeOn: {
                click: () => {
                }
              }
            },processStatus)
          }
        },
        {
          title: "申报方联系人",
          key: "applicant",
          align: "center"
        },
        {
          title: "联系电话",
          key: "phone",
          align: "center"
        },
        {
          title: "受理客服",
          key: "staff",
          align: "center"
        },
        {
          title: "查看详细",
          key: "totalMoney",
          align: "center",
          render: (h, params) =>{
            return h(
              'div',[
                h(
                  'imgButton',
                  {
                    props: {
                      type: '打印'
                    },
                    nativeOn: {
                      click: () => {
                      }
                    }
                  }
                )
              ]
            )
          }
        }
      ],
      accountData: []
    }
  },
  methods: {
    changePage (page) {
      this.currentPage = page
      this.changeTab(this.tabName)
    },

    //重新查询
    researchBtn() {
      this.changePage(1)
    },

    //用冷/热及费用
    searchIbsEnergyFeeByPage () {
      // this.currentPage = page
      accountInfo.searchIbsEnergyFeeByPage({
        accountId: this.accountId,
        startDate:  this.isStart ? this.startTime : this.$route.query.startTime,
        endDate: this.isEnd ? this.endTime : this.$route.query.endTime,
        pageCurrent: this.currentPage,
        pageSize: 10,
        type: this.type
      })
        .then((res) => {
          this.accountData = res.records
          this.dataCount = res.total
        })
          .catch((err) => {
            this.$Message.error('页面加载失败')
          })
    },

    //充值记录
    searchSpotCostByPage () {
      // this.currentPage = page
      accountInfo.searchSpotCostByPage({
        accountNum: this.accountNum,
        startDate: this.isStart ? this.startTime : this.$route.query.startTime,
        endDate: this.isEnd ? this.endTime : this.$route.query.endTime,
        pageCurrent: this.currentPage,
        pageSize: 10,
      })
        .then((res) => {
          this.accountData = res.records
          this.dataCount = res.total
        })
          .catch((err) => {
            this.$Message.error('页面加载失败')
          })
    },

    //分户/并户记录
    searchAccountChangeRecordByPage () {
      // this.currentPage = page
      accountInfo.searchAccountChangeRecordByPage({
        account: this.accountNum,
        startDate: this.isStart ? this.startTime : this.$route.query.startTime,
        endDate: this.isEnd ? this.endTime : this.$route.query.endTime,
        pageCurrent: this.currentPage,
        pageSize: 10,
      })
        .then((res) => {
          this.accountData = res.records
          this.dataCount = res.total
        })
          .catch((err) => {
            this.$Message.error('页面加载失败')
          })
    },
    //电子发票
    searchSpotInvoiceByPage () {
      // this.currentPage = page
      accountInfo.searchSpotInvoiceByPage({
        accountNum: this.accountNum,
        startDate: this.isStart ? this.startTime : this.$route.query.startTime,
        endDate: this.isEnd ? this.endTime : this.$route.query.endTime,
        pageCurrent: this.currentPage,
        pageSize: 10,
      })
        .then((res) => {
          this.accountData = res.records
          this.dataCount = res.total
        })
          .catch((err) => {
            this.$Message.error('页面加载失败')
          })
    },

    //申报记录
    searchIbsApplyByPage () {
      // this.currentPage = page
      accountInfo.searchIbsApplyByPage({
        accountId: this.accountId,
        startDate: this.isStart ? this.startTime : this.$route.query.startTime,
        endDate: this.isEnd ? this.endTime : this.$route.query.endTime,
        pageCurrent: this.currentPage,
        pageSize: 10,
      })
        .then((res) => {
          this.accountData = res.records
          this.dataCount = res.total
        })
          .catch((err) => {
            this.$Message.error('页面加载失败')
          })
    },

    //切换标签页
    changeTab (data) {
      this.tabName = data
      if(data === '用冷量及费用') {
        this.type = 0
        this.searchIbsEnergyFeeByPage()
      } else if (data === '用热量及费用') {
        this.type = 1
        this.searchIbsEnergyFeeByPage()
      } else if (data === '充值记录') {
        this.searchSpotCostByPage()  
      } else if (data === '分户/并户记录') {
        this.searchAccountChangeRecordByPage()
      } else if (data === '电子发票') {
        this.searchSpotInvoiceByPage()
      } else {
        this.searchIbsApplyByPage()
      }
      this.currentPage = 1
    },
    //开始时间
    startTimeChange(startTime) {
      this.isStart = true
			this.startTime = startTime
			this.endTimeOption = {  
          disabledDate(endTime) {
						return endTime  && (endTime < new Date(startTime) || endTime > Date.now() ) 
					}
			}  
    },
		//结束时间
    endTimeChange(endTime) {
      this.isEnd = true
			this.endTime = endTime
			this.startTimeOption = {  
					disabledDate(startTime) {
						return startTime && (startTime > new Date(endTime) || startTime > Date.now())
					}  
			}  
    },
  },
  mounted () {
    this.changePage(1)
  },
  created () {
    this.startTime = this.$route.query.startTime
    this.endTime = this.$route.query.endTime
    this.accountId = this.$route.query.accountId
    this.accountNum = this.$route.query.accountNum
    this.tabName = this.$route.query.checkAllGroup[0]
    let tabs = [
        {
          columns: this.columns1,
          label:'用冷量及费用'
        },
        {
          columns: this.columns1,
          label:'用热量及费用'
        },
        {
          columns: this.columns3,
          label:'充值记录'
        },
        {
          columns: this.columns4,
          label:'分户/并户记录'
        },
        {
          columns: this.columns5,
          label:'电子发票'
        },
        {
          columns: this.columns6,
          label:'申报记录'
        }
    ]
    if(this.$route.query.checkAllGroup){
      let checkAllGroup = this.$route.query.checkAllGroup
      for(const val of checkAllGroup){
        for(const item of tabs){
          if(val === item.label){
            this.tabs.push(item)
          }
        }
      }
    }
  }
}
</script>
<style scoped>
.normal {
  font-size: 16px;
  color: #222;
}
.smallFont {
  font-size:12px;
  color:rgba(7,122,169,.8)
}
</style>