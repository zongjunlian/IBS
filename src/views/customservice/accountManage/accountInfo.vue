<template>
  <div class="account-inf">
    <Row>
      <Icon type="md-close" size="30" style="float:right;margin-right: 5%;top: 0"  @click="close"/>
    </Row>
    <Row style="margin-top:60px">
      <Col span="10">
        <table class="tab-success-info">
          <tr>
            <td class="tab-left">账户状态：</td>
            <td :class="classI">{{statusOfAccount}}</td>
          </tr>
          <tr>
            <td class="tab-left">户号：</td>
            <td>{{successObj.account}}</td>
          </tr>
          <tr>
            <td class="tab-left">服务申请单编号：</td>
            <td>{{successObj.applyNum}}</td>
          </tr>
          <tr>
            <td class="tab-left">申请性质：</td>
            <td>{{successObj.appalyType === 0 ? '企业' : '个人'}}</td>
          </tr>
          <tr>
            <td class="tab-left">业务经办人：</td>
            <td>{{successObj.operator}}</td>
          </tr>
          <tr>
            <td class="tab-left">公司名称/户主姓名：</td>
            <td>{{successObj.companyName}}</td>
          </tr>
          <tr>
            <td class="tab-left">入驻日期：</td>
            <td>{{successObj.settledTime}}</td>
          </tr>
          <tr>
            <td class="tab-left">联系电话：</td>
            <td>{{successObj.phone}}</td>
          </tr>
          <tr>
            <td class="tab-left">开通地址：</td>
            <td>{{successObj.address}}</td>
          </tr>
          <tr>
            <td class="tab-left">证件类型：</td>
            <td>营业执照{{`【税号 ${successObj.businessLicense === null ? '': successObj.businessLicense}】`}}</td>
          </tr>
          <tr v-if="successObj.identityCardNumber" onselectstart="return false" onselect="document.selection.empty()" style="color:transparent;">
            <td class="tab-left">身份证：</td>
            <td>身份证{{`【${successObj.identityCardNumber === null ? '' : successObj.identityCardNumber}】`}}</td>
          </tr>
          <tr v-if="successObj.otherType !== ''" onselectstart="return false" onselect="document.selection.empty()" style="color:transparent;">
            <td class="tab-left">{{successObj.cardTypeDescription}}：</td>
            <td>{{`${successObj.cardTypeDescription}【${successObj.otherType === null ? '' : successObj.otherType}】`}}</td>
          </tr>
          <tr>
            <td class="tab-left">使用类别：</td>
            <td>{{useTypeS}}</td>
          </tr>
          <tr>
            <td class="tab-left">联系人：</td>
            <td>{{successObj.contactPerson}}</td>
          </tr>
          <tr>
            <td class="tab-left">联系电话：</td>
            <td>{{successObj.contactPersonPhone}}</td>
          </tr>
          <tr>
            <td class="tab-left">邮箱：</td>
            <td>{{successObj.email}}</td>
          </tr>
          <tr>
            <td class="tab-left">备注：</td>
            <td>{{successObj.remarks === '' ? '————' : successObj.remarks}}</td>
          </tr>
          <tr>
            <td class="tab-left">账户绑定设备：</td>
            <td>{{successObj.items}}</td>
          </tr>
        </table>
      </Col>
      <Col span="12">
        <Table :columns="columns" class="common-table" :data="data1" no-data-text="暂无数据"></Table>
          <Row class="page-bottom">
            <Col span="8" class="page-text">
            当前显示<span class="pageColor">{{(data1 && data1.length > 0) ? data1.length : 0}}</span>条记录,共<span class="pageColor">{{dataCount}}</span>条记录
            </Col>
            <Col span="16" >
            <Page :total="dataCount" :page-size="pageSize"  @on-change="pageChange"  show-elevator :current="currentPage" class="common-page-style"/>
            </Col>
          </Row>
      </Col>
    </Row>
    
  </div>
</template>


<script>
import accountApi from '@/api/request/accountList'
import filter from '@/api/filter'
export default {
  data () {
    return {
      successObj: {},
      useTypeS: '',
      data1: [],
      dataCount: 0,
      currentPage: 1,
      pageSize: 10,
      statusOfAccount: '',
      classI: '',

      columns: [
        {
          title: "序号",
          type: 'index',
          align: "center"
        },
        {
          title: "风机盘管编号",
          key: 'code',
          align: "center"
        },
        {
          title: "当前状态",
          align: "center",
          render: (h, params) => {
            let accountStatusId = this.$route.params.serviceType
            let serviceType
            let type = {display: '', color: ''}
            if(accountStatusId === '0' ) {
              serviceType = '未激活'
              type = {display: 'none', color: 'orange'}
            }else if(accountStatusId === '1') {
              serviceType = '正常'
              type = {display: 'none', color: 'green'}
            }else if(accountStatusId === '2') {
              serviceType = '检修中'
              type = {display: 'none', color: 'blue'}
            }else if(accountStatusId === '3') {
              serviceType = '自动停机'
              type = {display: 'none', color: 'yellow'}
            }else if(accountStatusId === '4') {
              serviceType = '主动停机'
              type = {display: 'block', color: 'default'}
            }else if(accountStatusId === '5') {
              serviceType = '销户'
              type = {display: 'block', color: 'red'}
            }else{
              serviceType = ''
            }
            let color = type.color
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
          title: "最新统计日期",
          key: 'updateTime',
          align: "center"
        },
      ],
      listData: []
    }
  },

  created () {
    console.log(this.$route.params);
    this.getAccountInfo(this.$route.params.applyNum)
    this.searchIbsItemConnect(this.$route.params.id)//获取已绑定设备
    let acc = this.$route.params.serviceType
    if(acc === '0' ) {
      this.statusOfAccount = '未激活'
      this.classI = 'orange'
    }else if(acc === '1') {
      this.statusOfAccount = '正常'
      this.classI = 'green'
    }else if(acc === '2') {
      this.statusOfAccount = '检修中'
      this.classI = 'blue'
    }else if(acc === '3') {
      this.statusOfAccount = '自动停机'
      this.classI = 'yellow'
    }else if(acc === '4') {
      this.statusOfAccount = '主动停机'
      this.classI = 'default'
    }else if(acc === '5') {
      this.statusOfAccount = '销户'
      this.classI = 'red'
    }else{
      this.statusOfAccount = ''
      this.classI = 'default'
    }
  },

  methods: {
    close() {
      this.$router.push({path: '/accountList'})
    },

    pageChange(page) {
      this.currentPage = page
      console.log('当前页码', this.currentPage);
      this.data1.splice(0, this.data1.length)
      for(let i = this.pageSize*(this.currentPage-1)+1; i<= ((this.listData.length > this.currentPage*this.pageSize)?(this.pageSize*this.currentPage) : (this.listData.length)) ;i ++) {
        this.data1.push(this.listData[i-1])
      } 
    },

    searchIbsItemConnect(id) {
      accountApi.searchIbsItemConnect({
        accountId: id
      }).then((res) => {
        console.log('res', res);
        if(res.data) {
          this.listData = res.data
          this.dataCount = this.listData.length
          this.pageChange(1)
        }
      }).catch((err) => {})
    },

    getAccountInfo(num) {
      accountApi.getIbsAccountByApplyNum({
        applyNum: num
      }).then((res) => {
        console.log(res)
        if(res.data.otherType === null || res.data.otherType === 'null') {
          res.data.otherType = ''
        }
        if(res.data.useType === 1) {
          this.useTypeS = '公司'
        }else if(res.data.useType === 2) {
          this.useTypeS = '住宅'
        }else if(res.data.useType === 3) {
          this.useTypeS = '学校'
        }else if(res.data.useType === 4) {
          this.useTypeS = '酒店'
        }else if(res.data.useType === 5) {
          this.useTypeS = '商业'
        }else if(res.data.useType === 6) {
          this.useTypeS = res.data.useTypeDescription
        }
        this.successObj = res.data
      }).catch((err) => {})
    }
  }
}
</script>

<style lang="less" scoped>
.account-inf{
  .tab-success-info{
    font-size: 20px;
  }
  .tab-left {
    width: 200px;
    text-align: right;
  }

  .orange {
    color: orange;
  }

  .green {
    color: #19be6b;
  }

  .blue {
    color: #2db7f5;
  }

  .yellow {
    color: #fadb14;
  }

  .red {
    color: red;
  }

  .default {
    color: #515a6e;
  }
}
</style>

