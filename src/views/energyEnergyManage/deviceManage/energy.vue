<style lang="less">
.colletor-modal {
  margin-top: 5%;
}
</style>

<template>
  <div class="collector-page">
    <div>
      <Row :gutter="16">
        <Col span="4">
          <b class="fontSize">采集器总数：</b>
          <b class="bigFont1">{{collectorNum}}</b>
        </Col>
        <Col span="3" :offset="11">
          <Select v-model="filter.collectorStatus" placeholder='采集器状态' clearable filterable>
            <Option v-for="item in collectors" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </Col>
        <Col span="3">
          <Select v-model="filter.buildName" placeholder='建筑名称' clearable filterable>
            <Option v-for="item in builds" :value="item.id" :key="item.id">{{item.name}}</Option>
          </Select>
        </Col>
        <Col span="2">
          <imgButton type="按钮" name="查询" @click.native='pageChange(1)'></imgButton>
        </Col>
        <Col span='1'>
          <imgButton type="添加采集器" @click.native='reset("formInline"),addC = true,modTitle = "添加采集器",model = true'></imgButton>
        </Col>
      </Row>
    </div>

    <Table :columns="columns" class="normal-table" :data="collectorList" no-data-text="暂无数据" border></Table>

    <Row class="page-bottom">
      <Col span="12" class="page-text">
      当前显示<span class="pageColor">{{(collectorList && collectorList.length > 0) ? collectorList.length : 0}}</span>条记录,共<span class="pageColor">{{dataCount}}</span>条记录
      </Col>
      <Col span="8" :offset="4">
      <Page :total="dataCount" :page-size="pageSize"  @on-change="pageChange"  show-elevator :current="currentPage" class="common-page-style"/>
      </Col>
    </Row>

    <Modal :mask-closable="false" v-model="model" width="1000"  draggable scrollable class-name="colletor-modal">
      <div style="margin-top: 30px">
        <img class="mr5" src="../../../assets/images/img-button/collectorAdd.png">
        <span class="spanPosition">{{modTitle}}</span>
        <span class="fr" style="margin-top: 15px;">
          <span class="mr10">操作日期:</span>
          <span>2018-05-02 15:20</span>
        </span>
        <Form class="mt20" ref="formInline" :model="formInline" :rules='ruleInline' :label-width="15">
          <table cellpadding="0" cellspacing="0" class="localTable">
            <tr>
              <td width='15%'>
                <label>采集器名称</label>
              </td>
              <td width='35%' style='textAlign:left;padding:5px 10px'>
                <FormItem prop="name" label=" " style='display:inline;'>
                  <Input type="text" v-model="formInline.name" ></Input>
                </FormItem>
              </td>
              <td width='15%'>
                <label>采集器编号</label>
              </td>
              <td width='35%' style='textAlign:left;padding:5px 10px'>
                <FormItem prop="code" label=" " style='display:inline;'>
                  <Input type="text" v-model="formInline.code" v-if="addC === true"></Input>
                  <Input type="text" v-model="formInline.code" readonly v-else></Input>
                </FormItem>
              </td>
            </tr>
            <tr>
              <td>
                <label>所属建筑</label>
              </td>
              <td style='textAlign:left;padding:5px 10px'>
                <FormItem prop="buildingId" label=" " style='display:inline;'>
                  <Select v-model="formInline.buildingId" placeholder='建筑名称' clearable filterable>
                    <Option v-for="item in builds" :value="item.id" :key="item.id">{{item.name}}</Option>
                  </Select>
                </FormItem>
              </td>
              <td>
                <label>采集器品牌</label>
              </td>
              <td style='textAlign:left;padding:5px 10px'>
                <FormItem prop="brand" label=" " style='display:inline;'>
                  <Select v-model="newBrand" placeholder='采集器品牌' clearable filterable style="width:40%">
                    <Option v-for="item in brands" :value="item.label" :key="item.value">{{item.label}}</Option>
                  </Select> 
                  <Input type="text" v-model="formInline.brand" placeholder='采集器品牌' style="width:55%;margin-left:5%;" v-if="newBrand === '新建'"></Input>
                  <input type="hidden" v-model="formInline.brand"  style="width:55%;margin-left:5%;" v-else></input>
                </FormItem>
              </td>
            </tr>
            <tr>
              <td>
                <label>接入日期</label>
              </td>
              <td style='textAlign:left;padding:5px 10px'>
                <FormItem prop="insertDate" label=" " style='display:inline;'>
                  <DatePicker type="datetime" style="display:inline-block;width: 100%" v-model="formInline.insertDate" :editable="false" format="yyyy-MM-dd hh:mm:ss" ref="insD" @on-change="changeInsDate('insD')"></DatePicker>
                </FormItem>
              </td>
              <td>
                <label>施工单位</label>
              </td>
              <td style='textAlign:left;padding:5px 10px'>
                <FormItem prop="builder" label=" " style='display:inline;'>
                  <Input type="text" v-model="formInline.builder" ></Input>
                </FormItem>
              </td>
            </tr>
            <tr v-if="modTitle === '修改采集器'">
              <td>
                <label>接入设备</label>
              </td>
              <td colspan="3" style='textAlign:left;padding:5px 10px'>
                <FormItem prop="relationMeter" label=" " style='display:inline;'>
                  <Input type="text" v-model="formInline.relationMeter" v-if="addC === true"></Input>
                  <Input type="text" v-model="formInline.relationMeter" readonly v-else></Input>
                </FormItem>
              </td>
            </tr>
            <tr>
              <td>
                <label>采集器IP</label>
              </td>
              <td style='textAlign:left;padding:5px 10px'>
                <FormItem prop="collectorIp" label=" " style='display:inline;'>
                  <Input type="text" v-model="formInline.collectorIp" ></Input>
                </FormItem>
              </td>
              <td>
              </td>
              <td style='textAlign:left;padding:5px 10px'>
              </td>
            </tr>
          </table>
        </Form>
      </div>
      <div slot="footer">
        <imgButton type="按钮" name="提交" @click.native="submit('formInline')" v-if="addC === true"></imgButton>
        <imgButton type="按钮" name="重置" @click.native="reset('formInline')" v-if="addC === true"></imgButton>
        <imgButton type="按钮" name="提交" @click.native="submitU('formInline')" v-if="addC === false"></imgButton>
        <imgButton type="按钮" name="重置" @click.native="resetU('formInline')" v-if="addC === false"></imgButton>
      </div>
    </Modal>

    <imodal v-model="visible" :title="title">
      <div class="mod-content">
        <p class="mod-content-title">系统提示：</p>
        <p class="mod-content-info ft">
          本次操作将导致当前采集器信息被删除且不可恢复。
        </p>
        <span>
          <p class="mod-content-info">&nbsp;</p>
          <Button class="mod-content-btn delBtn" @click="visible = false">取消操作</Button>
          <Button class="mod-content-btn delBtn" style='margin-right:8px;' @click="isDel = true,visible = false,deleteF()">确认删除</Button>
        </span>
      </div>
    </imodal>

    <Modal :mask-closable="false" v-model="model1" width="1000" draggable scrollable>
      <div style="margin-top: 30px">
        <img class="mr5" src="@/assets/images/device/仪表.png">
        <span class="spanPosition">{{'仪表关联'}}</span>
        <span class="fr" style="margin-top: 15px;">
          <span class="mr10">操作日期:</span>
          <span>2018-05-02 15:20</span>
        </span>
      </div>
      <div style="margin: 20px 130px;">
        <Transfer :titles="transferTitle" :data="deviceList" filterable :filter-method="filterMethod" :target-keys="targetKeys" :render-format="renderF" :list-style="listStyle" :operations="['左移','右移']" @on-change="changeDevList"></Transfer>
      </div>
      <div slot="footer">
        <imgButton type="按钮" name="提交" @click.native="submitC()"></imgButton>
        <imgButton type="按钮" name="重置" @click.native="resetC()"></imgButton>
      </div>
    </Modal>
  </div>
</template>

<script>
import collectorApi from '@/api/request/collector.js'
import { copyArray, FormatDate } from '@/api/util'
export default {
  data () {
    const validCode = (rule, value, callback) => {
      let _this = this
      console.log('this.addC', this.addC);
      console.log('_this.addC', _this.addC);
      
      if(_this.addC === true) {
        collectorApi.checkCollectorCode({
          code: _this.formInline.code
        }).then((res) => {
          if(res === 0) {
            callback()
          }else{
            callback(new Error('采集器编号已存在，请更改'))
          }
        }).catch((err) => {})
      }else{
        callback()
      }
    }
    return {
      model1: false,
      transferTitle: ['未关联仪表','已关联仪表'],
      deviceList: [],
      targetKeys: [],

      listStyle: {
        width: '300px',
        height: '480px',
      },

      updateT: false,
      addC: true,
      visible: false,
      title: '采集器',
      model: false,
      modTitle: '',
      isDel: false,
      delId: '',
      newBrand: '',
      buildList: [],

      collectorNum: 0,
      filter: {
        collectorStatus: '',
        buildName: '',
      },
      builds: [],
      collectors: [
        {
          value: '0',
          label: '在线'
        },
        {
          value: '1',
          label: '离线'
        }
      ],
      brands: [],
      buildName: '',
      dataCount: 0,
      pageSize: 10,
      currentPage: 1,

      columns: [
        {
          title: "序号",
          type: 'index',
          align: "center"
        },
        {
          title: "采集器名称",
          key: "name",
          align: "center"
        },
        {
          title: "采集器编号",
          key: "code",
          align: "center"
        },
        {
          title: "所属建筑",
          key: "buildingName",
          align: "center"
        },
        {
          title: "关联仪表设备",
          key: "relationMeter",
          align: "left"
        },
        {
          title: "当前状态",
          key: "state",
          align: "center",
          render: (h, params) => {
            let st = params.row.state
            if(st === 1) {
              return h(
                'a',{
                  style: {
                    color: 'red'
                  }
                },'离线'
              )
            }else if((st === 0)){
              return h(
                'a',{
                  style: {
                    color: 'black'
                  }
                },'在线'
              )
            }
          },
          // filters: [
          //   {
          //     label: '在线',
          //     value: 0
          //   },
          //   {
          //     label: '离线',
          //     value: 1
          //   }
          // ],
          // filterMultiple: false,
          // filterMethod (value, row) {
          //   if (value === 0) {
          //     return row.state === 0
          //   } else if (value === 1) {
          //     return row.state === 1
          //   }
          // }
        },
        {
          title: "品牌",
          key: "brand",
          align: "center"
        },
        {
          title: "接入日期",
          key: "insertDate",
          align: "center"
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
                        this.reset("formInline")
                        this.getIbsCollectorDTOById(params.row.id)
                        this.modTitle = '修改采集器'
                        this.addC = false
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
                        this.isDel =  false,
                        this.delId = params.row.id,
                        this.visible = true
                      }
                    }
                  }
                ),h(
                  'imgButton',
                  {
                    props: {
                      type: '仪表'
                    },
                    nativeOn: {
                      click: () => {
                        this.updateId = params.row.id
                        this.searchIbsMeterList(params.row.id)
                        this.searchIbsMeterByCollectorId(params.row.id)
                        this.model1 = true
                      }
                    }
                  }
                )
              ]
            )
          }
        },
      ],

      collectorList: [],

      formInline: {
        id: '',
        name: '',
        code: '',
        buildingId: '',
        brand: '',
        insertDate: '',
        builder: '',
        collectorIp: '',
      },
      ruleInline: {
        name: [
          {required: true, type: 'string', message: '请输入采集器名称', trigger: 'blur'},
          {max: 50, message: '最多能输入50位字符', trigger: 'blur'}
        ],
        code: [
          {required: true, type: 'string', message: '请输入采集器编号', trigger: 'blur'},
          { validator: validCode, trigger: 'blur'},
          {max: 10, message: '最多能输入20位字符', trigger: 'blur'}
        ],
        buildingId: [
          {required: true, type: 'integer', message: '选择则', trigger: 'blur'},
        ],
        brand: [
          {required: true, type: 'string', message: '请输入', trigger: 'blur'},
          {max: 20, message: '最多能输入20位字符', trigger: 'blur'}
        ],
        insertDate: [
          {required: true, type: 'date', message: '请选择日期', trigger: 'change'},
        ],
        builder: [
          {required: false, type: 'string', message: '请输入', trigger: 'blur'},
          {max: 50, message: '最多能输入50位字符', trigger: 'blur'}
        ],
        collectorIp: [
          {required: true, type: 'string', message: '请输入', trigger: 'blur'},
          {max: 30, message: '最多能输入30位字符', trigger: 'blur'}
        ],
      },
      copyFormInline: {},
      copyTargetKeys: [],
      updateId: '',
    }
  },

  created () {
    this.getBuildList()
    this.pageChange(1)
    this.getAllBrand()
    this.countCollectorNum()
  },
  
  methods: {
    changeInsDate(name) {
      this.$refs[name].onSelectionModeChange('time')
    },

    searchIbsMeterList(id) {
      collectorApi.searchIbsMeterList({
        collectorId: id
      })
      .then((res) => {
        this.deviceList = this.fromatTansf(res.data)
      }).catch((err) => {})
    },

    searchIbsMeterByCollectorId(id) {
      collectorApi.searchIbsMeterByCollectorId({
        collectorId: id
      })
      .then((res) => {
        this.targetKeys = copyArray(this.formateTargetKeys(res.data))
        this.copyTargetKeys = copyArray(this.formateTargetKeys(res.data))
        console.log('当前', res);
      }).catch((err) => {})
    },

    //格式化穿梭框数据
    fromatTansf(data) {   
      let c = []
      let a = {}
      if(data !== undefined){
        data.forEach(i => { 
          a.key = i.id
          a.label = i.name      
          c.push(a)
          a = {}
        })
      }     
      return c
    },

    formateTargetKeys(data) {
      let res = []
      data.forEach(i => {
        res.push(i.id)
      })
      return res
    },

    filterMethod(data, query) {
      return data.label.indexOf(query) > -1
    },

    renderF(item) {
      return item.label
    },

    //穿梭框数据改变时视图改变
    changeDevList(newKeys,direction, moveKeys) {     
      this.targetKeys = []
      this.targetKeys = newKeys  
    },

    countCollectorNum() {
      collectorApi.countCollectorNum()
      .then((res) => {
        this.collectorNum = res
      }).catch((err) => {})
    },

    //根据id查询采集器
    getIbsCollectorDTOById(id) {
      collectorApi.getIbsCollectorDTOById({
        id: id
      }).then((res) => {
        console.log('采集器', res);
        this.formInline = copyArray(res)
        this.copyFormInline = copyArray(res)
        this.newBrand = this.formInline.brand
      }).catch((err) => {})
    },

    getBuildList() {
      collectorApi.getAllIbsBuildingIdAndNameList()
      .then((res) => {
        console.log(res);
        this.builds = res
      }).catch((err) => {})
    },

    getAllBrand() {
      collectorApi.getAllBrandList()
      .then((res) => {
        this.brands = this.formateB(res)
        this.updateT = false
      }).catch((err) => {})
    },

    formateB(data) {
      let res = []
      res.push({value: 0, label: '新建'})
      let obj = {}
      for(let i = 0;i< data.length;i++) {
        obj.value = i+1
        obj.label = data[i]
        res.push(obj)
        obj = {}
      }
      return res
    },

    pageChange(page) {
      this.currentPage = page
      collectorApi.getAllIbsCollectorDTOByConditon({
        statue: this.filter.collectorStatus,
        buildName: this.filter.buildName,
        statueOrderBy: 'desc',
        pageSize: this.pageSize,
        pageCurrent: this.currentPage,
      }).then((res) => {
        this.dataCount = res.total
        this.collectorList = res.records
      }).catch((err) => {})
    },

    submit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          collectorApi.saveIbsCollector({
            name: this.formInline.name,
            code: this.formInline.code,
            buildingId: this.formInline.buildingId,
            brand: this.formInline.brand,
            insertDate: FormatDate(this.formInline.insertDate),
            builder: this.formInline.builder,
            collectorIp: this.formInline.collectorIp
          }).then((res) => {
            if(res.status === 'success'){
              if(this.newBrand === '新建') {
                this.updateT = true
              }
              this.reset('formInline')
              this.model = false
              this.pageChange(this.currentPage)
              this.$Message.success('添加成功')
            }else{
              this.$Message.error('添加失败')
            }
          }).catch((err) => {})
        }
      })
    },

    reset(name) {
      this.$refs[name].resetFields()
      this.newBrand = ''
    },

    submitU(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          collectorApi.updateIbsCollector({
            id: this.formInline.id,
            name: this.formInline.name,
            code: this.formInline.code,
            buildingId: this.formInline.buildingId,
            brand: this.formInline.brand,
            insertDate: FormatDate(this.formInline.insertDate),
            builder: this.formInline.builder,
            collectorIp: this.formInline.collectorIp
          }).then((res) => {
            if(res.status === 'success'){
              if(this.newBrand === '新建') {
                this.updateT = true
              }
              this.reset('formInline')
              this.model = false
              this.pageChange(this.currentPage)
              this.$Message.success('修改成功')
            }else{
              this.$Message.error('修改失败')
            }
          }).catch((err) => {})
        }
      })
    },

    resetU(name) {
      this.reset('formInline')
      this.formInline = copyArray(this.copyFormInline)
      this.newBrand = this.copyFormInline.brand
    },

    deleteF() {
      if(this.isDel === true) {
        collectorApi.deleteIbsCollectorById({
          id: this.delId
        }).then((res) => {
          if(res.status === 'success'){
            this.delId = ''
            this.visible = false
            this.pageChange(this.currentPage)
            this.$Message.success('删除成功')
          }else{
            this.$Message.error('删除失败')
          }
        }).catch((err) => {})
      }
    },

    submitC() {
      collectorApi.updateIbsMeterCollectorIdById({
        collectorId: this.updateId,
        meterIdList: `${this.targetKeys}`
      }).then((res) => {
        if(res.status === 'success'){
          this.updateId = ''
          this.model1 = false
          this.pageChange(this.currentPage)
          this.$Message.success('修改成功')
        }else{
          this.$Message.error('修改失败')
        }
      }).catch((err) => {})
    },

    resetC() {
      this.targetKeys = copyArray(this.copyTargetKeys)
    }
  },
  
  watch: {
    newBrand: function(newVal) {
      if(newVal === '新建' || newVal === '' || newVal === undefined) {
        this.formInline.brand = ''
      }else{
        this.formInline.brand = this.newBrand
      }
    },

    updateT: function(newVal) {
      if(newVal === true) {
        this.getAllBrand()
      }
    }
  },
}
</script>

<style lang="less" scoped>
	.localTable {
		width: 100%;
  }
  
  .localTable td,
	.localTable th {
		border-right: 1px solid #e8eaec;
		border-bottom: 1px solid #e8eaec;
		background: #fafafa;
		min-width: 0;
		height: 48px;
		box-sizing: border-box;
		text-align: left;
		text-overflow: ellipsis;
		vertical-align: middle;
		padding-left: 18px;
		padding-right: 18px;
		text-overflow: ellipsis;
		white-space: normal;
		word-break: break-all;
		box-sizing: border-box;
  }
  .localTable tr td:first-child,
  .localTable tr th:first-child {
    border-left: 1px solid #e8eaec;
  }
  .localTable tr:first-child td,
  .localTable tr:first-child th {
    border-top: 1px solid #e8eaec;
  }
	.ybTable td,
	.ybTable th {
		height: 48px;
  }
  
  .input-width {
    width: 100%;
  }

  .spanPosition {
    position: relative;
    bottom: 3px;
    left: 4px;
    font-weight: bold;
    color: #000;
    font-size: 14px;
  }
</style>


<style lang="less">
.collector-page {
  .normal-table {
    margin:20px 0 10px ;
    height: calc(100vh - 275px);
  }

  .ivu-table .ivu-table-row {
    height: calc((100vh - 310px) / 10);
  }
}
</style>
