
<style lang="less">
    .vertical-center-modal{
        display: flex;
        .ivu-modal{
            top: 250px;
        }
    }
</style>
<template>
  <div class="fancoil-page">
    <Row :gutter="16" style="height:310px">
      <Col span="8">
        <div class="top-box">
          <div style="float:left">
            <b class="ml10 fz24">风机盘管使用率统计</b><br>
            <b class="ml10 fontSize">风机盘管总数：</b>
            <b class="bigFont2">{{123}}</b><br>
            <b class="ml10 fontSize">使用中：</b>
            <b class="bigFont2">{{123}}</b>
          </div>
          <MyCharts  name='访问来源' :series='pieData' :data='ringData' type="ringPieOption" :size="{width:'100%', height: '100%', position: 'absolute'}"></MyCharts>
        </div>
      </Col>       
      <Col span="8">
        <div class="top-box">
          <div style="float:left">
            <b class="ml10 fz24">风机盘管运行概况</b><br>
            <b class="ml10 fontSize">当前运行设备：</b>
            <b class="bigFont2">{{456}}</b><br>
            <b class="ml10 fontSize">当前停止设备：</b>
            <b class="bigFont2">{{456}}</b><br>
            <b class="ml10 fontSize">其中故障设备：</b>
            <b class="bigFont2">{{456}}</b><br>
          </div>
          <MyCharts  :series='roseData' :data='ringData' type="rosePieOption" :size="{width:'100%', height: '100%', position: 'absolute'}"></MyCharts>
        </div>
      </Col>
      <Col span="8">
        <div class="top-box">
          <div style="float:left">
            <b class="ml10 fz24">当月故障统计</b><br>
            <b class="ml10 fontSize">计量仪表总数：</b>
            <b class="bigFont2">{{456}}</b><br>
            <b class="ml10 fontSize">计量仪表总数：</b>
            <b class="bigFont2">{{456}}</b><br>
          </div>
          <MyCharts :series='normalData' type="normalPieOption" :size="{width:'100%', height: '100%', position: 'absolute'}"></MyCharts>
        </div>
      </Col>
    </Row>

    <Row :gutter="16">
      <Col span="6">
        <b class="fontSize">设备统计报表总数：</b>
        <b class="bigFont1">{{dataCount === 0 ? '' : dataCount}}</b>
      </Col>
      <Col span="3" :offset="11">
        <Input v-model="deviceCode"/>
      </Col>
      <Col span="2">
        <imgButton type="按钮" name="查询" @click.native='searchBtn'></imgButton>
      </Col>
      <Col span="2">
        <imgButton type="高级筛选" name="高级筛选" @click.native='highSearch = !highSearch'></imgButton>
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
            <FormItem prop="collector" label="建筑区域：">
              <Select v-model="formInline.collector" @on-change='isChange=true;changeCollector()' placeholder='' clearable filterable>
                <Option v-for="item in collectors" :value="item.id" :key="item.id">{{item.name}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem prop="energy" label="所属采集器：">
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

    <Table :columns="columns" class="normal-table" :data="terminalList" no-data-text="暂无数据" border></Table>

    <Row class="page-bottom">
      <Col span="12" class="page-text">当前显示<span class="pageColor">{{terminalList ? terminalList.length : 0 }}</span>条记录,共<span class="pageColor">{{dataCount}}</span>条记录</Col>
      <Col span="8" :offset="4"> 
        <Page :total="dataCount" :page-size="pageSize"  @on-change="pageChange"  show-elevator :current="currentPage" class="common-page-style"/>
      </Col>
    </Row>


    <!---查看设备-->
    <Modal :mask-closable="false" v-model="contorlModal" footer-hide draggable width='1300' class-name="vertical-center-modal">
      <div style="margin-top:30px">
        <table border class='table' width='100%'>
          <tr>
            <td width='16%' class="padding">风机盘管号</td>
            <td width='34%' class="padding">{{'123123'}}</td>
            <td width='16%' class="padding">当前机组状态</td>
            <td width='34%' class="padding">{{'开'}}</td>
          </tr>
          <tr>
            <td class="padding">模式反馈</td>
            <td class="padding">{{'逆风'}}</td>
            <td class="padding">三速反馈</td>
            <td class="padding">{{'中'}}</td>
          </tr>
          <tr>
            <td class="padding">室内温度</td>
            <td class="padding">{{'26'}}</td>
            <td class="padding">当前设定</td>
            <td class="padding">{{'20度'}}</td>
          </tr>
          <tr class="control-back">
            <td class="padding">机组开关</td>
            <td class="padding">
              <i-switch size="large" @on-change="unitSwitch">
                <span slot="open">开启</span>
                <span slot="close">关闭</span>
              </i-switch>
            </td>
            <td class="padding">模式控制</td>
            <td class="padding">
              <RadioGroup v-model="modelControl" type="button" size="large" @on-change="modelSwitch">
                <Radio label="制热"></Radio>
                <Radio label="制冷"></Radio>
                <Radio label="送风"></Radio>
              </RadioGroup>
            </td>
          </tr>
          <tr class="control-back">
            <td class="padding">风挡控制</td>
            <td class="padding">
              <RadioGroup v-model="windControl" type="button" size="large" @on-change="windSwitch">
                <Radio label="高"></Radio>
                <Radio label="中"></Radio>
                <Radio label="低"></Radio>
                <Radio label="自动"></Radio>
              </RadioGroup>
            </td>
            <td class="padding">键盘锁定</td>
            <td class="padding">
              <i-switch size="large" @on-change="lockKeyboard">
                <span slot="open">ON</span>
                <span slot="close">OFF</span>
              </i-switch>
            </td>
          </tr>
          <tr class="control-back">
            <td class="padding">温度设定（制冷）</td>
            <td class="padding">
              <InputNumber 
                size="large" 
                :max="lockHot" 
                :min="lockCold" 
                v-model="setCold"
                :formatter="value => `${value}℃`"
                :parser="value => value.replace('℃', '')"
              ></InputNumber>
            </td>
            <td class="padding">温度设定（制热）</td>
            <td class="padding">
              <InputNumber 
                size="large" 
                :max="lockHot" 
                :min="lockCold" 
                v-model="setHot"
                :formatter="value => `${value}℃`"
                :parser="value => value.replace('℃', '')"
              ></InputNumber>
            </td>
          </tr>
          <tr class="control-back">
            <td class="padding">设定限值（冷）</td>
            <td class="padding">
              <InputNumber 
                size="large" 
                :max="15" 
                :min="-20" 
                v-model="lockCold"
                :formatter="value => `${value}℃`"
                :parser="value => value.replace('℃', '')"
              ></InputNumber>
            </td>
            <td class="padding">设定限值（热）</td>
            <td class="padding">
              <InputNumber 
                size="large" 
                :max="100" 
                :min="20" 
                v-model="lockHot"
                :formatter="value => `${value}℃`"
                :parser="value => value.replace('℃', '')"
              ></InputNumber>
            </td>
          </tr>
        </table>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      //限定值
      setCold: 25,
      setHot: 25,
      lockCold: 25,
      lockHot: 25,
      //模式控制
      modelControl: '',
      //风挡控制
      windControl: '',

      contorlModal: false,
      value1: 0,
      beginTime: '',
      endTime: '',
      dataCount: 0,
      deviceCode: '',
      highSearch: false,
      formInline: {
        build: '',
        collector: '',
        energy: ''
      },
      ruleInline: {},
      builds: [],
      collectors: [],
      energys: [],
      terminalList: [
        {
          itemName: '风机盘管1',
          itemCode: 'N-02',
          build: '喝咖啡',
          area: '一层',
          status: 0,
          account: '...'
        },
        {
          itemName: '风机盘管1',
          itemCode: 'N-02',
          build: '喝咖啡',
          area: '一层',
          status: 1,
          account: '...'
        }
      ],
      columns: [
        {
          title: "序号",
          type: "index",
          align: "center"
        },
        {
          title: "设备名称",
          key: "itemName",
          align: "center"
        },
        {
          title: "设备编号",
          key: "itemCode",
          align: "center"
        },
        {
          title: "所属建筑",
          key: "build",
          align: "center"
        },
        {
          title: "所属建筑区域",
          key: "area",
          align: "center"
        },
        {
          title: "运行状态",
          key: "status",
          align: "center",
          render: (h, params) => {
            let itemStatus = params.row.status
            if(itemStatus!==null){
              let serviceType
              if(itemStatus === 0) {
                serviceType = '开'
              }else if(itemStatus === 1) {
                serviceType = '关'
              }
              return h('div', {
                nativeOn: {
                  click: () => {
                  }
                }
              },serviceType)
            }
          },
          filters: [
            {
              label: '开',
              value: 0
            },
            {
              label: '关',
              value: 1
            }
          ],
          filterMultiple: false,
          filterMethod (value, row) {
            this.itemStatus = value
            if (value === 0) {
              return row.status === 0
            } else if (value === 1) {
              return row.status === 1
            }
          }
        },
        {
          title: "所属账户",
          key: "account",
          align: "center"
        },
        {
          title: "操作",
          key: "companyName",
          align: "center",
          render: (h, params) =>{
            return h(
              'div',[
                h(
                  'imgButton',
                  {
                    props: {
                      type: '查看1',
                      tag: '查看'
                    },
                    nativeOn: {
                      click: () => {
                        this.contorlModal = true
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

                      }
                    }
                  }
                )
              ]
            )
          }
        },
      ],
      pageSize: 0,
      dataCount: 0,
      currentPage: 1,
      meterAllCount: '',

      pieData: [
        {
          value: 335,
          name: '使用中（正常）'
        },
        {
          value: 679,
          name: '使用中（停机）',
          selected: true
        }
      ],

      ringData:[
        {
          value: 335,
          name: '使用中'
        },
        {
          value: 667,
          name: '未使用'
        },
      ],
      roseData: [
        {
          value: 100,
          name: '故障'
        }, 
        {
          value: 150,
          name: '运行'
        }, 
        {
          value: 53,
          name: '停止'
        }
      ],

      normalData: [
        {value:335, name:'故障报警总数'},
        {value:310, name:'风机盘管总数'},
      ]
    }
  },

  watch: {
    beginTime: function(newV, oldV) {
      console.log('父起始时间', newV);
      
    },

    endTime: function(newV, oldV) {
      console.log('父停止时间', newV);
    }
  },

  methods: {
    changeBuild () {

    },

    changeCollector () {

    },

    pageChange (page) {
      this.currentPage = page
    },

    submitSearchBtn() {

    },

    resetBtn(name) {
      this.$refs[name].resetFields()
    },

    //机组开关
    unitSwitch(e) {
      console.log('机组开关', e)
    },

    //模式控制
    modelSwitch(e) {
      console.log('模式控制', e)
    },

    //风挡控制
    windSwitch(e) {
      console.log('风挡控制', e)
    },

    //锁定键盘
    lockKeyboard(e) {
      console.log('锁定键盘', e)
    }
  }
}
</script>

<style lang="less">
.fancoil-page {
  .normal-table {
    margin:20px 0 10px ;
    height: calc(100vh - 580px);
  }
}
</style>

<style lang="less" scoped>
.top-box {
  width: 100%;
  height: 300px;
  border-radius: 10px;
  border: 5px solid #8ac3bd;
}
.table{
  border-collapse:collapse;
  text-align:left;
  border-color:#ccc;
  border:1px solid #dad7d7;
  background:#fafafa;
  font-size: 20px;
  color: black;
}
.padding {
  padding:5px 10px;
  line-height: 50px;
}
.control-back {
  background-color: #d0e7ee;
}
</style>
