<!----历史记录列表---->
<template>
  <div>
    <div>
      <Row :gutter="16">
        <Col span="3">
          <b class="fontSize">户号：</b>
          <b class="bigFont2">{{this.$route.query.account}}</b>
        </Col>
        <Col span="2">
          <b class="fontSize">操作记录：</b>
          <b class="bigFont1">{{dataCount}}</b>
        </Col>
        <Col span="2" :offset="17">
          <b class="fontSize">当前状态：</b>
          <b class="bigFont2">{{this.$route.query.serviceType === 0 ? '停用' : this.$route.query.serviceType === 1 ? '正常' : '欠费'}}</b>
        </Col>
      </Row>
      <Table :columns="columns" class="common-table" :data="historyList" no-data-text="暂无数据" border></Table>

      <Row class="page-bottom">
        <Col span="12" class="page-text">当前显示<span class="pageColor">{{pageSize}}</span>条记录,共<span class="pageColor">{{dataCount}}</span>条记录</Col>
        <Col span="8" :offset="4"> 
          <Page :total="dataCount" :page-size="pageSize"  @on-change="changePage"  show-elevator :current="currentPage" class="common-page-style"/>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
import shutdownManage from '../../../api/request/shutdownManage'
import filter from '../../../api/filter'
  export default {
    data () {
      return {
        pageSize: 10,
        dataCount: 100,
        currentPage: 1,
        columns: [
          {
            title: "序号",
            type: "index",
            align: "center"
          },
          {
            title: "操作时间",
            key: "dateTime",
            align: "center"
          },
          {
            title: "操作类型",
            key: "type",
            align: "center",
            render: (h, params) => {
            let typeId = params.row.type
            let typeStatus
            typeId === 0 ?  typeStatus = '停机' : typeStatus = '复机'
            const type = filter.filterAccount(typeId)
            const color = type.color
            return h('Tag', {
              props: {
                color: color,
              },
              nativeOn: {
                click: () => {
                }
              }
            },typeStatus)
          }
          },
          {
            title: "包含设备",
            key: "items",        
            align: "center"
          }
        ],
        historyList: [],
      }
    },
    created () {
      this.changePage(1)
    },
    methods: {
      //查询账户停复机历史
      changePage (page) {
        this.currentPage = page
        console.log(this.$route.query.accountId)
        shutdownManage.searchOperationHistory({
          accountId: this.$route.query.accountId,
          currentPage: this.currentPage,
          pageSize: 10
        })
          .then((res) => {
            this.historyList = res.dataList
            this.dataCount = res.total
          })
            .catch((err) => {
              this.$Message.error('页面加载失败')
            })
      },
    }
  }
</script>