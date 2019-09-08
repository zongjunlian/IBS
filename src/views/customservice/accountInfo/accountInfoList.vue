<!----账户查询时的账户列表---->
<template>
  <div>
    <div>
      <Row :gutter="16">
        <Col span="2">
          <b class="fontSize">账户总数：</b>
          <b class="bigFont1">{{totalNum}}</b>
        </Col>
        <Col span="2" style="padding-top:8px">
          <Checkbox v-model="single" @on-change="pageChange(1)">只显示有效账户</Checkbox>
        </Col>
      </Row>
      <Form :model="formInline" ref="formInline" label-position="left" :label-width="84" class='mt20'>
        <Row :gutter="32">
          <Col span="6">
            <FormItem prop="accName" label="户号：">
              <Input type="text" v-model="formInline.accName"></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem prop="companyName" label="公司名称/户主名字：" :label-width='126'>
              <Input type="text" v-model="formInline.companyName"></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem prop="passPeople" label="经办人：">
              <Input type="text" v-model="formInline.passPeople"></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem prop="contactor" label="联系人：">
              <Input type="text" v-model="formInline.contactor"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="32">
          <Col span="6">
            <FormItem prop="phoneNum" label="联系人电话：">
              <Input type="text" v-model="formInline.phoneNum"></Input>
            </FormItem>
          </Col>
          <Col span="2" :offset='14'>
            <imgButton type="按钮" name="查询" @click.native='searchBtn'></imgButton>
          </Col>
          <Col span="2">
            <imgButton type="高级筛选" name="高级筛选" @click.native='highSearch = !highSearch'></imgButton>
          </Col>
        </Row>
      </Form>
      <div class="highSearch" v-show="highSearch" style='margin-top:10px;padding:20px'>
        <Row>
          <Col span="22">
            <span style="margin-right:20px">开户日期</span>
            <DatePicker type="datetime" style="display:inline-block" v-model="startTime" :editable="false" :options="startTimeOption" @on-change="startTimeChange"></DatePicker>
            <span style="margin:5px">—</span>
            <DatePicker type="datetime" style="display:inline-block" v-model="endTime" :editable="false" :options="endTimeOption" @on-change="endTimeChange"></DatePicker>
          </Col>
          <Col span="1">
            <imgButton type="提交" name="提交" @click.native="submitSearchBtn('formInline')"></imgButton>
          </Col>
          <Col span="1">
            <imgButton type="重置" name="重置" @click.native="resetBtn('formInline')"></imgButton>
          </Col>
        </Row>
      </div>

      <Table :columns="columns" class="common-table" :data="accountList" no-data-text="暂无数据" border style='margin-top:0'></Table>

      <Row class="page-bottom">
        <Col span="12" class="page-text">当前显示<span class="pageColor">{{pageSize}}</span>条记录,共<span class="pageColor">{{dataCount}}</span>条记录</Col>
        <Col span="8" :offset="4"> 
          <Page :total="dataCount" :page-size="pageSize"  @on-change="pageChange"  show-elevator :current="currentPage" class="common-page-style"/>
        </Col>
      </Row>
    </div>

    <Modal :mask-closable="false" v-model="searchModal" width="500" draggable @on-cancel="onCancel">
      <div style="margin:20px">
        <Form ref="searchForm" :model="searchForm" :rules='ruleSearchForm' label-position="top">
          <FormItem prop="createTime" label='查询周期'>
            <DatePicker type="datetime" style="display:inline-block" v-model="searchForm.createTime" :editable="false" :options="createTimeOption" @on-change="createTimeChange"></DatePicker>
            <span style="margin:5px">—</span>
            <DatePicker type="datetime" style="display:inline-block" v-model="searchForm.overTime" :editable="false" :options="overTimeOption" @on-change="overTimeChange"></DatePicker>
          </FormItem>
          <FormItem prop="checkAllGroup" label='查询内容'>
            <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
              <Checkbox
                  :indeterminate="indeterminate"
                  :value="checkAll"
                  @click.prevent.native="handleCheckAll">全选</Checkbox>
            </div>
            <CheckboxGroup v-model="searchForm.checkAllGroup" @on-change="checkAllGroupChange">
              <Checkbox label="用冷量及费用" style="display:block"></Checkbox>
              <Checkbox label="用热量及费用" style="display:block"></Checkbox>
              <Checkbox label="充值记录" style="display:block"></Checkbox>
              <Checkbox label="分户/并户记录"></Checkbox>
              <Checkbox label="电子发票" style="display:block"></Checkbox>
              <Checkbox label="申报记录" style="display:block"></Checkbox>
            </CheckboxGroup>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" style="margin:25px 0">
        <imgButton type="按钮" name="确定" @click.native="submitSearch()">确定</imgButton>
        <imgButton type="按钮" name="重置" @click.native="resetSearchBtn('searchForm')">重置</imgButton>
      </div>
    </Modal>

  </div>
</template>
<script>
import checkout from '../../../api/checkout'
import accountInfo from '../../../api/request/accountInfo'
import filter from '../../../api/filter'
export default {
  data () {
    return {
      totalNum: '',
      single: true,
      searchModal: false,
      pageSize: 10,
      dataCount: 10,
      currentPage: 1,
      indeterminate: false,
      checkAll: false,
      accountId: '',
      accountNum: '',
      address: '',
      balance: '',
      serviceType: '',
      startTime: '',
      endTime: '',
      startTimeOption: {},
      endTimeOption: {},
      createTimeOption: {},
      overTimeOption: {},
      searchForm: {
        createTime: '',
        overTime: '',
        checkAllGroup: [],
      },
      ruleSearchForm: {

      },
      columns: [
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
          title: "开通地址",
          key: "address",        
          align: "center"
        },
        {
          title: "账户余额（元）",
          key: "balance",
          align: "center"
        },
        {
          title: "包含设备总数",
          key: "items",
          align: "center"
        },
        {
          title: "账户状态",
          key: "serviceType",
          align: "center",
          render: (h, params) => {
            let accountStatusId = params.row.serviceType
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
          title: "账户申请日期",
          key: "settledTime",
          align: "center"
        },
        {
          title: "管理操作",
          key: "operation",
          align: "center",
          render: (h, params) =>{
            return h(
              'div',[
                h(
                  'imgButton',
                  {
                    props: {
                      type: '查看'
                    },
                    nativeOn: {
                      click: () => {
                        this.searchModal = true
                        this.accountId = params.row.id
                        this.accountNum = params.row.account
                        this.address = params.row.address
                        this.balance = params.row.balance
                        this.serviceType = params.row.serviceType
                      }
                    }
                  }
                )
              ]
            )
          }
        }
      ],
      accountList: [
      ],
      formInline: {
        accName: '',
        companyName: '',
        passPeople: '',
        contactor: '',
        phoneNum: '',
      },
      highSearch: false,
    }
  },
  created () {
    this.pageChange(1)
  },
  methods: {
    //账户列表1
    pageChange (page) {
      this.currentPage = page
      accountInfo.searchIbsAccountInfoBypage({
        pageCurrent: page,
        pageSize: 10,
        serviceType: this.single ? '5' : '',
        startDate: this.startTime,
        endDate: this.endTime,
        account: this.formInline.accName,
        operator: this.formInline.passPeople,
        companyName: this.formInline.companyName,
        contactPerson: this.formInline.contactor,
        contactPersonPhone: this.formInline.phoneNum

      })
        .then((res) => {
          this.accountList = res.records
          this.dataCount = res.total
          this.totalNum = res.total
        })
          .catch((err) => {
            this.$Message.error('页面加载失败')
          })

    },

    //查询
    searchBtn () {
      this.pageChange(1)
    },

    //高级筛选确定
    submitSearchBtn (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.pageChange(1)
        }
      })
    },

    //查询内容设置2
    changePage () {

    },
    handleCheckAll () {
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll
      }
        this.indeterminate = false
      if (this.checkAll) {
        this.searchForm.checkAllGroup = ['用冷量及费用', '用热量及费用', '充值记录','分户/并户记录','电子发票','申报记录'];
      } else {
        this.searchForm.checkAllGroup = [];
        }
    },
    //查询内容checkbox
    checkAllGroupChange (data) {
      if (data.length === 6) {
        this.indeterminate = false
        this.checkAll = true;
      } else if (data.length > 0) {
        this.indeterminate = true
        this.checkAll = false
      } else {
        this.indeterminate = false
        this.checkAll = false
      }
    },
    //查询内容确定
    submitSearch () {
      if(this.searchForm.checkAllGroup.length !== 0){
        this.$router.push({ path: '/accountInfo',
        query:{checkAllGroup: this.searchForm.checkAllGroup,startTime:this.searchForm.createTime,
        endTime:this.searchForm.overTime,accountId:this.accountId,accountNum:this.accountNum,
        address:this.address,balance:this.balance,serviceType:this.serviceType}})
      } else {
        this.$Message.error('请选择查询内容')
      }
    },
    //查询内容重置
    resetSearchBtn (name) {
      this.$refs[name].resetFields()
      this.searchForm.overTime = ''
    },

    //模态框取消
    onCancel () {
      this.resetSearchBtn('searchForm')
    },
    //重置
    resetBtn () {
      this.startTime = ''
      this.endTime = ''
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
     //查询周期开始时间
    createTimeChange(createTime) {
			this.searchForm.createTime = createTime
			this.overTimeOption = {  
					disabledDate(overTime) {  
						return overTime  && (overTime < new Date(createTime) || overTime > Date.now() ) 
					}
			}  
    },
		//查询周期结束时间
    overTimeChange(overTime) {
			this.searchForm.overTime = overTime
			this.createTimeOption = {  
					disabledDate(createTime) {  
						return createTime && (createTime > new Date(overTime) || createTime > Date.now())
					}  
			}  
    }
  }
}
</script>
<style>
</style>