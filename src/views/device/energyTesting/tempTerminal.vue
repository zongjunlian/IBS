<!--末端设备管理-->
<template>
  <div class='terminal'>
    <div>
      <Row :gutter="16">
        <Col span="4">
          <b class="fontSize">风机盘管属性总数：</b>
          <b class="bigFont1">{{number}}</b>
        </Col>
        <Col span="1" :offset="19">
          <imgButton type='添加参数' @click.native='addParams'></imgButton>
        </Col>
      </Row>

      <Table :columns="columns" class="common-table" :data="terminalList" no-data-text="暂无数据" border></Table>

      <Row class="page-bottom">
        <Col span="12" class="page-text">当前显示<span class="pageColor">{{pageSize}}</span>条记录,共<span class="pageColor">{{dataCount}}</span>条记录</Col>
        <Col span="8" :offset="4"> 
          <Page :total="dataCount" :page-size="pageSize"  @on-change="pageChange"  show-elevator :current="currentPage" class="common-page-style"/>
        </Col>
      </Row>
    </div>
    <!----删除-->
    <delModal name='风机盘管属性' type='有按钮' :delModel='delModel'  @deleteBtn='deleteBtn'></delModal>
    <delModal name='风机盘管属性' :delModel='delModel' type='无按钮'></delModal>

    <!---添加设备-->
    <Modal :mask-closable="false" v-model="addModal" draggable width='1000'>
      <div style="margin-top:30px">
        <Row>
          <Col span='20'>
            <img style='position:relative;bottom:6px' src='../../../assets/images/device/paramsAdd.png' v-if='isadd'>
            <img style='position:relative;bottom:6px' src='../../../assets/images/device/paramsEdit.png' v-else>
            <span class='spanPosition'>{{title}}</span>
          </Col>
          <Col span='4'>
            <!-- <span>操作日期: {{'2019-05-15 15:20'}}</span> -->
          </Col>
        </Row>
        <Form ref="addForm" :model="addForm" :rules='ruleAddForm' :label-width='15'>
          <table border style='border-collapse:collapse;textAlign:center;border-color:#ccc;border:1px solid #f0f0f0;background:#fafafa' width='100%'>
            <tr>
              <td width='16%'>
                <label>名称</label>
              </td>
              <td width='34%' style='padding:5px 10px'>
                <FormItem prop="name" style='display:inline;' label=' '>
                  <Input type='text' v-model='addForm.name' placeholder=""></Input>
                </FormItem>
              </td>
              <td width='16%'>
                <label>信息点类型</label>
              </td>
              <td width='34%' style='padding:5px 10px'>
                <FormItem prop="infoType" style='display:inline;' label=' '>
                  <Select v-model="addForm.infoType" filterable @on-change='' clearable placeholder="">
                    <Option v-for="item in infoTypes" :value="item.val" :key="item.val">{{item.label}}</Option>
                  </Select>
                </FormItem>
              </td>
            </tr>
            <tr>
              <td width='16%'>
                <label>属性类型</label>
              </td>
              <td width='34%' style='padding:5px 10px'>
                <FormItem prop="parameterType" style='display:inline;' label=' '>
                  <Input type='text' v-model='addForm.parameterType' placeholder=""></Input>
                </FormItem>
              </td>
              <td width='16%'>
                <label>数值类型</label>
              </td>
              <td width='34%' style='padding:5px 10px'>
                <FormItem prop="valueType" style='display:inline;'>
                  <Input type='text' v-model='addForm.valueType' placeholder=""></Input>
                </FormItem>
              </td>
            </tr>
            <tr>
              <td width='16%'>
                <label>单位</label>
              </td>
              <td width='34%' style='padding:5px 10px'>
                <FormItem prop="unit" style='display:inline;' label=' '>
                  <Input type='text' v-model='addForm.unit' placeholder=""></Input>
                </FormItem>
              </td>
              <td width='16%'>
                <label>精度</label>
              </td>
              <td width='34%' style='padding:5px 10px'>
                <FormItem prop="valuePrecision" style='display:inline;' label=' ' >
                  <Input type='text' v-model='addForm.valuePrecision' placeholder=""></Input>
                </FormItem>
              </td>
            </tr>
            <tr>
              <td width='16%'>
                <label>上限</label>
              </td>
              <td width='34%' style='padding:5px 10px'>
                <FormItem prop="max" style='display:inline;'>
                  <Input type='text' v-model='addForm.max'></Input>
                </FormItem>
              </td>
              <td width='16%'>
                <label>下限</label>
              </td>
              <td width='34%' style='padding:5px 10px'>
                <FormItem prop="min" style='display:inline;'>
                  <Input type='text' v-model='addForm.min'></Input>
                </FormItem>
              </td>
            </tr>
            <tr>
              <td width='16%'>
                <label>数值点类型</label>
              </td>
              <td width='34%' style='padding:5px 10px'>
                <FormItem prop="pointType" style='display:inline;' label=' '>
                  <Input type='text' v-model='addForm.pointType' placeholder=""></Input>
                </FormItem>
              </td>
              <td width='16%'>
                <label>状态说明</label>
              </td>
              <td width='34%' style='padding:5px 10px'>
                <FormItem prop="stateExplain" style='display:inline;'>
                  <Input type='text' v-model='addForm.stateExplain' placeholder=""></Input>
                </FormItem>
              </td>
            </tr>
          </table>
          <div style='color:#515a6ez;fontSize:12px;textAlign:right;marginTop:3px'>(状态说明格式必须类似于"<span style='color:red'>0:启动;1:停止</span>",全是英文字符,建议复制粘贴红色部分进行修改)</div>
        </Form>
      </div>
      <div slot="footer" style="margin:25px 0">
        <imgButton type="按钮" name="确定" @click.native="submitFrom('addForm')">确定</imgButton>
        <imgButton type="按钮" name="重置" @click.native="resetFrom('addForm')" v-if="isadd">重置</imgButton>
        <imgButton type="按钮" name="重置" @click.native="resetEdit()" v-else>重置</imgButton>
      </div>
    </Modal>

  </div>
</template>
<script>
import terminal from '../../../api/request/terminal'
import checkout from '../../../api/checkout'
import { copyArray } from '../../../api/util';
import { log } from 'util';
export default {
  data () {
    return {
      number: '',
      itemId: '',
      isTable:false,
      isOrange: 1,
      isadd: true,
      title:'',
      addModal: false,
      delModel: {
        delModY: false,
        delModN: false,
      },
      addFormCopy:{},
      builds:[
        {
          value: 'beijing',
          label: '北京',
          children: [
            {
              value: 'gugong',
              label: '故宫'
            },
            {
              value: 'tiantan',
              label: '天坛'
            },
            {
              value: 'wangfujing',
              label: '王府井'
            }
          ]
        }, {
          value: 'jiangsu',
          label: '江苏',
          children: [
            {
              value: 'nanjing',
              label: '南京',
              children: [
              {
                value: 'fuzimiao',
                label: '夫子庙',
              }
              ]
            },
            {
              value: 'suzhou',
              label: '苏州',
              children: [
                {
                value: 'zhuozhengyuan',
                label: '拙政园',
                },
                {
                value: 'shizilin',
                label: '狮子林',
                }
              ]
            }
          ],
        }
      ],
      companys: [],
      paramsTypes: [],
      precisions: [],
      dataTypes: [],
      infoTypes: [
        {
          val: 'DO',
          label:'DO'
        },
        {
          val: 'DI',
          label:'DI'
        },
        {
          val: 'AO',
          label:'AO'
        }, 
        {
          val: 'AI',
          label:'AI'
        }
      ],
      numTypes: [],
      addForm: {
        name: '',
        infoType: '',
        parameterType:'',
        valueType: '',
        valuePrecision: '',
        max: '',
        min: '',
        pointType: '',
        stateExplain: ''
      },
      ruleAddForm: {
        name: [{required: true, type: 'string', message: '请输入属性名称', trigger: 'blur'}],
        infoType: [{required: true, type: 'string', message: '请选择信息点类型', trigger: 'change'}],
        stateExplain: [{validator: checkout.checkStatusDes, trigger: 'blur'}]
      },
      columns: [
        {
          title: "序号",
          type: "index",
          align: "center"
        },
        {
          title: "名称",
          key: "name",
          align: "center"
        },
        {
          title: "信息点类型",
          key: "infoType",
          align: "center"
        },
        {
          title: "属性类型",
          key: "parameterType",        
          align: "center"
        },
        {
          title: "数值类型",
          key: "valueType",
          align: "center"
        },
        {
          title: "单位",
          key: "unit",
          align: "center",
        },
        {
          title: "数值点类型",
          key: "pointType",
          align: "center",
        },
        {
          title: "状态说明",
          key: "stateExplain",
          align: "center",
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
                        this.addForm = copyArray(params.row)
                        this.addFormCopy = copyArray(params.row)
                        this.addModal = true
                        this.isadd = false
                        this.title= '修改风机盘管参数'
                        this.itemId = params.row.id
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
                        this.itemId = params.row.id
                        const bool = params.row.allowDelete
                        // this.delModY = false
                        // this.delModN = false 
                        // this.$nextTick(()=> {
                          bool===0?this.delModel.delModN = true : this.delModel.delModY= true
                        // })
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
      dataCount: 0,
      currentPage: 1,
      terminalList: [],
    }
  },
  mounted () {
    this.pageChange(1)
    this.searchItemPropertyAmount()
  },
  methods:{
    //页面查询
    pageChange (page) {
      this.currentPage = page
      terminal.searchItemPropertyList({
        itemType: 'FJPG',
        currentPage: page,
        pageSize: 10
      }).then((res)=> {
        this.terminalList = res.dataList
        this.dataCount = res.total
      }).catch((err) => {})
    },
    //添加
    addParams () {
      this.resetFrom('addForm')
      this.addModal = true
      this.isadd = true
      this.title = '添加风机盘管属性'
      this.itemId = ''
    },
    //删除确定
    deleteBtn () {
        terminal.deleteItemProperty({
          itemPropertyId: this.itemId
        }).then((res) => {
          this.$Message.success('删除成功')
          this.delModel.delModY = false
          this.pageChange(1)
          this.searchItemPropertyAmount()
        }).catch((err)=> {
          this.$Message.error('删除失败')
        })
    },
    //查询属性数量
    searchItemPropertyAmount () {
      terminal.searchItemPropertyAmount({
        itemType: 'FJPG'
      }).then((res) => {
        this.number = res
      }).catch((err) => {})
    },
    //添加/修改提交
    submitFrom (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          terminal.addOrUpdateItemProperty({
            id: this.itemId,
            itemType: 'FJPG',
            name: this.addForm.name,
            parameterType: this.addForm.parameterType,
            infoType: this.addForm.infoType,
            valueType: this.addForm.valueType,
            valuePrecision: this.addForm.valuePrecision,
            unit: this.addForm.unit,
            max: this.addForm.max,
            min:this.addForm.min,
            stateExplain: this.addForm.stateExplain,
            pointType: this.addForm.pointType,
            allowDelete: 1

          }).then((res) => {
            this.isadd?this.$Message.success('添加成功'):this.$Message.success('修改成功')
            this.addModal = false
            this.resetFrom('addForm')
            this.pageChange(1)
            this.searchItemPropertyAmount()
          }).catch((err) => {
            this.isadd?this.$Message.error('添加失败'):this.$Message.error('修改失败')
          })
        }
      })
    },
    //添加/修改重置
    resetFrom (name) {
      this.$refs[name].resetFields()
      
    },
    resetEdit() {
      this.addForm = copyArray(this.addFormCopy)
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
  .spanPosition{
    position:relative;
    bottom:14px;left:4px;
    font-weight:bold;
    color:#000;
    font-size: 14px;
  }
</style>
<style>
  .ivu-form-item-error-tip{
    z-index: 10
  }
  .orange {
    color:#FF9900
  }
</style>


