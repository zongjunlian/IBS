<style lang="less">
.colletor-modal {
  margin-top: 5%;
}
</style>

<template>
  <div class="equipment-page">
    <div>
      <Row :gutter="16">
        <Col span="7">
          <b class="fontSize">风机盘管数据统计报表总数：</b>
          <b class="bigFont1">{{dataCount}}</b>
        </Col>
        <Col span="7">
          <span style="margin-right:20px">日期</span>
          <DatePicker type="datetime" style="display:inline-block" v-model="startTime" :editable="false" :options="startTimeOption" @on-change="startTimeChange"></DatePicker>
          <span style="margin:20px">—</span>
          <DatePicker type="datetime" style="display:inline-block" v-model="endTime" :editable="false" :options="endTimeOption" @on-change="endTimeChange"></DatePicker>
        </Col>
        <Col span="2">
          <imgButton type="按钮" name="查询" @click.native='pageChange(1)'></imgButton>
        </Col>
        <Col span='6' :offset="2">
          <span class="fr" @click="$router.push({name: 'terminalTemplate'})">
            <img class="fl" src='../../../assets/images/device/线上生成报表.png' alt="" style="margin-top: 6px;">
            <span class="fl fz14 fw700" style="margin-top: 10px;cursor:pointer">【管理定期报表】</span>
          </span>
          <span class="fr" @click="isAdd = true, addModal = true,resetReport('formInline'),getRange()">
            <img class="fl" src='../../../assets/images/device/管理定期报表.png' alt="" style="margin-top: 6px;">
            <span class="fl fz14 fw700" style="margin-top: 10px;cursor:pointer">【在线生成报表】</span>
          </span>
        </Col>
      </Row>
    </div>

    <Table :columns="columns" class="normal-table" :data="terminalList" no-data-text="暂无数据" border></Table>

    <Row class="page-bottom">
      <Col span="12" class="page-text">
      当前显示<span class="pageColor">{{pageSize}}</span>条记录,共<span class="pageColor">{{dataCount}}</span>条记录
      </Col>
      <Col span="8" :offset="4">
      <Page :total="dataCount" :page-size="pageSize"  @on-change="pageChange"  show-elevator :current="currentPage" class="common-page-style"/>
      </Col>
    </Row>

    <Modal :mask-closable="false" v-model="addModal" width="1000"  draggable scrollable class-name="colletor-modal" class='modal'>
      <div style="margin-top: 30px">
        <Row>
          <Col span='20'>
            <img class='imgPosition' src='../../../assets/images/img-button/addReport.png' v-if='isAdd'>
            <img class='imgPosition' src='../../../assets/images/img-button/edit.png' v-else>
            <span class='spanPosition'>{{'报表自定义设置'}}</span>
          </Col>
          <Col span='4'>
            <!-- <span>操作日期: {{'2019-05-15 15:20'}}</span> -->
          </Col>
        </Row>
        <Form class="mt20" ref="formInline" :model="formInline" :rules='ruleInline' :label-width="15">
          <table border class='table' width='100%'>
            <tr>
              <td width='20%'>
                <label>统计报表名称</label>
              </td>
              <td width='80%' class='padding'>
                <FormItem prop="name" class='inline' label=' '>
                  <Input type='text' v-model='formInline.name' placeholder=''></Input>
                </FormItem>
              </td>
            </tr>
            <tr>
              <td width='20%'>
                <label>统计日期</label>
              </td>
              <td width='80%' class='padding' style='textAlign:left'>
                <FormItem prop="date" class='inline' label=' ' style="display:inline-block;margin-bottom:0;textAlign:left">
                  <DatePicker type="datetimerange" placement="bottom-end" v-model='formInline.date' style='width:300px' :disabled='isAdd?false:true'></DatePicker>
                </FormItem>
              </td>
            </tr>
            <tr>
              <td width='20%'>
                <label>内容描述/备注</label>
              </td>
              <td width='80%' class='padding'>
                <FormItem prop="description" class='inline' label=' '>
                  <Input type='textarea' v-model='formInline.description' :autosize="{minRows: 2,maxRows: 5}"></Input>
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
                    @click.prevent.native="handleCheckAll" :disabled='isAdd?false:true'>全选
                  </Checkbox>
                  <CheckboxGroup v-model="formInline.contentWord" @on-change="checkAllGroupChange" style='display:inline'>
                      <Checkbox :label="item.value" v-for='item in checkGroup' :disabled='isAdd?false:true'>{{item.label}}</Checkbox>
                  </CheckboxGroup>
                </FormItem>
              </td>
            </tr>
            <tr>
              <td width='20%'>
                <label>统计范围</label>
              </td>
              <td width='80%' class='padding outer'>
                <FormItem prop='rangeIds' class='inline' label=' ' style='textAlign:left'>
                  <div class='inner'>
                    <Tree :data="treeData" show-checkbox @on-check-change="changeTree" v-model="formInline.rangeIds"></Tree>
                  </div>
                  <!-- <Cascader :data="ranks" v-model="formInline.rangeIds" filterable clearable placeholder='' :render-format="format"></Cascader> -->
                </FormItem>
                <!-- <FormItem prop='rangeNames' class='inline' label=' ' v-else>
                  <Input type='text' :disabled='isAdd?false:true' v-model='formInline.rangeNames' ></Input>
                </FormItem> -->
              </td>
            </tr>
            <tr>
            <td width='20%'>
                <label>统计方式</label>
              </td>
              <td width='80%' class='padding' style='textAlign:left'>
                <FormItem prop='way' class='inline'>
                  <RadioGroup v-model="formInline.way">
                    <Radio :label=0 :disabled='isAdd?false:true'>按设备统计</Radio>
                    <Radio :label=1 :disabled='isAdd?false:true'>按建筑统计</Radio>
                  </RadioGroup>
                </FormItem>
              </td>
            </tr>
          </table>
        </Form>
      </div>
      <div slot="footer">
        <imgButton type="按钮" name="提交" @click.native="submitReport('formInline')"></imgButton>
        <imgButton type="按钮" name="重置" @click.native="isReset=true,resetReport('formInline')" v-if='isAdd'></imgButton>
        <imgButton type="按钮" name="重置" @click.native="resetEditReport()" v-else></imgButton>
      </div>
    </Modal>

    <imodal v-model="visible" :title="title">
      <div class="mod-content">
        <p class="mod-content-title">系统提示：</p>
        <p class="mod-content-info ft">本次操作将导致当前报表被删除，且不可恢复。</p>
        <br>
        <br>
        <span>
          <Button class="mod-content-btn delBtn" @click="visible = false">取消操作</Button>
          <Button class="mod-content-btn delBtn" style='margin-right:8px;' @click="isDel = true,visible = false,deleteF()">确认删除</Button>
        </span>
      </div>
    </imodal>
  </div>
</template>

<script>
import terminal from '../../../api/request/teminalReport'
import { FormatDate, copyArray } from '../../../api/util'
import filter from '../../../api/filter'
import checkout from '../../../api/checkout'
export default {
  data () {
    let _this = this
    return {
      isReset: false,
      visible: false,
      title: '末端设备统计报表',
      addModal: false,
      modTitle: '',
      isDel: false,
      editId: '',
      delId: '',
      delId: '',
      isAdd: true,
      startTime: '',
      endTime: '',
      startDate: '',
      endDate: '',
      startTimeOption: {},
      endTimeOption: {},
      reportTypes: [],
      checkAll: false,
      indeterminate: false,
      copyDate: [],
      copyForm: {},
      copyContnet: [],
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
        {value: 'subtry5',label:'累计运行时间'},
        ],
      ranks: [],

      dataCount: 2,
      pageSize: 10,
      currentPage: 1,
      dates:[
      ],

      columns: [
        {
          title: "序号",
          type: 'index',
          align: "center"
        },
        {
          title: "报表名称",
          key: "name",
          align: "center"
        },
        {
          title: "数据统计日期",
          key: "createDate",
          align: "center"
        },
        {
          title: "描述/备注",
          key: "description",
          align: "center"
        },
        {
          title: "报表性质",
          key: "features",
          align: "center",
          render: (h, params) => {
            let features = params.row.features
            if(features!==null){
              let reportFeature
              features === 0 ?  reportFeature = '在线生成' : reportFeature='定期报表'
              const type = filter.filterAccount(features)
              const color = type.color
              return h('Tag', {
                props: {
                  color: color,
                },
                nativeOn: {
                  click: () => {
                  }
                }
              },reportFeature)
            }
          },
          filters: [
            {
              label: '在线生成',
              value: 0
            },
            {
              label: '定期报表',
              value: 1
            }
          ],
          filterMultiple: false,
          filterMethod (value, row) {
            this.features = value
            if (value === 0) {
              return row.features === '在线生成'
            } else if (value === 1) {
              return row.features === '定期报表'
            }
          }
        },
        {
          title: "报表生成日期",
          key: "startDate",
          align: "center",
          sortable: true
        },
        {
          title: "管理操作",
          align: "center",
          render: (h, params) => {
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
                        this.isAdd = false
                        this.addModal = true
                        this.editId = params.row.id
                        this.showReport()
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
                        this.visible = true
                        this.delId = params.row.id
                      }
                    }
                  }
                ),
                h(
                  'imgButton',
                  {
                    props: {
                      type: '查看1',
                      tag: '查看'
                    },
                    nativeOn: {
                      click: () => {
                        this.$router.push({name: 'terminalReport', params: {id: params.id}})
                      }
                    }
                  }
                )
              ]
            )
          }
        },
      ],

      terminalList: [],
      formInline: {
        name: '',
        date: [],
        description: '',
        contentWord: [],
        rangeIds:  [],
        way:0
      },
      ruleInline: {
        name: [
          { required: true, type: 'string', message: '请输入统计报表名称', trigger: 'blur' },
        ],
        date: [
          { required: true, type: 'array', message: '请选择统计日期', trigger: 'change' },
          { validator: checkout.checkDateRange, trigger: 'change' }
        ],
        contentWord: [
          { required: true, type: 'array', message: '请选择统计内容', trigger: 'change' },
        ],
        rangeIds: [
          { required: true, type: 'array', message: '请选择统计范围', trigger: 'change' },
        ],
      },
      treeData:[]
    }
  },
  created () {
    this.pageChange(1)
  },
  methods: {
    pageChange (page) {
      this.currentPage = page
      terminal.searchIbsReportsByPage({
        startDate: this.startTime,
        endDate: this.endTime,
        type: 2,
        pageCurrent: page,
        pageSize: 10
      }).then((res) => {
        this.terminalList = res.records
        this.dataCount = res.total
      }).catch((err) => {
        this.$Message.error('页面加载失败')
      })
    },
    //开始日期
    startTimeChange(startTime) {
      this.startTime = startTime
			this.endTimeOption = {  
        disabledDate(endTime) {
					return endTime  && (endTime < new Date(startTime) || endTime > Date.now() ) 
				}
			}  
    },
  //结束日期
    endTimeChange(endTime) {
      this.endTime = endTime
			this.startTimeOption = {  
				disabledDate(startTime) {
					return startTime && (startTime > new Date(endTime) || startTime > Date.now())
				}  
			}  
    },
    //获取统计范围
    getRange () {
      terminal.searchAllBuildingArea({
      }).then((res) => {
        this.treeData = res
      }).catch((err) =>{})
    },
    //提交
    submitReport(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if(this.isAdd){
            terminal.addIbsReports(
            {
              name: this.formInline.name,
              type: 2,
              startDate: FormatDate(this.formInline.date[0]),
              endDate:  FormatDate(this.formInline.date[1]),
              description: this.formInline.description,
              contentWord: this.formInline.contentWord.toString(),
              features: 0,
              rangeIds: this.formInline.rangeIds.toString(),
              way: this.formInline.way
            }
            ).then((res) => {
              this.$Message.success('在线生成报表成功')
              this.addModal = false
              this.pageChange(1)
              this.resetReport('formInline')
            }).catch((err)=>{
              this.$Message.error('在线生成报表失败')
            })
          } else {
            terminal.updateIbsReportsById({
              id: this.editId,
              name: this.formInline.name,
              description: this.formInline.description
            }).then((res) => {
              this.$Message.success('修改成功')
              this.addModal = false
              this.pageChange(1)
            }).catch((err) => {
              this.$Message.error('修改失败')
            })
          }

        }
      })
    },
    //修改回显
    showReport () {
      terminal.searchIbsReportsById({
        id: this.editId
      }).then((res) => {
        this.formInline = copyArray(res)
        this.copyForm =  copyArray(res)
        const date = []
        date[0] = res.startDate
        date[1] = res.endDate
        this.formInline.date = copyArray(date)
        this.copyDate = copyArray(date)
        this.formInline.contentWord = copyArray(res.contentWord.split(','))
        this.copyContnet = copyArray(res.contentWord.split(','))
        if(this.copyContnet.length>0&&this.copyContnet.length<this.checkGroup.length){
          this.indeterminate = true
          this.checkAll = false
        } else {
          this.indeterminate = false
          this.checkAll = true
        }
      }).catch((err) =>{})
    },
    //重置
    resetReport(name) {
      this.$refs[name].resetFields()
      if(this.isReset){
        this.getRange()
      }
      this.indeterminate = false
      this.checkAll = false
    },

    //修改重置
    resetEditReport () {
      this.formInline = copyArray(this.copyForm)
      this.formInline.date = copyArray(this.copyDate)
      this.formInline.contentWord = copyArray(this.copyContnet)
    },

    //删除确认
    deleteF(id) {
      terminal.deleteIbsReportsById({
        id: this.delId
      }).then((res) => {
        this.$Message.success('报表删除成功')
        this.pageChange(1)
      }).catch((err) => {
        this.$Message.success('报表删除失败')
      })
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
          this.formInline.contentWord.push(item.value)
        })
      } else {
        this.formInline.contentWord = [];
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
    changeTree (data) {
      data.forEach(item =>{
        if(this.formInline.rangeIds.indexOf(item.id)===-1){
          this.formInline.rangeIds.push(item.id)
        }
      })
    }
  },
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
.equipment-page {
  .normal-table {
    margin:20px 0 10px ;
    height: calc(100vh - 275px);
  }

  .ivu-table .ivu-table-row {
    height: calc((100vh - 310px) / 10);
  }
}
.outer {
  width: 100%;
  overflow: hidden;
  .inner {
    width: 110%;
    height: 200px;
    overflow-y: scroll;
  }
}
</style>
