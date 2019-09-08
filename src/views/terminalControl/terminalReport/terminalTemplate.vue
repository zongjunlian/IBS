<!--末端设备管理-->
<template>
  <div class='terminalTemplate'>
    <div>
      <Row :gutter="16">
        <Col span="14">
          <b class="fontSize">风机盘管数据统计报表模板总数：</b>
          <b class="bigFont1">{{dataCount}}</b>
        </Col>
        <Col span="7">
          <span style="margin-right:20px">日期</span>
          <DatePicker type="datetime" style="display:inline-block" v-model="startTime" :editable="false" :options="startTimeOption" @on-change="startTimeChange"></DatePicker>
          <span style="margin:5px">—</span>
          <DatePicker type="datetime" style="display:inline-block" v-model="endTime" :editable="false" :options="endTimeOption" @on-change="endTimeChange"></DatePicker>
          </Col>
        <Col span="2">
          <imgButton type="按钮" name="查询" @click.native='searchBtn'></imgButton>
        </Col>
        <Col span='1'>
          <imgButton type="添加报表" @click.native='addReport'></imgButton>
        </Col>
      </Row>

      <Table :columns="columns" class="common-table" :data="terminalTemplate" no-data-text="暂无数据" border></Table>

      <Row class="page-bottom">
        <Col span="12" class="page-text">当前显示<span class="pageColor">{{pageSize}}</span>条记录,共<span class="pageColor">{{dataCount}}</span>条记录</Col>
        <Col span="8" :offset="4"> 
          <Page :total="dataCount" :page-size="pageSize"  @on-change="pageChange"  show-elevator :current="currentPage" class="common-page-style"/>
        </Col>
      </Row>
    </div>
    <!----删除-->
    <delModal name='末端设备统计报表模板' :delModel='delModel' type='有按钮' @deleteBtn='deleteBtn'></delModal>
    <!---添加设备-->
    <Modal :mask-closable="false" v-model="addModal" draggable width='1000' class='modal'>
      <div style="margin-top:30px">
        <Row>
          <Col span='20'>
            <img class='imgPosition' src='../../../assets/images/img-button/addReport.png' v-if='isadd'>
            <img class='imgPosition' src='../../../assets/images/img-button/edit.png' v-else>
            <span class='spanPosition'>{{title}}</span>
          </Col>
          <Col span='4'>
            <!-- <span>操作日期: {{'2019-05-15 15:20'}}</span> -->
          </Col>
        </Row>
        <Form ref="addForm" :model="addForm" :rules='ruleAddForm' :label-width='15'>
          <table border class='table' width='100%'>
            <tr>
              <td width='20%'>
                <label>统计报表名称</label>
              </td>
              <td width='80%' class='padding'>
                <FormItem prop="name" class='inline' label=' '>
                  <Input type='text' v-model='addForm.name' placeholder=''></Input>
                </FormItem>
              </td>
            </tr>
            <tr>
              <td width='20%'>
                <label>报表性质</label>
              </td>
              <td width='80%'>
                <tr>
                  <td width='40%' style='border:0;padding:0 10px'>
                    <FormItem prop="timeType" class='inline' label=' '>
                      <Select v-model="addForm.timeType" filterable @on-change='' clearable placeholder='' :disabled='isadd?false:true'>
                        <Option v-for="item in reportNatures" :value="item.value" :key="item.value">{{item.label}}</Option>
                      </Select>
                    </FormItem>
                  </td>
                  <td width='28%' style='border-top:0;border-bottom:0'>
                    <label>起始日期</label>
                  </td>
                  <td width='33%' class='padding' style='border:0'>
                    <FormItem prop="startDate" class='inline' label=' '>
                      <DatePicker type="datetime" :disabled='isadd?false:true' v-model="addForm.startDate"></DatePicker>
                    </FormItem>
                  </td>
                </tr>
              </td>
            </tr>
            <tr>
              <td width='20%'>
                <label>内容描述/备注</label>
              </td>
              <td width='80%' class='padding'>
                <FormItem prop="description" class='inline' label=' '>
                  <Input type='textarea' v-model='addForm.description' :autosize="{minRows: 2,maxRows: 5}"></Input>
                </FormItem>
              </td>
            </tr>
            <tr>
              <td width='20%'>
                <label>邮件报送</label>
              </td>
              <td width='80%' class='padding'>
                <FormItem prop="userIds" class='inline' label=' '  style='textAlign:left'>
                  <MultiSelect :selectValueProp="addForm.userIds" :optionArrProp="terminalList" :widthProp="300" :maxCountProp='10'
                  @listenChange='terminalChange' :disabled='isadd?false:true'></MultiSelect>
                </FormItem>
              </td>
            </tr>
            <tr>
              <td width='20%'>
                <label>统计内容</label>
              </td>
              <td width='80%' class='padding textCheck'>
                <FormItem prop="contentWord" class='inline' label=' ' style='textAlign:left'>
                  <Checkbox style='display:inline'
                    :indeterminate="indeterminate"
                    :value="checkAll"
                    @click.prevent.native="handleCheckAll" :disabled='isadd?false:true'>全选
                  </Checkbox>
                  <CheckboxGroup v-model="addForm.contentWord" @on-change="checkAllGroupChange" style='display:inline'>
                      <Checkbox :disabled='isadd?false:true' :label="item.value" v-for='item in checkGroup'>{{item.label}}</Checkbox>
                  </CheckboxGroup>
                </FormItem>
              </td>
            </tr>
            <tr>
              <td width='20%'>
                <label>统计范围</label>
              </td>
              <td width='80%' class='padding'>
                <FormItem prop='rangeIds' class='inline' label=' '>
                  <Tree :data="treeData" show-checkbox @on-check-change="changeTree" v-model="addForm.rangeIds"></Tree>
                  <!-- <Cascader :data="ranks" v-model="addForm.rangeIds" filterable clearable placeholder='' :render-format="format" :disabled='isadd?false:true'></Cascader> -->
                </FormItem>
                <!-- <FormItem prop='rangeNames' class='inline' label=' ' v-else>
                  <Input type='text' :disabled='isadd?false:true' v-model='addForm.rangeNames' ></Input>
                </FormItem> -->
              </td>
            </tr>
            <tr>
              <td width='20%'>
                <label>统计方式</label>
              </td>
              <td width='80%' class='padding' style='textAlign:left'>
                <FormItem prop='way' class='inline'>
                  <RadioGroup v-model="addForm.way">
                    <Radio :label=0 :disabled='isadd?false:true'>按设备统计</Radio>
                    <Radio :label=1 :disabled='isadd?false:true'>按建筑统计</Radio>
                  </RadioGroup>
                </FormItem>
              </td>
            </tr>
          </table>
        </Form>
      </div>
      <div slot="footer" style="margin:25px 0">
        <imgButton type="按钮" name="确定" @click.native="submitForm('addForm')">确定</imgButton>
        <imgButton type="按钮" name="重置" @click.native="isReset=true,resetForm('addForm')" v-if='isadd'>重置</imgButton>
        <imgButton type="按钮" name="重置" @click.native="resetEditForm()" v-else>重置</imgButton>
      </div>
    </Modal>

  </div>
</template>

<script>
import terminal from '../../../api/request/teminalReport'
import terminalTemplates from '../../../css/terminalTemplate.less'
import { FormatDate , copyArray} from '../../../api/util';
import filter from '../../../api/filter'
export default {
  data () {
    return {
      indeterminate: false,
      checkAll: false,
      isBorder: false,
      isOrange: 1,
      isadd: true,
      isReset: false,
      title:'',
      editId: '',
      delId: '',
      addModal: false,
      delModel: {
        delModY: false,
      },
      startTime: '',
      endTime: '',
      rangeNames: [],
      copyForm: {},
      copyContnet: [],
      copyUser: [],
      startTimeOption:{},
      endTimeOption:{},
      checkGroup:[
        {value: 'name',label:'设备名称'},
        {value: 'code',label:'设备编号'},
        {value: 'building',label:'所属建筑'},
        {value: 'brand',label:'计量区域'},
        {value: 'subtry',label:'运行时间'},
        {value: 'subtry1',label:'折合冷热量'},
        {value: 'subtry2',label:'费用'},
        {value: 'subtry3',label:'设备状态'},
        {value: 'subtry4',label:'绑定账户'},
        {value: 'subtry5',label:'累计运行时间'}
      ],
      terminalList: [],
      ranks: [],
      reportNatures: [
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
      energys: [],
      addForm: {
        name: '',
        timeType: '',
        startDate:'',
        description: '',
        way: 0,
        userIds:[],
        contentWord:[],
        rangeIds: [],
        rangeNames: '',
      },
      ruleAddForm: {
        name: [{required: true, type: 'string', message: '请输入统计报表名称', trigger: 'blur'}],
        timeType: [{required: true, type: 'number', message: '请选择统计报表性质', trigger: 'change'}],
        startDate: [{required: true, type: 'date', message: '请选择起始时间', trigger: 'change'}],
        contentWord: [{required: true, type: 'array', message: '请选择统计内容', trigger: 'change'}],
        rangeIds: [{required: true, type: 'array', message: '请选择统计范围', trigger: 'change'}],
        rangeNames: [{required: true, type: 'string', message: '请选择统计范围', trigger: 'blur'}],
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
              let reportType
              timeType === 0 ?  reportType = '年度报表' : timeType === 1 ? reportType = '季度报表' : timeType === 2 ?  reportType = '月度报表' 
              : timeType === 3 ?  reportType = '周报表': reportType ='日报表'
              const type = filter.filterAccount(timeType)
              const color = type.color
              return h('Tag', {
                props: {
                  color: color,
                },
                nativeOn: {
                  click: () => {
                  }
                }
              },reportType)
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
            this.timeType = value
            if (value === 0) {
              return row.timeType === 0
            } else if (value === 1) {
              return row.timeType === 1
            } else if (value === 2) {
              return row.timeType === 2
            }else if (value === 3 ) {
              return row.timeType === 3
            } else {
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
                        this.addModal = true
                        this.isadd = false
                        this.title= '修改添加定期报表模板'
                        this.editId = params.row.id
                        this.getReportTemplate()
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
                        this.delModel.delModY = true
                        this.delId = params.row.id
                      }
                    }
                  }
                )
              ]
            )
          }
        }
      ],
      pageSize: 10,
      dataCount: 3,
      currentPage: 1,
      terminalTemplate: [],
      treeData:[]
    }
  },
  mounted () {
    this.pageChange(1)
  },
  methods:{
    //页面查询
    pageChange (page) {
      this.currentPage = page
      terminal.searchIbsReportsModelByPage({
        startDate: this.startTime,
        endDate: this.endTime,
        type: 2,
        pageCurrent: page,
        pageSize: 10
      }).then((res) => {
        this.terminalTemplate = res.records
        this.dataCount = res.total
      }).catch((err) => {
        this.$Message.error('页面加载失败')
      })
    },
    //查询按钮
    searchBtn () {
      this.pageChange(1)
    },

    //获取邮件推送
    getUsers () {
      terminal.searchAllAccountIdAndName({
      }).then((res) => {
        this.terminalList=res.map(item=>{
					return {value:item.id, label:item.account}
				})
				this.terminalList.unshift({
					label: "全选",
					value: 'ALL_SELECT'
				})
      }).catch((err) => {
        this.$Message.error('获取账户失败')
      })
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
    //级联选择统计范围
    format (labels, selectedData) {
      let ranks
      this.rangeNames = labels
      if(labels.length>0){
        ranks = labels.join('/')
      }
        return ranks
    },
    //获取统计范围
    getRange () {
      terminal.searchAllBuildingArea({
      }).then((res) => {
        this.ranks = res
      }).catch((err) =>{})
    },
    //修改回显
    getReportTemplate () {
      terminal.searchModelsById({
        id: this.editId
      }).then((res) => {
        this.addForm = copyArray(res)
        this.copyForm = copyArray(res)
        this.addForm.contentWord = copyArray(res.contentWord.split(','))
        this.copyContnet = copyArray(res.contentWord.split(','))
        // this.addForm.rangeNames = copyArray(res.rangeNames)
        // this.addForm.userIds = copyArray(res.userIds.split(','))
        // this.copyUser = copyArray(res.userIds.split(','))
        if(this.copyContnet.length>0&&this.copyContnet.length<this.checkGroup.length){
          this.indeterminate = true
          this.checkAll = false
        } else {
          this.indeterminate = false
          this.checkAll = true
        }
      }).catch((err) => {
      })
    },
    //全选组件
    terminalChange (value,label) {
      this.addForm.userIds = value
    },
    //全选
    handleCheckAll () {
      if (this.indeterminate) {
        this.checkAll = false
      } else {
        this.checkAll = !this.checkAll
      }
        this.indeterminate = false

      if (this.checkAll) {
        this.checkGroup.forEach(item => {
          this.addForm.contentWord.push(item.value)
        })
      } else {
        this.addForm.contentWord = [];
      }
    },
    checkAllGroupChange (data) {
      if (data.length === 10) {
        this.indeterminate = false;
        this.checkAll = true;
      } else if (data.length > 0) {
        this.indeterminate = true;
        this.checkAll = false;
      } else {
        this.indeterminate = false;
        this.checkAll = false;
      }
    },
    //删除确定
    deleteBtn () {
        terminal.deleteIbsReportsModelById({
          id: this.delId
        }).then((res) => {
          this.$Message.success('删除成功')
          this.pageChange(1)
          this.delModel.delModY = false
        }).catch((err) => {
          this.$Message.error('删除失败')
        })
    },
    //添加/修改提交
    submitForm (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if(this.isadd) {
            terminal.addIbsReportsModel({
              name: this.addForm.name,
              type: 2,
              startDate: FormatDate(this.addForm.startDate),
              description: this.addForm.description,
              timeType: this.addForm.timeType,
              contentWord: this.addForm.contentWord.toString(),
              rangeIds: this.addForm.rangeIds.toString(),
              // rangeNames: this.rangeNames.toString(),
              userIds: this.addForm.userIds.toString(),
              way: this.addForm.way
            }).then((res) => {
              this.$Message.success('模板添加成功')
              this.addModal = false
              this.pageChange(1)
              this.resetForm('addForm')
            }).catch((err) => {
              this.$Message.error('模板添加失败')
            })
          } else {
            terminal.updateIbsReportsModelById({
              id: this.editId,
              name: this.addForm.name,
              description: this.addForm.description
            }).then((res) => {
              this.$Message.success('模板修改成功')
              this.addModal = false
              this.pageChange(1)
            }).catch((err) => {
              this.$Message.error('模板修改失败')
            })
          }
        }
      })

    },
    //添加重置
    resetForm (name) {
      this.$refs[name].resetFields()
      if(this.isReset){
        this.getRange()
      }
      // this.addForm.rangeIds = []
      // this.addForm.rangeNames = ''
      this.indeterminate= false
      this.checkAll = false
    },
    //修改重置
    resetEditForm () {
      this.addForm = copyArray(this.copyForm)
      this.addForm.contentWord = copyArray(this.copyContnet)
    },
    //添加报表
    addReport () {
      this.addModal = true
      this.title='添加定期报表模板'
      this.isadd = true
      this.getUsers()
      this.getRange()
      this.resetForm('addForm')
    },
    //tree事件
    changeTree (data) {
      data.forEach(item =>{
        if(this.formInline.rangeIds.indexOf(item.id)===-1){
          this.formInline.rangeIds.push(item.id)
        }
      })
    }

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



