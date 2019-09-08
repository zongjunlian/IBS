<!--末端设备管理-->
<template>
  <div class='terminal'>
    <div>
      <Row :gutter="16">
        <Col span="4">
          <!-- <b class="fontSize">风机盘管参数总数：</b> -->
          <b class="bigFont1">{{$route.query.name}}</b>
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
    <delModal name='风机盘管参数' type='有按钮' :delModel='delModel'  @deleteBtn='deleteBtn'></delModal>
    <delModal name='风机盘管参数' :delModel='delModel' type='无按钮'></delModal>

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
              <td width='16%' v-if='isadd'>
                <label>参数类型</label>
              </td>
              <td width='34%' style='padding:5px 10px' v-if='isadd'>
                <FormItem prop="id" style='display:inline;' label=' '>
                  <Select v-model="addForm.id" filterable @on-change='changeType' clearable placeholder="">
                    <Option v-for="item in types" :value="item.id" :key="item.id" >{{item.name}}</Option>
                  </Select>
                </FormItem>
              </td>
              <td width='16%'>
                <label>参数编号</label>
              </td>
              <td width='34%' style='padding:5px 10px'>
                <FormItem prop="code" style='display:inline;' label=' '>
                  <Input type='text' v-model='addForm.code' placeholder=""></Input>
                </FormItem>
              </td>
            </tr>
            <tr>
              <td width='16%'>
                <label>参数名称</label>
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
                  <Input type='text' v-model='addForm.infoType' placeholder=""></Input>
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
                <label>描述</label>
              </td>
              <td width='34%' style='padding:5px 10px'>
                <FormItem prop="description" style='display:inline;' label=' '>
                  <Input v-model='addForm.description' placeholder="" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
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
        <imgButton type="按钮" name="重置" @click.native="resetFrom('addForm')" v-if='isadd'>重置</imgButton>
        <imgButton type="按钮" name="重置" @click.native="resetEdit()" v-else>重置</imgButton>
      </div>
    </Modal>

  </div>
</template>
<script>
import checkout from '../../../api/checkout'
import terminal from '../../../api/request/terminal'
import { copyArray } from '../../../api/util';
export default {
  data () {
    return {
      isTable:false,
      isOrange: 1,
      isadd: true,
      title:'',
      paramsType: '',
      paramsTypeId: '',
      addModal: false,
      delModel: {
        delModY: false,
        delModN: false,
      },
      types:[],
      addFormCopy:{},
      addForm: {
        name: '',
        infoType: '',
        code:'',
        valueType: '',
        valuePrecision: '',
        max: '',
        min: '',
        stateExplain: '',
        pointType: '',
        description: '',
        unit: '',
        id: '',
      },
      ruleAddForm: {
        name: [{required: true, type: 'string', message: '请输入参数名称', trigger: 'blur'}],
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
          title: "参数编码",
          key: "code",
          align: "center"
        },
        {
          title: "参数名称",
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
          title: "精度",
          key: "valuePrecision",
          align: "center"
        },
        {
          title: "上限",
          key: "max",
          align: "center",
        },
        {
          title: "下限",
          key: "min",
          align: "center",
        },
        {
          title: "数值点类型",
          key: "pointType",
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
                        console.log(params.row)
                        this.addModal = true
                        this.isadd = false
                        this.title= '修改风机盘管参数'
                        this.itemId = params.row.itemId
                        this.addForm = copyArray(params.row)
                        this.addFormCopy = copyArray(params.row)
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
                        // this.delModY = false
                        this.itemId = params.row.id
                        // this.$nextTick(()=> {
                          this.delModel.delModY = true
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
    this.getParamsType()
  },
  methods:{
    //页面查询
    pageChange (page) {
      this.currentPage = page
      terminal.searchItemParameterList({
        itemId: this.$route.query.id,
        currentPage: page,
        pageSize: 10
      }).then((res) => {
        this.terminalList = res.dataList
        this.dataCount = res.total
      }).catch((err)=>{})
    },

    //获取参数类型
    getParamsType () {
      terminal.searchParameterTypeList({
        itemId: this.$route.query.id,
        itemType: 'FJPG'
      }).then((res) => {
        this.types = res
      }).catch((err) => {})
    },

    changeType (data) {
      terminal.searchPropertyRelation({
        id:data
      }).then((res) => {
        this.addForm.infoType = res.infoType
        this.addForm.stateExplain = res.stateExplain
        this.addForm.unit = res.unit
        this.addForm.valueType = res.valueType
        this.addForm.valuePrecision = res.aluePrecision
        this.addForm.name = res.name
        this.addForm.pointType = res.pointType

        this.paramsType = res.parameterType
      }).catch((err)=>{
      })
    },

    //添加/修改参数
    submitFrom (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          terminal.addOrUpdateItemParameter({
            id: this.itemId,
            name: this.addForm.name,
            parameterType: this.paramsType,
            infoType: this.addForm.infoType,
            valueType: this.addForm.valueType,
            valuePrecision: this.addForm.valuePrecision,
            max: this.addForm.max,
            min: this.addForm.min,
            stateExplain: this.addForm.stateExplain,
            pointType: this.addForm.pointType,
            itemId: this.$route.query.id,
            code: this.addForm.code,
            description: this.addForm.description,
            unit: this.addForm.unit
          }).then((res) => {
            this.isadd?this.$Message.success('添加成功'):this.$Message.success('修改成功')
            this.addModal = false
            this.resetFrom('addForm')
            this.pageChange(1)
          }).catch((err) => {
            this.isadd?this.$Message.error('添加失败'):this.$Message.error('修改失败')
          })
        }
      })
    },
    //添加参数
    addParams () {
      this.resetFrom('addForm')
      this.addModal = true
      this.isadd = true
      this.title = '添加风机盘管参数'
      this.itemId = ''
    },
    //删除确定
    deleteBtn () {
        terminal.deleteItemParameter({
          id: this.itemId
        }).then((res) => {
          this.$Message.success('删除成功')
          this.delModel.delModY = false
          this.pageChange(1)
        }).catch((err) => {
          this.$Message.error('删除失败')
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


