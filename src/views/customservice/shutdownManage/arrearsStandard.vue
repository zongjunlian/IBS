<template>
  <div style="paddingTop:60px;">
    <Row :gutter="112" style="position:relative;">
      <Col span="8">
        <img src="../../../assets/images/triangle.png">
      </Col>
      <Col span="16">
        <Row style="marginTop:70px" :gutter="112">
          <Col span="2">
            <div class="red">
              ≤<span>{{money}}</span><span class="font">元</span>
            </div>
          </Col>
          <Col span="20">
            <Row  class="square">
              <Col span="4" class="ml20">
                <span>每日<b class="Number">{{number}}</b>次</span>
              </Col>
              <Col span="18">
                <span>
                  提醒时间：<span v-for="item in times">{{item.time}}<span style="margin:0 6px">;</span></span>
                </span>
              </Col>
              <Col span="1">
                  <imgButton type="修改" @click.native="editRed"></imgButton>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row class="mt20" :gutter="112">
          <Col span="2">
            <div class="yellow">
              ≤<span>{{money1}}</span><span class="font">元</span>
            </div>
          </Col>
          <Col span="20">
            <Row class="square">
              <Col span="4" class="ml20">
                <span>每日<b class="Number">1</b>次</span>
              </Col>
              <Col span="18">
                <span>
                  提醒时间：<span v-for='item in times1'>{{item.time}}</span>
                </span>
              </Col>
              <Col span="1">
                  <imgButton type="修改" @click.native='editYellow'></imgButton>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
          </Col>
          <Col>
          </Col>
        </Row>
      </Col>
      <Row class="infomation">
          <Col style="margin:20px 0">
            【说明】：
          </Col>
          <Col style="margin:20px 0">
            1.将按照上述设置的金额对风机盘管设备的控制面板执行锁定/解锁操作。
          </Col>
          <Col style="margin:20px 0">
            2.将按照上述设置的提醒周期及时间向账户绑定的公众号发送提醒信息。
          </Col>
        </Row>
    </Row>

    <Modal :mask-closable="false" v-model="arrearModal" width="400" draggable @on-cancel="onCancel" title="账户额度及提醒设置">
        <div>
          <Form ref="fromInline" :model="formInline" :rules='ruleInline'>
            <FormItem prop="surplus" label='账户余额' class="surplus" v-if="iscolor">
              <b class="big">≤</b><InputNumber :max="10000" :min="1" v-model="formInline.surplus"></InputNumber><span class="mar">元</span>
            </FormItem>
            <FormItem prop="surplus1" label='账户余额' class="surplus" v-else>
              <b class="big">≤</b><InputNumber :max="10000" :min="1" v-model="formInline.surplus1"></InputNumber><span class="mar">元</span>
            </FormItem>
            <FormItem prop="warn" label='提醒设置' class="pad" v-if="iscolor">
              <span class="mar">每日</span><InputNumber :max="10" :min="0" v-model="formInline.warn"></InputNumber><span class="mar">次</span>
            </FormItem>
            <FormItem prop="warn1" label='提醒设置' class="pad" v-else>
              <span class="mar">每日<b class="Number">1</b>次</span>
            </FormItem>
            <!-- <FormItem prop="warn" label='提醒设置' class="pad" v-else>
              <span class="mar">每</span><InputNumber :max="10" :min="1" v-model="formInline.warn"></InputNumber><span class="mar">日1次</span>
            </FormItem> -->
            <FormItem prop="time" v-if="iscolor">
              <Row :gutter="16" class="time" v-for="item in timeList" :key="">
                <Col span="6" class="background">
                {{item.key}}
                </Col>
                <Col span="11" class="background">
                {{item.time}}
                </Col>
                <Col span="6" class="background">
                  <Icon type="md-close" @click="close" class="red_icon" :id="item.key" />
                </Col>
              </Row>
              <Row :gutter="16" class="rowStyle">
                <Col span="6" class="background">
                  <span>{{timeList.length+1}}</span>
                </Col>
                <Col span="11" class="background">
                  <TimePicker type="time" style="width:60%" size="small" v-model="formInline.time"></TimePicker>
                  <!-- <span v-else>{{formInline.time}}</span> -->
                </Col>
                <Col span="6" class="background">
                  <Icon type="md-add" @click="addTime" class="icon_dark"/>
                </Col>
              </Row>
            </FormItem>
            <FormItem prop="time" v-else>
              <Row :gutter="16" class="rowStyle">
                <Col span="6" class="background">
                  <span>{{1}}</span>
                </Col>
                <Col span="11" class="background">
                  <TimePicker type="time" style="width:60%" size="small" v-model="formInline.time1" v-if="isshow"></TimePicker>
                  <span v-else>{{this.formInline.time1}}</span>
                </Col>
                <Col span="6" class="background">
                  <Icon type="md-create"  @click="isshow = !isshow"/>
                  <!-- <Icon type="md-add" @click="addTime1" class="icon_dark"/> -->
                </Col>
              </Row>
            </FormItem>
          </Form>
        </div>
        <div slot="footer" style="margin:25px 0">
          <imgButton type="按钮" name="提交" @click.native="submitBtn()"></imgButton>
          <imgButton type="按钮" name="重置" @click.native="resetBtn()"></imgButton>
        </div>
      </Modal>
  </div>
</template>
<script>
import shutdownManage from '../../../api/request/shutdownManage'
import util, { copyArray } from '../../../api/util'
export default {
  data () {
    return {
      arrearModal: false,
      money: 10,
      money1: 50,
      number: 0,
      formInline: {
        surplus: 10,
        surplus1:50,
        warn: 0,
        warn1:0,
        time: '',
        time1: ''
      },
      iscolor: true,
      ruleInline: {

      },
      times: [],
      times1: [],
      isshow: true,
      timeList:[
        // {
        //   key: 1,
        //   title: '12:00'
        // },
        // {
        //   key: 2,
        //   title: '17:00'
        // }
      ],
      timeList1:[]
    }
  },
  created () {
    this.initPage()
  },
  methods: { 
    editRed () {
      this.arrearModal = true
      this.formInline.surplus = this.money
      this.formInline.warn = this.number
      this.timeList = copyArray(this.times)
      this.iscolor = true
    },
    editYellow () {
      this.formInline.surplus1 = this.money1
      this.arrearModal = true
      this.iscolor = false
      this.isshow = false
    },
    onCancel () {

    },
    //重置
    resetBtn (){
      if(this.iscolor){
        this.formInline.surplus = copyArray(this.money)
        this.formInline.warn = copyArray(this.number)
        this.timeList = copyArray(this.times)
      } else {
        this.formInline.surplus1 = copyArray(this.money1)
        this.formInline.time1 = copyArray(this.times1[0].time)
        this.isshow = false
      }
    },

    initPage () {
      shutdownManage.searchNoticeRule({
      })
        .then((res) => {
          if(res.length>0){
            this.money = res[0].feeNum
            this.times = res[0].times
            this.number = res[0].times.length
            if(res.length>1) {
              this.money1 = res[1].feeNum
              this.times1 = res[1].times
              this.formInline.time1 = res[1].times[0].time
            }
          } 
        })
          .catch((err) => {
            this.$Message.error('查询失败')
          })
    },

    submitBtn () {
      let array = []
      for(const val of this.timeList) {
        let time = val.time
        array.push(time)
      }
      let str = array.join(',')
      let str1 = this.formInline.time1
      shutdownManage.addNoticeRule({
        oldFee: this.iscolor ? this.money : this.money1,
        newFee: this.iscolor ? this.formInline.surplus : this.formInline.surplus1,
        times: this.iscolor? str : str1
      })
        .then((res) => {
          this.$Message.success('修改成功')
          this.arrearModal = false
          this.initPage()
        })
          .catch((err) => {
            this.$Message.success('修改失败')
          })

    },
  
    close (data) {
      const id = data.target.id
      this.timeList.splice(id-1,1)
    },
    addTime () {
      if(this.formInline.time && this.formInline.warn > this.timeList.length) {
      const obj = {
        key: this.timeList.length+1,
        time: this.formInline.time
      }
      this.timeList.push(obj)
      this.formInline.time = ''
      } else {
        this.$Message.error('设置错误')
      }
    }
  }
}
</script>
<style scoped lang="less">
.red {
  .red-yellow;
  border:1px solid #e50000;
  background:#e50000;
}
.yellow {
  .red-yellow;
  border:1px solid #ffc000;
  background:#ffc000;
}
.red-yellow {
  border-radius:6px;
  width:90px;
  height:60px;
  font-size:20px;
  color:#fff;
  text-align:center;
  line-height:60px
}
.square {
  border:1px solid #ddd;
  border-radius:6px;
  height:60px;
  line-height:60px;
  color:#000
}
.Number{
  margin:0 18px;
  font-size:14px
}
.font {
  font-size: 14px
}
.ivu-form-item{
  margin-bottom:3px;
}
.ivu-input-number-input{
  background:#f3f3f3
}
.infomation {
  position:absolute;
  bottom:0;
  right:200px
}
.surplus {
  background:rgba(213,213,213,.8);
  padding:6px 10px;
  box-shadow: 0 0 5px #d5d5d5;
}
.big {
  font-size:16px;
  margin:0 10px
}
.mar {
  margin:0 8px
}
.pad {
  padding:6px 10px
}
.time {
  text-align:center;
  font-size:14px;
  color:#333;
  margin:0 auto
}
.background {
  background:#fff;
  margin:1px
}
.red_icon {
  color:#cc0000;
  font-size:16px;
  font-weight:bold
}
.rowStyle {
  text-align:center;
  font-size:14px;
  color:#333;
  margin:0 auto
}
.icon_dark {
  font-size:16px;
  font-weight:bold
}
</style>