<!--末端设备管理-->
<template>
  <div class='terminal'>
    <div>
      <Row :gutter="16">
        <Col span="4">
          <b class="fontSize">风机盘管设备总数：</b>
          <b class="bigFont1">{{terminalNum}}</b>
        </Col>
        <Col span="3" :offset="10">
          <Input type='text' placeholder="设备编号" v-model='devNum'></Input>
          </Col>
        <Col span="2">
          <imgButton type="按钮" name="查询" @click.native='searchBtn'></imgButton>
        </Col>
        <Col span="2">
          <imgButton type="高级筛选" name="高级筛选" @click.native='highSearch = !highSearch'></imgButton>
        </Col>
        <Col span='1'>
          <imgButton type='添加' @click.native='addBtn'></imgButton>
        </Col>
        <Col span='1'>
          <imgButton type='批量添加' @click.native='batchBtn'></imgButton>
        </Col>
        <Col span='1'>
          <imgButton type='设置' @click.native='setBtn'></imgButton>
        </Col>
      </Row>
      <div class="highSearch" v-show="highSearch">
        <Form :model="formInline" :rules="ruleInline" ref="formInline" label-position="right" :label-width="100">
          <Row :gutter="16">
            <Col span="6">
              <FormItem prop="build" label="建筑名称：">
                <Select v-model="formInline.build" @on-change='isChange=true;changeBuild()'  placeholder='' clearable filterable>
                  <Option v-for="item in builds" :value="item.id" :key="item.id">{{item.name}}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem prop="collector" label="所属采集器：">
                <Select v-model="formInline.collector" @on-change='isChange=true;changeCollector()' placeholder='' clearable filterable>
                  <Option v-for="item in collectors" :value="item.id" :key="item.id">{{item.name}}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem prop="energy" label="关联能量表：">
                <Select v-model="formInline.energy" placeholder='' clearable filterable>
                  <Option v-for="item in energys" :value="item.id" :key="item.id">{{item.name}}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="1" :offset="4">
              <imgButton type="提交" name="提交" @click.native="submitSearchBtn()"></imgButton>
            </Col>
            <Col span="1">
              <imgButton type="重置" name="重置" @click.native="resetBtn('formInline')"></imgButton>
            </Col>
          </Row>
        </Form>
      </div>

      <Table :columns="columns" class="common-table" :data="terminalList" no-data-text="暂无数据" border></Table>

      <Row class="page-bottom">
        <Col span="12" class="page-text">当前显示<span class="pageColor">{{pageSize}}</span>条记录,共<span class="pageColor">{{dataCount}}</span>条记录</Col>
        <Col span="8" :offset="4"> 
          <Page :total="dataCount" :page-size="pageSize"  @on-change="pageChange"  show-elevator :current="currentPage" class="common-page-style"/>
        </Col>
      </Row>
    </div>
    <!----删除-->
    <delModal name='风机盘管设备' type='有按钮' :delModel='delModel'  @deleteBtn='deleteBtn'></delModal>
    <delModal name='风机盘管设备' :delModel='delModel' type='无按钮'></delModal>

    <!---添加设备-->
    <Modal :mask-closable="false" v-model="addModal" draggable width='1000' @on-cancel="onCancel">
      <div style="margin-top:30px">
        <Row>
          <Col span='20'>
            <img class='imgPosition' src='../../../assets/images/device/addTerminal.png' v-if='isadd'>
            <img class='imgPosition' src='../../../assets/images/device/editTerminal.png' v-else>
            <span class='spanPosition'>{{title}}</span>
          </Col>
          <Col span='4'>
            <!-- <span>操作日期: {{'2019-05-15 15:20'}}</span> -->
          </Col>
        </Row>
        <Form ref="addForm" :model="addForm" :rules='ruleAddForm' :label-width='15'>
          <table border class='table' width='100%'>
            <tr>
              <td width='16%'>
                <label>设备名称</label>
              </td>
              <td width='34%' class='padding'>
                <FormItem prop="name" class='inline' label=' '>
                  <Input type='text' v-model='addForm.name' placeholder=''></Input>
                </FormItem>
              </td>
              <td width='16%'>
                <label>设备编号</label>
              </td>
              <td width='34%' class='padding'>
                <FormItem prop="code" class='inline' label=' '>
                  <Input type='text' v-model='addForm.code' placeholder=''></Input>
                </FormItem>
              </td>
            </tr>
            <tr>
              <td width='16%'>
                <label>所属建筑</label>
              </td>
              <td width='34%' class='padding'>
                <FormItem prop="build" class='inline' label=' '>
                  <Select v-model="addForm.build" @on-change='isChange=false;changeBuild()'  placeholder='' clearable filterable>
                    <Option v-for="item in builds" :value="item.id" :key="item.id">{{item.name}}</Option>
                  </Select>
                </FormItem>
              </td>
              <td width='16%'>
                <label>所属建筑区域</label>
              </td>
              <td width='34%' class='padding'>
                <FormItem prop="buildingAreaIds" class='inline' label=' '>
                  <Cascader :data="buildAreas" v-model="addForm.buildingAreaIds" filterable clearable placeholder=''></Cascader>
                </FormItem>
              </td>
            </tr>
            <tr>
              <td width='16%'>
                <label>所属采集器</label>
              </td>
              <td width='34%' class='padding'>
                <FormItem prop="collectorId" class='inline' label=' '>
                  <Select v-model="addForm.collectorId" @on-change='isChange=false;changeCollector()' placeholder='' clearable filterable>
                    <Option v-for="item in collectors" :value="item.id" :key="item.id">{{item.name}}</Option>
                  </Select>
                </FormItem>
              </td>
              <td width='16%'>
                <label>关联能量表</label>
              </td>
              <td width='34%' class='padding'>
                <FormItem prop="meterId" class='inline' label=' ' >
                  <Select v-model="addForm.meterId" placeholder='' clearable filterable>
                    <Option v-for="item in energys" :value="item.id" :key="item.id">{{item.name}}</Option>
                  </Select>
                </FormItem>
              </td>
            </tr>
            <tr>
              <td width='16%'>
                <label>品牌</label>
              </td>
              <td width='34%' class='padding'>
                <FormItem prop="brand" class='inline' style='textAlign:left'>
                  <Select v-model="addForm.brand" filterable @on-change='changeBrands' clearable placeholder='' style='width:49%;margin-right:8px'>
                    <Option  value="new">{{'新建'}}</Option>
                    <Option v-for="item in brands" :value="item" :key="item">{{item}}</Option>
                  </Select>
                  <Input type='text' v-model='addForm.make'  style='width:48%' v-show='isBrand'></Input>
                </FormItem>
              </td>
              <td width='16%'>
                <label>初装日期</label>
              </td>
              <td width='34%' class='padding'>
                <FormItem prop="insertDate" class='inline'>
                  <DatePicker size="large" type="date" @on-change="changeStart" v-model='addForm.insertDate'></DatePicker>
                </FormItem>
              </td>
            </tr>
            <tr>
              <td width='16%'>
                <label>盘管型号</label>
              </td>
              <td width='34%' class='padding'>
                <FormItem prop="itemTypeId" class='inline' label=' ' >
                  <Select v-model="addForm.itemTypeId" placeholder='' clearable filterable>
                    <Option v-for="item in itemTypeIds" :value="item.id" :key="item.id">{{item.name}}</Option>
                  </Select>
                </FormItem>
              </td>
              <td width='16%'>
                <label>计费起始日期</label>
              </td>
              <td width='34%' class='padding'>
                <FormItem prop="billingDate" class='inline'>
                  <DatePicker size="large" type="date" @on-change="changeBegin" v-model='addForm.billingDate'></DatePicker>
                </FormItem>
              </td>
            </tr>
            <tr>
              <td width='16%'>
                <label>计费方式</label>
              </td>
              <td width='34%' class='padding'>
                <Button style='margin-right:2px' @click='isBorder = true' :class='isBorder ? "border": ""'>分速计费</Button>
                <Button @click='isBorder = false' :class='!isBorder ? "border": ""'>单一计费</Button>
              </td>
              <td width='16%'>
                <label></label>
              </td>
              <td width='34%' class='padding'>
              </td>
            </tr>
          </table>
        </Form>
      </div>
      <div slot="footer" style="margin:25px 0">
        <imgButton type="按钮" name="确定" @click.native="submitFrom('addForm')">确定</imgButton>
        <imgButton type="按钮" name="重置" @click.native="resetFrom('addForm')" v-if='isadd'>重置</imgButton>
        <imgButton type="按钮" name="重置" @click.native="resetEdit()" v-else>重置</imgButton>
      </div>
    </Modal>

    <!---批量添加设备-->
    <Modal :mask-closable="false" v-model="batchAddModal" draggable @on-cancel="batchAddCancel" width='500'>
      <div style="margin-top:30px">
        <Row>
          <Col span='16'>
            <img class='imgPosition' src='../../../assets/images/device/addTerminal.png'>
            <span class='spanPosition'>{{'批量添加风机盘管设备'}}</span>
          </Col>
          <Col span='8'>
            <!-- <span>操作日期: {{'2019-05-15 15:20'}}</span> -->
          </Col>
        </Row>
        <Form ref="batchAddForm" :model="batchAddForm">
          <table border class='table' width='100%'>
            <tr>
              <td width='32%'>
                <label>仪表类型</label>
              </td>
              <td width='68%' style='textAlign:left;padding:5px 10px'>
                <FormItem prop="meterType" class='inline'>
                  <Select v-model="addForm.meterType" filterable @on-change='' clearable style='width:50%' placeholder=''>
                    <Option v-for="item in meterTypes" :value="1" :key="1">{{}}</Option>
                  </Select>
                </FormItem>
              </td>
            </tr>
            <tr>
              <td width='32%'>
                <label>批量导入</label>
              </td>
              <td width='68%' style='textAlign:left;paddingLeft:10px'>
                <FormItem prop="" class='inline'>
                  <Upload action="" style='position:relative;top:4px'>
                      <Button icon="ios-cloud-upload-outline">选择---</Button>
                  </Upload>
                </FormItem>
              </td>
            </tr>
          </table>
        </Form>
      </div>
      <div slot="footer" style="margin:25px 0">
        <imgButton type="按钮" name="确定" @click.native="submitBatchFrom('batchAddForm')">确定</imgButton>
        <imgButton type="按钮" name="重置" @click.native="resetBatchFrom('batchAddForm')">重置</imgButton>
      </div>
    </Modal>

        <!---查看设备-->
    <Modal :mask-closable="false" v-model="searchModal" draggable width='1000'>
      <div style="margin-top:30px">
        <Row>
          <Col span='20'>
            <img class='imgPosition' src='../../../assets/images/device/searchTerminal.png'>
            <span class='spanPosition'>{{'查看风机盘管参数'}}</span>
          </Col>
        </Row>
        <Row style='border-bottom:0.5px solid #f0f0f0'>
          <Col span='12' style='border-right:0.5px solid #f0f0f0' class='titleName'>
            <label>监制</label>
          </Col>
          <Col span='12' class='titleName'>
            <label>控制</label>
          </Col>
        </Row>
        <table v-show='isTable' border class='table' width='100%'>
          <tr>
            <td width='16%' class='padding10'>
              <label>机组状态</label>
            </td>
            <td width='34%' class='orange'>
              <label>{{open===0?'开':'关'}}</label>
            </td>
            <td width='16%'>
              <label>机组开关</label>
            </td>
            <td width='34%'>
              <label>开</label>
              <label>关</label>
            </td>
          </tr>
          <tr>
            <td width='16%' class='padding10'>
              <label>模式反馈</label>
            </td>
            <td width='34%'>
              <label :class='isOrange===1? "orange" : ""'>制冷</label>/
              <label :class='isOrange===2? "orange" : ""'>制热</label>/
              <label :class='isOrange===3? "orange" : ""'>送风</label>
            </td>
            <td width='16%'>
              <label>模式控制</label>
            </td>
            <td width='34%'>
              <div :class='1>0?"color":"noColor"'>制热</div>
              <div :class='1<0?"color":"noColor"'>制冷</div>
              <div :class='1<0?"color":"noColor"'>送风</div>
            </td>
          </tr>
          <tr>
            <td width='16%' class='padding10'>
              <label>三速反馈</label>
            </td>
            <td width='34%'>
              <label :class='isOrange===1? "orange" : ""'>高</label>/
              <label :class='isOrange===2? "orange" : ""'>中</label>/
              <label :class='isOrange===3 ? "orange" : ""'>低</label>
            </td>
            <td width='16%'>
              <label>风挡控制</label>
            </td>
            <td width='34%' class='padding'>
              <div :class='1>0?"color":"noColor"'>高</div>
              <div :class='1<0?"color":"noColor"'>中</div>
              <div :class='1<0?"color":"noColor"'>低</div>
              <div :class='1<0?"color":"noColor"'>自动</div>
            </td>
          </tr>
          <tr>
            <td width='16%' class='padding10'>
              <label >室内温度</label>
            </td>
            <td width='34%'>
              <label class='orange'>{{templ1}}℃</label>
            </td>
            <td width='16%'>
              <label>温度设定</label>
            </td>
            <td width='34%' class='padding'>
              <label>{{'20'}}℃</label>
              <div style='margin-left:10px' :class='1>0?"color":"noColor"'>制冷设定</div>
              <div :class='1<0?"color":"noColor"'>制热设定</div>
            </td>
          </tr>
          <tr>
            <td width='16%' class='padding10'>
              <label>当前设定</label>
            </td>
            <td width='34%'>
              <label class='orange'>{{templ}}℃</label>
            </td>
            <td width='16%'>
              <label>设定限值</label>
            </td>
            <td width='34%' class='padding'>
              <div :class='1<0?"color":"noColor"'>限值_冷</div>
              <div :class='1>0?"color":"noColor"'>限值_热</div>
            </td>
          </tr>
          <tr>
            <td width='16%'>
            </td>
            <td width='34%'>
            </td>
            <td width='16%'>
              <label>键盘锁定</label>
            </td>
            <td width='34%' class='padding10'>
              <i-switch size='large'>
                <span slot="open">ON</span>
                <span slot="close">OFF</span>
              </i-switch>
            </td>
          </tr>
        </table>
        <Row>
          <Col span='24' class='titleName'>
            <label style='margin-right:5px'>设备基础信息</label><img v-if='!isTable' src='../../../assets/images/device/down.png' @click='isTable = !isTable'><img v-else @click='isTable = !isTable' src='../../../assets/images/device/up.png'>
          </Col>
        </Row>
        <table v-show='!isTable' border class='table' width='100%'>
          <tr>
            <td width='16%' class='padding10'>
              <label>设备名称</label>
            </td>
            <td width='34%'>
              <label>{{baseInfo.name}}</label>
            </td>
            <td width='16%'>
              <label>设备编号</label>
            </td>
            <td width='34%'>
              <label>{{baseInfo.code}}</label>
            </td>
          </tr>
          <tr>
            <td width='16%' class='padding10'>
              <label>所属建筑</label>
            </td>
            <td width='34%'>
              <label>{{baseInfo.build}}</label>
            </td>
            <td width='16%'>
              <label>所属建筑区域</label>
            </td>
            <td width='34%'>
              <label>{{baseInfo.buildArea}}</label>
            </td>
          </tr>
          <tr>
            <td width='16%' class='padding10'>
              <label>所属采集器</label>
            </td>
            <td width='34%'>
              <label>{{baseInfo.collector}}</label>
            </td> 
            <td width='16%'>
              <label>关联能量表</label>
            </td>
            <td width='34%' class='padding'>
              <label>{{baseInfo.meter}}</label>
            </td>
          </tr>
          <tr>
            <td width='16%' class='padding10'>
              <label >品牌</label>
            </td>
            <td width='34%'>
              <label>{{baseInfo.brand}}</label>
            </td>
            <td width='16%'>
              <label>初装日期</label>
            </td>
            <td width='34%' class='padding'>
              <label>{{baseInfo.insertDate}}</label>
            </td>
          </tr>
          <tr>
            <td width='16%' class='padding10'>
              <label>计费方式</label>
            </td>
            <td width='34%'>
              <label>{{baseInfo.billingType}}</label>
            </td>
            <td width='16%'>
              <label>计费起始日期</label>
            </td>
            <td width='34%' class='padding'>
              <label>{{baseInfo.billingDate}}</label>
            </td>
          </tr>
        </table>
      </div>
      <div slot="footer"></div>
    </Modal>

  </div>
</template>

<script>
import checkout from '../../../api/checkout'
import terminal from '../../../api/request/terminal'
import filter from '../../../api/filter'
import { copyArray ,FormatDate} from '@/api/util'
export default {
  data () {
    return {
      templ: '',
      templ1:'',
      open: '',
      itemId: '',
      terminalId: '',
      isBrand: false,
      isChange: false,
      isReset: false,
      isBorder: false,
      isTable:true,
      isOrange: 1,
      isadd: true,
      title:'',
      terminalNum: '',
      addModal: false,
      batchAddModal: false,
      searchModal: false,
      delModel : {
        delModY: false,
        delModN: false,
      },
      // delModY: false,
      // delModN: false,
      devNum: '',
      highSearch: false,
      buildCopy: '',
      collectorCopy: '',
      meterIdCopy: '',
      billingTypeCopy: '',
      addFormCopy:{},
      numTypes: [],
      itemTypeIds: [],
      baseInfo: {
        name: '',
        code: '',
        build: '',
        buildArea: '',
        collector: '',
        meter: '',
        insertDate: '',
        billingType: '',
        billingDate: '',
        brand: ''
      },
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
      paramsTypes: [],
      dataTypes: [],
      companys: [],
      precisions: [],
      builds: [],
      buildAreas: [],
      collectors: [],
      brands: [],
      energys: [],
      batchAddForm: {
        meterType: ''
      },
      meterTypes:[],
      addForm: {
        name: '',
        code: '',
        build: '',
        buildingAreaIds:[],
        collectorId: '',
        meterId: '',
        brand: '',
        insertDate: '',
        billingType: '',
        billingDate: '',
        make: ''
      },
      ruleAddForm: {
        name: [{required: true, type: 'string', message: '请输入设备名称', trigger: 'blur'}],
        code: [{required: true, type: 'string', message: '请输入设备编号', trigger: 'blur'}],
        build: [{required: true, type: 'number', message: '请选择所属建筑', trigger: 'change'}],
        buildingAreaIds: [{required: true, type: 'array', message: '请选择所属建筑区域', trigger: 'change'}],
        collectorId: [{required: true, type: 'number', message: '请选择所属采集器', trigger: 'change'}],
        meterId: [{required: true, type: 'number', message: '请选择关联能量表', trigger: 'change'}]
      },
      columns: [
        {
          title: "序号",
          type: "index",
          align: "center"
        },
        {
          title: "设备名称",
          key: "name",
          align: "center"
        },
        {
          title: "设备编号",
          key: "code",
          align: "center"
        },
        {
          title: "所属建筑",
          key: "building",        
          align: "center",
          render: (h, params) =>{
            const build = params.row.collector.building.name
            return h('div',{},build
            )
          },
        },
        {
          title: "所属建筑区域",
          key: "buildingArea",
          align: "center",
          render: (h, params) =>{
            const buildArea = params.row.buildingArea.label
            return h('div',{},buildArea
            )
          },
        },
        {
          title: "当前状态",
          key: "itemStatus",
          align: "center",
          render: (h, params) => {
            let itemStatus = params.row.itemStatus
            if(itemStatus!==null){
              let serviceType
              itemStatus === 0 ?  serviceType = '未激活' : itemStatus === 1 ? serviceType = '正常' :  
              itemStatus === 2 ? serviceType = '检修中' : itemStatus === 3 ? serviceType = '自动停机' :
              itemStatus === 4 ? serviceType = '主动停机' : serviceType = '销户'
              const type = filter.filterAccount(itemStatus)
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
          filters: [
            {
              label: '未激活',
              value: 0
            },
            {
              label: '正常',
              value: 1
            },
            {
              label: '检修中',
              value: 2
            },
            {
              label: '自动停机',
              value: 3
            },
            {
              label: '主动停机',
              value: 4
            },
            {
              label: '销户',
              value: 5
            }
          ],
          filterMultiple: false,
          filterMethod (value, row) {
            this.itemStatus = value
            if (value === 0) {
              return row.itemStatus === 0
            } else if (value === 1) {
              return row.itemStatus === 1
            } else if (value === 2) {
              return row.itemStatus === 2
            } else if (value === 3) {
              return row.itemStatus === 3
            } else if (value === 4) {
              return row.itemStatus === 4
            } else {
              return row.itemStatus === 5
            }
          }
        },
        {
          title: "品牌",
          key: "brand",
          align: "center"
        },
        {
          title: "计费方式",
          key: "billingType",
          align: "center",
          render: (h, params) => {
            let billingType = params.row.billingType
            if(billingType!==null){
              let biType
              billingType === 0 ?  biType = '分速计费' : biType='单一计费'
              const type = filter.filterAccount(billingType)
              const color = type.color
              return h('Tag', {
                props: {
                  color: color,
                },
                nativeOn: {
                  click: () => {
                  }
                }
              },biType)
            }
          },
          filters: [
            {
              label: '分速计费',
              value: 0
            },
            {
              label: '单一计费',
              value: 1
            }
          ],
          filterMultiple: false,
          filterMethod (value, row) {
            this.billingType = value
            if (value === 0) {
              return row.billingType === 0
            } else if (value === 1) {
              return row.billingType === 1
            }
          }
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
                        this.itemId = params.row.id
                        this.addModal = true
                        this.isadd = false
                        this.isReset = false
                        this.title= '修改风机盘管设备'
                        this.searchItemById()
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
                        this.searchAssociationAccount(params.row.id)
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
                        const id = params.row.id
                        this.searchModal = true
                        this.searchParams(id)
                        this.WebSocketTest()
                      }
                    }
                  }
                ),
                h(
                  'imgButton',
                  {
                    props: {
                      type: '设置1',
                      tag: '设置'
                    },
                    nativeOn: {
                      click: () => {
                        const id = params.row.id
                        const name = params.row.name
                        this.setTerminalBtn(id,name)
                      }
                    }
                  }
                ),
              ]
            )
          }
        }
      ],
      pageSize: 10,
      dataCount: 0,
      currentPage: 1,
      terminalList: [],
      formInline: {
        build: '',
        collector: '',
        energy: '',
      },
      ruleInline: {
      },
    }
  },
  mounted () {
  },
  created () {
    this.pageChange(1)
    this.getBuilds()
    this.getbrands()
    this.getTerminal()
    this.getItemType()
  },
  watch:{
    buildAreas:function(newVal,oldVal){
      if(newVal.length>0&&oldVal.length>0&&newVal!==oldVal){
        this.addForm.buildingAreaIds = []
      }
    }
  },
  methods:{
    //页面查询
    pageChange (page) {
      this.currentPage = page
      terminal.searchItemList({
        itemCode: this.devNum,
        buildingId: this.formInline.build,
        collectorId: this.formInline.collector,
        meterId: this.formInline.energy,
        itemType: 'FJPG',
        currentPage: page,
        pageSize: 10
      })
      .then((res) => {
        this.terminalList = res.dataList
        this.dataCount = res.total
      })
      .catch((err) => {
        this.$Message.error('查询列表失败')
      })
    },
    //查询按钮
    searchBtn () {
      this.pageChange(1)
    },
    //查询建筑
    getBuilds () {
      terminal.searchBuildingList({
      })
      .then((res) => {
        this.builds = res
      })
      .catch((err) => {
        this.$Message.error('查询建筑失败')
      })
    },
    //选择建筑(查询建筑区域/采集器)
    changeBuild () {
      if(!this.isReset){
        terminal.searchCollectorList({
          buildingId: this.isChange?this.formInline.build:this.addForm.build
        })
        .then((res) => {
          this.collectors = res
        })
        .catch((err) => {
          this.$Message.error('查询采集器失败')
        })
        terminal.searchBuildingAreaList({
          buildingId: this.addForm.build
        })
        .then((res) => {
          this.buildAreas = res
        })
        .catch((err) => {
          this.$Message.error('查询建筑区域失败')
        })
      }
    },
    //选择采集器(查询能量表)
    changeCollector () {
      if(!this.isReset){
        if(this.formInline.collector || this.addForm.collectorId){
          terminal.searchMeterList({
            collectorId: this.formInline.collector?this.formInline.collector:this.addForm.collectorId
          })
          .then((res) => {
            this.energys = res
          })
          .catch((err) => {
            this.$Message.error('查询关联能量表失败')
          })
        }
      }
    },

    //选择品牌
    changeBrands (data) {
      if(data==='new'){
        this.isBrand = true
      }else {
        this.isBrand = false
      }
    },
    //查询品牌
    getbrands () {
      terminal.searchBrandList({
          itemType: 'FJPG'
        })
        .then((res) => {
          this.brands = res
        })
        .catch((err) => {
          this.$Message.error('查询品牌失败')
        })
    },

    //查询风机盘管数量
    getTerminal () {
      terminal.searchItemAmount({
        itemType: 'FJPG'
      })
      .then((res) => {
        this.terminalNum = res
      })
      .catch((err) => {
        this.$Message.error('查询风机盘管数量失败')
      })
    },
     //添加/修改设备提交 url.substring(url.lastIndexOf("/")+1);
    submitFrom (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          terminal.addOrUpdateItem({
            id: this.itemId,
            name: this.addForm.name,
            code: this.addForm.code,
            type: 'FJPG',
            buildingAreaId: this.addForm.buildingAreaIds.toString().substring(this.addForm.buildingAreaIds.toString().lastIndexOf(",")+1),
            collectorId: this.addForm.collectorId,
            brand: this.addForm.make?this.addForm.make:this.addForm.brand,
            insertDate: this.addForm.insertDate?FormatDate(this.addForm.insertDate):'',
            billingType:this.isBorder ? 0:1,
            meterId: this.addForm.meterId,
            billingDate:this.addForm.billingDate?FormatDate(this.addForm.billingDate):'',
            itemTypeId: this.addForm.itemTypeId
          })
          .then((res) => {
            this.isadd?this.$Message.success('添加成功'):this.$Message.success('修改成功')
            this.pageChange(1)
            this.getTerminal()
            this.addModal = false
            this.resetFrom('addForm')
          })
          .catch((err) => {
            this.isadd?this.$Message.error('添加失败'):this.$Message.error('修改失败')
          })
        }
      })
    },
    //修改设备回显
    searchItemById () {
      terminal.searchItemById({
        itemId: this.itemId
      }).then((res) => {
        this.getbrands()
        this.addFormCopy = copyArray(res)
        this.addForm =copyArray(res)
        this.buildCopy = copyArray(res.collector.building.id)
        this.addForm.build = res.collector.building.id
        this.changeBuild()
        this.addForm.collectorId = res.collector.id
        this.collectorCopy = copyArray(res.collector.id)
        this.changeCollector()
        this.addForm.meterId = res.meter.id
        this.meterIdCopy = copyArray(res.meter.id)
        res.billingType ===0?this.isBorder = true : this.isBorder = false
        this.billingTypeCopy = copyArray(res.billingType)
      }).catch((err) => {

      })
    },
    //修改重置
    resetEdit () {
      this.addForm = copyArray(this.addFormCopy)
      this.addForm.build = copyArray(this.buildCopy)
      this.changeBuild()
      this.addForm.collectorId = copyArray(this.collectorCopy)
      this.changeCollector()
      this.addForm.meterId = copyArray(this.meterIdCopy)
      this.billingTypeCopy ===0?this.isBorder = true : this.isBorder = false
    },
    //删除设备
    deleteBtn () {
      terminal.deleteItemById({
        itemId: this.itemId
      }).then((res) =>{
        this.delModel.delModY = false
        this.pageChange(1)
        this.getTerminal()
        this.$Message.success('删除成功')
      }) .catch((err) => {
        this.$Message.error('删除失败')
      })
    },

    //查询是否关联账户
    searchAssociationAccount (id) {
      terminal.searchAssociationAccount({
        itemId: id
      }).then((res) => {
          res?this.delModel.delModN = true:this.delModel.delModY = true
      }).catch((err) => {})
    },
    //查询设备基础信息
    searchParams (id) {
      terminal.searchItemById({
        itemId: id
      }).then((res) =>{
        this.baseInfo = res
        this.baseInfo.build = res.collector.building.name
        this.baseInfo.buildArea = res.buildingArea.label
        this.baseInfo.collector = res.collector.name
        this.baseInfo.meter = res.meter.name
        this.baseInfo.billingType = res.billingType===0?'分速计费':'单一计费'
      })
    },
    //日期
    changeStart (data) {
      this.addForm.insertDate = data
    },
    changeBegin (data) {
      this.addForm.billingDate = data
    },

    //高级筛选提交
    submitSearchBtn () {
      this.pageChange(1)
    },
    //高级筛选重置
    resetBtn (name) {
      this.isReset = true
      this.$refs[name].resetFields()
    },
    onCancel () {
      this.resetFrom('addForm')
    },
    //添加弹出框
    addBtn () {
      this.addModal = true
      this.isadd = true
      this.title = '添加风机盘管设备'
      this.itemId = ''
      this.isReset = false
    },
    //获取风机盘管型号
    getItemType () {
      terminal.searchTypeByItemType({
        itemType: 'FJPG'
      }).then((res) => {
        this.itemTypeIds = res
      }).catch((err) => {
      })
    },
    //添加设备重置
    resetFrom (name) {
      this.isReset = true
      this.buildAreas = []
      this.$refs[name].resetFields()
      this.addForm.make = ''
      this.isBorder = false
    },
    //批量添加弹框
    batchBtn () {
      this.batchAddModal = true
    },
    //批量添加提交
    submitBatchFrom () {

    },
    //批量添加重置
    resetBatchFrom (name) {
      this.$refs[name].resetFields()
      this.addForm.make = ''
    },
    //批量添加close
    batchAddCancel () {
		
    },
    //页面跳转set
    setTerminalBtn (id,name) {
      this.$router.push({path: '/setTerminal',query:{id: id,name:name}})
    },
    //模板页面
    setBtn () {
      this.$router.push({name:'tempTerminal'})
    },
    //webscoket
    WebSocketTest () {
      let _this = this
      if ("WebSocket" in window) {
        // alert("您的浏览器支持 WebSocket!")
        // 打开一个 web socket
        var ws = new WebSocket("ws://10.10.23.225:8002")  
        ws.onopen = function() {
          let actions = 'SELECT|03-12289|03-14884|03-14882|END'
        // Web Socket 已连接上，使用 send() 方法发送数据
          ws.send(actions)
          // alert("数据发送中...")
        }
        ws.onmessage = function (evt) {
          const data = JSON.parse(evt.data)
          _this.templ = data.dataList[0].value
          if(data.dataList.length>1){
          _this.templ1 = data.dataList[1].value
          _this.open = data.dataList[2].value
          }
          // console.log(_this.templ)
          // console.log(data)
          // alert("数据已接收...")
        };
        ws.onclose = function() { 
          // 关闭 websocket
          alert("连接已关闭...");
        }
      }  else {
      // 浏览器不支持 WebSocket
        alert("您的浏览器不支持 WebSocket!");
      }
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
  .inline_block {
    display:inline-block;
    padding:2px 9px
  }
  .color{
    .inline_block;
    border:1px solid #077aa9;
  }
  .noColor {
    .inline_block;
    border:1px solid #ddd;
  }
  .orange {
    color:#FF9900
  }
  .padding10{
    padding:10px
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
  .titleName {
    background:rgba(7, 122, 169, 0.7);
    color:#fff;
    text-align:center;
    padding:10px
  }
  .border {
    box-shadow: 0 0 0 2px rgba(45, 140, 240, 0.6)
  }
</style>



