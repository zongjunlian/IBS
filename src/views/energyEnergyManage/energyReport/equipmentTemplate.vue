<style lang="less" scoped>
.normal-btn {
  width: 32px;
  height: 32px;
}
</style>

<style lang="less">
.colletor-modal {
  margin-top: 5%;
}
</style>

<template>
  <div class='equipment-template'>
    <div>
      <Row :gutter="16">
        <Col span="4">
          <b class="fontSize">设备统计报表模板总数：</b>
          <b class="bigFont1">{{dataCount === 0 ? '' : dataCount}}</b>
        </Col>
        <Col span="3" :offset="4">
          <MultiSelect :selectValueProp="devType" :optionArrProp="devTypes" :widthProp="200" @listenChange="devTypeChange" :maxCountProp="1"></MultiSelect>
        </Col>
        <Col span="2">
          <imgButton type="按钮" name="查询" @click.native='searchBtn()'></imgButton>
        </Col>
        <Col span='1' :offset="10">
          <imgButton type="添加报表" class="normal-btn" @click.native="title='添加定期报表模板',resetFrom('formInline'),getRange(), searchAllAccountIdAndName(), isAdd = true, model = true"></imgButton>
        </Col>
      </Row>

      <Table :columns="columns" class="normal-table" :data="terminalTemplate" no-data-text="暂无数据" border></Table>

      <Row class="page-bottom">
        <Col span="12" class="page-text">当前显示<span class="pageColor">{{(terminalTemplate && terminalTemplate.length > 0) ? terminalTemplate.length : 0}}</span>条记录,共<span class="pageColor">{{dataCount}}</span>条记录</Col>
        <Col span="8" :offset="4"> 
          <Page :total="dataCount" :page-size="pageSize"  @on-change="pageChange"  show-elevator :current="currentPage" class="common-page-style"/>
        </Col>
      </Row>
    </div>
    <!----删除-->
    <imodal v-model="visible" type="提示" :title="title">
      <div class="mod-content">
        <p class="mod-content-title">系统提示：</p>
        <p class="mod-content-info ft">
          本次操作将导致当前报表模板信息被删除，系统将不再定期发送该统计报表。
        </p>
        <br><br>
        <span>
          <Button class="mod-content-btn delBtn" @click="visible = false">取消操作</Button>
          <Button class="mod-content-btn delBtn" style='margin-right:8px;' @click="isDel = true,visible = false,deleteF()">确认删除</Button>
        </span>
      </div>
    </imodal>
    <!---添加设备-->
    <Modal :mask-closable="false" v-model="model" draggable width='1000' class='modal' class-name="colletor-modal">
      <div style="margin-top:30px">
        <Row>
          <Col span='20'>
            <img class='imgPosition' src='@/assets/images/img-button/addReport.png' v-if='isAdd'>
            <img class='imgPosition' src='@/assets/images/img-button/edit.png' v-else>
            <span class='spanPosition'>{{title}}</span>
          </Col>
          <Col span='4'>
            <span>操作日期: {{nowDate}}</span>
          </Col>
        </Row>
        <Form class="mt20" ref="formInline" :model="formInline" :rules='ruleInline' :label-width="15">
          <table border class='table' width='100%'>
            <tr>
              <td width='20%'>
                <label>统计报表名称</label>
              </td>
              <td width='80%' class='padding' colspan="3">
                <FormItem prop="name" class='inline' label=' '>
                  <Input type='text' v-model='formInline.name' placeholder=''></Input>
                </FormItem>
              </td>
            </tr>
            <tr>
              <td width='20%'>
                <label>统计报表类型</label>
              </td>
              <td width='80%' class='padding textCheck' colspan="3">
                <FormItem prop="meterIds" class='inline' label=' ' style='textAlign:left'>
                  <Checkbox style='display:inline'
                    :indeterminate="itmn1"
                    :value="allType"
                    @click.prevent.native="checkAllType"
                    :disabled="isAdd ? false : true">全选
                  </Checkbox>
                  <CheckboxGroup v-model="formInline.meterIds" @on-change="allTypeChange" style='display:inline'>
                    <Checkbox :label="item.value" v-for='item in checkGroup1' :disabled="isAdd ? false : true" :key="item.value">{{item.label}}</Checkbox>
                  </CheckboxGroup>
                </FormItem>
              </td>
            </tr>
            <tr>
              <td width='20%' v-if="isAdd === true">
                <label>报表性质</label>
              </td>
              <td width='30%' class='padding' v-if="isAdd === true">
                <FormItem prop="timeType" class='inline' label=' ' style="textAlign:left">
                  <Select v-model="formInline.timeType" filterable @on-change='' clearable placeholder='' :disabled='isAdd?false:true'>
										<Option v-for="item in reportNatures" :value="item.value" :key="item.value">{{item.name}}</Option>
									</Select>
                </FormItem>
              </td>
              <td width='20%' >
                <label v-if="isAdd === true">起始日期</label>
                <label v-else>统计日期</label>
              </td>
              <td :style="{width: `${isAdd === true ? '30%' : '80%'}`}" class='padding'>
                <FormItem prop="date" class='inline' label=' ' style="textAlign:left">
                  <DatePicker type="datetimerange" placement="bottom-end" v-model='formInline.date' style='width:300px' :disabled='isAdd?false:true'></DatePicker>
                </FormItem>
              </td>
            </tr>
            <tr>
              <td width='20%'>
                <label>内容描述/备注</label>
              </td>
              <td width='80%' class='padding' colspan="3">
                <FormItem prop="description" class='inline' label=' '>
                  <Input type='textarea' v-model='formInline.description' :autosize="{minRows: 2,maxRows: 5}"></Input>
                </FormItem>
              </td>
            </tr>
            <tr>
              <td width='20%'>
                <label>邮件报送</label>
              </td>
              <td width='80%' class='padding' colspan="3">
                <FormItem prop="description" class='inline' label=' '>
                  <MultiSelect :selectValueProp="accounts" :optionArrProp="accountList" :widthProp="800" @listenChange="accountsChange" :maxCountProp="10"></MultiSelect>
                </FormItem>
              </td>
            </tr>
            <tr>
              <td width='20%'>
                <label>统计内容</label>
              </td>
              <td width='80%' class='padding textCheck' colspan="3">
                <FormItem prop="contentWord" class='inline' label=' ' style='textAlign:left'>
                  <Checkbox style='display:inline'
                    :indeterminate="itmn2"
                    :value="allContent"
                    @click.prevent.native="checkAllContent"
                    :disabled="isAdd ? false : true">全选
                  </Checkbox>
                  <CheckboxGroup v-model="formInline.contentWord" @on-change="allContentChange" style='display:inline'>
                    <Checkbox :label="item.value" v-for='item in checkGroup2' :key="item.value" :disabled="isAdd ? false : true">{{item.label}}</Checkbox>
                  </CheckboxGroup>
                </FormItem>
              </td>
            </tr>
            <tr>
              <td width='20%'>
                <label>统计范围</label>
              </td>
              <td width='80%' class='padding' colspan="3">
                <FormItem prop='rangeIds' class='inline' label=' ' v-if='isAdd'>
                  <Cascader :data="ranks" v-model="formInline.rangeIds" filterable clearable placeholder='' :render-format="format"></Cascader>
                </FormItem>
                <FormItem prop='rangeNames' class='inline' label=' ' v-else>
                  <Input type='text' :disabled='isAdd?false:true' v-model='formInline.rangeNames' ></Input>
                </FormItem>
              </td>
            </tr>
            <tr>
            <td width='20%'>
                <label>统计方式</label>
              </td>
              <td width='80%' class='padding' style='textAlign:left' colspan="3">
                <FormItem prop='way' class='inline'>
                  <RadioGroup v-model="formInline.way">
                    <Radio :label="0" :disabled="isAdd ? false : true">按设备统计</Radio>
                    <Radio :label="1" :disabled="isAdd ? false : true">按建筑统计</Radio>
                  </RadioGroup>
                </FormItem>
              </td>
            </tr>
          </table>
        </Form>
      </div>
      <div slot="footer" style="margin:25px 0">
        <imgButton type="按钮" name="确定" @click.native="submitFrom('formInline')"></imgButton>
        <imgButton type="按钮" name="重置" @click.native="resetFrom('formInline')" v-if="isAdd === true"></imgButton>
        <imgButton type="按钮" name="重置" @click.native="resetUpdate('formInline')" v-else></imgButton>
      </div>
    </Modal>

  </div>
</template>

<script>
import eqpmApi from '@/api/request/teminalReport.js'
import { FormatDate, dateToStringByD, copyArray} from '@/api/util.js'
import checkout from '@/api/checkout'
export default {
  data () {
    return {
      nowDate: dateToStringByD(new Date()),
      visible: false,
      model: false,
      title: '',
      devType: [],
      devTypes: [
        {
          value: '1',
          label: '电表'
        },
        {
          value: '2',
          label: '水表'
        },
        {
          value: '3',
          label: '燃气表'
        },
        {
          value: '4',
          label: '热计量仪表'
        },
      ],

      isAdd: true,
      allType: false,
      allContent: false,
      itmn1: false,
      itmn2: false,
      checkGroup1:[
        {
          value:'1',
          label: '电表'
        },
        {
          value:'2',
          label: '水表'
        },
        {
          value:'3',
          label: '燃气表'
        },
        {
          value:'4',
          label: '热计量仪表'
        }
      ],
      checkGroup2:[
        {
          value:'name',
          label: '设备名称'
        },
        {
          value:'code',
          label: '设备编号'
        },
        {
          value:'brand',
          label: '品牌'
        },
        {
          value:'building',
          label: '所属建筑'
        },
        {
          value:'area',
          label: '计量区域'
        },
        {
          value:'subentry',
          label: '计量分项'
        },
        {
          value:'status',
          label: '设备状态'
        },
        {
          value:'date',
          label: '初装日期'
        },
        {
          value:'record',
          label: '最新标定记录'
        }
      ],
      editId: '',
      ranks: [],
      reportNatures: [
        {
          name: '年度报表',
          value: 0
        },
        {
          name: '季度报表',
          value: 1
        },
        {
          name: '月度报表',
          value: 2
        },
        {
          name: '周报',
          value: 3
        },
        {
          name: '日报',
          value: 4
        }
      ],
      formInline: {
        date: [],
        name: '',
        startDate: '',
        endDate: '',
        description: '',
        features: '',
        createDate: '',
        timeType: '',
        meterIds: [],
        meterNames: [],
        contentWord: [],
        rangeIds: [],
        rangeNames: '',
        way: 0,
      },
      copyMeterIds: [],
      copyFormInline: {},
      copyDate: [],
      copyContnet: [],
      ruleInline: {
        name: [
          {required: true, type: 'string', message: '请输入', trigger: 'blur'},
          {max: 100, message: '最多能输入100位字符', trigger: 'blur'}
        ],
        date: [
          { required: true, type: 'array', message: '请选择统计日期', trigger: 'change' },
          { validator: checkout.checkDateRange, trigger: 'change' }
        ],
        timeType: [
          {required: true, type: 'number', message: '请选择', trigger: 'change'},
        ],
        contentWord: [
          {required: true, type: 'array', message: '请选择', trigger: 'change'},
        ],
        meterIds: [
          {required: true, type: 'array', message: '请选择', trigger: 'change'},
        ],
        rangeIds: [
          {required: true, type: 'array', message: '请选择', trigger: 'change'},
        ],
      },
      columns: [
        {
          title: "序号",
          type: "index",
          align: "center"
        },
        {
          title: "报表名称",
          key: "name",
          align: "center"
        },
        {
          title: "统计设备类型",
          key: "meterNames",
          align: "center"
        },
        {
          title: "描述/备注",
          key: "description",
          align: "center"
        },
        {
          title: "报表类型",
          key: "timeType",
          align: "center",
          render: (h, params) => {
            let timeType = params.row.timeType
            if(timeType!==null){
              let type
              if(timeType === 0){
                type = '年度报表'
              }else if(timeType === 1){
                type = '季度报表'
              }else if(timeType === 2){
                type = '月度报表'
              }else if(timeType === 3){
                type = '周报表'
              }else if(timeType === 4){
                type = '日报表'
              }
              return h('span',{},type)
            }
          },
          filters: [
            {
              label: '年度报表',
              value: 0
            },
            {
              label: '季度报表',
              value: 1
            },
            {
              label: '月度报表',
              value: 2
            }, {
              label: '周报表',
              value: 3
            },
            {
              label: '日报表',
              value: 4
            }
          ],
          filterMultiple: false,
          filterMethod (value, row) {
            if (value === 0) {
              return row.timeType === 0
            } else if (value === 1) {
              return row.timeType === 1
            } else if (value === 2) {
              return row.timeType === 2
            }else if (value === 3) {
              return row.timeType === 3
            } else if(value === 4){
              return row.timeType === 4
            }
          }
        },
        {
          title: "模板制作日期",
          key: "createDate",
          align: "center",
          sortable: true
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
                      type: '修改'
                    },
                    nativeOn: {
                      click: () => {
                        this.resetFrom('formInline')
                        this.searchAllAccountIdAndName()
                        this.editId = params.row.id
                        this.searchModelsById(params.row.id)
                        this.title= '修改添加定期报表模板'
                        this.isAdd = false
                        this.model = true
                      }
                    }
                  }
                ),
                h(
                  'imgButton',
                  {
                    props: {
                      type: '删除'
                    },
                    nativeOn: {
                      click: () => {
                        this.isDel = false
                        this.delId = params.row.id
                        this.visible = true
                      }
                    }
                  }
                ),
                // h(
                //   'imgButton',
                //   {
                //     props: {
                //       type: '查看1',
                //       tag: '查看'
                //     },
                //     nativeOn: {
                //       click: () => {
                //         this.$router.push({name: 'equipmentReport', params: {id: params.id}})
                //       }
                //     }
                //   }
                // )
              ]
            )
          }
        }
      ],
      pageSize: 10,
      dataCount: 0,
      currentPage: 1,
      terminalTemplate: [],

      accounts: [],
      accountList: [],//邮件报送
    }
  },

  created () {
    this.pageChange(1)
  },

  methods:{
    accountsChange(a, b) {
      this.accounts = a
    },

    //查询所有账户
    searchAllAccountIdAndName() {
      eqpmApi.searchAllAccountIdAndName()
        .then((res) => {
          this.accountList=res.map(item=>{
            return {value:item.id, label:item.account}
          })
        })
        .catch((err) => {
          this.$Message.error('获取账户失败')
        }) 
    },

    searchModelsById(id) {
      eqpmApi.searchModelsById({
        id: id
      }).then((res) => {
        console.log('res',res);
        this.formInline = copyArray(res)
        this.copyFormInline = copyArray(res)
        this.formInline.meterIds = copyArray(res.meterIds.substring(0, res.meterIds.length-1).split(","))
        this.copyMeterIds = copyArray(res.meterIds.substring(0, res.meterIds.length-1).split(","))
        const date = []
        date[0] = res.startDate
        date[1] = res.endDate
        this.formInline.date = copyArray(date)
        this.copyDate = copyArray(date)
        this.formInline.contentWord = copyArray(res.contentWord.split(','))
        this.copyContnet = copyArray(res.contentWord.split(','))
        this.formInline.rangeNames = copyArray(res.rangeNames)
        if(this.copyMeterIds.length>0&&this.copyMeterIds.length<this.checkGroup1.length){
          this.itmn1 = true
          this.allType = false
        } else {
          this.itmn1 = false
          this.allType = true
        }
        if(this.copyContnet.length>0&&this.copyContnet.length<this.checkGroup2.length){
          this.itmn2 = true
          this.allContent = false
        } else {
          this.itmn2 = false
          this.allContent = true
        }
      }).catch((err) => {})
    },

    //获取级联
    getRange () {
      eqpmApi.searchAllBuildingArea({
      }).then((res) => {
        this.ranks = res
      }).catch((err) =>{})
    },

    format (labels, selectedData) {
      console.log(labels, selectedData);
      
      let ranks
      this.formInline.rangeNames = labels
      if(labels.length>0){
        ranks = labels.join('/')
      }
      return ranks
    },

    devTypeChange(a, b) {
      this.devType = a
    },
    //页面查询
    pageChange (page) {
      this.currentPage = page
      eqpmApi.searchIbsReportsModelByPage({
        type: 0,
        pageCurrent: this.currentPage,
        pageSize: this.pageSize,
        meterIds: `${this.devType}`
      }).then((res) => {
        this.terminalTemplate = res.records
        this.currentPage = res.current
        this.dataCount = res.total
        console.log(res);
        
      }).catch((err) => {})
    },
    //查询按钮
    searchBtn () {
      this.pageChange(1)
    },

    resetFrom(name) {
      this.$refs[name].resetFields()
      this.formInline.rangeIds = []
      this.formInline.rangeNames = ''
      this.itmn1 = false
      this.itmn2 = false
      this.allType = false
      this.allContent = false
    },

    resetUpdate(name) {
      this.formInline = copyArray(this.copyFormInline)
      this.formInline.meterIds = copyArray(this.copyMeterIds)
      this.formInline.date = copyArray(this.copyDate)
      this.formInline.contentWord = copyArray(this.copyContnet)
    },

    //全选
    checkAllType () {
      if (this.itmn1) {
        this.allType = false
      } else {
        this.allType = !this.allType
      }
        this.itmn1 = false

      if (this.allType) {
        this.checkGroup1.forEach(i => {
          this.formInline.meterIds.push(i.value)
          this.formInline.meterNames.push(i.label)
        })
      } else {
        this.formInline.meterIds = [];
        this.formInline.meterNames = []
      }
    },

    allTypeChange (data) {
      if (data.length === 5) {
        this.itmn1 = false;
        this.allType = true;
      } else if (data.length > 0) {
        this.itmn1 = true;
        this.allType = false;
      } else {
        this.itmn1 = false;
        this.allType = false;
      }
    },

    checkAllContent (e) {    
      if (this.itmn2) {
        this.allContent = false
      } else {
        this.allContent = !this.allContent
      }
        this.itmn2 = false

      if (this.allContent) {
        this.checkGroup2.forEach(i => {
          this.formInline.contentWord.push(i.value)
        })
      } else {
        this.formInline.contentWord = [];
      }
    },
    allContentChange (data) {
      if (data.length === 9) {
        this.itmn2 = false;
        this.allContent = true;
      } else if (data.length > 0) {
        this.itmn2 = true;
        this.allContent = false;
      } else {
        this.itmn2 = false;
        this.allContent = false;
      }
    },

    deleteF() {
      eqpmApi.deleteIbsReportsModelById({
        id: this.delId
      }).then((res) => {
        this.delId = ''
        this.$Message.success('模板删除成功')
        this.pageChange(1)
      }).catch((err) => {
        this.$Message.error('模板删除失败')
      })
    },

    //添加/修改提交
    submitFrom (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if(this.isAdd){
            eqpmApi.addIbsReportsModel({
              name: this.formInline.name,
              type: 0,
              startDate: FormatDate(this.formInline.date[0]),
              endDate:  FormatDate(this.formInline.date[1]),
              description: this.formInline.description,
              userIds: `${this.accounts}`,
              features: 1,
              timeType: this.formInline.timeType,
              meterIds: this.formInline.meterIds.toString().substring(this.formInline.meterIds.toString()),
              meterNames: `${this.formInline.meterNames}`,
              contentWord: `${this.formInline.contentWord}`,
              rangeIds: this.formInline.rangeIds.toString().substring(this.formInline.rangeIds.toString()),
              rangeNames: `${this.formInline.rangeNames}`,
              way: this.formInline.way
            }).then((res) => {
                this.model = false
                this.pageChange(1)
                this.$Message.success('报表模板添加成功')
            }).catch((err) => {
              this.$Message.error('报表模板添加失败')
            })
          }else{
            eqpmApi.updateIbsReportsModelById({
              id: this.editId,
              name: this.formInline.name,
              description: this.formInline.description
            }).then((res) => {
              this.model = false
              this.pageChange(1)
              this.$Message.success('修改成功')
            }).catch((err) => {
              this.$Message.error('修改失败')
            })
          }
        }
      })

    },
  }
}
</script>
<style lang='less' scoped>
  .ivu-form-item {
    vertical-align: middle
  }
  .ivu-btn:focus {
    box-shadow: 0 0 0 2px rgba(45,140,240,.5)
  }
  .table{
    border-collapse:collapse;
    text-align:center;
    border-color:#ccc;
    border:1px solid #f0f0f0;
    background:#fafafa
  }
  .padding {
    padding:5px 10px
  }
  .inline {
    display:inline
  }
  .imgPosition{
    position:relative;
    bottom:6px
  }
  .spanPosition {
    position:relative;
    bottom:14px;left:4px;
    font-weight: bold;
    color:#000;
    font-size: 14px
  }
  .border {
    box-shadow: 0 0 0 2px rgba(45, 140, 240, 0.6)
  }
</style>

<style lang="less">
.equipment-template {
  .normal-table {
    margin:20px 0 10px ;
    height: calc(100vh - 275px);
  }

  .ivu-table .ivu-table-row {
    height: calc((100vh - 310px) / 10);
  }

  .textCheck .ivu-form-item-error-tip{
    z-index: 10;
    top:58%;
    left:300px
  }
}
</style>
