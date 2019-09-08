<!----预约停复机列表---->
<template>
  <div>
    <div>
      <Row :gutter="16">
        <Col span="3">
          <b class='fontSize' v-if='tab'>复机申请总数：</b>
          <b class='fontSize' v-else>停机申请总数：</b>
          <b class="bigFont1">{{stopTotal}}</b>
        </Col>
        <Col span="3">
          <b class='fontSize'>未处置申请：</b>
          <b class="bigFont2">{{undispose}}</b>
        </Col>
        <Col span="3" style="padding-top:8px">
          <Checkbox v-model="single" @on-change="changePage(1)">只显示未处置申请</Checkbox>
        </Col>
        <Col span="8" :offset="3">
          <span style="margin-right:20px" v-if="tab">预约复机日期</span>
          <span style="margin-right:20px" v-else>预约停机日期</span>
          <DatePicker type="date" style="display:inline-block" v-model="startTime" :editable="false" :options="startTimeOption" @on-change="startTimeChange"></DatePicker>
          <span style="margin:5px">—</span>
          <DatePicker type="date" style="display:inline-block" v-model="endTime" :editable="false" :options="endTimeOption" @on-change="endTimeChange"></DatePicker>
          </Col>
        <Col span="2">
          <imgButton type="按钮" name="查询" @click.native='searchBtn'></imgButton>
        </Col>
        <Col span="2">
          <imgButton type="高级筛选" name="高级筛选" @click.native='highSearch = !highSearch'></imgButton>
        </Col>
      </Row>
      <div class="highSearch" v-show="highSearch" style="paddingBottom:20px">
        <Form :model="formInline" :rules="ruleInline" ref="formInline" label-position="right" :label-width="100">
          <Row :gutter="16">
            <Col span="6">
              <FormItem prop="accName" label="户号：">
                <Input type="text" v-model="formInline.accName"></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem prop="address" label="地址：">
                <Input type="text" v-model="formInline.address"></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem prop="contactor" label="联系人：">
                <Input type="text" v-model="formInline.contactor"></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem prop="phoneNum" label="联系人电话：">
                <Input type="text" v-model="formInline.phoneNum"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="16">
            <Col span="1" :offset="22">
              <imgButton type="提交" name="提交" @click.native="submitSearchBtn('formInline')"></imgButton>
            </Col>
            <Col span="1">
              <imgButton type="重置" name="重置" @click.native="resetBtn('formInline')"></imgButton>
            </Col>
          </Row>
        </Form>
      </div>

      <div style="margin-top:20px">
        <Tabs type="card" @on-click="changeTab">
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
      
      <Modal :mask-closable="false" v-model="ideaModal" width="400" draggable @on-cancel="onCancel">
        <div style="margin:20px">
          <Form ref="ideaForm" :model="ideaForm" :rules='ideaRule'>
            <FormItem prop="idea" label='处置意见'>
              <RadioGroup v-model="ideaForm.idea">
                <Radio label="1">通过</Radio>
                <Radio label="2">驳回</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem prop="description" label='处置说明'>
              <Input v-model="ideaForm.description" type="textarea" :autosize="{minRows: 5,maxRows: 5}">
              </Input>
            </FormItem>
          </Form>
        </div>
        <div slot="footer" style="margin:25px 0">
          <imgButton type="按钮" name="确定" @click.native="submitBtn('ideaForm')">确定</imgButton>
          <imgButton type="按钮" name="重置" @click.native="resetBtn('ideaForm')">重置</imgButton>
        </div>
      </Modal>

    </div>
  </div>
</template>
<script>
import checkout from '../../../api/checkout'
import shutdownManage from '../../../api/request/shutdownManage'
import filter from '../../../api/filter'
import shutdownManageVue from './shutdownManage.vue';
export default {
  data () {
    return {
      pageSize: 10,
      dataCount: 100,
      currentPage: 1,
      single: true,
      ideaModal: false,
      stopTotal: '',
      undispose: '',
      accountId: '',
      startTime: '',
      endTime: '',
      tab: '',
      type: 0,
      startTimeOption: {},
      endTimeOption: {},
      formInline: {
        accName: '',
        address: '',
        passPeople: '',
        contactor: '',
        phoneNum: '',
      },
      highSearch: false,
      ruleInline: {
        accName: [
          { max: 10, type: 'string', message: '最多输入10个字符', trigger: 'blur' },
          { validator: checkout.checkAccName, trigger: 'blur' }
        ],
        contactor: [
          { max: 20, type: 'string', message: '最多输入20个字符', trigger: 'blur' },
        ],
        phoneNum: [
          { validator: checkout.checkTelephone, trigger: 'blur' }
        ]
      },
      ideaForm: {
        idea: '1',
        description: ''
        
      },
      ideaRule: {
        idea:[{required: true, type: 'string', message: '请选择处置意见', trigger: 'change'}],
        description :[{ max: 100, type: 'string', message: '最多输入100个字符', trigger: 'blur' }]
      },
      accountData: [
      ],
      tabs:[
      ],
      columns:[
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
          title: "地址",
          key: "address",
          align: "center"
        },
        {
          title: "账户状态",
          key: "accountStatus",
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
          title: "账户余额(元)",
          key: "balance",
          align: "center"
        },
        {
          title: "预约停/复机日期",
          key: "dateTime",
          align: "center",
          width: 150
        },
        {
          title: "包含设备数量",
          key: "itemAmount",
          align: "center"
        },
        {
          title: "联系人",
          key: "contactPerson",
          align: "center"
        },
        {
          title: "电话号码",
          key: "phone",
          align: "center"
        },
        {
          title: "处置说明",
          key: "description",
          align: "center"
        },
        {
          title: "操作",
          key: "operation",
          align: "center",
          render: (h, params) =>{
            const status = params.row.status
            let name
            status===0?name='未处置':status===1?name='已通过':name='未通过'
            return h(
              'div',[
                h(
                  'div',
                  {
                    style:{
                      color:status!==0?'#aaa':'',
                      cursor: status!==0?'': 'pointer'
                    },
                    on:{
                      click: () => {
                        if(status===0){
                        this.ideaModal = true
                        this.accountId = params.row.accountId
                        this.orderTime = params.row.dateTime
                        }
                      }
                    }
                  },'['+name+']'
                )
              ]
            )
          }
        }
      ]
    }
  },
  created () {
    this.changePage(1)
    this.searchOnOffAmount()
  },
  methods: {
    //查询停复机预约
    changePage (page) {
      this.currentPage = page
      shutdownManage.searchOnOffList({
        status: this.single ? 0 : '',
        startDate: this.startTime,
        endDate: this.endTime,
        account: this.formInline.accName,
        address: this.formInline.address,
        person: this.formInline.contactor,
        phone: this.formInline.phoneNum,
        type: this.type,
        currentPage: this.currentPage,
        pageSize: 10
      })
        .then((res) => {
          this.accountData = res.dataList
          this.dataCount = res.total
        })
          .catch((err) => {
            this.$Message.error('页面加载失败')
          })
    },

    //切换tab
    changeTab (data) {
      this.tab = data
      if(data === 0) {
        this.type = 0
      } else {
        this.type = 1
      }
      this.changePage(1)
      this.searchOnOffAmount()
    },

    //查询停复机预约申请数量
    searchOnOffAmount () {
      shutdownManage.searchOnOffAmount({
        type: this.type
      })
        .then((res) => {
          this.stopTotal = res.total
          this.undispose = res.unprocessed
        })
          .catch((err) => {
            this.$Message.error('查询停复机预约申请数量失败')
          })
    },

    //处置停复机预约
    updateOnOffStatus () {
      shutdownManage.updateOnOffStatus({
        accountId: this.accountId,
        time: this.orderTime,
        status: this.ideaForm.idea,
        description:this.ideaForm.description
      })
        .then((res) => {
          this.$Message.success('处置成功')
          this.ideaModal = false
          this.resetBtn('ideaForm')
        })
          .catch((err) => {
            this.$Message.error('处置失败')
          })
    },

    //处置预约submit
    submitBtn (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.updateOnOffStatus()
        }
      })
    },

    //查询
    searchBtn () {
      this.changePage(1)
    },

    //高级筛选提交
    submitSearchBtn (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.changePage(1)
        }
      })
    },

    //模态框取消
    onCancel () {
      this.resetBtn('ideaForm')
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
    //重置
    resetBtn (name){
      this.$refs[name].resetFields()
    }
  },
  mounted () {
    this.tabs = [
      {
        columns: this.columns,
        label: (h) => {
          return h('div', [
            h('span', '停机申请'),
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
        columns: this.columns,
        label: (h) => {
          return h('div', [
            h('span', '复机申请'),
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